"use client";

import React, { Suspense, useEffect, useRef, useMemo, useState, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, useAnimations } from "@react-three/drei";

import { Grid } from "./background";
import * as THREE from "three";

interface Companion3DProps {
    mouseRawX: any;
    mouseRawY: any;
}

const ModelPath = "/three-object.glb";

function SketchModel({ pushData }: { pushData: { x: number, y: number, time: number } | null }) {
    const { scene, animations } = useGLTF(ModelPath);
    const { actions } = useAnimations(animations, scene);
    const { gl } = useThree();
    const headBoneRef = useRef<THREE.Bone | null>(null);
    const zoomVelocity = useRef(0);
    const playTime = useRef(0.15);
    const direction = useRef(1);
    const targetLook = useRef({ x: 0, y: 0 });
    const currentLook = useRef({ x: 0, y: 0 });

    const [modelScale, setModelScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            setModelScale(window.innerWidth < 768 ? 0.85 : 1.0);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toonGradient = useMemo(() => {
        const data = new Uint8Array([0, 120, 255]);
        const tex = new THREE.DataTexture(data, 3, 1, THREE.RedFormat, THREE.UnsignedByteType);
        tex.internalFormat = 'R8';
        tex.minFilter = THREE.NearestFilter;
        tex.magFilter = THREE.NearestFilter;
        tex.needsUpdate = true;
        return tex;
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetLook.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetLook.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        const handleMouseLeave = () => {
            targetLook.current.x = 0;
            targetLook.current.y = 0;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const glRef = useRef(gl);

    useEffect(() => {
        glRef.current = gl;
    }, [gl]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            zoomVelocity.current += e.deltaY * 0.0005;
        };
        const domElement = glRef.current?.domElement;
        if (domElement) {
            domElement.addEventListener('wheel', handleWheel, { passive: false });
            return () => domElement.removeEventListener('wheel', handleWheel);
        }
    }, []);

    const sceneRef = useRef<any>(null);
    const actionsRef = useRef<any>(null);
    const animationsRef = useRef<any>(null);

    sceneRef.current = scene;
    actionsRef.current = actions;
    animationsRef.current = animations;

    useEffect(() => {
        if (!sceneRef.current) return;

        sceneRef.current.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Bone && (child.name === "mixamorigHead" || child.name === "mixamorig:Head")) {
                headBoneRef.current = child;
            }
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = new THREE.MeshToonMaterial({
                    color: "#FFFFFF",
                    gradientMap: toonGradient,
                    side: THREE.DoubleSide,
                    polygonOffset: true,
                    polygonOffsetFactor: 1,
                    polygonOffsetUnits: 1,
                });
            }
        });

        if (animationsRef.current?.length > 0) {
            const action = actionsRef.current[Object.keys(actionsRef.current)[0]];
            if (action) {
                action.reset().play();
                action.paused = true;
            }
        }
    }, [toonGradient]);

    useFrame((state, delta) => {
        const moveDir = new THREE.Vector3();
        state.camera.getWorldDirection(moveDir);
        state.camera.position.addScaledVector(moveDir, -zoomVelocity.current);
        zoomVelocity.current *= 0.95;
        const dist = state.camera.position.length();
        if (dist < 2.0) state.camera.position.setLength(2.0);
        if (dist > 4.0) state.camera.position.setLength(4.0);

        const action = actionsRef.current[Object.keys(actionsRef.current)[0]];
        if (action) {
            const duration = action.getClip().duration;
            playTime.current += delta * direction.current;
            if (playTime.current >= duration - 0.15) {
                direction.current = -1;
                playTime.current = duration - 0.15;
            } else if (playTime.current <= 0.15) {
                direction.current = 1;
                playTime.current = 0.15;
            }
            action.time = playTime.current;
        }

        if (headBoneRef.current) {
            currentLook.current.x += (targetLook.current.x - currentLook.current.x) * 0.1;
            currentLook.current.y += (targetLook.current.y - currentLook.current.y) * 0.1;
            const targetRotation = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(-currentLook.current.y * 0.4, currentLook.current.x * 0.6, 0, 'YXZ')
            );
            const animQuat = headBoneRef.current.quaternion.clone();
            headBoneRef.current.quaternion.copy(animQuat).multiply(targetRotation);
            headBoneRef.current.updateMatrix();
        }
    });

    return (
        <primitive object={scene} scale={modelScale} />
    );
}

export default memo(function Companion3D({ mouseRawX, mouseRawY }: Companion3DProps) {
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <section className="fixed inset-0 z-0 w-screen h-screen overflow-hidden pointer-events-none">
            <div className="absolute inset-0 contrast-100 brightness-100 pointer-events-auto">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 4], fov: 30 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        logarithmicDepthBuffer: true
                    }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={1.2}
                        castShadow
                        shadow-bias={-0.001}
                    />

                    <Suspense fallback={null}>
                        <Grid mouseX={mouseRawX} mouseY={mouseRawY} />

                        <group position={[0, -0.475, 0]}>
                            <SketchModel pushData={null} />
                        </group>

                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}, () => true);