import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        name: string;
        mainGradient: {
            gradient: string;
            firstColor?: string;
            secondColor?: string;
        };
        subGradient: {
            gradient: string;
            firstColor?: string;
            secondColor?: string;
        };
        text: string;
        description: string;
        bodyBackground: string;
        mainScrollbarBackground: string;
        subScrollbarBackground: string;
    }
}