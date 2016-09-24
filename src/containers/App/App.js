import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import 'normalize.css';
import styles from './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    const { children } = this.props;

    return (
      <div className={styles.root}>
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
        <Header />

        <div className={styles.page}>
          {children}
        </div>

        <Footer />
      </div>
    );
  }
}
