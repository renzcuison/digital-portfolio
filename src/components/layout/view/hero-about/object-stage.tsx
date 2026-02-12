"use client";

import React, { memo, useEffect, useState } from "react";
import Companion3D from "@/components/ui/env/three-object";

export const ObjectStage = memo(() => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-10 pointer-events-none">
            <div className="w-full h-full pointer-events-auto">
                <Companion3D
                    key="STABLE_VISUAL_CONTEXT"
                    mouseRawX={0.5}
                    mouseRawY={0.5}
                />
            </div>
        </div>
    );
}, () => true);