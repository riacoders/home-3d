import './App.css'
import { useEffect, useRef } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei/native'
import { OrbitControls } from '@react-three/drei/native'
import { Center } from '@react-three/drei/native'
import { Plane } from '@react-three/drei'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { Sun } from '../components/sun'

function Model(props) {
	const { scene } = useGLTF('./assets/tiny_home.glb')
	useEffect(() => {
		scene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	}, [scene])

	return <primitive {...props} object={scene} />
}

function Mosque(props) {
	const { scene } = useGLTF('./assets/mosque.glb')
	useEffect(() => {
		scene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	})

	return <primitive {...props} object={scene} />
}

function CandyShop(props) {
	const { scene } = useGLTF('./assets/candy_shop_draft.glb')
	useEffect(() => {
		scene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	})

	return <primitive {...props} object={scene} />
}
function FootballSquare(props) {
	const { scene } = useGLTF('./assets/football_court.glb')
	useEffect(() => {
		scene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	})

	return <primitive {...props} object={scene} />
}
function AirPort(props) {
	const { scene } = useGLTF('./assets/airport_transport_pack.glb')
	useEffect(() => {
		scene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
				child.material.metalness = 0
				child.material.roughness = 1
				child.material.color.set('#cccccc')
			}
		})
	}, [scene])

	return <primitive {...props} object={scene} />
}

function Cloud(props) {
	const { scene } = useGLTF('./assets/clouds.glb')

	const clonedScene = clone(scene)

	useEffect(() => {
		clonedScene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	}, [clonedScene])

	return <primitive {...props} object={clonedScene} />
}

function Helecopter(props) {
	const group = useRef()
	const { scene, animations } = useGLTF(
		'./assets/md_helicopters_md-902_explorer.glb'
	)
	const { actions, mixer } = useAnimations(animations, group)
	console.log(mixer)

	useEffect(() => {
		const action = actions['rotor|object.029Action.001']
		if (action) {
			action.reset().play()
			action.timeScale = 50
		}
	}, [actions])
	useEffect(() => {
		scene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
				child.material.metalness = 0
				child.material.roughness = 1
				child.material.color.set('yellow')
			}
		})
	}, [scene])

	return <primitive ref={group} object={scene} {...props} />
}

// function CloudAndMoon(props) {
// 	const gltf = useGLTF('./assets/moon_and_clouds.glb')
// 	return <primitive {...props} object={gltf.scene} />
// }
// function GrassRealistic(props) {
// 	const { scene } = useGLTF('./assets/yard_grass.glb')
// 	const model = clone(scene)
// 	return <primitive {...props} object={model} />
// }
// function GrassRealistic(props) {
// 	const group = useRef()
// 	const { scene, animations } = useGLTF('./assets/yard_grass.glb')
// 	const { actions, mixer } = useAnimations(animations, group)
// 	const model = clone(scene)

// 	useEffect(() => {
// 		const action = actions[Object.keys(actions)[0]]
// 		if (action) {
// 			action.play()
// 			action.timeScale = 0.35
// 		}
// 	}, [actions])

// 	return <primitive ref={group} object={model} {...props} />
// }
// function Road(props) {
// 	const { scene } = useGLTF('./assets/highway_road.glb')
// 	const model = clone(scene)
// 	return <primitive {...props} object={model} />
// }

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
			<Canvas camera={{ position: [5, 5, 10], fov: 50 }} shadows>
				<ambientLight intensity={1} />
				<directionalLight color='green' intensity={1} position={[5, 5, 5]} />
				<Plane
					args={[40, 40]}
					rotation={[-Math.PI / 2, 0, 0]}
					position={[0, -1.25, 0]}
					receiveShadow
				>
					<meshStandardMaterial color='green' />
				</Plane>
				<Suspense fallback={'Loading model...'}>
					{/* {
            [...Array[10]].map((_, i) => (
              <Road key={i} 
                position={
                  [
                    0,
                    -1.5,
                    -20
                  ]
                }
              />
            ))  
          } */}
					{/* <Road
						position={[-2.5, -0.9, -13.185]}
						rotation={[0, (2 * Math.PI + 10.025) / 3, 0]}
					/>
					<Road
						position={[-2.5, -0.9, 4.05]}
						rotation={[0, (2 * Math.PI + 10.025) / 3, 0]}
					/> */}

					<Center>
						<Model
							position={[-7, -1.5, 0]}
							scale={0.5}
							rotation={[0, Math.PI / 2, 0]}
						/>
					</Center>
					<Mosque position={[10, -1.5, -10]} scale={0.2} />
					<CandyShop position={[-10, 0.9, 10]} scale={0.1} />
					<FootballSquare
						position={[15, -1.25, 10]}
						scale={0.2}
						rotation={[0, Math.PI, 0]}
					/>
					<AirPort position={[-12.5, -1.255, -10]} scale={0.075} />
					<Cloud position={[-5, 5, 0]} scale={0.005} color={'white'} />
					<Helecopter
						position={[5, 5, 10]}
						scale={0.0025}
						color={'white'}
						rotation={[0, Math.PI, 0]}
					/>
					<Sun position={[2, 15, 2]} scale={0.75} color={'white'} />

					{/* {[...Array(80)].map((_, i) =>
						[...Array(80)].map((_, j) => (
							<GrassRealistic
								key={`${i}-${j}`}
								position={[i * 0.5 - 20 + 0.25, -1.2, j * 0.5 - 20 + 0.25]}
								scale={0.03}
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
