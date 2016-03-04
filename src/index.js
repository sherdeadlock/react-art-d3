import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import { App } from './App';
import { LineAndCurve } from './examples';
import * as examples from './examples';

import './index.css';

const exs = Object.keys(examples).map((ex, i) => {
  const component = examples[ex];
  return <Route key={i} path={ex} component={component} />;
});

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LineAndCurve} />
      { exs }
    </Route>
  </Router>
  , document.getElementById('root'));
