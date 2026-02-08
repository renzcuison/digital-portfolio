"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";

interface ObjectProps {
    mouseRawX: number;
    mouseRawY: number;
}

const Object = dynamic<ObjectProps>(() => import("@/components/ui/env/three-object"), {
    loading: () => <div className="opacity-0">Loading...</div>,
    ssr: false
});

export const ObjectStage = memo(({ logic }: { logic: any }) => {
    if (!logic?.activePage?.id) return null;

    const x = typeof logic.mouseRawX === 'number' ? logic.mouseRawX : 0.5;
    const y = typeof logic.mouseRawY === 'number' ? logic.mouseRawY : 0.5;

    return (
        <div className="fixed inset-0 z-10 pointer-events-none">
            <div className="w-full h-full pointer-events-auto">
                <Object
                    key="STABLE_VISUAL_CONTEXT"
                    mouseRawX={x}
                    mouseRawY={y}
                />
            </div>
        </div>
    );
});