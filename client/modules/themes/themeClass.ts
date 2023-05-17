import {getColorsFromGradient} from "@/helpers/getColorsFromGradient";

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
    created?: boolean;
    constructor(
        name: string, mainGradient: string, subGradient: string, text: string, description: string, bodyBackground: string,
        mainScrollbarBackground: string, subScrollbarBackground: string, created?: boolean
    ) {
        this.name = name;
        this.mainGradient = {
            gradient: mainGradient,
            firstColor: getColorsFromGradient(mainGradient)[0] || mainGradient,
            secondColor: getColorsFromGradient(mainGradient)[1] || mainGradient
        };
        this.subGradient = {
            gradient: subGradient,
            firstColor: getColorsFromGradient(subGradient)[0] || subGradient,
            secondColor: getColorsFromGradient(subGradient)[1] || subGradient
        };
        this.text = text;
        this.description = description;
        this.bodyBackground = bodyBackground;
        this.mainScrollbarBackground = mainScrollbarBackground;
        this.subScrollbarBackground = subScrollbarBackground;
        this.created = created
    }
}