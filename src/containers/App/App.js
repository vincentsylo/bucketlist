import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import styles from './App.css';
import 'normalize.css';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Helmet
          titleTemplate="%s | Bucket List"
          meta={[
            { 'char-set': 'utf-8' },
            {
              name: 'description',
              content: 'Bucket list',
            },
          ]}
        />

        <div className={styles.root}>
          {children}
        </div>

      </div>
    );
  }
}