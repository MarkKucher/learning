import {combineReducers, configureStore} from '@reduxjs/toolkit'
import example from './slices/exampleSlice';
import theme from '../../themes/redux/themeSlice';
import todo from "./slices/todoSlice";
import filters from "./slices/filtersSlice";
import thunk from "./slices/thunkSlice";
import paint from "@/modules/websocket/page/redux/paint";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {postsApi} from "@/modules/redux/store/apis/postsApi";
import nodes from "@/modules/react flow + resend/redux/nodes";

const themePersistConfig = {
    key: 'theme',
    storage,
}

const rootReducer = combineReducers({
    example,
    todo,
    filters,
    thunk,
    paint,
    nodes,
    theme: persistReducer(themePersistConfig, theme),
    [postsApi.reducerPath]: postsApi.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(postsApi.middleware)
})

export default () => {
    let persistor = persistStore(store)
    return { store, persistor }
}

export type RootState = ReturnType<typeof store.getState>
// export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type AppDispatch = typeof store.dispatch