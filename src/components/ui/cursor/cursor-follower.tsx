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

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isText = ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "A", "LI"].includes(target.tagName);
            setIsHoveringText(isText);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame(() => {
        if (!meshRef.current) return;

        const currentX = typeof x === 'number' ? x : x.get();
        const currentY = typeof y === 'number' ? y : y.get();
        const targetX = (currentX / window.innerWidth) * viewport.width - viewport.width / 2;
        const targetY = -(currentY / window.innerHeight) * viewport.height + viewport.height / 2;

        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.15);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.15);

        const baseScale = isHoveringText ? size * 1.4 : size;
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, baseScale, 0.1));

        const mat = meshRef.current.material as any;
        if (mat) {
            const targetIOR = isHoveringText ? 1.5 : 1.2;
            const targetChroma = isHoveringText ? 0.2 : 0.04;
            mat.ior = THREE.MathUtils.lerp(mat.ior, targetIOR, 0.1);
            mat.chromaticAberration = THREE.MathUtils.lerp(mat.chromaticAberration, targetChroma, 0.1);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshTransmissionMaterial
                ior={1.2}
                thickness={1.5}
                anisotropy={0.1}
                chromaticAberration={0.04}
                distortion={0}
                distortionScale={0}
                temporalDistortion={0}
                transmission={1}
                background={new THREE.Color('#ffffff')}
                color="white"
                roughness={0}
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