import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {themes} from "@/modules/themes/utils/themes";
import {RootState} from "@/modules/redux/store/configureStore";
import {DefaultTheme} from "styled-components";

interface themeSliceState {
    active: DefaultTheme;
    themes: DefaultTheme[];
}

const initialState: themeSliceState = {
    active: themes[0],
    themes: themes
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeName>) => {
            state.active = themes.find((theme) => theme.name === action.payload) || state.active
        }
    }
})

type ThemeName = DefaultTheme['name']

export const {setTheme} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;