import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Ring, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

// Fallback high-performance SVG/CSS visual for browsers/devices without WebGL
export function FallbackHeroGraphic() {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none" aria-hidden="true">
      {/* Outer pulsing radar ring */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-sky-400/20 anim-spin" />
      <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-dashed border-violet-400/30 anim-spin-rev" />
      <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-emerald-400/25 anim-pulse-ring" />

      {/* Center glowing badge */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-sky-500/20 via-violet-500/20 to-emerald-500/20 backdrop-blur-xl border border-sky-400/40 flex flex-col items-center justify-center shadow-2xl shadow-sky-500/20 anim-float">
        <span className="text-3xl sm:text-4xl mb-1">🛡️</span>
        <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider">QA MATRIX</span>
      </div>

      {/* Orbiting indicator chips */}
      <div className="absolute top-10 left-12 glass-sm px-2.5 py-1 text-[11px] font-mono text-emerald-400 border border-emerald-500/30 anim-float">
        ✓ Promptfoo Gate
      </div>
      <div className="absolute bottom-12 right-12 glass-sm px-2.5 py-1 text-[11px] font-mono text-sky-400 border border-sky-500/30 anim-float2">
        ✓ Ragas: 0.98
      </div>
    </div>
  );
}

// Floating glass orb — the main centerpiece
function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.2,
        0.05
      );
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.2, 48, 48]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          transparent
          opacity={0.16}
          distort={0.25}
          speed={1.8}
          roughness={0.1}
          metalness={0.4}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[1.0, 24, 24]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.06} />
      </Sphere>
    </Float>
  );
}

// Orbiting ring
function OrbitRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });
  return (
    <Torus ref={ref} args={[radius, 0.008, 16, 96]} rotation={[tilt, 0, 0]}>
      <meshBasicMaterial color={color} transparent opacity={0.45} />
    </Torus>
  );
}

// Floating node (QA test runner representation)
function FloatingNode({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.12;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Box ref={ref} args={[0.12, 0.12, 0.12]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
    </Box>
  );
}

// Particle field
function Particles({ count = 40 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic spread
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.5 + ((i % 5) * 0.4);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle * 1.5) * 1.8;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.5;
    }
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#0ea5e9" size={0.03} transparent opacity={0.5} />
    </points>
  );
}

// Glowing QA orbit
function QASymbol() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });
  return (
    <group ref={ref} position={[0, 0, 0]}>
      <Ring args={[1.6, 1.63, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

// Scene camera following cursor smoothly
function CameraController() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    const targetX = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.4, 0.04);
    const targetY = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.25, 0.04);
    camera.position.set(targetX, targetY, 5);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function HeroCanvas() {
  const [hasWebGL] = useState(checkWebGLSupport);

  if (!hasWebGL) {
    return <FallbackHeroGraphic />;
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.75) : 1}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#0ea5e9" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[0, 5, -5]} intensity={0.5} color="#10b981" />

        <CameraController />
        <Particles count={35} />

        <GlassSphere />
        <QASymbol />
        <OrbitRing radius={1.9} color="#0ea5e9" speed={0.35} tilt={Math.PI / 6} />
        <OrbitRing radius={2.4} color="#8b5cf6" speed={-0.2} tilt={Math.PI / 3} />
        <OrbitRing radius={1.6} color="#10b981" speed={0.5} tilt={Math.PI / 2.2} />

        <FloatingNode position={[1.8, 0.6, 0.4]} color="#0ea5e9" delay={0} />
        <FloatingNode position={[-1.7, -0.5, 0.3]} color="#8b5cf6" delay={1.5} />
        <FloatingNode position={[0.4, 1.8, -0.4]} color="#10b981" delay={2.8} />
      </Canvas>
    </div>
  );
}
