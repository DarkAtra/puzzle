import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Puzzle} from './app/puzzle';
import {store} from './app/store';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Puzzle maxWidth={'min(350px, 80vw)'} maxHeight={'min(350px, 80vh)'}/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
