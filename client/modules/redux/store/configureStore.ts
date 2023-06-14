import {combineReducers, configureStore} from '@reduxjs/toolkit'
import example from './slices/exampleSlice';
import theme from '../../themes/redux/themeSlice';
import todo from "./slices/todoSlice";
import filters from "./slices/filtersSlice";
import thunk from "./slices/thunkSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const themePersistConfig = {
    key: 'theme',
    storage,
}

const rootReducer = combineReducers({
    example,
    todo,
    filters,
    thunk,
    theme: persistReducer(themePersistConfig, theme)
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export default () => {
    let persistor = persistStore(store)
    return { store, persistor }
}

export type RootState = ReturnType<typeof store.getState>
// export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type AppDispatch = typeof store.dispatch