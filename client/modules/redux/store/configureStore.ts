import {combineReducers, configureStore} from '@reduxjs/toolkit'
import example from './slices/exampleSlice';
import theme from '../../themes/redux/themeSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const themePersistConfig = {
    key: 'theme',
    storage,
}

const rootReducer = combineReducers({
    example,
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
export type AppDispatch = typeof store.dispatch