import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        changeColorFilter: {
            reducer(state, action: PayloadAction<{color: string, changeType: 'added' | 'removed'}>) {
                const {color, changeType} = action.payload
                const {colors} = state;
                switch (changeType) {
                    case "added":
                        if(!colors.includes(color)) {
                            colors.push(color)
                        }
                        break
                    case "removed":
                        state.colors = colors.filter(existingColor => existingColor !== color)
                    default:
                        return
                }
            },
            prepare(color: string, changeType: 'added' | 'removed') {
                return {
                    payload: {color, changeType}
                }
            }
        }
    }
})

export const {changeStatusFilter, changeColorFilter} = filtersSlice.actions;

export default filtersSlice.reducer;