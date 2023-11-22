import {
    codeSandboxLogo, cssLogo,
    framerMotionLogo, htmlLogo,
    nextJsLogo,
    prismJsLogo, reactLogo,
    reactSpringLogo,
    reduxLogo,
    sassLogo,
    typeScriptLogo
} from "@/assets/logos";
import {StaticImageData} from "next/image";

interface Company {
    logo: StaticImageData;
    redirectLink: string;
}

export interface Category {
    title: string;
    companies: Company[];
}

export const categories: Category[] = [
    {title: 'Web development', companies: [{logo: nextJsLogo, redirectLink: 'https://nextjs.org'}, {logo: reactLogo, redirectLink: 'https://en.react.js.org'}]},
    {title: 'CSS preprocessor', companies: [{logo: sassLogo, redirectLink: 'https://sass-lang.com'}]},
    {title: 'Animations', companies: [{logo: reactLogo, redirectLink: 'https://reactcommunity.org/react-transition-group'}, {logo: framerMotionLogo, redirectLink: 'https://www.framer.com/motion'}, {logo: reactSpringLogo, redirectLink: 'https://www.react-spring.dev'}]},
    {title: 'Programming language', companies: [{logo: typeScriptLogo, redirectLink: 'https://www.typescriptlang.org'}, {logo: htmlLogo, redirectLink: 'https://html.com'}, {logo: cssLogo, redirectLink: 'https://css.com'}]},
    {title: 'State management', companies: [{logo: reduxLogo, redirectLink: 'https://redux.js.org'}]},
    {title: 'Providing code examples', companies: [{logo: prismJsLogo,redirectLink: 'https://prismjs.com'}, {logo: codeSandboxLogo, redirectLink: 'https://codesandbox.io'}]}
]