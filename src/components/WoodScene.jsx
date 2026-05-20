import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function seededNoise(seed) {
  const value = Math.sin(seed * 999.91) * 43758.5453123
  return value - Math.floor(value)
}

function createWoodTexture(seed) {
  if (typeof document === 'undefined') {
    return null
  }

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512

  const context = canvas.getContext('2d')

  if (!context) {
    return null
  }

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, '#ae6f34')
  gradient.addColorStop(0.35, '#8b5728')
  gradient.addColorStop(0.7, '#603817')
  gradient.addColorStop(1, '#2d180e')

  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let index = 0; index < 180; index += 1) {
    const y = (index / 180) * canvas.height
    const amplitude = 18 + seededNoise(seed + index) * 34
    const thickness = 1 + seededNoise(seed * 2 + index) * 6

    context.beginPath()
    context.moveTo(0, y)

    for (let x = 0; x <= canvas.width; x += 24) {
      const wave = Math.sin(x * 0.025 + seed * 2.4) * amplitude
      context.lineTo(x, y + wave * 0.08)
    }

    context.strokeStyle = `rgba(255, 224, 179, ${0.02 + seededNoise(seed + index * 3) * 0.08})`
    context.lineWidth = thickness
    context.stroke()
  }

  for (let index = 0; index < 120; index += 1) {
    const size = 10 + seededNoise(index + seed * 5) * 42
    const x = seededNoise(index + seed) * canvas.width
    const y = seededNoise(index * 2 + seed) * canvas.height

    context.fillStyle = `rgba(55, 27, 12, ${0.03 + seededNoise(index * 7 + seed) * 0.08})`
    context.beginPath()
    context.ellipse(x, y, size, size * 0.45, 0, 0, Math.PI * 2)
    context.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1.2, 1.2)

  return texture
}

function Board({ position, rotation, scale, seed }) {
  const texture = useMemo(() => createWoodTexture(seed), [seed])

  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1.85, 2.75, 0.16]} />
      <meshStandardMaterial
        color="#8e5a2b"
        map={texture ?? undefined}
        metalness={0.12}
        roughness={0.82}
      />
    </mesh>
  )
}

function Stack() {
  const group = useRef(null)

  useFrame((state) => {
    if (!group.current) {
      return
    }

    const time = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(time * 0.38) * 0.4
    group.current.rotation.x = Math.cos(time * 0.22) * 0.06
    group.current.position.y = Math.sin(time * 0.65) * 0.08
  })

  const boards = useMemo(
    () => [
      { position: [-1.2, -0.28, -0.45], rotation: [0.05, -0.35, -0.04], scale: [1, 1, 1], seed: 1 },
      { position: [-0.55, 0.16, 0.05], rotation: [-0.04, -0.1, 0.02], scale: [1.02, 1.02, 1], seed: 2 },
      { position: [0.15, -0.08, 0.46], rotation: [0.08, 0.18, 0.02], scale: [1.05, 1.03, 1], seed: 3 },
      { position: [0.95, 0.25, 0.15], rotation: [-0.06, 0.34, -0.03], scale: [0.96, 1.04, 1], seed: 4 },
      { position: [0.35, 0.72, -0.26], rotation: [-0.05, 0.12, 0.01], scale: [0.72, 0.72, 0.85], seed: 5 },
    ],
    [],
  )

  return (
    <group ref={group}>
      {boards.map((board) => (
        <Board key={board.seed} {...board} />
      ))}
    </group>
  )
}

function DustParticles() {
  const points = useRef(null)

  const positions = useMemo(() => {
    const values = new Float32Array(72 * 3)

    for (let index = 0; index < values.length; index += 3) {
      const seed = index / 3 + 1
      values[index] = (seededNoise(seed) - 0.5) * 7.5
      values[index + 1] = seededNoise(seed * 2.1) * 4 - 1.4
      values[index + 2] = (seededNoise(seed * 3.7) - 0.5) * 6
    }

    return values
  }, [])

  useFrame((state) => {
    if (!points.current) {
      return
    }

    points.current.rotation.y = state.clock.elapsedTime * 0.04
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.04
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          array={positions}
          attach="attributes-position"
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#f7c98a" opacity={0.72} size={0.04} sizeAttenuation transparent />
    </points>
  )
}

export default function WoodScene() {
  return (
    <Canvas camera={{ position: [0, 0.6, 5.1], fov: 36 }} dpr={[1, 1.5]} shadows>
      <color attach="background" args={['#090604']} />
      <fog attach="fog" args={['#090604', 5, 12]} />
      <ambientLight intensity={0.75} />
      <spotLight
        castShadow
        angle={0.42}
        color="#f4c37a"
        intensity={75}
        penumbra={1}
        position={[4, 6, 5]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight color="#7b4b22" intensity={18} position={[-4, 1.5, -3]} />
      <pointLight color="#ffffff" intensity={10} position={[2, 0.5, 4]} />

      <Stack />

      <mesh position={[0, -2.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#160f0a" roughness={1} />
      </mesh>

      <DustParticles />
    </Canvas>
  )
}