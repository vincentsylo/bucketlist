import React, { Component, PropTypes } from 'react';
import styles from './TutorialList.css';

export default class TutorialList extends Component {
  static propTypes = {
    completeTutorial: PropTypes.func,
    tutorials: PropTypes.array.isRequired,
  };

  state = {
    selectedIndex: 0,
  };

  render() {
    const { tutorials } = this.props;
    const count = tutorials.length;

    return (
      <div className={styles.root}>
        <div className={styles.main}>
          <div className={styles.content}>
            hey
          </div>
          <div className={styles.image}>

          </div>
        </div>
        <div className={styles.counter}>
          {tutorials.map((tutorial, i) => <span key={i} className={styles.count} />)}
        </div>
        <div className={styles.buttons}>

        </div>
      </div>
    );
  }
}
