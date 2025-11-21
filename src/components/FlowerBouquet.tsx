"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

interface FlowerProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
}

function Flower({ position, rotation, scale, color }: FlowerProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stem */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="green" />
      </mesh>
      {/* Petals */}
      <group position={[0, 0, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            rotation={[0, 0, (i / 5) * Math.PI * 2]}
            position={[0.3 * Math.cos((i / 5) * Math.PI * 2), 0.3 * Math.sin((i / 5) * Math.PI * 2), 0]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {/* Center */}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </group>
    </group>
  );
}

interface FlowerBouquetProps {
  color: string;
}

export default function FlowerBouquet({ color }: FlowerBouquetProps) {
  const group = useRef<THREE.Group>(null);

  const flowers = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 0.5;
      const z = (Math.random() - 0.5) * 2;
      const scale = 0.8 + Math.random() * 0.4;
      const rotation: [number, number, number] = [
        Math.random() * 0.2,
        Math.random() * Math.PI * 2,
        Math.random() * 0.2,
      ];
      temp.push({ position: [x, y, z] as [number, number, number], rotation, scale });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {flowers.map((props, i) => (
        <Flower key={i} {...props} color={color} />
      ))}
    </group>
  );
}
