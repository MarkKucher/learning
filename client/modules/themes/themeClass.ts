interface Gradient {
    gradient: string;
    firstColor?: string;
    secondColor?: string;
}

export class Theme {
    name;
    mainGradient: Gradient;
    subGradient: Gradient;
    text;
    description;
    bodyBackground;
    mainScrollbarBackground;
    subScrollbarBackground;
    constructor(
        name: string, mainGradient: string, subGradient: string, text: string, description: string, bodyBackground: string,
        mainScrollbarBackground: string, subScrollbarBackground: string, mainGradientFirstColor?: string, mainGradientSecondColor?: string,
        subGradientFirstColor?: string, subGradientSecondColor?: string
    ) {
        this.name = name;
        this.mainGradient = {
            gradient: mainGradient,
            firstColor: mainGradientFirstColor,
            secondColor: mainGradientSecondColor
        };
        this.subGradient = {
            gradient: subGradient,
            firstColor: subGradientFirstColor,
            secondColor: subGradientSecondColor
        };
        this.text = text;
        this.description = description;
        this.bodyBackground = bodyBackground;
        this.mainScrollbarBackground = mainScrollbarBackground;
        this.subScrollbarBackground = subScrollbarBackground;
    }
}