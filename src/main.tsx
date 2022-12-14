import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppProvider} from "my-lib";
import {persistor, store} from './redux';
import {routes} from "./routes";
import "typeface-inter";
import 'simplebar-react/dist/simplebar.min.css';
import {Provider} from "react-redux";
import {partnerProgramsBackend} from "@config"
import 'react-quill/dist/quill.snow.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppProvider
                logoSettings={{ small:  '/static/brand/logo.svg', big: '/static/brand/logo_full.svg' }}
                store={store}
                persistor={persistor}
                apiURL={partnerProgramsBackend.apiURL ?? ''}
                routes={routes}>
            </AppProvider>
        </Provider>
    </React.StrictMode>
);
