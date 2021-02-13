import { useRef, useState } from 'react'
import { Canvas, useFrame, extend } from 'react-three-fiber'
import { OrbitControls, Stars } from '@react-three/drei'
// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls })

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', backgroundColor: '#111' }}
      camera={[45, window.innerWidth / window.innerHeight, 0.1, 1000]}
    >
      <OrbitControls />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
      <S />
    </Canvas>
  )
}

const S = () => {
  const mesh = useRef()
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <Stars
      ref={mesh}
      radius={100} // Radius of the inner sphere (default=100)
      depth={50} // Depth of area where stars should fit (default=50)
      count={5000} // Amount of stars (default=5000)
      factor={4} // Size factor (default=4)
      saturation={0} // Saturation 0-1 (default=0)
      fade // Faded dots (default=false)
    />
  )
}
