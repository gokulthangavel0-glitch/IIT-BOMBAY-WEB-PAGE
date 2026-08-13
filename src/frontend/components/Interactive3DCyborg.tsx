import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cpu, ShieldAlert, Sparkles, Zap, RefreshCw } from "lucide-react";

export const Interactive3DCyborg: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<"cyan" | "emerald" | "crimson" | "violet">("cyan");
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.008);
  const [activeHudStat, setActiveHudStat] = useState<string>("SYSTEM OPTIMAL");

  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const outerRingRef = useRef<THREE.Mesh | null>(null);

  const colorsMap = {
    cyan: { primary: 0x00f3ff, secondary: 0x0055ff },
    emerald: { primary: 0x10b981, secondary: 0x059669 },
    crimson: { primary: 0xf43f5e, secondary: 0xbe123c },
    violet: { primary: 0xa855f7, secondary: 0x7e22ce }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colorsMap[colorScheme].primary, 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(colorsMap[colorScheme].secondary, 2, 50);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    // 3. Cyborg Core & Geometry Group
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Core Icosahedron / Holographic Cyborg Brain
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: colorsMap[colorScheme].primary,
      wireframe: wireframe,
      roughness: 0.2,
      metalness: 0.9,
      emissive: colorsMap[colorScheme].primary,
      emissiveIntensity: 0.25
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Inner Cyber Ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorsMap[colorScheme].primary,
      wireframe: true
    });
    const outerRing = new THREE.Mesh(ringGeo, ringMat);
    outerRing.rotation.x = Math.PI / 3;
    group.add(outerRing);
    outerRingRef.current = outerRing;

    // Secondary Gyro Ring
    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.03, 12, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: colorsMap[colorScheme].secondary,
      wireframe: true
    });
    const gyroRing = new THREE.Mesh(ringGeo2, ringMat2);
    gyroRing.rotation.y = Math.PI / 4;
    group.add(gyroRing);

    // 4. Particle Field Matrix
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: colorsMap[colorScheme].primary,
      size: 0.06,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ResizeObserver for canvas fluidity
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (group) {
        group.rotation.y += rotationSpeed;
        group.rotation.x += rotationSpeed * 0.5;
        group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.05;
        group.rotation.x += (-mouseY * 0.5 - group.rotation.x) * 0.05;
      }

      if (outerRing) {
        outerRing.rotation.z += 0.01;
      }

      if (gyroRing) {
        gyroRing.rotation.x -= 0.015;
      }

      if (particles) {
        particles.rotation.y -= 0.002;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [colorScheme]);

  // Update wireframe dynamically
  useEffect(() => {
    if (coreMeshRef.current) {
      (coreMeshRef.current.material as THREE.MeshStandardMaterial).wireframe = wireframe;
    }
  }, [wireframe]);

  const handlePulseBurst = () => {
    setActiveHudStat("CYBER PULSE DISCHARGED // RECHARGING...");
    if (meshGroupRef.current) {
      meshGroupRef.current.scale.set(1.4, 1.4, 1.4);
      setTimeout(() => {
        if (meshGroupRef.current) meshGroupRef.current.scale.set(1, 1, 1);
        setActiveHudStat("SYSTEM OPTIMAL // 100% NEURAL LINK");
      }, 300);
    }
  };

  return (
    <div className="relative w-full h-[480px] rounded-3xl bg-slate-950/90 border border-cyan-500/30 overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.15)] flex flex-col justify-between p-6">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f3ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Top HUD Stats Overlay */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-cyan-300 uppercase font-semibold">
            {activeHudStat}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span>FPS: 60.0</span>
          <span>LATENCY: 2ms</span>
          <span className="text-emerald-400 font-bold">FIREWALL: ACTIVE</span>
        </div>
      </div>

      {/* Center 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Bottom HUD Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-cyan-500/20 bg-slate-950/80 backdrop-blur-md px-4 py-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 border ${
              wireframe
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            {wireframe ? "WIREFRAME: ON" : "WIREFRAME: OFF"}
          </button>

          <button
            onClick={handlePulseBurst}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 border bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            EM PULSE
          </button>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400 mr-1 uppercase">Spectrum:</span>
          {(["cyan", "emerald", "crimson", "violet"] as const).map((scheme) => (
            <button
              key={scheme}
              onClick={() => setColorScheme(scheme)}
              className={`w-5 h-5 rounded-full transition-transform border ${
                colorScheme === scheme ? "scale-125 ring-2 ring-white" : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor:
                  scheme === "cyan" ? "#00f3ff" : scheme === "emerald" ? "#10b981" : scheme === "crimson" ? "#f43f5e" : "#a855f7"
              }}
              title={`Switch to ${scheme}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
