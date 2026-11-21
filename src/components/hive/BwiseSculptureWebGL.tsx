import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BwiseSculptureWebGLProps {
  className?: string;
}

interface RibbonControlPoint {
  pos: [number, number, number];
  width: number;
  thickness: number;
  /** Roll angle (radians) banking the ribbon face relative to camera Z */
  roll: number;
}

/**
 * Generates a smooth, beveled 3D satin-metallic ribbon mesh along a 3D Catmull-Rom path.
 * Uses a camera-stabilized reference frame so the ribbon twists smoothly without
 * Frenet flips and produces sleek architectural highlights across curved surfaces.
 */
function buildSculptedRibbonGeometry(
  controls: RibbonControlPoint[],
  lengthSegments = 180
): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(
    controls.map((c) => new THREE.Vector3(...c.pos)),
    false,
    'centripetal',
    0.5
  );

  const sampleScalar = (getter: (c: RibbonControlPoint) => number, t: number): number => {
    const scaled = t * (controls.length - 1);
    const i0 = Math.min(Math.floor(scaled), controls.length - 1);
    const i1 = Math.min(i0 + 1, controls.length - 1);
    const f = scaled - i0;
    const sf = f * f * (3 - 2 * f);
    return getter(controls[i0]) * (1 - sf) + getter(controls[i1]) * sf;
  };

  // Smooth rounded-bevel cross-section for silky edge highlights
  const crossProfile: [number, number][] = [];
  const cornerSteps = 5;
  const bevelRatioU = 0.36;
  const bevelRatioV = 0.16;
  const corners: [number, number, number][] = [
    [1 - bevelRatioU, 1 - bevelRatioV, 0],
    [-(1 - bevelRatioU), 1 - bevelRatioV, Math.PI * 0.5],
    [-(1 - bevelRatioU), -(1 - bevelRatioV), Math.PI],
    [1 - bevelRatioU, -(1 - bevelRatioV), Math.PI * 1.5],
  ];

  for (const [cu, cv, startAngle] of corners) {
    for (let s = 0; s <= cornerSteps; s++) {
      const a = startAngle + (s / cornerSteps) * (Math.PI * 0.5);
      crossProfile.push([cu + Math.cos(a) * bevelRatioU, cv + Math.sin(a) * bevelRatioV]);
    }
  }
  const ringCount = crossProfile.length;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const tangent = new THREE.Vector3();
  const baseZ = new THREE.Vector3(0, 0, 1);
  const sideA = new THREE.Vector3();
  const sideB = new THREE.Vector3();
  const rotSideA = new THREE.Vector3();
  const rotSideB = new THREE.Vector3();
  const pt = new THREE.Vector3();

  for (let i = 0; i <= lengthSegments; i++) {
    const t = i / lengthSegments;
    curve.getPointAt(t, pt);
    curve.getTangentAt(t, tangent).normalize();

    sideB.crossVectors(baseZ, tangent);
    if (sideB.lengthSq() < 0.0001) {
      sideB.set(0, 1, 0);
    } else {
      sideB.normalize();
    }
    sideA.crossVectors(tangent, sideB).normalize();

    const width = sampleScalar((c) => c.width, t);
    const thickness = sampleScalar((c) => c.thickness, t);
    const roll = sampleScalar((c) => c.roll, t);

    const cosR = Math.cos(roll);
    const sinR = Math.sin(roll);
    rotSideA.copy(sideA).multiplyScalar(cosR).addScaledVector(sideB, sinR);
    rotSideB.copy(sideB).multiplyScalar(cosR).addScaledVector(sideA, -sinR);

    for (let j = 0; j < ringCount; j++) {
      const [pu, pv] = crossProfile[j];
      const vx = pt.x + rotSideA.x * (pu * thickness * 0.5) + rotSideB.x * (pv * width * 0.5);
      const vy = pt.y + rotSideA.y * (pu * thickness * 0.5) + rotSideB.y * (pv * width * 0.5);
      const vz = pt.z + rotSideA.z * (pu * thickness * 0.5) + rotSideB.z * (pv * width * 0.5);
      positions.push(vx, vy, vz);
      uvs.push(t * 5.0, j / ringCount);
    }
  }

  for (let i = 0; i < lengthSegments; i++) {
    const row0 = i * ringCount;
    const row1 = (i + 1) * ringCount;
    for (let j = 0; j < ringCount; j++) {
      const jNext = (j + 1) % ringCount;
      const a = row0 + j;
      const b = row1 + j;
      const c = row1 + jNext;
      const d = row0 + jNext;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // Smooth end caps
  const startCenterIdx = positions.length / 3;
  const pStart = curve.getPointAt(0);
  positions.push(pStart.x, pStart.y, pStart.z);
  uvs.push(0, 0.5);
  for (let j = 0; j < ringCount; j++) {
    const jNext = (j + 1) % ringCount;
    indices.push(startCenterIdx, jNext, j);
  }

  const endCenterIdx = positions.length / 3;
  const pEnd = curve.getPointAt(1);
  positions.push(pEnd.x, pEnd.y, pEnd.z);
  uvs.push(1, 0.5);
  const lastRow = lengthSegments * ringCount;
  for (let j = 0; j < ringCount; j++) {
    const jNext = (j + 1) % ringCount;
    indices.push(endCenterIdx, lastRow + j, lastRow + jNext);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Curves an extruded 2D plate smoothly along a 3D organic shell so the three
 * orange bee-abdomen segments catch rich warm studio highlights across their bevels.
 */
function buildCurvedOrangePlate(shape: THREE.Shape, zOffset = 0.08): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.072,
    bevelSize: 0.044,
    bevelOffset: 0,
    bevelSegments: 10,
    curveSegments: 36,
  });

  geo.translate(0, 0, -0.11);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    // Smooth cylindrical dome curvature so front faces shade cleanly from bright top-left to deep amber right
    const archX = Math.cos((x + 0.68) * 1.48) * 0.3 - 0.14;
    const archY = -Math.pow(y * 0.28, 2) * 0.16;
    pos.setZ(i, z + archX + archY + zOffset);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/** Subtle anisotropic brushed-aluminium micro-grain texture for satin silver sheen. */
function createBrushedMetalTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 128;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#525252';
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < height; y++) {
    const wave = Math.sin(y * 0.55) * 6 + Math.cos(y * 1.6) * 4;
    const v = Math.max(58, Math.min(108, Math.round(82 + wave + (Math.random() - 0.5) * 14)));
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(0, y, width, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

/** Soft radial warm-orange glow texture for floating dust particles & antenna spark. */
function createSparkTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, 'rgba(255, 240, 200, 1)');
  grad.addColorStop(0.24, 'rgba(255, 168, 42, 0.92)');
  grad.addColorStop(0.55, 'rgba(245, 118, 8, 0.34)');
  grad.addColorStop(1, 'rgba(234, 88, 12, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Generates a smooth photographic equirectangular dark studio cyclorama environment map.
 * Using continuous feathered softbox gradients (instead of hard rectangular cards) produces
 * silky brushed-aluminium gradients from pure platinum white to rich architectural charcoal,
 * with only a delicate warm orange floor bounce on lower curves.
 */
function buildSmoothStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Base dark studio vertical gradient (deep obsidian with subtle charcoal horizon)
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#101012');
  bg.addColorStop(0.32, '#1A1A1D');
  bg.addColorStop(0.52, '#0A0A0C');
  bg.addColorStop(1, '#040405');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const paintSoftbox = (
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    innerColor: string,
    midColor: string
  ) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0, innerColor);
    g.addColorStop(0.42, midColor);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  ctx.globalCompositeOperation = 'screen';

  // Primary overhead cool-white diffused studio bank (sculpts silky bright silver arches)
  paintSoftbox(w * 0.52, h * 0.18, w * 0.34, h * 0.16, 'rgba(255,255,255,0.96)', 'rgba(215,215,220,0.45)');
  // Broad front-right platinum studio softbox (creates smooth white-to-charcoal lower bowl sweep)
  paintSoftbox(w * 0.66, h * 0.44, w * 0.24, h * 0.26, 'rgba(250,250,252,0.90)', 'rgba(180,180,188,0.38)');
  // Soft upper-left key reflection for left silver shoulder & satin bee head dome
  paintSoftbox(w * 0.28, h * 0.32, w * 0.20, h * 0.22, 'rgba(245,245,248,0.82)', 'rgba(160,160,168,0.32)');
  // Soft back-rim white edge light to separate dark curves from pure black background
  paintSoftbox(w * 0.90, h * 0.36, w * 0.18, h * 0.24, 'rgba(230,230,235,0.68)', 'rgba(130,130,138,0.22)');
  paintSoftbox(w * 0.08, h * 0.38, w * 0.16, h * 0.22, 'rgba(220,220,225,0.58)', 'rgba(120,120,126,0.18)');
  // Gentle, restrained warm BWise orange ground bounce ONLY along low studio floor hemisphere
  paintSoftbox(w * 0.42, h * 0.84, w * 0.28, h * 0.15, 'rgba(245,130,12,0.36)', 'rgba(180,72,6,0.14)');

  const equiTex = new THREE.CanvasTexture(canvas);
  equiTex.mapping = THREE.EquirectangularReflectionMapping;
  equiTex.colorSpace = THREE.SRGBColorSpace;
  equiTex.needsUpdate = true;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envRT = pmrem.fromEquirectangular(equiTex);
  equiTex.dispose();
  pmrem.dispose();

  return envRT.texture;
}

/** Creates a closed 3D tilted elliptical curve for thin cinematic orange orbital trails. */
function buildEllipticalOrbitCurve(
  rx: number,
  ry: number,
  rotX: number,
  rotY: number,
  rotZ: number,
  offset: [number, number, number]
): THREE.CatmullRomCurve3 {
  const euler = new THREE.Euler(rotX, rotY, rotZ, 'XYZ');
  const offVec = new THREE.Vector3(...offset);
  const pts: THREE.Vector3[] = [];
  const count = 112;

  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const p = new THREE.Vector3(Math.cos(a) * rx, Math.sin(a) * ry, 0);
    p.applyEuler(euler).add(offVec);
    pts.push(p);
  }
  return new THREE.CatmullRomCurve3(pts, true, 'centripetal');
}

const ORBIT_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ORBIT_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uPhase;
  uniform float uReveal;
  uniform float uBaseAlpha;
  uniform float uPeakBoost;
  uniform float uIsHalo;
  varying vec2 vUv;

  float periodicDist(float a, float b) {
    float d = abs(fract(a) - fract(b));
    return min(d, 1.0 - d);
  }

  void main() {
    float head1 = fract(uPhase + uTime * uSpeed);
    float head2 = fract(head1 + 0.50);

    float d1 = periodicDist(vUv.x, head1);
    float d2 = periodicDist(vUv.x, head2);

    // Sleek fiery optical flares traveling smoothly along thin elliptical rings
    float flare1 = exp(-pow(d1 * 7.2, 2.0));
    float flare2 = exp(-pow(d2 * 8.6, 2.0)) * 0.78;
    float trailArc = exp(-pow(d1 * 2.6, 2.0)) * 0.48 + exp(-pow(d2 * 3.0, 2.0)) * 0.30;

    float radialFalloff = 1.0;
    if (uIsHalo > 0.5) {
      float edge = abs(sin(vUv.y * 3.14159265));
      radialFalloff = pow(edge, 1.7);
    }

    float intensity = uBaseAlpha + trailArc * 0.65 + (flare1 + flare2) * uPeakBoost;

    // Strictly pure BWise orange / amber palette — hue-preserved without channel clipping into lemon-green
    vec3 burntAmber = vec3(0.88, 0.28, 0.01);
    vec3 bwiseOrange = vec3(0.98, 0.48, 0.02);
    vec3 flareGold = vec3(1.00, 0.78, 0.34);

    float heat = clamp(flare1 * 0.92 + flare2 * 0.48, 0.0, 1.0);
    vec3 col = mix(burntAmber, bwiseOrange, clamp(trailArc * 1.2 + flare2 * 0.65, 0.0, 1.0));
    col = mix(col, flareGold, pow(heat, 1.6));

    float alpha = clamp(intensity * radialFalloff * uReveal, 0.0, 1.0);
    if (uIsHalo > 0.5) {
      alpha *= (0.14 + (flare1 + flare2) * 0.44);
    }

    gl_FragColor = vec4(col, alpha);
  }
`;

const FLOOR_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FLOOR_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  varying vec2 vUv;

  void main() {
    // Centered coordinates in [-1, 1] across the glossy dark floor plane
    vec2 p = (vUv - 0.5) * 2.0;

    // 1. Crisp luminous orange elliptical ring encircling the base of the B sculpture
    vec2 ringSpace = vec2((p.x - 0.02) / 0.56, (p.y - 0.02) / 0.24);
    float ringDist = abs(length(ringSpace) - 1.0);
    float crispRing = exp(-pow(ringDist * 46.0, 2.0));
    float softRingHalo = exp(-pow(ringDist * 9.5, 2.0)) * 0.42;

    float angle = atan(ringSpace.y, ringSpace.x);
    // Brightest glow on front-left & front-right arcs matching studio reflection
    float ringDir = 0.56 + 0.44 * max(0.0, cos(angle + 2.45 + sin(uTime * 0.18) * 0.22));
    float ringFront = 0.62 + 0.38 * smoothstep(0.65, -0.75, sin(angle));

    // 2. Glossy downward vertical floor reflections on the FRONT half of the plane (p.y < 0 is closer/lower on screen!)
    // Warm orange glossy reflection column directly beneath the 3 orange bee plates
    vec2 orangeCol = vec2((p.x + 0.17) / 0.17, (p.y + 0.36) / 0.44);
    float orangeVertReflect =
      exp(-dot(orangeCol, orangeCol) * 1.75) * smoothstep(0.06, -0.22, p.y) * 0.68;

    // Secondary warm amber glow pool directly beneath the center-left base
    vec2 orangeInner = vec2((p.x + 0.02) / 0.18, (p.y + 0.28) / 0.34);
    float orangeMidReflect =
      exp(-dot(orangeInner, orangeInner) * 2.1) * smoothstep(0.05, -0.18, p.y) * 0.42;

    // Soft satin-silver downward reflection under the right sweeping lower silver bowl
    vec2 silverCol = vec2((p.x - 0.24) / 0.25, (p.y + 0.34) / 0.40);
    float silverVertReflect =
      exp(-dot(silverCol, silverCol) * 1.9) * smoothstep(0.05, -0.20, p.y) * 0.34;

    // 3. Subtle horizontal warm amber stage horizon streak fading cleanly left & right
    float horizonLine =
      exp(-pow((p.y - 0.04) * 10.0, 2.0)) * exp(-pow((p.x + 0.10) * 1.05, 2.0)) * 0.36;
    float wideFloorWash =
      exp(-pow((p.y + 0.16) * 2.4, 2.0)) * exp(-pow(p.x * 1.05, 2.0)) * 0.14;

    // 4. Soft dark grounding shadow directly beneath the bottom contact tip
    vec2 shadowPos = vec2((p.x + 0.06) / 0.28, (p.y - 0.02) / 0.08);
    float contactShadow = 1.0 - exp(-dot(shadowPos, shadowPos) * 4.2) * 0.56;

    // Seamless outer elliptical fade to zero alpha so no rectangular edge ever shows
    float edgeMask = smoothstep(0.98, 0.38, length(vec2(p.x * 0.96, p.y * 1.02)));

    vec3 deepOrange = vec3(0.88, 0.34, 0.01);
    vec3 bwiseOrange = vec3(0.96, 0.50, 0.03);
    vec3 hotGold = vec3(1.00, 0.78, 0.36);
    vec3 satinSilver = vec3(0.78, 0.78, 0.82);

    vec3 color = vec3(0.0);
    color += deepOrange * (orangeVertReflect + wideFloorWash * 0.9);
    color += bwiseOrange * (softRingHalo * ringFront + orangeMidReflect + horizonLine);
    color += hotGold * (crispRing * ringDir * ringFront * 0.98);
    color += satinSilver * silverVertReflect;
    color *= contactShadow;
    color = clamp(color, 0.0, 1.0);

    float alpha = clamp(
      (crispRing * 0.95 +
        softRingHalo * 0.62 +
        orangeVertReflect * 0.92 +
        orangeMidReflect * 0.72 +
        silverVertReflect * 0.75 +
        horizonLine * 0.85 +
        wideFloorWash) *
        edgeMask *
        uReveal,
      0.0,
      1.0
    );

    gl_FragColor = vec4(color, alpha);
  }
`;

export const BwiseSculptureWebGL: React.FC<BwiseSculptureWebGLProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 540;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    container.appendChild(renderer.domElement);

    const disposables: Array<{ dispose: () => void }> = [];

    const scene = new THREE.Scene();

    // Camera positioned for cinematic three-quarter perspective with generous margin around orbits
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 60);
    camera.position.set(0.14, 0.08, 7.95);
    camera.lookAt(0.06, -0.14, 0);

    // Smooth photographic studio environment map for silky brushed-silver reflections
    const studioEnv = buildSmoothStudioEnvironment(renderer);
    scene.environment = studioEnv;
    disposables.push(studioEnv);

    // Balanced studio lighting — cool silver key/rim + warm orange sculpting light on left plates
    const ambient = new THREE.AmbientLight('#FFFFFF', 0.22);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight('#FFFFFF', 1.85);
    keyLight.position.set(-3.2, 6.5, 6.2);
    scene.add(keyLight);

    const rightFillLight = new THREE.DirectionalLight('#EDEDEF', 1.55);
    rightFillLight.position.set(6.8, 2.4, 5.2);
    scene.add(rightFillLight);

    const rimLight = new THREE.DirectionalLight('#DADADA', 1.45);
    rimLight.position.set(3.2, 4.5, -6.8);
    scene.add(rimLight);

    // Sculpted warm orange key accent for the 3 left bee plates & lower warm edge
    const orangePlateKey = new THREE.PointLight('#FF8A14', 5.2, 7.5, 1.8);
    orangePlateKey.position.set(-2.3, 0.65, 2.65);
    scene.add(orangePlateKey);

    const orangeGroundBounce = new THREE.PointLight('#F5820B', 4.2, 9.5, 1.9);
    orangeGroundBounce.position.set(-0.9, -1.9, 1.9);
    scene.add(orangeGroundBounce);

    // Root stage group
    const stageGroup = new THREE.Group();
    stageGroup.position.set(0.06, 0.06, 0);
    scene.add(stageGroup);

    // Pivot group for the sculptural BWise B
    const sculptureGroup = new THREE.Group();
    const BASE_ROT_X = 0.035;
    const BASE_ROT_Y = -0.21;
    const BASE_ROT_Z = 0.01;
    sculptureGroup.rotation.set(BASE_ROT_X, BASE_ROT_Y, BASE_ROT_Z);
    stageGroup.add(sculptureGroup);

    // =========================================================================
    // 1. SATIN BRUSHED-SILVER SCULPTURAL "B" RIBBON
    // =========================================================================
    const brushedTex = createBrushedMetalTexture();
    disposables.push(brushedTex);

    const silverMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#EAEAEF'),
      metalness: 0.9,
      roughness: 0.31,
      roughnessMap: brushedTex,
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.3,
      clearcoatRoughness: 0.24,
      envMapIntensity: 1.28,
    });
    disposables.push(silverMaterial);

    // Upper B stem -> graceful arched top hood -> upper bowl tucking smoothly to central waist
    const upperRibbonGeo = buildSculptedRibbonGeometry(
      [
        { pos: [-0.96, 0.86, 0.24], width: 0.25, thickness: 0.14, roll: -0.18 },
        { pos: [-0.88, 1.44, 0.15], width: 0.4, thickness: 0.15, roll: -0.44 },
        { pos: [-0.18, 1.62, -0.05], width: 0.52, thickness: 0.15, roll: -0.72 },
        { pos: [0.62, 1.48, -0.17], width: 0.48, thickness: 0.15, roll: -0.58 },
        { pos: [1.02, 1.06, -0.13], width: 0.41, thickness: 0.14, roll: -0.28 },
        { pos: [0.76, 0.50, -0.06], width: 0.32, thickness: 0.14, roll: -0.14 },
        { pos: [0.02, 0.12, 0.06], width: 0.22, thickness: 0.13, roll: -0.06 },
      ],
      160
    );
    disposables.push(upperRibbonGeo);
    sculptureGroup.add(new THREE.Mesh(upperRibbonGeo, silverMaterial));

    // Lower B sweep: rises gracefully from waist -> wide dramatic lower belly -> razor-sleek tapered tip
    const lowerRibbonGeo = buildSculptedRibbonGeometry(
      [
        { pos: [-0.04, 0.04, 0.08], width: 0.21, thickness: 0.13, roll: 0.08 },
        { pos: [0.64, 0.24, 0.18], width: 0.39, thickness: 0.15, roll: 0.38 },
        { pos: [1.34, -0.06, 0.31], width: 0.5, thickness: 0.16, roll: 0.56 },
        { pos: [1.32, -0.60, 0.36], width: 0.49, thickness: 0.16, roll: 0.48 },
        { pos: [0.76, -1.00, 0.34], width: 0.42, thickness: 0.15, roll: 0.36 },
        { pos: [0.02, -1.18, 0.28], width: 0.3, thickness: 0.13, roll: 0.22 },
        { pos: [-0.58, -1.32, 0.22], width: 0.16, thickness: 0.1, roll: 0.1 },
        { pos: [-1.06, -1.48, 0.18], width: 0.035, thickness: 0.04, roll: 0.03 },
      ],
      180
    );
    disposables.push(lowerRibbonGeo);
    sculptureGroup.add(new THREE.Mesh(lowerRibbonGeo, silverMaterial));

    // =========================================================================
    // 2. THREE SCULPTED RICH BWISE ORANGE BEE-ABDOMEN PLATES
    //    Calibrated for rich saturated tangerine-amber shading under ACES tone mapping
    // =========================================================================
    const orangePlateMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ED7B00'),
      emissive: new THREE.Color('#8A3800'),
      emissiveIntensity: 0.34,
      metalness: 0.16,
      roughness: 0.25,
      clearcoat: 0.85,
      clearcoatRoughness: 0.14,
      envMapIntensity: 0.85,
    });
    disposables.push(orangePlateMat);

    // Plate 1 — Top curved wing/abdomen plate
    const plate1Shape = new THREE.Shape();
    plate1Shape.moveTo(-1.02, 0.76);
    plate1Shape.bezierCurveTo(-0.5, 0.62, -0.14, 0.2, -0.16, -0.26);
    plate1Shape.bezierCurveTo(-0.48, -0.02, -0.82, 0.18, -1.01, 0.35);
    plate1Shape.bezierCurveTo(-1.04, 0.5, -1.04, 0.64, -1.02, 0.76);
    const plate1Geo = buildCurvedOrangePlate(plate1Shape, 0.12);
    disposables.push(plate1Geo);
    sculptureGroup.add(new THREE.Mesh(plate1Geo, orangePlateMat));

    // Plate 2 — Middle curved diagonal plate
    const plate2Shape = new THREE.Shape();
    plate2Shape.moveTo(-1.01, 0.16);
    plate2Shape.bezierCurveTo(-0.74, 0.0, -0.44, -0.2, -0.24, -0.41);
    plate2Shape.bezierCurveTo(-0.28, -0.56, -0.35, -0.68, -0.43, -0.76);
    plate2Shape.bezierCurveTo(-0.65, -0.6, -0.84, -0.46, -1.0, -0.34);
    plate2Shape.bezierCurveTo(-1.03, -0.16, -1.03, 0.02, -1.01, 0.16);
    const plate2Geo = buildCurvedOrangePlate(plate2Shape, 0.12);
    disposables.push(plate2Geo);
    sculptureGroup.add(new THREE.Mesh(plate2Geo, orangePlateMat));

    // Plate 3 — Bottom pointed bee abdomen wedge
    const plate3Shape = new THREE.Shape();
    plate3Shape.moveTo(-1.0, -0.51);
    plate3Shape.bezierCurveTo(-0.82, -0.64, -0.64, -0.76, -0.51, -0.88);
    plate3Shape.bezierCurveTo(-0.67, -1.04, -0.85, -1.16, -1.03, -1.26);
    plate3Shape.bezierCurveTo(-1.03, -1.0, -1.01, -0.74, -1.0, -0.51);
    const plate3Geo = buildCurvedOrangePlate(plate3Shape, 0.11);
    disposables.push(plate3Geo);
    sculptureGroup.add(new THREE.Mesh(plate3Geo, orangePlateMat));

    // =========================================================================
    // 3. SATIN METALLIC SILVER BEE HEAD DOME + ANTENNA + GLOWING ORANGE ORB
    // =========================================================================
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E2E2E6'),
      metalness: 0.86,
      roughness: 0.28,
      clearcoat: 0.45,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.25,
    });
    disposables.push(domeMat);

    const beeHeadGeo = new THREE.SphereGeometry(0.33, 44, 34);
    disposables.push(beeHeadGeo);
    const beeHeadMesh = new THREE.Mesh(beeHeadGeo, domeMat);
    beeHeadMesh.position.set(-0.21, 0.34, 0.05);
    beeHeadMesh.scale.set(0.95, 1.0, 0.88);
    sculptureGroup.add(beeHeadMesh);

    const antennaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.15, 0.63, 0.08),
      new THREE.Vector3(-0.08, 0.79, 0.11),
      new THREE.Vector3(-0.02, 0.92, 0.14),
    ]);
    const antennaStemGeo = new THREE.TubeGeometry(antennaCurve, 18, 0.01, 8, false);
    disposables.push(antennaStemGeo);
    sculptureGroup.add(new THREE.Mesh(antennaStemGeo, domeMat));

    const antennaTipGeo = new THREE.SphereGeometry(0.065, 24, 24);
    const antennaTipMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#EA580C'),
      emissive: new THREE.Color('#F59E0B'),
      emissiveIntensity: 1.15,
      roughness: 0.16,
      metalness: 0.1,
      clearcoat: 1.0,
    });
    disposables.push(antennaTipGeo, antennaTipMat);
    const antennaTipMesh = new THREE.Mesh(antennaTipGeo, antennaTipMat);
    antennaTipMesh.position.set(-0.02, 0.93, 0.14);
    sculptureGroup.add(antennaTipMesh);

    const sparkTexture = createSparkTexture();
    disposables.push(sparkTexture);

    const antennaGlowMat = new THREE.SpriteMaterial({
      map: sparkTexture,
      color: new THREE.Color('#FF9119'),
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(antennaGlowMat);
    const antennaGlowSprite = new THREE.Sprite(antennaGlowMat);
    antennaGlowSprite.position.set(-0.02, 0.93, 0.14);
    antennaGlowSprite.scale.set(0.4, 0.4, 1);
    sculptureGroup.add(antennaGlowSprite);

    // =========================================================================
    // 4. THIN GLOWING BWISE ORANGE ELLIPTICAL ORBITAL TRAILS
    // =========================================================================
    const orbitUniformSets: Array<{
      uTime: { value: number };
      uReveal: { value: number };
    }> = [];

    const orbitConfigs = [
      {
        // Primary bold diagonal fiery orange ellipse wrapping sculpture
        rx: 2.26,
        ry: 0.86,
        rotX: 0.34,
        rotY: -0.22,
        rotZ: 0.58,
        offset: [0.08, 0.08, 0.05] as [number, number, number],
        coreRadius: 0.011,
        haloRadius: 0.048,
        speed: 0.11,
        phase: 0.14,
        baseAlpha: 0.28,
        peakBoost: 1.45,
      },
      {
        // Wider airy upper-right thin ellipse
        rx: 2.64,
        ry: 1.08,
        rotX: 0.46,
        rotY: 0.16,
        rotZ: 0.5,
        offset: [0.14, 0.2, -0.14] as [number, number, number],
        coreRadius: 0.0072,
        haloRadius: 0.032,
        speed: -0.075,
        phase: 0.64,
        baseAlpha: 0.18,
        peakBoost: 1.12,
      },
      {
        // Lower subtle cross-orbit sweeping around the lower B curve
        rx: 2.02,
        ry: 0.64,
        rotX: 0.56,
        rotY: -0.14,
        rotZ: -0.34,
        offset: [0.04, -0.24, 0.16] as [number, number, number],
        coreRadius: 0.0082,
        haloRadius: 0.036,
        speed: 0.09,
        phase: 0.38,
        baseAlpha: 0.2,
        peakBoost: 1.2,
      },
    ];

    const orbitGroup = new THREE.Group();
    stageGroup.add(orbitGroup);

    for (const cfg of orbitConfigs) {
      const curve = buildEllipticalOrbitCurve(
        cfg.rx,
        cfg.ry,
        cfg.rotX,
        cfg.rotY,
        cfg.rotZ,
        cfg.offset
      );

      const coreGeo = new THREE.TubeGeometry(curve, 180, cfg.coreRadius, 8, true);
      const coreUniforms = {
        uTime: { value: 0 },
        uSpeed: { value: cfg.speed },
        uPhase: { value: cfg.phase },
        uReveal: { value: 1 },
        uBaseAlpha: { value: cfg.baseAlpha },
        uPeakBoost: { value: cfg.peakBoost },
        uIsHalo: { value: 0.0 },
      };
      const coreMat = new THREE.ShaderMaterial({
        vertexShader: ORBIT_VERTEX_SHADER,
        fragmentShader: ORBIT_FRAGMENT_SHADER,
        uniforms: coreUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      disposables.push(coreGeo, coreMat);
      orbitGroup.add(new THREE.Mesh(coreGeo, coreMat));
      orbitUniformSets.push(coreUniforms);

      const haloGeo = new THREE.TubeGeometry(curve, 160, cfg.haloRadius, 8, true);
      const haloUniforms = {
        uTime: { value: 0 },
        uSpeed: { value: cfg.speed },
        uPhase: { value: cfg.phase },
        uReveal: { value: 1 },
        uBaseAlpha: { value: cfg.baseAlpha * 0.45 },
        uPeakBoost: { value: cfg.peakBoost },
        uIsHalo: { value: 1.0 },
      };
      const haloMat = new THREE.ShaderMaterial({
        vertexShader: ORBIT_VERTEX_SHADER,
        fragmentShader: ORBIT_FRAGMENT_SHADER,
        uniforms: haloUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      disposables.push(haloGeo, haloMat);
      orbitGroup.add(new THREE.Mesh(haloGeo, haloMat));
      orbitUniformSets.push(haloUniforms);
    }

    // =========================================================================
    // 5. GLOSSY DARK OBSIDIAN FLOOR + VERTICAL REFLECTIONS + GLOWING ORANGE RING
    // =========================================================================
    const floorUniforms = {
      uTime: { value: 0 },
      uReveal: { value: 1 },
    };
    const floorGeo = new THREE.PlaneGeometry(9.6, 5.8);
    const floorMat = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERTEX_SHADER,
      fragmentShader: FLOOR_FRAGMENT_SHADER,
      uniforms: floorUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(floorGeo, floorMat);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI * 0.43;
    floorMesh.position.set(0.06, -1.68, 0.12);
    stageGroup.add(floorMesh);

    // =========================================================================
    // 6. LOW-DENSITY DRIFTING ORANGE MICRO-PARTICLES
    // =========================================================================
    const PARTICLE_COUNT = 40;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleBase = Array.from({ length: PARTICLE_COUNT }, (_, idx) => {
      const angle = idx * 2.39996;
      const radius = 1.2 + ((idx * 17) % 19) * 0.085;
      const y = ((idx % 13) / 12 - 0.46) * 3.0;
      const z = Math.sin(angle * 1.4) * 1.1;
      const x = Math.cos(angle) * radius;
      particlePositions[idx * 3] = x;
      particlePositions[idx * 3 + 1] = y;
      particlePositions[idx * 3 + 2] = z;
      return {
        x,
        y,
        z,
        speed: 0.13 + (idx % 5) * 0.04,
        phase: idx * 0.77,
        drift: 0.07 + (idx % 4) * 0.03,
      };
    });

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      map: sparkTexture,
      color: new THREE.Color('#FF961F'),
      size: 0.1,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    disposables.push(particleGeo, particleMat);
    stageGroup.add(new THREE.Points(particleGeo, particleMat));

    // =========================================================================
    // 7. GENTLE DESKTOP POINTER INTERACTION (Max ~6 deg tilt, smooth damping)
    // =========================================================================
    let targetTiltX = 0;
    let targetTiltY = 0;
    let smoothTiltX = 0;
    let smoothTiltY = 0;

    const MAX_YAW_RAD = THREE.MathUtils.degToRad(6.0);
    const MAX_PITCH_RAD = THREE.MathUtils.degToRad(4.2);

    const onPointerMove = (e: PointerEvent) => {
      if (!isFinePointer || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1.2, 1.2);
      const ny = THREE.MathUtils.clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1.2, 1.2);
      targetTiltY = nx * MAX_YAW_RAD;
      targetTiltX = ny * MAX_PITCH_RAD;
    };

    const onPointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    renderer.domElement.style.touchAction = 'pan-y';

    if (isFinePointer && !prefersReducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    // =========================================================================
    // 8. RESPONSIVE RESIZE (Never clips outer rings & re-renders immediately)
    // =========================================================================
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      const aspect = w / h;
      camera.aspect = aspect;

      // Ensure full horizontal orbital span fits with generous breathing margin on every viewport
      const targetHalfWidth = 3.15;
      const vFovRad = THREE.MathUtils.degToRad(camera.fov);
      const minZForWidth = targetHalfWidth / (Math.tan(vFovRad / 2) * Math.max(aspect, 0.55));
      camera.position.z = Math.max(8.05, minZForWidth);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.04 }
    );
    intersectionObserver.observe(container);

    // =========================================================================
    // 9. ANIMATION LOOP (Immediate visible render + smooth continuous motion)
    // =========================================================================
    let animId = 0;
    const clock = new THREE.Clock();
    let elapsed = 0;

    renderer.render(scene, camera);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      smoothTiltX += (targetTiltX - smoothTiltX) * Math.min(1, dt * 4.5);
      smoothTiltY += (targetTiltY - smoothTiltY) * Math.min(1, dt * 4.5);

      sculptureGroup.position.y = Math.sin(elapsed * 0.85) * 0.042;
      sculptureGroup.rotation.x = BASE_ROT_X + smoothTiltX + Math.cos(elapsed * 0.65) * 0.013;
      sculptureGroup.rotation.y = BASE_ROT_Y + smoothTiltY + Math.sin(elapsed * 0.52) * 0.03;
      sculptureGroup.rotation.z = BASE_ROT_Z + Math.sin(elapsed * 0.45) * 0.007;

      orbitGroup.rotation.y = smoothTiltY * 0.45 + Math.sin(elapsed * 0.35) * 0.028;
      orbitGroup.rotation.x = smoothTiltX * 0.35;

      for (const u of orbitUniformSets) {
        u.uTime.value = elapsed;
        u.uReveal.value = 1;
      }

      floorUniforms.uTime.value = elapsed;
      floorUniforms.uReveal.value = 1;

      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const b = particleBase[i];
        const a = elapsed * b.speed + b.phase;
        posAttr.setXYZ(
          i,
          b.x + Math.cos(a) * b.drift,
          b.y + Math.sin(a * 0.85) * b.drift * 1.15,
          b.z + Math.sin(a * 0.6) * b.drift
        );
      }
      posAttr.needsUpdate = true;

      antennaGlowMat.opacity = 0.56 + Math.sin(elapsed * 2.1) * 0.14;

      renderer.render(scene, camera);
    };

    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (isFinePointer && !prefersReducedMotion) {
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerleave', onPointerLeave);
      }
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        role="img"
        aria-label="Metallic silver and orange BWise B sculpture"
      >
        <svg viewBox="0 0 360 360" className="w-64 h-64 sm:w-80 sm:h-80" aria-hidden="true">
          <defs>
            <linearGradient id="bwiseSilverFallback" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="48%" stopColor="#DADADA" />
              <stop offset="100%" stopColor="#404040" />
            </linearGradient>
            <linearGradient id="bwiseOrangeFallback" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9D1A" />
              <stop offset="55%" stopColor="#EA6A00" />
              <stop offset="100%" stopColor="#9A3408" />
            </linearGradient>
          </defs>
          <ellipse
            cx="180"
            cy="185"
            rx="145"
            ry="56"
            transform="rotate(-28 180 185)"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path
            d="M118 112 L118 72 L198 72 C248 72 268 102 254 138 C244 164 218 176 196 180 C252 184 282 220 264 264 C248 302 198 306 106 308 C176 286 226 276 232 246 C238 214 206 196 172 194 C206 172 224 152 222 126 C220 100 194 94 142 94 L142 126 Z"
            fill="url(#bwiseSilverFallback)"
          />
          <path
            d="M104 128 C146 144 176 176 174 212 C148 194 122 178 104 162 Z"
            fill="url(#bwiseOrangeFallback)"
          />
          <path
            d="M104 176 C132 194 156 212 168 232 L154 258 C134 242 118 228 104 216 Z"
            fill="url(#bwiseOrangeFallback)"
          />
          <path d="M104 232 L144 266 L104 294 Z" fill="url(#bwiseOrangeFallback)" />
          <circle cx="170" cy="160" r="24" fill="url(#bwiseSilverFallback)" />
          <circle cx="182" cy="116" r="5" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      role="img"
      aria-label="Interactive 3D metallic silver and orange BWise B sculpture surrounded by animated orange light trails"
    />
  );
};
