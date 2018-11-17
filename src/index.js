import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import LoadingSpinner from './components/LoadingSpinner';
import './assets/sass/App.scss';

const App = Loadable({
    loader: () => import('./App'),
    loading: LoadingSpinner,
});

ReactDOM.render(<App />, document.getElementById('app'));
