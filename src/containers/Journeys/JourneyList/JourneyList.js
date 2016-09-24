import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { journeyActions }  from '../../../store/actions';
import { api } from '../../../utils';
import Journey from '../Journey/Journey';
import styles from './JourneyList.css';

@connect(state => ({ journeys: state.journey.journeys }))
export default class JourneyList extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    journeys: PropTypes.array,
  };

  state = {
    name: '',
  };

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(journeyActions.fetchJourneys()),
    ]);
  }

  componentDidMount() {
    JourneyList.readyOnActions(this.props.dispatch);
  }

  async createJourney(e) {
    e.preventDefault();

    const { name } = this.state;
    await api.post('/journey/create', { name });
    this.setState({ name: '' });
    JourneyList.readyOnActions(this.props.dispatch);
  }

  renderList() {
    const { journeys } = this.props;

    return journeys.map((journey, i) => <Journey key={i} journey={journey} />);
  }

  render() {
    const { name } = this.state;

    return (
      <div className={styles.root}>
        {::this.renderList()}
        <form>
          <label><input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} /></label>
          <button type="submit" onClick={::this.createJourney}>Add</button>
        </form>
      </div>
    );
  }
}