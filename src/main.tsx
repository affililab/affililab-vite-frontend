import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppProvider} from "my-lib";
import {persistor, store} from './redux';
import {routes} from "./routes";
import "typeface-inter";
import 'simplebar-react/dist/simplebar.min.css';
import {LoginModal} from "./components/Auth/LoginModal";
import {Provider} from "react-redux";
import {RegisterModal} from "./components/Auth/RegisterModal";
import {PlanModal} from "./components/Payment/PlanModal";
import {partnerProgramsBackend} from "@config"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppProvider
                logoSettings={{ small:  'http://localhost:3000/static/brand/logo.svg', big: 'http://localhost:3000/static/brand/logo_full.svg' }}
                store={store}
                persistor={persistor}
                apiURL={partnerProgramsBackend.apiURL ?? ''}
                routes={routes}>
            </AppProvider>
        </Provider>
    </React.StrictMode>
);
