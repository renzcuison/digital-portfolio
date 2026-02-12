"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GridProps {
    mouseX: any;
    mouseY: any;
}

export function Grid({ mouseX, mouseY }: GridProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 10000;

    const meshMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#B2B2B0",
        side: THREE.DoubleSide,
        metalness: 0.2,
        roughness: 0.8,
        transparent: true,

        opacity: 0.15,
        alphaTest: 0.02,

        depthWrite: false,
        envMapIntensity: 0.5,
        emissive: "#111111",
        wireframe: true,
    }), []);

    const bladeGeometry = useMemo(() => {
        const points = [];
        points.push(new THREE.Vector3(-0.004, 0, 0));
        points.push(new THREE.Vector3(0, 0.15, 0));
        points.push(new THREE.Vector3(0.004, 0, 0));
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return geo;
    }, []);

    const grassData = useMemo(() => {
        const temp = [];
        const maxRadius = 40;
        for (let i = 0; i < count; i++) {

            const r = Math.pow(Math.random(), 1.3) * maxRadius;
            const theta = Math.random() * 2 * Math.PI;
            const x = r * Math.cos(theta);
            const z = r * Math.sin(theta);

            const dist = Math.sqrt(x * x + z * z);
            const isNearFrieren = dist < 0.6;

            let scaleBase = isNearFrieren ? 0.05 : 0.4 + Math.random() * 1.5;

            const horizonStart = 15;
            if (dist > horizonStart) {
                const fadeFactor = 1 - (dist - horizonStart) / (maxRadius - horizonStart);
                scaleBase *= Math.pow(fadeFactor, 1.5);
            }

            temp.push({
                x,
                z,
                scale: Math.max(0, scaleBase),
                speed: 0.15 + Math.random() * 0.2,
                phase: Math.random() * Math.PI * 2,
                lean: (Math.random() - 0.5) * 0.4,
                jitter: (Math.random() - 0.5) * 0.2
            });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const mx = (mouseX?.get?.() ?? 0) * 0.15;

        grassData.forEach((g, i) => {
            const wind = Math.sin(time * g.speed + g.phase) * 0.25;

            dummy.position.set(g.x, -0.475, g.z);

            dummy.rotation.set(
                wind + g.lean,
                Math.atan2(state.camera.position.x - g.x, state.camera.position.z - g.z),
                wind + mx + g.jitter
            );

            dummy.scale.set(1, g.scale, 1);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[bladeGeometry, meshMaterial, count]}
        />
    );
}