/**
 * DentalCanvas3D.jsx — Hyper-realistic procedural molar (vanilla Three.js).
 *
 * MODEL — anatomically-styled mandibular molar built in code:
 *   • Crown: unit sphere (120×90) deformed per-vertex — five cusps raised
 *     around the occlusal rim, central/transverse fissure grooves carved
 *     into the occlusal table, cervical taper, micro enamel relief noise
 *   • Roots: two ribbon-flattened, distally-curved tapered roots sharing the
 *     same physical material for a seamless fused anatomy
 *   • Vertex-color baking delivers natural enamel variation — whiter
 *     translucent cusp tips, warmer cervical dentin tones, softly shadowed
 *     fissures (cheap fake-AO, no post-processing passes)
 *
 * MATERIAL — realistic enamel: MeshPhysicalMaterial, warm porcelain base,
 *   clearcoat 0.55, roughness 0.26, ivory sheen (fake-SSS warmth), ACES 0.92
 *   exposure so nothing blows out against the porcelain page background.
 *
 * LIGHTING — soft studio rig: hemisphere ambient, warm key light, cool fill,
 *   mint rim + PMREM RoomEnvironment reflections + contact-shadow blob.
 *
 * MOTION — slow 0.18 rad/s rotation, gentle float, elegant orbital rings of
 *   mint/aqua micro-spheres, pointer parallax, GSAP ScrollTrigger scroll scrub.
 *
 * PERFORMANCE (mid-range Android safe):
 *   ~13k vertices total, ONE shared physical material, no post FX stack,
 *   DPR capped at 1.5, IntersectionObserver + visibilitychange RAF pausing,
 *   full disposal on unmount, claymorphic CSS fallback for no-WebGL or
 *   prefers-reduced-motion users.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, ShieldCheck, Sparkles } from "lucide-react";
import { ToothMark } from "../layout/PageTransitionWrapper";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Claymorphic CSS fallback — WebGL unavailable / reduced motion        */
/* ------------------------------------------------------------------ */
function ClayToothFallback() {
  return (
    <div
      className="relative w-full h-full grid place-items-center"
      role="img"
      aria-label="Stylized ceramic tooth protected by an enamel shield — decorative illustration"
    >
      <div className="absolute w-[78%] aspect-square rounded-full border border-teal-200/70" />
      <div className="absolute w-[96%] aspect-square rounded-full border border-sky-200/50 rotate-12" />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="animate-orbit absolute w-3.5 h-3.5 rounded-full"
          style={{
            "--orbit-r": `${8 + (i % 3) * 1.6}rem`,
            animationDuration: `${9 + i * 2.4}s`,
            animationDelay: `${-i * 2.1}s`,
            background: i % 2 ? "#99F6E4" : "#BAE6FD",
            boxShadow:
              "inset -2px -3px 5px rgba(13,148,136,0.35), inset 2px 3px 5px rgba(255,255,255,0.9), 0 6px 12px -4px rgba(13,148,136,0.4)",
          }}
        />
      ))}

      <div className="clay-lg w-40 h-40 sm:w-48 sm:h-48 rounded-[42%] grid place-items-center animate-float">
        <ToothMark className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_10px_18px_rgba(13,148,136,0.3)]" />
      </div>

      <div className="absolute top-[14%] left-[6%] glass rounded-2xl px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-teal-800 animate-float-slow">
        <ShieldCheck size={14} className="text-teal-600" /> Enamel Shield
      </div>
      <div
        className="absolute bottom-[16%] right-[4%] glass rounded-2xl px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-sky-800 animate-float"
        style={{ animationDelay: "1.4s" }}
      >
        <Sparkles size={14} className="text-sky-600" /> Gentle Polish
      </div>
      <div className="absolute top-[52%] right-[10%] clay-sm w-9 h-9 rounded-xl grid place-items-center text-teal-600 animate-float-slow" style={{ animationDelay: "0.8s" }}>
        <Plus size={16} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Procedural anatomy builders                                          */
/* ------------------------------------------------------------------ */

/**
 * Five-cusp molar crown: deformed unit sphere with baked vertex colours.
 * Returns { geometry } ready for the shared enamel material.
 */
function buildMolarCrown() {
  const geo = new THREE.SphereGeometry(1, 120, 90);
  const pos = geo.attributes.position;

  const colors = new Float32Array(pos.count * 3);
  const BASE = new THREE.Color(0xf7f2ea); // warm porcelain enamel
  const TIP = new THREE.Color(0xfffdf7); // whiter translucent cusp tips
  const GROOVE = new THREE.Color(0xe6ddc8); // shadowed fissure tint (fake AO)
  const CERVICAL = new THREE.Color(0xecdfc6); // warmer dentin near the neck

  /* Five-cusp pattern (mandibular first molar) with angular gaussians */
  const CUSPS = [
    { a: Math.PI * 0.25, h: 0.108 },
    { a: Math.PI * 0.75, h: 0.095 },
    { a: Math.PI * 1.25, h: 0.1 },
    { a: Math.PI * 1.75, h: 0.09 },
    { a: Math.PI * 0.02, h: 0.052 }, // small distal fifth cusp
  ];

  const v = new THREE.Vector3();
  const col = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i); // unit sphere → |v| === 1
    const polar = Math.acos(THREE.MathUtils.clamp(v.y, -1, 1)); // 0 = occlusal top
    const az = Math.atan2(v.z, v.x);

    let disp = 0;
    let cuspFactor = 0;
    let grooveFactor = 0;

    /* ---- Cusp relief around the occlusal rim ---- */
    const rimW = Math.exp(-Math.pow((polar - 0.72) / 0.34, 2));
    const topHalf = polar < Math.PI * 0.55 ? 1 : Math.max(0, 1 - (polar - Math.PI * 0.55) * 4);
    for (const c of CUSPS) {
      const dA = Math.abs((((az - c.a) + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      const bump = Math.exp(-Math.pow(dA / 0.42, 2)) * c.h * rimW * topHalf;
      disp += bump;
      cuspFactor += bump / 0.108;
    }

    /* ---- Central fissure: mesiodistal groove + transverse cuts ---- */
    const tableW = Math.exp(-Math.pow((polar - 0.3) / 0.5, 2));
    const gMain = Math.exp(-Math.pow(v.z / 0.085, 2));
    const gTrans = Math.exp(-Math.pow(v.x / 0.085, 2)) * 0.62;
    const grooveDepth = Math.min(1, gMain + gTrans) * 0.055 * tableW;
    disp -= grooveDepth;
    grooveFactor = Math.min(1, grooveDepth / 0.055);

    /* ---- Micro enamel relief (two frequencies, sub-millimetric) ---- */
    disp +=
      Math.sin(v.x * 23.1) * Math.sin(v.y * 19.7) * Math.sin(v.z * 21.3) * 0.0035 +
      Math.sin(v.x * 6.1 + v.y * 2.0) * Math.sin(v.z * 5.3) * 0.006;

    /* ---- Cervical taper (neck toward the root line) ---- */
    const neckT = THREE.MathUtils.clamp((-v.y - 0.18) / 0.5, 0, 1);
    const neckK = 1 - 0.26 * THREE.MathUtils.smoothstep(neckT, 0, 1);

    /* ---- Apply displacement + elliptical molar proportions ---- */
    const len = 1 + disp;
    let fx = v.x * len * 1.08 * neckK; // wider mesiodistally
    let fy = v.y * len * 0.96;
    let fz = v.z * len * 1.12 * neckK; // slightly broader buccolingually
    if (fy < -0.92) fy = -0.92 - (fy + 0.92) * 0.32; // close & squash the root-side pole
    pos.setXYZ(i, fx, fy, fz);

    /* ---- Bake enamel colour variation per vertex ---- */
    col.copy(BASE);
    col.lerp(TIP, Math.min(1, cuspFactor * 1.15) * 0.34);
    col.lerp(GROOVE, grooveFactor * 0.55);
    col.lerp(CERVICAL, neckT * 0.5);
    const jitter = 0.987 + Math.random() * 0.026; // organic speckle
    colors[i * 3] = col.r * jitter;
    colors[i * 3 + 1] = col.g * jitter;
    colors[i * 3 + 2] = col.b * jitter;
  }

  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals(); // smooth normals across the deformation
  return geo;
}

/**
 * One anatomically curved, ribbon-flattened root.
 * dirSign mirrors the mesial/distal splay. Uses the shared enamel material;
 * vertex colours blend into warmer dentin toward the apex.
 */
function buildMolarRoot(dirSign) {
  const geo = new THREE.CylinderGeometry(0.3, 0.12, 1.06, 24, 10, false);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const CROWN_END = new THREE.Color(0xefe5cf);
  const APEX = new THREE.Color(0xe7d7b4);
  const col = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i); // [-0.53, 0.53]
    const z = pos.getZ(i);
    const norm = (0.53 - y) / 1.06; // 0 at cervical, 1 at apex

    /* Organic bulge near the cervical third, extra taper at the apex */
    const bulge =
      1 + 0.16 * Math.exp(-Math.pow((norm - 0.24) / 0.2, 2)) -
      0.3 * THREE.MathUtils.smoothstep(norm, 0.62, 1);

    let nx = x * bulge;
    let nz = z * bulge * 0.76; // ribbon-flattened buccolingually
    nx += dirSign * 0.15 * norm * norm; // gentle distal curve
    nz -= 0.06 * norm * norm;

    pos.setXYZ(i, nx, y, nz);
    col.copy(CROWN_END).lerp(APEX, norm);
    const jitter = 0.99 + Math.random() * 0.02;
    colors[i * 3] = col.r * jitter;
    colors[i * 3 + 1] = col.g * jitter;
    colors[i * 3 + 2] = col.b * jitter;
  }

  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */
export default function DentalCanvas3D() {
  const hostRef = useRef(null);
  const [fallback, setFallback] = useState(false);
  const [sceneReady, setSceneReady] = useState(false); // first live frame rendered
  const readyRef = useRef(false);

  useEffect(() => {
    /* Respect reduced motion — static clay art instead */
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setFallback(true);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch (err) {
      setFallback(true); // WebGL disabled → CSS fallback
      return;
    }

    /* ---- Renderer / scene / camera ---------------------------------- */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92; // controlled highlights, never blown out
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, host.clientWidth / host.clientHeight, 0.1, 60);
    camera.position.set(0, 0.25, 8.8);

    /* Studio reflections (RoomEnvironment → PMREM), one-time cost */
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    /* ---- Soft studio lighting rig ------------------------------------ */
    scene.add(new THREE.HemisphereLight(0xeaf6ff, 0xd8cdbd, 0.55));
    const key = new THREE.DirectionalLight(0xfff2e2, 1.35); // warm key
    key.position.set(3.2, 4.6, 4.2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdcf2ff, 0.4); // cool soft fill
    fill.position.set(-4.5, 1.8, 3.2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xbaf3e8, 0.75); // mint rim separation
    rim.position.set(-1.5, 3.4, -4.5);
    scene.add(rim);

    /* ---- Groups -------------------------------------------------------- */
    const world = new THREE.Group();
    scene.add(world);
    const toothGroup = new THREE.Group();
    toothGroup.position.y = 0.12;
    world.add(toothGroup);

    /* ---- The anatomical molar (one shared physical enamel material) ----- */
    const enamel = new THREE.MeshPhysicalMaterial({
      vertexColors: true, // baked crown/root colour variation
      roughness: 0.26,
      metalness: 0.0,
      clearcoat: 0.55,
      clearcoatRoughness: 0.3,
      sheen: 0.45,
      sheenColor: new THREE.Color(0xfff3e0),
      specularIntensity: 1.0,
      envMapIntensity: 0.6,
    });
    enamel.emissive = new THREE.Color(0xe8d9c0); // faint warm fake-SSS glow
    enamel.emissiveIntensity = 0.032;

    const crownGeo = buildMolarCrown();
    const crown = new THREE.Mesh(crownGeo, enamel);
    toothGroup.add(crown);

    const rootGeoL = buildMolarRoot(-1);
    const rootL = new THREE.Mesh(rootGeoL, enamel);
    rootL.position.set(-0.34, -1.38, 0);
    rootL.rotation.z = 0.13; // mesial splay
    rootL.rotation.x = 0.04;
    toothGroup.add(rootL);

    const rootGeoR = buildMolarRoot(1);
    const rootR = new THREE.Mesh(rootGeoR, enamel);
    rootR.position.set(0.34, -1.38, 0);
    rootR.rotation.z = -0.13; // distal splay
    rootR.rotation.x = 0.04;
    toothGroup.add(rootR);

    toothGroup.scale.setScalar(1.02);
    toothGroup.rotation.set(0.04, -0.42, 0.02);

    /* ---- Elegant orbital rings ---------------------------------------- */
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.26 });
    const ringBlueMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.2 });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.01, 8, 120), ringMat);
    ringA.rotation.x = Math.PI / 2.2;
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.008, 8, 120), ringBlueMat);
    ringB.rotation.x = Math.PI / 1.8;
    ringB.rotation.y = 0.5;
    world.add(ringA, ringB);

    /* ---- Orbiting hygiene micro-spheres (refined, smaller) -------------- */
    const orbiters = new THREE.Group();
    world.add(orbiters);
    const sphereGeo = new THREE.SphereGeometry(1, 18, 14);
    const orbiterColors = [0x99f6e4, 0xbae6fd, 0x5eead4, 0xe0f2fe, 0x99f6e4, 0x7dd3fc];
    const orbiterData = [];
    for (let i = 0; i < 6; i++) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: orbiterColors[i],
        roughness: 0.3,
        clearcoat: 0.6,
        envMapIntensity: 0.5,
      });
      const s = new THREE.Mesh(sphereGeo, mat);
      const radius = 2.6 + (i % 3) * 0.42;
      const size = 0.085 + (i % 3) * 0.038;
      s.scale.setScalar(size);
      orbiters.add(s);
      orbiterData.push({
        mesh: s,
        radius,
        speed: 0.2 + i * 0.04,
        phase: (i / 6) * Math.PI * 2,
        yAmp: 0.9 + (i % 2) * 0.55,
        yPhase: i * 1.3,
      });
    }

    /* ---- Ambient light particles ----------------------------------------- */
    const particleCount = 70;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.8 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    world.add(particles);

    /* ---- Grounded contact shadow (neutral clinical grey-teal) ------------ */
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext("2d");
    const grad = sctx.createRadialGradient(128, 128, 8, 128, 128, 122);
    grad.addColorStop(0, "rgba(23,52,60,0.36)"); // tight dark core = believable contact
    grad.addColorStop(0.45, "rgba(23,52,60,0.16)");
    grad.addColorStop(1, "rgba(23,52,60,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 4.6),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -2.62;
    shadow.scale.set(1, 0.62, 1); // elliptical grounding
    world.add(shadow);

    /* ---- Scroll-driven choreography (GSAP ScrollTrigger scrub) ----------- */
    const scrollProxy = { progress: 0 };
    const triggerEl = host.closest("section") || host;
    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => (scrollProxy.progress = self.progress),
    });

    /* ---- Pointer parallax ------------------------------------------------- */
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", onPointerMove, { passive: true });

    /* ---- RAF loop with off-screen / tab-hidden pausing --------------------- */
    const clock = new THREE.Clock();
    let rafId = null;
    let visible = true;

    const render = () => {
      const t = clock.getElapsedTime();
      const p = scrollProxy.progress;

      /* Slow premium rotation + gentle float + scroll-scrubbed spin */
      toothGroup.position.y = 0.12 + Math.sin(t * 0.8) * 0.11 + p * 0.85;
      toothGroup.rotation.y = -0.42 + t * 0.18 + p * Math.PI * 1.5;
      toothGroup.rotation.x = 0.04 + Math.sin(t * 0.45) * 0.035 + p * 0.32;

      /* Orbiting spheres: elliptical orbit + vertical bob */
      orbiterData.forEach((o) => {
        const a = t * o.speed + o.phase;
        o.mesh.position.set(
          Math.cos(a) * o.radius,
          Math.sin(a + o.yPhase) * o.yAmp * 0.5 + Math.sin(t * 0.75 + o.yPhase) * 0.1,
          Math.sin(a) * o.radius * 0.6
        );
      });
      ringA.rotation.z = t * 0.07;
      ringB.rotation.z = -t * 0.055;
      particles.rotation.y = t * 0.04;

      /* Camera: pointer parallax + scroll dolly (lerped, butter-smooth) */
      camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.045;
      camera.position.y += (0.25 + -pointer.y * 0.35 + p * 0.75 - camera.position.y) * 0.045;
      camera.position.z += (8.8 + p * 1.5 - camera.position.z) * 0.06;
      camera.lookAt(0, 0, 0);

      /* Contact shadow breathes with the float */
      const breathe = Math.sin(t * 0.8);
      const s = 1 - breathe * 0.055;
      shadow.scale.set(s, 0.62 * s, 1);
      shadow.material.opacity = 0.9 - breathe * 0.12;

      renderer.render(scene, camera);

      /* First live frame → gracefully retire the placeholder artwork */
      if (!readyRef.current) {
        readyRef.current = true;
        setSceneReady(true);
      }

      rafId = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && rafId === null) {
          clock.start();
          rafId = requestAnimationFrame(render);
        } else if (!visible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.02 }
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && visible && rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---- Responsive resize ------------------------------------------------- */
    const ro = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(host);

    rafId = requestAnimationFrame(render);

    /* ---- Full disposal ------------------------------------------------------ */
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onPointerMove);
      st.kill();

      crownGeo.dispose();
      rootGeoL.dispose();
      rootGeoR.dispose();
      enamel.dispose();
      ringA.geometry.dispose();
      ringB.geometry.dispose();
      ringMat.dispose();
      ringBlueMat.dispose();
      sphereGeo.dispose();
      orbiters.children.forEach((m) => m.material.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      shadow.geometry.dispose();
      shadow.material.dispose();
      shadowTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
      aria-label="Interactive 3D illustration of a realistic human molar with orbiting hygiene spheres"
    >
      {/*
        CLAY PLACEHOLDER LAYER — reserves the exact frame geometry and keeps
        the hero visually complete from the first paint. It sits UNDER the
        transparent WebGL canvas and fades out on the first rendered frame.
        It doubles as the permanent artwork for failed WebGL / reduced
        motion, so the section is never blank, never jumpy, never shifted.
      */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          !fallback && sceneReady ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={!fallback}
      >
        <ClayToothFallback />
      </div>
    </div>
  );
}
