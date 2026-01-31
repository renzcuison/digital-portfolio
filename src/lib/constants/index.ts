export * from './companions';
export * from './site';
export * from './system';

export const getGradientString = (
    theme: "light" | "dark",
    colors: any,
    p: { x1: number, y1: number, x2: number, y2: number },
    isMobile: boolean
) => {
    if (isMobile) {
        return `linear-gradient(to bottom, ${colors.c1}, ${colors.c2})`;
    }
    return `radial-gradient(circle at ${p.x1}% ${p.y1}%, ${colors.c1} 0%, transparent 50%),
          radial-gradient(circle at ${p.y2}% ${p.x2}%, ${colors.c2} 0%, transparent 50%),
          radial-gradient(circle at ${100 - p.x2}% ${100 - p.y1}%, ${colors.c3} 0%, transparent 50%),
          radial-gradient(circle at ${p.y1}% ${p.x1}%, ${colors.c4} 0%, transparent 50%),
          ${theme === "dark" ? "#000" : "#fff"}`;
};