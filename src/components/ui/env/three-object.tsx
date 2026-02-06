"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

const ModelPath = "/frieren-compressed.glb";

function SketchModel() {
    const { scene } = useGLTF(ModelPath);
    const headRef = useRef<THREE.Object3D | null>(null);
    const uniforms = useRef({
        uTime: { value: 0 }
    });

    useMemo(() => {
        const meshes: THREE.Mesh[] = [];
        scene.traverse((child) => {
            if (child.name.includes("Head") || child.name.includes("head")) {
                headRef.current = child;
            }

            if (child instanceof THREE.Mesh && !child.userData.isWireframe) {
                meshes.push(child);
            }
        });

        meshes.forEach((mesh) => {
            const mainMat = new THREE.MeshStandardMaterial({
                color: "#9ca3af",
                roughness: 0.9,
                metalness: 0,
            });

            const wireMat = new THREE.MeshBasicMaterial({
                color: "#4b5563",
                wireframe: true,
                transparent: true,
                opacity: 0.05,
            });

            const injectSway = (shader: any) => {
                shader.uniforms.uTime = uniforms.current.uTime;
                shader.vertexShader = `
                uniform float uTime;
                ${shader.vertexShader}
                `.replace(
                    `#include <begin_vertex>`,
                    `
                // 1. Existing Sway Logic
                float heightMask = smoothstep(-0.2, 1.2, position.y);
                float lateralDist = length(position.xz);
                float hairMask = smoothstep(0.1, 0.2, lateralDist);
                float finalSwayMask = heightMask * hairMask;

                float waveX = sin(uTime * 2.0 + position.y * 4.0) * 0.05 * finalSwayMask;
                float waveZ = cos(uTime * 1.5 + position.y * 3.0) * 0.03 * finalSwayMask;

                // 2. New Breathing Logic
                // Adjust these values based on your specific model's scale
                vec3 chestCenter = vec3(0.0, 0.4, 0.1);
                float distToChest = distance(position, chestCenter);

                // Define how large the breathing area is (0.3 is the radius)
                float breatheMask = smoothstep(0.3, 0.0, distToChest);

                // Sine wave for timing: slow and rhythmic
                float breatheCycle = sin(uTime * 1.5) * 0.5 + 0.5; // 0 to 1 range
                float breatheIntensity = breatheCycle * 0.015 * breatheMask;

                // 3. Combine transformations
                // We add the breatheIntensity to the normal direction to "inflate"
                vec3 transformed = vec3(position.x + waveX, position.y, position.z + waveZ);
                transformed += normal * breatheIntensity;
                `
                );
            };

            mainMat.onBeforeCompile = injectSway;
            wireMat.onBeforeCompile = injectSway;

            mesh.material = mainMat;

            const hasWireframe = mesh.children.some(child => child.userData.isWireframe);
            if (!hasWireframe) {
                const wireframe = new THREE.Mesh(mesh.geometry, wireMat);
                wireframe.userData.isWireframe = true;
                mesh.add(wireframe);
            }
        });

    }, [scene]);

    useFrame((state) => {
        uniforms.current.uTime.value = state.clock.getElapsedTime();

        if (headRef.current) {
            const { x, y } = state.mouse;

            const targetRotationY = x * 0.6;
            const targetRotationX = -y * 0.4;

            headRef.current.rotation.y = THREE.MathUtils.lerp(
                headRef.current.rotation.y,
                targetRotationY,
                0.1
            );
            headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                targetRotationX,
                0.1
            );
        }
    });

    return (
        <primitive object={scene}
            rotation={[0, -Math.PI / 2, 0]}
        />
    );
}

export default function Companion3D() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-transparent overflow-hidden">
            <div className="w-full h-full grayscale contrast-125 brightness-105">
                <Canvas
                    camera={{ position: [0, 0, 3.5], fov: 30 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1.5} />
                        <Center>
                            <SketchModel />
                        </Center>
                        <ContactShadows
                            position={[0, -1.6, 0]}
                            opacity={0.15}
                            scale={8}
                            blur={3}
                        />
                        <OrbitControls
                            makeDefault
                            enableZoom={true}
                            enablePan={false}
                            enableDamping={true}
                            autoRotate={false}
                            autoRotateSpeed={0.5}
                            minDistance={2}
                            maxDistance={6}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}

useGLTF.preload(ModelPath);