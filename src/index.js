// entry point

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { whiteboardApp } from './reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { INITIAL_STATE } from './reducers/initialstate'

let store = createStore(whiteboardApp, INITIAL_STATE);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();