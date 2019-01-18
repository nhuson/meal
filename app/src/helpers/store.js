import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

const middleware = [ thunk ];
middleware.push(routerMiddleware(browserHistory));
if(process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
);

export default store;
