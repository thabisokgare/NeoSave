"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function RotatingCoin() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[2, 2, 0.3, 32]} />
      <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
    </mesh>
  )
}

function FloatingOrb({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
      meshRef.current.rotation.x += speed * 0.5
      meshRef.current.rotation.y += speed * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#6366f1" transparent opacity={0.3} metalness={0.5} roughness={0.5} />
    </mesh>
  )
}

function FloatingOrbs() {
  const orbs = [
    { id: 1, position: [8, 2, -5], scale: 0.3, speed: 0.02 },
    { id: 2, position: [-6, -1, -3], scale: 0.4, speed: 0.015 },
    { id: 3, position: [4, -3, -8], scale: 0.2, speed: 0.025 },
    { id: 4, position: [-8, 3, -6], scale: 0.5, speed: 0.01 },
    { id: 5, position: [6, 1, -4], scale: 0.3, speed: 0.02 },
  ] as const

  return (
    <>
      {orbs.map((orb) => (
        <FloatingOrb key={orb.id} {...orb} />
      ))}
    </>
  )
}

export function ThreeDCoin() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <RotatingCoin />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
