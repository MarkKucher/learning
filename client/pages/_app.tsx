import '@/styles/globals.scss';
import '@/styles/prism.scss';
import type { AppProps } from 'next/app';
import {Provider} from "react-redux";
import configureStore from "@/modules/redux/store/configureStore";
import { PersistGate } from 'redux-persist/integration/react';
import LogRocket from 'logrocket';
import { Manrope } from 'next/font/google';

const manrope = Manrope({subsets: ['latin']});

LogRocket.init('q6xa28/learning-prod');

const store = configureStore().store;

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={configureStore().persistor}>
      <main className={manrope.className}>
        <Component {...pageProps}/>
      </main>
    </PersistGate>
  </Provider>
}
