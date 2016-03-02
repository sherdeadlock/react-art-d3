import React, { Component } from 'react';
import { Link } from 'react-router'

import * as examples from './examples';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  navList: {
    flex: '0 10em',
    padding: 20,
    overflow: 'auto',
  },
  content: {
    flex: '1',
    padding: 20,
  },
};

export class App extends Component {
  render() {
    const exs = Object.keys(examples).map((example, idx) => {
      return <li key={idx}>
        <Link to={`/${example}`}>{example}</Link>
      </li>;
    });

    return <div style={styles.container}>
      <div style={styles.navList}>
        <ul>
          {exs}
        </ul>
      </div>
      <div style={styles.content}>
        {this.props.children}
      </div>
    </div>;
  }
}
