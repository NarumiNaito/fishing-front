"use client";
import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Text, Stars } from "@react-three/drei";
import * as THREE from "three";

const Earth = () => {
  const texture = useLoader(TextureLoader as any, "/earth.jpg") as THREE.Texture;
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={earthRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 96, 96]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const EarthText = () => {
  return (
    <Text fontSize={0.3} color="white" anchorX="center" anchorY="middle" position={[0, 0, 1.7]}>
      Angler Map
    </Text>
  );
};

const Particle = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += -0.001;
      ref.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={ref}>
      <Stars radius={100} depth={100} count={5000} factor={6} saturation={0} speed={0.5} />
    </group>
  );
};

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black from-25% via-slate-700 via-50% to-black to-75%">
      <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100vw", height: "100vh" }}>
        <Particle />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Earth />
        <EarthText />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default App;
