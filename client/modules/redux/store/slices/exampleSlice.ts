import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/modules/redux/store/configureStore";

interface exampleSliceState {
    isBold: boolean;
    isCursive: boolean;
    isUnderlined: boolean;
}

const initialState: exampleSliceState = {
    isBold: false,
    isCursive: false,
    isUnderlined: false
}

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        setIsBold: (state: exampleSliceState, action: PayloadAction<boolean>) => {
            state.isBold = action.payload
        },
        setIsCursive: (state: exampleSliceState, action: PayloadAction<boolean>) => {
            state.isCursive = action.payload
        },
        setIsUnderlined: (state: exampleSliceState, action: PayloadAction<boolean>) => {
            state.isUnderlined = action.payload
        }
    }
})

export const {setIsBold, setIsCursive, setIsUnderlined} = exampleSlice.actions;

export const selectExample = (state: RootState) => state.example;

export default exampleSlice.reducer;