import React from 'react';
import PropTypes from 'prop-types';

import TodayStats from './TodayStats';
import LastSevenStats from './LastSevenStats';
import LastMonthStats from './LastMonthStats';
import AllStats from './AllStats';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from "@material-ui/core/styles/";

const styles = theme => ({
  indicator: {
    backgroundColor: "white"
  }
});

class Stats extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <AppBar style={appBarStyle} position="static">
          <Tabs value={value} classes={{ indicator: classes.indicator }} onChange={this.handleChange}>
            <Tab disableRipple style={tabStyle} label="Today" />
            <Tab disableRipple style={tabStyle} label="Last 7 Days" />
            <Tab disableRipple style={tabStyle} label="Last Month" />
            <Tab disableRipple style={tabStyle} label="All" />
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

const appBarStyle = {
  backgroundColor: '#374785',
}

const tabStyle = {
  fontSize: '16px',
  fontWeight: 'lighter',
  color: 'white',
  fontFamily: 'Helvetica',
  textTransform: 'capitalize'
}

Stats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default withStyles(styles)(Stats);
