"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function FloatingCard({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[2, 1.2, 0.1]} />
      <meshStandardMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

function DashboardElements() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <FloatingCard position={[-2, 1, 0]} color="#3b82f6" />
      <FloatingCard position={[2, 0.5, -1]} color="#10b981" />
      <FloatingCard position={[0, -0.5, 1]} color="#8b5cf6" />
      <FloatingCard position={[-1, -1.5, -0.5]} color="#f59e0b" />

      {/* Central connecting sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export function ThreeDDashboard() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} />

        <DashboardElements />
      </Canvas>
    </div>
  )
}
