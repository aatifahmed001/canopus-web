import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './helpers/store';
import App from './pages/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faSpinner, faInfoCircle, faExclamationTriangle, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faPlus, faSpinner, faInfoCircle, faExclamationTriangle, faArrowsAlt)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	,
	document.getElementById('root')
);
