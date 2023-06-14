"use client";

import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01;
    /* ref.current.position.y += 0.01; */
    /* if (ref.current.position.y > 2) ref.current.position.y = -2; */
    console.log("frame");
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "green"} />
    </mesh>
  );
}
function Clock(props: JSX.IntrinsicElements["mesh"]) {
  /* const obj = useLoader(OBJLoader, "/test-colour.obj"); */
  const obj = useLoader(GLTFLoader, "/untitled.glb");
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
    /* ref.current.position.y += 0.01; */
    /* if (ref.current.position.y > 2) ref.current.position.y = -2; */
    console.log("frame");
  });

  return <primitive object={obj.scene} ref={ref} {...props} />;
}

export default function App() {
  return (
    <>
      <div className="h-screen absolute w-screen">
        {/* <Canvas */}
        {/*   orthographic */}
        {/*   shadows */}
        {/*   camera={{ fov: 100, near: 0.1, far: 1000, position: [0, 0, 5] }} */}
        {/* > */}
        {/*   <OrbitControls /> */}
        {/*   <ambientLight intensity={0.5} /> */}
        {/*   {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/*   <pointLight position={[-10, -10, -10]} /> */}
        {/*   {/* <Box position={[1.2, 0, 0]} /> */}
        {/*   <Clock castShadow /> */}
        {/* </Canvas> */}
        <Canvas>
          <Suspense fallback={null}>
            <Clock scale={0.04} castShadow />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[-10, -10, -10]} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          </Suspense>
        </Canvas>
      </div>
      <div className="text-9xl font-extrabold text-orange-400">
        <p>Goose </p>
        <p>Electronics</p>
      </div>
    </>
  );
}
