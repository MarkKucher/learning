import '@/styles/globals.scss'
import '@/styles/prism.scss'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import configureStore from "@/modules/redux/store/configureStore";
import { PersistGate } from 'redux-persist/integration/react'

const store = configureStore().store;

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={configureStore().persistor}>
      <Component {...pageProps}/>
    </PersistGate>
  </Provider>
}
