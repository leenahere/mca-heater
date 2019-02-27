import React from 'react';
import PropTypes from 'prop-types';

import TodayStats from './TodayStats';
import LastSevenStats from './LastSevenStats';
import LastMonthStats from './LastMonthStats';
import AllStats from './AllStats';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Stats extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Today" />
            <Tab label="Last 7 Days" />
            <Tab label="Last Month" />
            <Tab label="All" />
          </Tabs>
        </AppBar>
        {value === 0 && <TodayStats temps={ this.props.temps } />}
        {value === 1 && <LastSevenStats temps={ this.props.temps } />}
        {value === 2 && <LastMonthStats temps={ this.props.temps } />}
        {value === 3 && <AllStats temps={ this.props.temps } />}
      </div>
    );
  }
}

Stats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default Stats;
