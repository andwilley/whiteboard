// entry point

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import './style/react-datetime.css';
import './style/bootstrap.css';
import './style/dashboard.css';
import App from './components/App';
import whiteboardApp from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { INITIAL_STATE } from './reducers/initialstate';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

const store = createStore(whiteboardApp, INITIAL_STATE,
                          compose(applyMiddleware(thunk),
                                  window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                  window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
