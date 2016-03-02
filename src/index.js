import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import { App } from './App';
import { LineAndCurve } from './examples';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LineAndCurve} />
      <Route path="LineAndCurve" component={LineAndCurve} />
    </Route>
  </Router>
  , document.getElementById('root'));
