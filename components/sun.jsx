import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export function Sun(props) {
	const group = useRef()
	const { scene, animations } = useGLTF('./assets/the_sun.glb')
	const { actions } = useAnimations(animations, group)

	useEffect(() => {
		const action = actions[Object.keys(actions)[0]]
		if (action) {
			action.play()
			action.timeScale = 0.35
		}

		scene.traverse(child => {
			if (child.isMesh) {
				child.material = child.material.clone()
				child.material.emissive = new THREE.Color('#ffdd66')
				child.material.emissiveIntensity = 2
				child.material.toneMapped = false
				child.material.needsUpdate = true
			}
		})
	}, [actions, scene])

	return (
		<group ref={group} {...props}>
			<primitive object={scene} />
			<directionalLight
				castShadow
				intensity={3}
				color={'#ffdd66'}
				position={[0, 10, 5]}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={1}
				shadow-camera-far={30}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
				shadow-radius={10}
				shadow-bias={-0.001}
			/>
		</group>
	)
}
