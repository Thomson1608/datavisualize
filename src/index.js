import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { HelmetProvider } from 'react-helmet-async';

import { store, persistor } from './store';
import * as serviceWorker from './serviceWorker';

import App from './App';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<div />} persistor={persistor}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.register();