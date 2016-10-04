import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { api } from '../../utils';
import { journeyActions } from '../../store/actions';
import styles from './TripSelector.css';
import journeyImg from '../../images/shibuya.jpg';

@connect(state => ({ journeys: state.journey.journeys }))
export default class TripSelector extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    journeys: PropTypes.array,
  };

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(journeyActions.fetchJourneys()),
    ]);
  }

  constructor(props) {
    super(props);

    this.createJourney = ::this.createJourney;
  }

  state = {
    name: '',
    date: '',
    origin: '',
  };

  componentDidMount() {
    TripSelector.readyOnActions(this.props.dispatch);
  }

  async createJourney(e) {
    e.preventDefault();

    const { name } = this.state;
    await api.post('/journey/create', { name });
    this.setState({ name: '', date: '', origin: '' });
    TripSelector.readyOnActions(this.props.dispatch);
  }

  render() {
    const { journeys } = this.props;
    const { name, origin } = this.state;

    return (
      <div className={styles.root}>
        {
          journeys.map((journey, i) => (
            <div className={styles.journeyRoot}>
              <img src={journeyImg} className={styles.journeyImg} />
              {journey.name}
            </div>
          ))
        }

        <form method="POST" onSubmit={this.createJourney}>
          <label>Name your journey <input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} /></label>
          <label>Departing on <DatePicker /></label>
          <label>Origin <input type="text" value={origin} onChange={e => this.setState({ origin: e.target.value })} /></label>
          <button type="submit">Create your trip</button>
        </form>
      </div>
    )
  }
}
