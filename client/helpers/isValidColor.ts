export const isValidColor = (strColor: string) => {
    if(!strColor) return false;
    let s = new Option().style;
    s.background = strColor;
    return s.background;
}