import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FluidFluxWebGLProps {
  className?: string;
}

const RIBBON_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPhase;
  uniform float uWaveAmp;

  attribute vec2 aUv;

  varying vec2 vUv;
  varying vec3 vNormalDir;
  varying vec3 vViewDir;
  varying float vCrest;

  void main() {
    vUv = aUv;
    vec3 pos = position;

    // Travelling liquid-silk undulation along ribbon length (aUv.x) and width (aUv.y)
    float flow1 = sin(aUv.x * 10.5 - uTime * 1.15 + uPhase) * uWaveAmp;
    float flow2 = cos(aUv.x * 17.0 - uTime * 1.65 + aUv.y * 2.8 + uPhase * 1.4) * (uWaveAmp * 0.42);
    float crossFold = sin(aUv.y * 3.14159 * 1.35 + aUv.x * 6.0 - uTime * 0.9 + uPhase) * (uWaveAmp * 0.36);

    // Subtle pointer-reactive magnetic fluid sway
    float mousePull = (uMouse.x * 0.24 * sin(aUv.x * 3.14159) + uMouse.y * 0.20 * cos(aUv.x * 4.5));

    pos += normal * (flow1 + flow2 + crossFold + mousePull * 0.45);
    pos.z += sin(aUv.x * 7.0 - uTime * 0.85 + uPhase) * 0.16;

    // Approximate dynamic surface normal tilt for responsive silky sheen
    vec3 perturbedNormal = normalize(
      normal +
      vec3(
        cos(aUv.x * 10.5 - uTime * 1.15 + uPhase) * 0.28,
        sin(aUv.y * 4.2 - uTime * 1.1 + uPhase) * 0.28,
        0.12
      )
    );

    vCrest = clamp(0.5 + (flow1 + flow2) / max(uWaveAmp * 1.8, 0.001), 0.0, 1.0);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vNormalDir = normalize(normalMatrix * perturbedNormal);
    vViewDir = normalize(-mvPos.xyz);

    gl_Position = projectionMatrix * mvPos;
  }
`;

const RIBBON_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uIsGold;
  uniform float uOpacity;
  uniform float uPhase;

  varying vec2 vUv;
  varying vec3 vNormalDir;
  varying vec3 vViewDir;
  varying float vCrest;

  void main() {
    // Double-sided silky Fresnel lighting
    vec3 N = normalize(vNormalDir);
    if (!gl_FrontFacing) N = -N;
    vec3 V = normalize(vViewDir);

    float ndotv = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 2.2);

    // Fine longitudinal liquid-silk fiber striations
    float fibers =
      0.5 +
      0.32 * sin(vUv.y * 46.0 + sin(vUv.x * 12.0 - uTime * 0.9 + uPhase) * 2.2) +
      0.18 * cos(vUv.y * 92.0 - vUv.x * 18.0 + uTime * 1.3);

    // Soft feathering at ribbon tips and lateral edges
    float edgeMask = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    float tipMask = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.86, vUv.x);

    // Light directions: warm key light from center-right + cool rim from top-left
    vec3 warmLight = normalize(vec3(0.55, 0.35, 0.75));
    vec3 coolLight = normalize(vec3(-0.65, 0.55, 0.52));
    float warmDiff = clamp(dot(N, warmLight) * 0.65 + 0.35, 0.0, 1.0);
    float coolSpec = pow(clamp(dot(reflect(-coolLight, N), V), 0.0, 1.0), 10.0);
    float warmSpec = pow(clamp(dot(reflect(-warmLight, N), V), 0.0, 1.0), 8.0);

    vec3 color;
    float alpha;

    if (uIsGold > 0.5) {
      // Molten luminous golden-amber silk stream
      vec3 deepCopper = vec3(0.42, 0.14, 0.03);
      vec3 richAmber  = vec3(0.95, 0.56, 0.06);
      vec3 brightGold = vec3(1.00, 0.84, 0.38);
      vec3 whiteHot   = vec3(1.00, 0.97, 0.86);

      color = mix(deepCopper, richAmber, smoothstep(0.15, 0.85, warmDiff * 0.7 + vCrest * 0.4));
      color = mix(color, brightGold, smoothstep(0.35, 0.95, fibers * 0.65 + fresnel * 0.55));
      color += whiteHot * (warmSpec * 0.55 + fresnel * fibers * 0.35);

      alpha = edgeMask * tipMask * uOpacity * (0.48 + 0.52 * fibers);
    } else {
      // Deep obsidian-navy liquid silk folds with warm reflected golden rim
      vec3 obsidian   = vec3(0.03, 0.05, 0.11);
      vec3 midNavy    = vec3(0.08, 0.14, 0.28);
      vec3 slateSteel = vec3(0.24, 0.38, 0.60);
      vec3 goldBounce = vec3(0.96, 0.62, 0.14);

      color = mix(obsidian, midNavy, warmDiff * 0.75 + fibers * 0.25);
      color = mix(color, slateSteel, fresnel * 0.55 + coolSpec * 0.5);
      color += goldBounce * (fresnel * 0.38 * smoothstep(0.2, 0.9, vCrest) + warmSpec * 0.22);

      alpha = edgeMask * tipMask * uOpacity * (0.72 + 0.28 * fibers);
    }

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

const PARTICLE_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;

  attribute float aPhase;
  attribute float aSpeed;
  attribute float aArm;
  attribute float aSpread;
  attribute float aSize;
  attribute float aTone;

  varying float vAlpha;
  varying float vTone;

  // Evaluates a point along the organic Digital Flux 3D vortex streamlines
  vec3 evalFluxPoint(float t, float arm, float spread) {
    float angle = (1.0 - t) * 7.6 + arm * 1.2566;
    float r = 0.28 + pow(t, 1.38) * 3.05;

    // Sweeping upward-right & outward S-curve billowing
    float x = -0.32 + cos(angle) * r * 0.95 + pow(t, 1.6) * (0.75 + sin(arm * 2.1) * 0.45);
    float y = 0.04 + sin(angle) * r * 0.78 + sin(t * 4.4 + arm * 1.7) * (0.52 * t);
    float z = sin(angle * 0.9 + arm) * (0.85 * (1.0 - t * 0.35)) + cos(t * 5.0 + arm) * 0.35;

    // Organic turbulence spread around the streamline
    float swirl = t * 9.0 + arm * 3.0 - uTime * 0.7;
    x += cos(swirl) * spread * (0.25 + t * 0.75);
    y += sin(swirl * 1.15) * spread * (0.25 + t * 0.75);
    z += sin(swirl * 0.8 + spread * 4.0) * spread * 0.55;

    // Pointer drift
    x += uMouse.x * 0.22 * t;
    y += uMouse.y * 0.18 * t;

    return vec3(x, y, z);
  }

  void main() {
    float t = fract(aPhase + uTime * aSpeed);
    vec3 pos = evalFluxPoint(t, aArm, aSpread);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // Smooth fade-in near eye and fade-out at outer tips
    vAlpha = smoothstep(0.0, 0.14, t) * smoothstep(1.0, 0.72, t);
    vTone = aTone;

    float depthScale = clamp(7.5 / max(-mvPos.z, 1.0), 0.5, 2.2);
    gl_PointSize = aSize * uPixelRatio * depthScale;
  }
`;

const PARTICLE_FRAGMENT_SHADER = /* glsl */ `
  varying float vAlpha;
  varying float vTone;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float dist = length(c);
    if (dist > 0.5) discard;

    float soft = pow(1.0 - dist * 2.0, 1.85);

    vec3 col;
    if (vTone < 0.22) {
      // Bright white-gold core spark
      col = vec3(1.00, 0.96, 0.82);
    } else if (vTone < 0.84) {
      // Rich golden-amber dust
      col = mix(vec3(0.96, 0.62, 0.08), vec3(0.99, 0.82, 0.32), (vTone - 0.22) / 0.62);
    } else {
      // Subtle cool midnight-blue shimmer
      col = vec3(0.45, 0.68, 0.98);
    }

    gl_FragColor = vec4(col, soft * vAlpha * 0.92);
  }
`;

/**
 * Generates a curved 3D sculptural ribbon mesh sweeping from the central spiral vortex
 * eye outward into billowing silk-like wave folds.
 */
function createFluxRibbonGeometry(config: {
  armOffset: number;
  width: number;
  radialScale: number;
  yBias: number;
  zOffset: number;
  twistTurns: number;
  sweepX: number;
  sweepY: number;
}): THREE.BufferGeometry {
  const segsU = 132;
  const segsV = 12;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const spinePts: THREE.Vector3[] = [];
  for (let i = 0; i <= segsU; i++) {
    const u = i / segsU;
    const angle = (1 - u) * 7.4 + config.armOffset;
    const r = (0.24 + Math.pow(u, 1.35) * 2.72) * config.radialScale;

    const x =
      -0.32 +
      Math.cos(angle) * r * 0.94 +
      Math.pow(u, 1.55) * config.sweepX;
    const y =
      0.04 +
      Math.sin(angle) * r * 0.76 +
      Math.sin(u * 4.2 + config.armOffset) * 0.42 * u +
      Math.pow(u, 1.4) * config.sweepY +
      config.yBias * u;
    const z =
      Math.sin(angle * 0.88 + config.armOffset) * (0.78 * (1 - u * 0.28)) +
      Math.cos(u * 4.8 + config.armOffset) * 0.34 +
      config.zOffset;

    spinePts.push(new THREE.Vector3(x, y, z));
  }

  const upRef = new THREE.Vector3(0, 0, 1);
  const tangent = new THREE.Vector3();
  const side = new THREE.Vector3();
  const binormal = new THREE.Vector3();

  for (let i = 0; i <= segsU; i++) {
    const u = i / segsU;
    const prev = spinePts[Math.max(i - 1, 0)];
    const next = spinePts[Math.min(i + 1, segsU)];
    tangent.subVectors(next, prev).normalize();

    side.crossVectors(tangent, upRef);
    if (side.lengthSq() < 0.001) {
      side.set(1, 0, 0);
    } else {
      side.normalize();
    }
    binormal.crossVectors(side, tangent).normalize();

    // Smooth twist along ribbon spine for sculptural 3D folded look
    const twist = u * Math.PI * config.twistTurns + config.armOffset * 0.5;
    const cosT = Math.cos(twist);
    const sinT = Math.sin(twist);

    const ribbonSide = side
      .clone()
      .multiplyScalar(cosT)
      .addScaledVector(binormal, sinT)
      .normalize();
    const ribbonNorm = binormal
      .clone()
      .multiplyScalar(cosT)
      .addScaledVector(side, -sinT)
      .normalize();

    // Taper width near spiral eye and gently widen across the sweeping billows
    const widthProfile = config.width * (0.25 + 0.95 * Math.sin(u * Math.PI * 0.88));

    for (let j = 0; j <= segsV; j++) {
      const vFrac = j / segsV; // 0..1
      const vSigned = (vFrac - 0.5) * 2; // -1..1

      // Gentle arch across ribbon cross-section for volumetric silk creases
      const arch = Math.cos(vSigned * Math.PI * 0.5) * (widthProfile * 0.16);
      const pt = spinePts[i]
        .clone()
        .addScaledVector(ribbonSide, vSigned * widthProfile * 0.5)
        .addScaledVector(ribbonNorm, arch);

      positions.push(pt.x, pt.y, pt.z);
      normals.push(ribbonNorm.x, ribbonNorm.y, ribbonNorm.z);
      uvs.push(u, vFrac);
    }
  }

  const rowLen = segsV + 1;
  for (let i = 0; i < segsU; i++) {
    for (let j = 0; j < segsV; j++) {
      const a = i * rowLen + j;
      const b = a + 1;
      const c = (i + 1) * rowLen + j;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('aUv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

export const FluidFluxWebGL: React.FC<FluidFluxWebGLProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth || 600, container.clientHeight || 500);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      (container.clientWidth || 600) / (container.clientHeight || 500),
      0.1,
      100
    );
    camera.position.set(0.15, 0.08, 7.6);

    const fluxGroup = new THREE.Group();
    scene.add(fluxGroup);

    const disposables: { dispose: () => void }[] = [];
    const shaderUniformsList: { uTime: { value: number }; uMouse: { value: THREE.Vector2 } }[] = [];

    // -------------------------------------------------------------------------
    // 1. Subtle Cybernetic Geometric Constellation Wireframe Behind the Fluid
    // -------------------------------------------------------------------------
    const backdropGeo = new THREE.IcosahedronGeometry(2.55, 2);
    const wireGeo = new THREE.WireframeGeometry(backdropGeo);
    backdropGeo.dispose();
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.065,
      depthWrite: false,
    });
    const backdropMesh = new THREE.LineSegments(wireGeo, wireMat);
    backdropMesh.position.set(0.1, 0, -1.2);
    fluxGroup.add(backdropMesh);
    disposables.push(wireGeo, wireMat);

    // -------------------------------------------------------------------------
    // 2. 14 Intertwined Sculptural Liquid-Silk 3D Fluid Ribbons (Navy + Gold)
    // -------------------------------------------------------------------------
    const ribbonConfigs = [
      // Deep obsidian-navy volumetric silk waves (larger framing folds)
      { armOffset: 0.15, width: 1.05, radialScale: 1.05, yBias: 0.45, zOffset: -0.25, twistTurns: 1.15, sweepX: 1.1, sweepY: 0.55, isGold: false, opacity: 0.92, amp: 0.13 },
      { armOffset: 1.45, width: 0.95, radialScale: 1.02, yBias: 0.25, zOffset: -0.1, twistTurns: 1.35, sweepX: 0.85, sweepY: 0.85, isGold: false, opacity: 0.88, amp: 0.12 },
      { armOffset: 2.75, width: 1.1, radialScale: 0.98, yBias: -0.35, zOffset: -0.2, twistTurns: 1.05, sweepX: 1.25, sweepY: -0.25, isGold: false, opacity: 0.9, amp: 0.14 },
      { armOffset: 4.05, width: 0.9, radialScale: 1.08, yBias: -0.5, zOffset: 0.05, twistTurns: 1.25, sweepX: 0.75, sweepY: -0.45, isGold: false, opacity: 0.86, amp: 0.11 },
      { armOffset: 5.25, width: 1.0, radialScale: 0.94, yBias: 0.65, zOffset: -0.3, twistTurns: 1.1, sweepX: 0.95, sweepY: 0.7, isGold: false, opacity: 0.88, amp: 0.13 },
      { armOffset: 0.8, width: 0.78, radialScale: 0.88, yBias: -0.1, zOffset: 0.15, twistTurns: 1.4, sweepX: 1.35, sweepY: 0.15, isGold: false, opacity: 0.82, amp: 0.1 },

      // Molten luminous golden-amber streams intertwined between the navy folds
      { armOffset: 0.45, width: 0.72, radialScale: 0.96, yBias: 0.25, zOffset: 0.18, twistTurns: 1.3, sweepX: 1.25, sweepY: 0.45, isGold: true, opacity: 0.82, amp: 0.14 },
      { armOffset: 1.72, width: 0.62, radialScale: 1.0, yBias: 0.52, zOffset: 0.26, twistTurns: 1.45, sweepX: 1.05, sweepY: 0.75, isGold: true, opacity: 0.76, amp: 0.13 },
      { armOffset: 3.05, width: 0.68, radialScale: 0.92, yBias: -0.2, zOffset: 0.22, twistTurns: 1.2, sweepX: 1.4, sweepY: -0.1, isGold: true, opacity: 0.84, amp: 0.15 },
      { armOffset: 4.35, width: 0.56, radialScale: 1.04, yBias: -0.4, zOffset: 0.3, twistTurns: 1.5, sweepX: 0.95, sweepY: -0.35, isGold: true, opacity: 0.72, amp: 0.12 },
      { armOffset: 5.55, width: 0.66, radialScale: 0.9, yBias: 0.35, zOffset: 0.12, twistTurns: 1.35, sweepX: 1.15, sweepY: 0.3, isGold: true, opacity: 0.78, amp: 0.14 },
      { armOffset: 2.35, width: 0.44, radialScale: 1.12, yBias: 0.1, zOffset: 0.34, twistTurns: 1.6, sweepX: 1.3, sweepY: 0.2, isGold: true, opacity: 0.65, amp: 0.16 },
      { armOffset: 3.65, width: 0.48, radialScale: 0.84, yBias: -0.25, zOffset: 0.36, twistTurns: 1.25, sweepX: 1.05, sweepY: -0.2, isGold: true, opacity: 0.74, amp: 0.12 },
      { armOffset: 0.95, width: 0.4, radialScale: 0.82, yBias: 0.05, zOffset: 0.4, twistTurns: 1.55, sweepX: 0.9, sweepY: 0.1, isGold: true, opacity: 0.68, amp: 0.13 },
    ];

    for (let i = 0; i < ribbonConfigs.length; i++) {
      const cfg = ribbonConfigs[i];
      const geo = createFluxRibbonGeometry(cfg);
      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPhase: { value: i * 0.75 },
        uWaveAmp: { value: cfg.amp },
        uIsGold: { value: cfg.isGold ? 1.0 : 0.0 },
        uOpacity: { value: cfg.opacity },
      };

      const mat = new THREE.ShaderMaterial({
        vertexShader: RIBBON_VERTEX_SHADER,
        fragmentShader: RIBBON_FRAGMENT_SHADER,
        uniforms,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: !cfg.isGold,
        blending: cfg.isGold ? THREE.AdditiveBlending : THREE.NormalBlending,
      });

      const mesh = new THREE.Mesh(geo, mat);
      fluxGroup.add(mesh);
      shaderUniformsList.push(uniforms);
      disposables.push(geo, mat);
    }

    // -------------------------------------------------------------------------
    // 3. 4,200 GPU-Driven Swirling Golden & Navy Particle Streams
    // -------------------------------------------------------------------------
    const PARTICLE_COUNT = 4200;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pPhase = new Float32Array(PARTICLE_COUNT);
    const pSpeed = new Float32Array(PARTICLE_COUNT);
    const pArm = new Float32Array(PARTICLE_COUNT);
    const pSpread = new Float32Array(PARTICLE_COUNT);
    const pSize = new Float32Array(PARTICLE_COUNT);
    const pTone = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPhase[i] = Math.random();
      pSpeed[i] = 0.032 + Math.random() * 0.045;
      pArm[i] = Math.floor(Math.random() * 5) + (Math.random() - 0.5) * 0.35;
      pSpread[i] = (Math.random() - 0.5) * (Math.random() > 0.75 ? 1.1 : 0.42);
      pSize[i] = Math.random() > 0.88 ? 4.2 + Math.random() * 3.0 : 1.6 + Math.random() * 2.2;
      pTone[i] = Math.random();
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1));
    particleGeo.setAttribute('aSpeed', new THREE.BufferAttribute(pSpeed, 1));
    particleGeo.setAttribute('aArm', new THREE.BufferAttribute(pArm, 1));
    particleGeo.setAttribute('aSpread', new THREE.BufferAttribute(pSpread, 1));
    particleGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1));
    particleGeo.setAttribute('aTone', new THREE.BufferAttribute(pTone, 1));

    const particleUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX_SHADER,
      fragmentShader: PARTICLE_FRAGMENT_SHADER,
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    fluxGroup.add(particles);
    shaderUniformsList.push(particleUniforms);
    disposables.push(particleGeo, particleMat);

    // -------------------------------------------------------------------------
    // 4. Interactive Pointer Fluid Response & Drag-to-Orbit Inertia
    // -------------------------------------------------------------------------
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    const targetMouse = new THREE.Vector2(0, 0);
    const smoothMouse = new THREE.Vector2(0, 0);

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        velY = dx * 0.0045;
        velX = dy * 0.0045;
        fluxGroup.rotation.y += velY;
        fluxGroup.rotation.x += velX;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.style.touchAction = 'pan-y';
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Initial sculpted pose
    fluxGroup.rotation.set(0.14, -0.22, -0.06);
    renderer.render(scene, camera);

    let animId = 0;
    const clock = new THREE.Clock();
    let elapsed = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      smoothMouse.lerp(targetMouse, 0.05);

      for (const u of shaderUniformsList) {
        u.uTime.value = elapsed;
        u.uMouse.value.copy(smoothMouse);
      }

      if (!isDragging) {
        fluxGroup.rotation.y += velY;
        fluxGroup.rotation.x += velX;
        velX *= 0.92;
        velY *= 0.92;
        // Gentle organic breathing sway around sculpted pose
        fluxGroup.rotation.z = -0.06 + Math.sin(elapsed * 0.35) * 0.035;
      }

      backdropMesh.rotation.y = elapsed * 0.04;
      backdropMesh.rotation.x = Math.sin(elapsed * 0.25) * 0.08;

      camera.position.x = 0.15 + smoothMouse.x * 0.38;
      camera.position.y = 0.08 + smoothMouse.y * 0.28;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        aria-label="The Digital Flux Interactive Visual"
      >
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(251,191,36,0.45)_0%,rgba(30,58,138,0.45)_45%,transparent_72%)] blur-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D Digital Flux Fluid Particle Vortex"
    />
  );
};
