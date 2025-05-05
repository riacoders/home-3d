import './App.css'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei/native'
import { OrbitControls } from '@react-three/drei/native'
import { Center } from '@react-three/drei/native'
import { Plane } from '@react-three/drei'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

function Model(props) {
	const gltf = useGLTF('./assets/tiny_home.glb')
	return <primitive {...props} object={gltf.scene} />
}
function Cloud(props) {
	const gltf = useGLTF('./assets/clouds.glb')
	return <primitive {...props} object={gltf.scene} />
}
function CloudAndMoon(props) {
	const gltf = useGLTF('./assets/moon_and_clouds.glb')
	return <primitive {...props} object={gltf.scene} />
}
function GrassSquare(props) {
	const { scene } = useGLTF('./assets/5m_x_5m_grass_square.glb')
	const model = clone(scene)
	return <primitive {...props} object={model} />
}

function App() {
	const { scene } = useGLTF('./assets/clouds.glb')
	useEffect(() => {
		scene.traverse(child => {
			if (child.isMesh) {
				child.material.color.set('white')
			}
		})
	}, [scene])
	return (
		<div id='canvas-container'>
			<Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
				<ambientLight intensity={1} />
				<directionalLight color='green' intensity={1} position={[5, 5, 5]} />
				<Plane
					args={[40, 40]}
					rotation={[-Math.PI / 2, 0, 0]}
					position={[0, -1.25, 0]}
				>
					<meshStandardMaterial color='gray' />
				</Plane>
				<Suspense fallback={'Loading model...'}>
					<Center>
						<Model position={[0, -1.5, 0]} scale={0.5} />
					</Center>
					<Cloud position={[-5, 5, 0]} scale={0.0025} color={'white'} />
					<CloudAndMoon position={[5, 5, 0]} scale={0.0025} color={'white'} />

					{/* {[...Array(80)].map((_, i) =>
						[...Array(80)].map((_, j) => (
							<GrassSquare
								key={`${i}-${j}`}
								position={[i * 0.5 - 20 + 0.5, -1.3, j * 0.5 - 20 + 0.5]}
								scale={0.2}
							/>
						))
					)} */}
				</Suspense>
				<OrbitControls
					minPolarAngle={Math.PI / 4}
					maxPolarAngle={Math.PI / 2}
				/>
			</Canvas>
		</div>
	)
}

export default App
