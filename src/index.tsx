// entry point

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import './style/react-datetime.css';
import './style/bootstrap.css';
import './style/dashboard.css';
import App from './components/App';
import whiteboardApp from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { INITIAL_STATE } from './reducers/initialstate';
import { DragDropContext } from 'react-beautiful-dnd';
import { onDragEnd, onDragUpdate } from './util/dragDropHooks';

const store = createStore(whiteboardApp, INITIAL_STATE,
                          composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <DragDropContext onDragEnd={onDragEnd(store.dispatch)} onDragUpdate={onDragUpdate}>
            <App />
        </DragDropContext>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
