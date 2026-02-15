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
    const count = 80000;

    const bladeGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-0.0015, 0);
        shape.quadraticCurveTo(-0.002, 0.075, 0, 0.15);
        shape.quadraticCurveTo(0.002, 0.075, 0.0015, 0);
        return new THREE.ShapeGeometry(shape);
    }, []);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: 0 },
                uColor: { value: new THREE.Color("#C0C0BE") },
                uEmissive: { value: new THREE.Color("#444444") },
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vDist;
                uniform float uTime;
                uniform float uMouse;

                float hash(float n) { return fract(sin(n) * 43758.5453123); }

                void main() {
                    vUv = uv;

                    vec4 worldPosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
                    vDist = length(worldPosition.xz);

                    float id = float(gl_InstanceID);
                    float speed = 0.12 + hash(id) * 0.18;
                    float phase = hash(id + 1.0) * 6.28;
                    float wind = sin(uTime * speed + phase) * 0.22;
                    float mouseInfluence = uMouse * 0.12;
                    float lean = (hash(id + 2.0) - 0.5) * 0.3;
                    float jitter = (hash(id + 3.0) - 0.5) * 0.15;

                    float movement = (wind + lean + mouseInfluence + jitter) * vUv.y;

                    vec3 transformed = position;
                    transformed.x += movement;
                    transformed.z += movement * 0.5;

                    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying float vDist;
                uniform vec3 uColor;
                uniform vec3 uEmissive;

                void main() {
                    float gradient = smoothstep(0.0, 1.0, vUv.y);
                    vec3 tipColor = uColor + vec3(0.1, 0.1, 0.1);
                    vec3 finalColor = mix(uEmissive, tipColor, gradient);

                    // Anchor Logic:
                    // Instead of fading to 0, we drop opacity significantly under her feet.
                    // This creates a "floor" texture without the dark stacking.
                    float proximityFactor = smoothstep(0.0, 0.8, vDist);
                    float baseOpacity = mix(0.08, 0.2, proximityFactor);

                    float alpha = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.1, 0.5, vUv.y) * baseOpacity;

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    const setupMatrices = useMemo(() => {
        const dummy = new THREE.Object3D();
        const maxRadius = 40;

        return (mesh: THREE.InstancedMesh) => {
            for (let i = 0; i < count; i++) {
                const r = Math.pow(Math.random(), 1.3) * maxRadius;
                const theta = Math.random() * 2 * Math.PI;
                const x = r * Math.cos(theta);
                const z = r * Math.sin(theta);

                const dist = Math.sqrt(x * x + z * z);

                // Scale Logic: Crushed grass under feet (0.05 height)
                const crushFactor = THREE.MathUtils.smoothstep(dist, 0.0, 0.6);
                let scaleBase = (0.4 + Math.random() * 1.4) * mix(0.1, 1.0, crushFactor);

                const horizonStart = 18;
                if (dist > horizonStart) {
                    const fadeFactor = 1.0 - (dist - horizonStart) / (maxRadius - horizonStart);
                    scaleBase *= Math.pow(fadeFactor, 1.8);
                }

                dummy.position.set(x, -0.475, z);
                dummy.rotation.set(0, Math.random() * Math.PI, 0);
                dummy.scale.set(1.2, scaleBase, 1);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
        };

        function mix(a: number, b: number, t: number) {
            return a * (1 - t) + b * t;
        }
    }, [count]);

    useFrame((state) => {
        if (material) {
            material.uniforms.uTime.value = state.clock.getElapsedTime();
            material.uniforms.uMouse.value = (mouseX?.get?.() ?? 0);
        }
    });

    return (
        <instancedMesh
            ref={(ref) => {
                if (ref && !ref.userData.initialized) {
                    setupMatrices(ref);
                    ref.userData.initialized = true;
                }
                meshRef.current = ref;
            }}
            args={[bladeGeometry, material, count]}
        />
    );
}