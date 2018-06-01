import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App pathname={window.location.pathname} search={window.location.search} />, document.getElementById('root'));
registerServiceWorker();
