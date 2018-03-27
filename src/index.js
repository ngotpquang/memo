import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// Persist redux
import { PersistGate } from 'redux-persist/integration/react';
import Store from "./configuration/configureStore";

import App from './App';

export const dispatch = Store.store.dispatch;

// const historyModule = createHistory();

// const history = syncHistoryWithStore(historyModule, store);

ReactDOM.render(
    <div className="app">
        <Provider store={Store.store}>
            <PersistGate loading={null} persistor={Store.persistor}>
                <Router>
                    <div>
                        <Route path="/" component={App} />
                    </div>
                </Router>
            </PersistGate>
        </Provider>
    </div>
    , document.getElementById('root')
);
