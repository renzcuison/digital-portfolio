"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useMousePosition } from "@/hooks/cursor/use-mouse-position";
import * as THREE from "three";

function GlassLens({ size = 0.075 }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { x, y } = useMousePosition();
    const { viewport } = useThree();
    const [isHoveringText, setIsHoveringText] = useState(false);

    const prevPos = useRef(new THREE.Vector3());
    const velocity = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isText = ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "A", "LI"].includes(target.tagName);
            setIsHoveringText((prev) => prev !== isText ? isText : prev);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const currentX = typeof x === 'number' ? x : x.get();
        const currentY = typeof y === 'number' ? y : y.get();
        const targetX = (currentX / window.innerWidth) * viewport.width - viewport.width / 2;
        const targetY = -(currentY / window.innerHeight) * viewport.height + viewport.height / 2;

        const currentPos = new THREE.Vector3(targetX, targetY, 0);
        const distance = currentPos.distanceTo(prevPos.current);

        velocity.current = THREE.MathUtils.lerp(velocity.current, distance, 0.05);
        prevPos.current.copy(currentPos);

        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);

        const stretchFactor = velocity.current * 1.8;
        const baseScale = isHoveringText ? size * 1.4 : size;

        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, baseScale * (1 - stretchFactor), 0.03);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, baseScale * (1 + stretchFactor), 0.03);
        meshRef.current.scale.z = baseScale;

        const mat = meshRef.current.material as any;
        if (mat) {
            const zoomPower = isHoveringText ? 2.5 : 1.2;
            mat.ior = THREE.MathUtils.lerp(mat.ior, zoomPower + (velocity.current * 0.8), 0.05);
            mat.chromaticAberration = isHoveringText ? 0.8 : 0.04 + (velocity.current * 2.5);

            mat.distortion = 0.5 + (velocity.current * 4);
            mat.distortionScale = 0.4 + (velocity.current * 5);
        }

        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, (targetX - meshRef.current.position.x) * 2, 0.05);
    });

    return (
        <mesh ref={meshRef} scale={0.1}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshTransmissionMaterial
                ior={1.3}
                thickness={2.5}

                anisotropy={0.5}
                chromaticAberration={0.04}
                distortion={0.5}
                distortionScale={0.5}
                temporalDistortion={0.3}

                transmission={1}
                background={new THREE.Color('#ffffff')}
                color="white"
                roughness={0.02}

                metalness={0}
                transparent={true}
            />
        </mesh>
    );
}

export function CursorFollower() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <Canvas
                style={{ pointerEvents: 'none' }}
                orthographic
                camera={{ zoom: 100, position: [0, 0, 10] }}
                gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <Environment preset="city" />
                <ambientLight intensity={1.5} />
                <GlassLens />
            </Canvas>
        </div>
    );
}