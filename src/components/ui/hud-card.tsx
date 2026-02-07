"use client";

import React from 'react';

interface HUDCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function HUDCard({ children, className = "", style }: HUDCardProps) {
    return (
        <div
            className={`relative bg-black/40 backdrop-blur-md border border-green-500/20 p-6 group transition-all duration-500 hover:border-green-500/40 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${className}`}
            style={style}
        >
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-500/40 group-hover:border-green-500 transition-all"></div>

            {/* Internal Scanline Pulse - PERSISTENT */}
            <div className="absolute inset-x-0 h-[100%] w-[1px] bg-green-400/5 left-0 animate-scan-slow pointer-events-none opacity-40"></div>

            {children}
        </div>
    );
}
