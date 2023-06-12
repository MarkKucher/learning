import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/modules/redux/store/configureStore";

export enum StatusFilters {
    All = 'all',
    Active = 'active',
    Completed = 'completed'
}

interface filtersState {
    status: StatusFilters,
    colors: string[]
}

const initialState: filtersState = {
    status: StatusFilters.All,
    colors: []
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeStatusFilter(state, action: PayloadAction<StatusFilters>) {
            state.status = action.payload
        },
        changeColorFilter(state, action: PayloadAction<string>) {
            const color = action.payload;
            const {colors} = state;
            if(!colors.includes(color)) {
                colors.push(color)
            } else {
                state.colors = colors.filter(c => c !== color)
            }
        }
    }
})

export const {changeStatusFilter, changeColorFilter} = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;