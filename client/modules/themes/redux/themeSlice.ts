import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultThemes} from "@/modules/themes/utils/themes";
import {RootState} from "@/modules/redux/store/configureStore";
import {DefaultTheme} from "styled-components";

interface themeSliceState {
    active: DefaultTheme;
    themes: DefaultTheme[];
}

const initialState: themeSliceState = {
    active: defaultThemes[0],
    themes: defaultThemes
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setThemes: (state, action: PayloadAction<DefaultTheme[]>) => {
            state.themes = action.payload;
        },
        setTheme: (state, action: PayloadAction<ThemeName>) => {
            state.active = state.themes.find((theme) => theme.name === action.payload) || state.active
        },
        createTheme: (state, action: PayloadAction<DefaultTheme>) => {
            const theme = action.payload;
            state.themes = [theme, ...state.themes];
            state.active = theme;
        },
        deleteTheme: (state, action: PayloadAction<ThemeName>) => {
            const name = action.payload;
            if(state.active.name === name) {
                state.active = state.themes[state.themes.length - 1];
            }
            state.themes = state.themes.filter(theme => theme.name !== name)
        }
    }
})

type ThemeName = DefaultTheme['name']

export const {setThemes, setTheme, createTheme, deleteTheme} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;