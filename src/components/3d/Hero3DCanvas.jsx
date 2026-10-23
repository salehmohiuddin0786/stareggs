'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Egg Mesh with deformed Sphere Geometry
function RealisticEgg({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, isHero = false }) {
  const meshRef = useRef();

  // Create an egg geometry by mathematically tapering and elongating a sphere
  const eggGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Normalized y between -1 and 1
      const normalizedY = v.y;
      // Taper top (y > 0), round bottom (y < 0)
      const taper = 1.0 - 0.22 * normalizedY;
      v.x *= taper;
      v.z *= taper;
      v.y *= 1.38; // Egg elongation
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current && isHero) {
      // Gentle floating animation
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={eggGeometry}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color="#F8FAFC"
        roughness={0.34}
        metalness={0.02}
        clearcoat={0.18}
        clearcoatRoughness={0.3}
        sheen={0.4}
        sheenRoughness={0.3}
        sheenColor={new THREE.Color('#93C5FD')}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

// 3D Egg Tray Grid Composition
function EggTray({ position = [0, -1.8, 0] }) {
  const trayRef = useRef();

  return (
    <group ref={trayRef} position={position}>
      {/* Molded Pulp Tray Base */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.45, 3.6]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Grid of Eggs in Tray (4x3 layout for clean studio look) */}
      {[-1.35, -0.45, 0.45, 1.35].map((x, xi) =>
        [-0.9, 0, 0.9].map((z, zi) => (
          <RealisticEgg
            key={`tray-egg-${xi}-${zi}`}
            position={[x, 0.25, z]}
            rotation={[0.08 * (xi - 1.5), 0, 0.06 * (zi - 1)]}
            scale={0.42}
          />
        ))
      )}
    </group>
  );
}

// Interactive floating composition with studio lighting
function EggScene({ mousePos }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle smooth parallax following pointer
      const targetX = (mousePos.x * 0.4);
      const targetY = (mousePos.y * 0.3);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Hero Egg */}
      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <RealisticEgg position={[0.2, 0.8, 0.5]} scale={1.15} isHero={true} />
      </Float>

      {/* Flanking Floating Satellite Eggs */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
        <RealisticEgg
          position={[-2.2, 1.2, -0.8]}
          rotation={[0.4, 0.2, -0.3]}
          scale={0.72}
        />
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.7}>
        <RealisticEgg
          position={[2.4, 0.3, -0.5]}
          rotation={[-0.3, 0.4, 0.2]}
          scale={0.65}
        />
      </Float>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <RealisticEgg
          position={[-1.4, -0.6, 0.8]}
          rotation={[0.2, -0.3, 0.1]}
          scale={0.52}
        />
      </Float>

      {/* Styled Commercial Egg Tray Base Behind/Below */}
      <EggTray position={[0, -1.9, -0.6]} />

      {/* Atmospheric Particles */}
      <Sparkles
        count={50}
        scale={[8, 6, 6]}
        size={2.5}
        speed={0.4}
        opacity={0.35}
        color="#93C5FD"
      />

      {/* Ground Contact Shadows for realistic studio depth */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.85}
        scale={10}
        blur={2.2}
        far={4.5}
        color="#040b15"
      />
    </group>
  );
}

export default function Hero3DCanvas({ mousePos = { x: 0, y: 0 } }) {
  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0.2, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        {/* Environment Lights */}
        {/* Soft Ambient Fill */}
        <ambientLight intensity={0.6} color="#0D223D" />

        {/* Dramatic Cobalt-Blue Rim Light */}
        <directionalLight
          position={[-6, 4, -4]}
          intensity={3.8}
          color="#174BFF"
        />

        {/* Opposite Subtle Red Accent Light */}
        <directionalLight
          position={[6, -2, -3]}
          intensity={1.6}
          color="#FF303B"
        />

        {/* Key Studio Light for Egg Form Definition */}
        <spotLight
          position={[2, 6, 6]}
          angle={0.6}
          penumbra={0.8}
          intensity={2.2}
          color="#FFFFFF"
          castShadow
        />

        {/* Secondary Front Fill */}
        <pointLight position={[0, -2, 3]} intensity={0.8} color="#93C5FD" />

        {/* Main 3D Composition */}
        <EggScene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
