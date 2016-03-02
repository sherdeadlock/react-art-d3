import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import { App } from './App';
import { LineAndCurve, PieAndDonut } from './examples';

import './index.css';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LineAndCurve} />
      <Route path="LineAndCurve" component={LineAndCurve} />
      <Route path="PieAndDonut" component={PieAndDonut} />
    </Route>
  </Router>
  , document.getElementById('root'));
