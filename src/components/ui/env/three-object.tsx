"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const ModelPath = "/three-object.glb";

function SketchModel({ pushData }: { pushData: { x: number, y: number, time: number } | null }) {
    const { scene, animations } = useGLTF(ModelPath);
    const { actions } = useAnimations(animations, scene);
    const headBoneRef = useRef<THREE.Bone | null>(null);

    const mouseQuaternion = useRef(new THREE.Quaternion());
    const targetQuaternion = useRef(new THREE.Quaternion());
    const currentEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

    const pushOffset = useRef(new THREE.Vector3(0, 0, 0));
    const playTime = useRef(0.15);
    const direction = useRef(1);

    useEffect(() => {
        if (pushData) {

            const strength = 0.5;
            pushOffset.current.set(
                pushData.y * strength,
                -pushData.x * strength,
                0
            );
        }
    }, [pushData]);

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Bone && (child.name === "mixamorigHead" || child.name === "mixamorig:Head")) {
                headBoneRef.current = child;
            }
            if (child instanceof THREE.Mesh) {
                child.raycast = () => null;

                child.frustumCulled = false;
                child.castShadow = true;
                child.receiveShadow = true;

                const meshMaterial = new THREE.MeshStandardMaterial({
                    color: "#8E8E8A",
                    side: THREE.DoubleSide,
                    roughness: 1.0,
                    transparent: true,
                    alphaTest: 0.1,
                    alphaToCoverage: true,
                });

                meshMaterial.onBeforeCompile = (shader) => {
                    shader.vertexShader = `
                        varying vec3 vObjectPosition;
                        varying vec3 vLocalNormal;
                        ${shader.vertexShader}
                    `.replace(`#include <begin_vertex>`, `#include <begin_vertex>\nvObjectPosition = position;\nvLocalNormal = normal;`);
                    shader.fragmentShader = `
                        varying vec3 vObjectPosition;
                        varying vec3 vLocalNormal;
                        ${shader.fragmentShader}
                    `.replace(`#include <alphatest_fragment>`, `
                        float scale = 70.0;
                        float thickness = 0.14;
                        float smoothness = length(fwidth(vObjectPosition * scale)) * 0.7;
                        vec3 blending = abs(vLocalNormal);
                        blending = pow(blending, vec3(8.0));
                        blending /= (blending.x + blending.y + blending.z + 0.0001);
                        vec2 gridX = abs(fract(vObjectPosition.yz * scale - 0.5) - 0.5);
                        vec2 gridY = abs(fract(vObjectPosition.xz * scale - 0.5) - 0.5);
                        vec2 gridZ = abs(fract(vObjectPosition.xy * scale - 0.5) - 0.5);
                        float edgeX = smoothstep(thickness + smoothness, thickness - smoothness, min(gridX.x, gridX.y));
                        float edgeY = smoothstep(thickness + smoothness, thickness - smoothness, min(gridY.x, gridY.y));
                        float edgeZ = smoothstep(thickness + smoothness, thickness - smoothness, min(gridZ.x, gridZ.y));
                        float combinedMesh = edgeX * blending.x + edgeY * blending.y + edgeZ * blending.z;
                        if (combinedMesh < 0.05) discard;
                        diffuseColor.a *= combinedMesh;
                        #include <alphatest_fragment>
                    `);
                };
                child.material = meshMaterial;
            }
        });

        if (animations.length > 0) {
            const action = actions[Object.keys(actions)[0]];
            if (action) {
                action.reset().play();
                action.paused = true;
            }
        }
    }, [scene, actions, animations]);

    useFrame((state, delta) => {
        const action = actions[Object.keys(actions)[0]];
        if (action) {
            const duration = action.getClip().duration;
            playTime.current += delta * direction.current;
            if (playTime.current >= duration - 0.15) { direction.current = -1; playTime.current = duration - 0.15; }
            else if (playTime.current <= 0.15) { direction.current = 1; playTime.current = 0.15; }
            action.time = playTime.current;
        }

        const head = headBoneRef.current;
        if (head) {
            const { x, y } = state.mouse;

            currentEuler.current.set(
                (-y * 0.4) + pushOffset.current.x,
                (x * 0.6) + pushOffset.current.y,
                0
            );

            targetQuaternion.current.setFromEuler(currentEuler.current);
            mouseQuaternion.current.slerp(targetQuaternion.current, 0.1);

            const animQuat = head.quaternion.clone();
            head.quaternion.copy(animQuat).multiply(mouseQuaternion.current);
            head.updateMatrix();

            pushOffset.current.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        }
    });

    return <primitive object={scene} />;
}

export default function Companion3D() {
    const [push, setPush] = React.useState<{ x: number, y: number, time: number } | null>(null);
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        const rawX = (e.clientX / window.innerWidth) * 2 - 1;
        const rawY = -(e.clientY / window.innerHeight) * 2 + 1;
        const length = Math.sqrt(rawX * rawX + rawY * rawY) || 1;
        setPush({ x: rawX / length, y: rawY / length, time: Date.now() });
    };

    if (!mounted) return <section className="h-screen w-full bg-white" />;

    return (
        <section
            className="fixed inset-0 z-0 w-screen h-screen overflow-hidden"
            onPointerDown={handlePointerDown}
            style={{
                touchAction: 'none',

                margin: 0,
                padding: 0
            }}
        >
            <div className="absolute inset-0 contrast-110 brightness-100">
                <Canvas
                    shadows

                    camera={{ position: [0, 0, 4], fov: 30 }}
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <Suspense fallback={null}>
                        <group position={[0, -0.5, 0]}>
                            <SketchModel pushData={push} />
                        </group>

                        <OrbitControls
                            makeDefault
                            enableZoom={true}
                            enablePan={false}
                            enableDamping={true}
                            target={[0, 0, 0]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}