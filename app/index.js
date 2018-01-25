import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import {Iterable} from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import {assign, mapValues} from 'lodash';

import reducers from './reducers/index';

import Main from './layouts/Main';
import HelloView from './views/Hello';
import HomeView from './views/Home';

const store = createStore(
    combineReducers(
        assign(
            reducers, {
                form: formReducer,
                routing: routerReducer
            }
        )
    ),
    applyMiddleware(thunk, routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

const Application = () => (
    <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Main}>
              <IndexRoute component={HomeView}/>
              <Route path="hello" component={HelloView}/>
          </Route>
        </Router>
    </Provider>
);

render(<Application />, document.getElementById('root'));