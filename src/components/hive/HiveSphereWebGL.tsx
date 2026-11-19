import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HiveSphereWebGLProps {
  className?: string;
}

interface DualCell {
  center: THREE.Vector3;
  vertices: THREE.Vector3[];
}

/**
 * Computes the dual Goldberg polyhedron (12 pentagons + 30 hexagons for detail=1)
 * from a subdivided icosahedron so every cell forms a genuine honeycomb facet on a sphere.
 */
function buildGoldbergCells(detail: number): { cells: DualCell[]; uniqueCorners: THREE.Vector3[] } {
  const ico = new THREE.IcosahedronGeometry(1, detail);
  const posAttr = ico.getAttribute('position');

  const uniqueVerts: THREE.Vector3[] = [];
  const vertMap = new Map<string, number>();

  const getVertIndex = (x: number, y: number, z: number): number => {
    const key = `${Math.round(x * 1000)},${Math.round(y * 1000)},${Math.round(z * 1000)}`;
    const existing = vertMap.get(key);
    if (existing !== undefined) return existing;
    const idx = uniqueVerts.length;
    uniqueVerts.push(new THREE.Vector3(x, y, z).normalize());
    vertMap.set(key, idx);
    return idx;
  };

  const faceCentroids: THREE.Vector3[] = [];
  const adjFaces: number[][] = [];

  for (let i = 0; i < posAttr.count; i += 3) {
    const i0 = getVertIndex(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
    const i1 = getVertIndex(posAttr.getX(i + 1), posAttr.getY(i + 1), posAttr.getZ(i + 1));
    const i2 = getVertIndex(posAttr.getX(i + 2), posAttr.getY(i + 2), posAttr.getZ(i + 2));

    const faceIdx = faceCentroids.length;
    const centroid = new THREE.Vector3()
      .add(uniqueVerts[i0])
      .add(uniqueVerts[i1])
      .add(uniqueVerts[i2])
      .divideScalar(3)
      .normalize();
    faceCentroids.push(centroid);

    for (const vIdx of [i0, i1, i2]) {
      if (!adjFaces[vIdx]) adjFaces[vIdx] = [];
      adjFaces[vIdx].push(faceIdx);
    }
  }

  ico.dispose();

  const cells: DualCell[] = [];
  const cornerMap = new Map<string, THREE.Vector3>();

  for (let vIdx = 0; vIdx < uniqueVerts.length; vIdx++) {
    const normal = uniqueVerts[vIdx];
    const faces = adjFaces[vIdx] || [];
    if (faces.length < 3) continue;

    // Construct an orthonormal basis on the tangent plane at `normal`
    const refAxis = Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const tangentU = new THREE.Vector3().crossVectors(refAxis, normal).normalize();
    const tangentV = new THREE.Vector3().crossVectors(normal, tangentU).normalize();

    const sortedCorners = faces
      .map((fIdx) => {
        const c = faceCentroids[fIdx];
        const rel = c.clone().sub(normal);
        const angle = Math.atan2(rel.dot(tangentV), rel.dot(tangentU));
        return { c, angle };
      })
      .sort((a, b) => a.angle - b.angle)
      .map((item) => item.c);

    for (const corner of sortedCorners) {
      const cKey = `${Math.round(corner.x * 1000)},${Math.round(corner.y * 1000)},${Math.round(corner.z * 1000)}`;
      if (!cornerMap.has(cKey)) cornerMap.set(cKey, corner);
    }

    cells.push({
      center: normal,
      vertices: sortedCorners,
    });
  }

  return { cells, uniqueCorners: Array.from(cornerMap.values()) };
}

/** Creates a soft radial golden bloom texture for additive particle sprites. */
function createGlowSpriteTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, 'rgba(255, 252, 235, 1)');
  grad.addColorStop(0.22, 'rgba(255, 214, 102, 0.92)');
  grad.addColorStop(0.55, 'rgba(245, 158, 11, 0.32)');
  grad.addColorStop(1, 'rgba(234, 88, 12, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Creates a luminous miniature cyber-bee drone texture with glowing wings. */
function createCyberBeeTexture(): THREE.CanvasTexture {
  const size = 96;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const cx = size / 2;
  const cy = size / 2;

  // Ambient aura halo
  const aura = ctx.createRadialGradient(cx, cy, 4, cx, cy, 44);
  aura.addColorStop(0, 'rgba(255, 244, 200, 0.85)');
  aura.addColorStop(0.35, 'rgba(251, 191, 36, 0.45)');
  aura.addColorStop(1, 'rgba(234, 88, 12, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, size, size);

  // Translucent fluttering wings
  ctx.save();
  ctx.fillStyle = 'rgba(255, 248, 220, 0.78)';
  ctx.beginPath();
  ctx.ellipse(cx - 11, cy - 10, 14, 7, -0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + 11, cy - 10, 14, 7, 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Golden glowing body
  ctx.save();
  const bodyGrad = ctx.createLinearGradient(cx, cy - 8, cx, cy + 14);
  bodyGrad.addColorStop(0, '#FFFBEB');
  bodyGrad.addColorStop(0.45, '#FBBF24');
  bodyGrad.addColorStop(1, '#EA580C');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 2, 7.5, 11.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cyber stripes
  ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
  ctx.fillRect(cx - 6.5, cy - 1, 13, 2.5);
  ctx.fillRect(cx - 5.5, cy + 4.5, 11, 2.5);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export const HiveSphereWebGL: React.FC<HiveSphereWebGLProps> = ({ className = '' }) => {
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
    renderer.setSize(container.clientWidth || 500, container.clientHeight || 500);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      (container.clientWidth || 500) / (container.clientHeight || 500),
      0.1,
      100
    );
    camera.position.set(0, 0, 8.2);

    const hiveGroup = new THREE.Group();
    scene.add(hiveGroup);

    const disposables: { dispose: () => void }[] = [];
    const glowTex = createGlowSpriteTexture();
    const beeTex = createCyberBeeTexture();
    disposables.push(glowTex, beeTex);

    // -------------------------------------------------------------------------
    // 1. Dark Atmospheric Inner Core (gives back-side depth separation)
    // -------------------------------------------------------------------------
    const coreGeo = new THREE.SphereGeometry(1.42, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x060a14,
      transparent: true,
      opacity: 0.76,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    hiveGroup.add(coreMesh);
    disposables.push(coreGeo, coreMat);

    // Inner ambient warm glow halo sprite
    const haloMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const haloSprite = new THREE.Sprite(haloMat);
    haloSprite.scale.set(5.4, 5.4, 1);
    hiveGroup.add(haloSprite);
    disposables.push(haloMat);

    // -------------------------------------------------------------------------
    // 2. Geodesic Goldberg Honeycomb Mesh (Outer + Inner Bevel + Particle Dust)
    // -------------------------------------------------------------------------
    const { cells, uniqueCorners } = buildGoldbergCells(1);
    const OUTER_R = 2.02;
    const BEVEL_R = 1.98;
    const INNER_LATTICE_R = 1.62;

    const outerLinePositions: number[] = [];
    const bevelLinePositions: number[] = [];
    const innerLinePositions: number[] = [];
    const edgeSparkPositions: number[] = [];
    const edgeSparkColors: number[] = [];

    const colGoldBright = new THREE.Color('#FFF3C4');
    const colAmber = new THREE.Color('#F59E0B');
    const colOrange = new THREE.Color('#EA580C');

    for (const cell of cells) {
      const verts = cell.vertices;
      const n = verts.length;

      for (let i = 0; i < n; i++) {
        const a = verts[i];
        const b = verts[(i + 1) % n];

        // Outer honeycomb edge
        const oa = a.clone().multiplyScalar(OUTER_R);
        const ob = b.clone().multiplyScalar(OUTER_R);
        outerLinePositions.push(oa.x, oa.y, oa.z, ob.x, ob.y, ob.z);

        // Inner beveled ring inside each hexagon (gives double-walled luminous frame)
        const ba = a.clone().lerp(cell.center, 0.16).normalize().multiplyScalar(BEVEL_R);
        const bb = b.clone().lerp(cell.center, 0.16).normalize().multiplyScalar(BEVEL_R);
        bevelLinePositions.push(ba.x, ba.y, ba.z, bb.x, bb.y, bb.z);

        // Deeper interior wireframe lattice
        const ia = a.clone().multiplyScalar(INNER_LATTICE_R);
        const ib = b.clone().multiplyScalar(INNER_LATTICE_R);
        innerLinePositions.push(ia.x, ia.y, ia.z, ib.x, ib.y, ib.z);

        // Sample glowing golden spark particles densely along each honeycomb edge
        const samples = 11;
        for (let s = 0; s < samples; s++) {
          const t = (s + Math.random() * 0.65) / samples;
          const pt = oa.clone().lerp(ob, t);
          // Subtle jitter for organic fiery energy look
          pt.x += (Math.random() - 0.5) * 0.055;
          pt.y += (Math.random() - 0.5) * 0.055;
          pt.z += (Math.random() - 0.5) * 0.055;
          edgeSparkPositions.push(pt.x, pt.y, pt.z);

          const mixCol = Math.random() > 0.65 ? colGoldBright : Math.random() > 0.35 ? colAmber : colOrange;
          edgeSparkColors.push(mixCol.r, mixCol.g, mixCol.b);
        }
      }
    }

    const outerGeo = new THREE.BufferGeometry();
    outerGeo.setAttribute('position', new THREE.Float32BufferAttribute(outerLinePositions, 3));
    const outerMat = new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    hiveGroup.add(new THREE.LineSegments(outerGeo, outerMat));
    disposables.push(outerGeo, outerMat);

    const bevelGeo = new THREE.BufferGeometry();
    bevelGeo.setAttribute('position', new THREE.Float32BufferAttribute(bevelLinePositions, 3));
    const bevelMat = new THREE.LineBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    hiveGroup.add(new THREE.LineSegments(bevelGeo, bevelMat));
    disposables.push(bevelGeo, bevelMat);

    const innerGeo = new THREE.BufferGeometry();
    innerGeo.setAttribute('position', new THREE.Float32BufferAttribute(innerLinePositions, 3));
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const innerLattice = new THREE.LineSegments(innerGeo, innerMat);
    innerLattice.rotation.set(0.35, 0.55, 0.12);
    hiveGroup.add(innerLattice);
    disposables.push(innerGeo, innerMat);

    // Dense glowing edge dust
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgeSparkPositions, 3));
    sparkGeo.setAttribute('color', new THREE.Float32BufferAttribute(edgeSparkColors, 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 0.13,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    hiveGroup.add(new THREE.Points(sparkGeo, sparkMat));
    disposables.push(sparkGeo, sparkMat);

    // Bright luminous junction nodes at every honeycomb corner
    const nodePositions: number[] = [];
    for (const corner of uniqueCorners) {
      const p = corner.clone().multiplyScalar(OUTER_R);
      nodePositions.push(p.x, p.y, p.z);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.28,
      map: glowTex,
      color: 0xfff7d6,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    hiveGroup.add(new THREE.Points(nodeGeo, nodeMat));
    disposables.push(nodeGeo, nodeMat);

    // -------------------------------------------------------------------------
    // 3. Swirling 3D Orbital Trails & Luminous Cyber-Bee Swarm
    // -------------------------------------------------------------------------
    interface OrbitingBee {
      sprite: THREE.Sprite;
      trailGeo: THREE.BufferGeometry;
      trailPositions: Float32Array;
      radiusX: number;
      radiusZ: number;
      tiltX: number;
      tiltZ: number;
      speed: number;
      phase: number;
      bobAmp: number;
    }

    const TRAIL_LEN = 26;
    const bees: OrbitingBee[] = [];
    const beeConfigs = [
      { rx: 2.48, rz: 2.28, tx: 0.42, tz: 0.28, spd: 0.55, ph: 0.2 },
      { rx: 2.68, rz: 2.35, tx: -0.58, tz: 0.35, spd: -0.48, ph: 1.5 },
      { rx: 2.42, rz: 2.65, tx: 0.88, tz: -0.42, spd: 0.62, ph: 2.8 },
      { rx: 2.75, rz: 2.45, tx: -0.22, tz: -0.78, spd: 0.44, ph: 4.1 },
      { rx: 2.52, rz: 2.52, tx: 1.15, tz: 0.18, spd: -0.58, ph: 5.2 },
      { rx: 2.86, rz: 2.32, tx: -0.92, tz: -0.25, spd: 0.51, ph: 0.9 },
      { rx: 2.38, rz: 2.78, tx: 0.18, tz: 0.95, spd: -0.46, ph: 3.4 },
      { rx: 2.62, rz: 2.62, tx: -0.45, tz: 0.62, spd: 0.64, ph: 2.1 },
      { rx: 2.92, rz: 2.48, tx: 0.62, tz: -0.68, spd: -0.41, ph: 4.9 },
    ];

    const evalOrbit = (
      cfg: { radiusX: number; radiusZ: number; tiltX: number; tiltZ: number; bobAmp: number },
      angle: number,
      target: THREE.Vector3
    ) => {
      const x0 = Math.cos(angle) * cfg.radiusX;
      const y0 = Math.sin(angle * 2) * cfg.bobAmp;
      const z0 = Math.sin(angle) * cfg.radiusZ;
      target.set(x0, y0, z0);
      target.applyAxisAngle(new THREE.Vector3(1, 0, 0), cfg.tiltX);
      target.applyAxisAngle(new THREE.Vector3(0, 0, 1), cfg.tiltZ);
      return target;
    };

    const orbitRingMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(orbitRingMat);

    const beeSpriteMat = new THREE.SpriteMaterial({
      map: beeTex,
      transparent: true,
      opacity: 0.96,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beeSpriteMat);

    const trailMat = new THREE.PointsMaterial({
      size: 0.11,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(trailMat);

    const tmpPt = new THREE.Vector3();
    for (let idx = 0; idx < beeConfigs.length; idx++) {
      const c = beeConfigs[idx];
      const orbitSpec = {
        radiusX: c.rx,
        radiusZ: c.rz,
        tiltX: c.tx,
        tiltZ: c.tz,
        bobAmp: 0.14 + (idx % 3) * 0.04,
      };

      // Faint orbital wireframe guide ring for first 5 orbits
      if (idx < 5) {
        const ringPts: number[] = [];
        const segs = 72;
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2;
          evalOrbit(orbitSpec, a, tmpPt);
          ringPts.push(tmpPt.x, tmpPt.y, tmpPt.z);
        }
        const ringGeo = new THREE.BufferGeometry();
        ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(ringPts, 3));
        hiveGroup.add(new THREE.Line(ringGeo, orbitRingMat));
        disposables.push(ringGeo);
      }

      // Bee sprite
      const sprite = new THREE.Sprite(beeSpriteMat);
      const scale = 0.28 + (idx % 3) * 0.05;
      sprite.scale.set(scale, scale, 1);
      hiveGroup.add(sprite);

      // Trailing spark wake
      const trailPositions = new Float32Array(TRAIL_LEN * 3);
      const trailColors = new Float32Array(TRAIL_LEN * 3);
      for (let t = 0; t < TRAIL_LEN; t++) {
        const fade = 1 - t / TRAIL_LEN;
        const col = colGoldBright.clone().lerp(colOrange, 1 - fade);
        trailColors[t * 3] = col.r * fade;
        trailColors[t * 3 + 1] = col.g * fade;
        trailColors[t * 3 + 2] = col.b * fade;
      }
      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
      hiveGroup.add(new THREE.Points(trailGeo, trailMat));
      disposables.push(trailGeo);

      bees.push({
        sprite,
        trailGeo,
        trailPositions,
        ...orbitSpec,
        speed: c.spd,
        phase: c.ph,
      });
    }

    // -------------------------------------------------------------------------
    // 4. Ambient Floating Golden Space Particles
    // -------------------------------------------------------------------------
    const ambientCount = 260;
    const ambientPos = new Float32Array(ambientCount * 3);
    const ambientCol = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount; i++) {
      const r = 2.15 + Math.random() * 1.95;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      ambientPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      ambientPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      ambientPos[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() > 0.5 ? colAmber : colGoldBright;
      ambientCol[i * 3] = c.r;
      ambientCol[i * 3 + 1] = c.g;
      ambientCol[i * 3 + 2] = c.b;
    }
    const ambientGeo = new THREE.BufferGeometry();
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    ambientGeo.setAttribute('color', new THREE.BufferAttribute(ambientCol, 3));
    const ambientMat = new THREE.PointsMaterial({
      size: 0.085,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ambientField = new THREE.Points(ambientGeo, ambientMat);
    hiveGroup.add(ambientField);
    disposables.push(ambientGeo, ambientMat);

    // -------------------------------------------------------------------------
    // 5. Smooth Pointer Parallax & Drag-to-Rotate Controls
    // -------------------------------------------------------------------------
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let dragVelX = 0;
    let dragVelY = 0;
    let hoverTargetX = 0;
    let hoverTargetY = 0;
    let smoothHoverX = 0;
    let smoothHoverY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      hoverTargetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.45;
      hoverTargetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35;

      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        dragVelY = dx * 0.006;
        dragVelX = dy * 0.006;
        hiveGroup.rotation.y += dragVelY;
        hiveGroup.rotation.x += dragVelX;
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

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause when offscreen
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Animation loop
    let animId = 0;
    const clock = new THREE.Clock();
    let elapsed = 0;

    const updateBees = (t: number) => {
      for (const bee of bees) {
        const currentAngle = bee.phase + t * bee.speed;
        evalOrbit(bee, currentAngle, tmpPt);
        bee.sprite.position.copy(tmpPt);

        // Update trailing particle wake along recent orbital positions
        const step = bee.speed >= 0 ? -0.055 : 0.055;
        for (let k = 0; k < TRAIL_LEN; k++) {
          evalOrbit(bee, currentAngle + step * (k + 1), tmpPt);
          bee.trailPositions[k * 3] = tmpPt.x;
          bee.trailPositions[k * 3 + 1] = tmpPt.y;
          bee.trailPositions[k * 3 + 2] = tmpPt.z;
        }
        bee.trailGeo.attributes.position.needsUpdate = true;
      }
    };

    // Render initial pose immediately
    hiveGroup.rotation.set(0.22, -0.35, 0.06);
    updateBees(0);
    renderer.render(scene, camera);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      if (!isDragging) {
        hiveGroup.rotation.y += 0.14 * dt + dragVelY;
        hiveGroup.rotation.x += dragVelX;
        dragVelX *= 0.92;
        dragVelY *= 0.92;
      }

      // Smooth pointer tilt
      smoothHoverX += (hoverTargetX - smoothHoverX) * 0.05;
      smoothHoverY += (hoverTargetY - smoothHoverY) * 0.05;
      camera.position.x = smoothHoverX * 0.9;
      camera.position.y = -smoothHoverY * 0.7;
      camera.lookAt(0, 0, 0);

      // Counter-rotate interior lattice & ambient field for mesmerizing depth
      innerLattice.rotation.y -= 0.09 * dt;
      ambientField.rotation.y += 0.045 * dt;
      nodeMat.opacity = 0.82 + Math.sin(elapsed * 2.4) * 0.15;

      updateBees(elapsed);
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
        aria-label="The Intelligent Hive 3D Mesh Visual"
      >
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-amber-400/50 bg-[radial-gradient(circle,rgba(245,158,11,0.35)_0%,rgba(10,16,32,0.85)_70%)] shadow-[0_0_80px_rgba(245,158,11,0.35)] animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D Intelligent Hive WebGL Honeycomb Sphere"
    />
  );
};
