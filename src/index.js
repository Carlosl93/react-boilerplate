import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import store from './store/Store.js';

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Component  store={store} />
        </AppContainer>,
        document.getElementById('root')
    );

render(App);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept('./components/App', () => render(App));