import React from "react";

interface GridBackgroundProps {
    children: React.ReactNode;
    className?: string;
    gridOpacity?: number;
    gridColor?: string;
    gridSize?: number;
}

export const GridBackground = ({
                                   children,
                                   className = "",
                                   gridOpacity = 0.15,
                                   gridColor = "rgba(96, 165, 250, 0.25)",
                                   gridSize = 30
                               }: GridBackgroundProps) => {
    return (
        <div className={`relative ${className}`}>
            {/* Grid Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background">
                <div
                    className="absolute inset-0"
                    style={{
                        opacity: gridOpacity,
                        backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
            `,
                        backgroundSize: `${gridSize}px ${gridSize}px`
                    }}
                ></div>
            </div>

            {/* Content */}
            <div className="relative">
                {children}
            </div>
        </div>
    );
};
