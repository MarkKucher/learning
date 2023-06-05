export const getColorsFromGradient = (str: string): string[] => {
    return str.match(/#[a-zA-Z_0-9]+/g) || [];
}