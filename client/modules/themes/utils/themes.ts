import {DefaultTheme} from "styled-components";
import {Theme} from "@/modules/themes/themeClass";

const primary = new Theme('primary', 'linear-gradient(90deg, #8b1bab 0%, #cb6309 100%)',
    'linear-gradient(135deg, #000077, #000033 40%, #000033 80%, #000077)', 'white', '#323264FF',
    'black', '#000077', 'white',
)

const light = new Theme('light', 'aquamarine',
    'gray', 'black', '#323264FF',
    'white', 'gray', 'blue',
)

const red = new Theme('red', 'darkred',
    'darkgreen', 'orange', 'black',
    'brown', 'darkgreen', 'black'
)

export const defaultThemes: DefaultTheme[] = [
    primary,
    light,
    red,
]