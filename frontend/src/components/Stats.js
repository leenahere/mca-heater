import React from 'react';
import PropTypes from 'prop-types';

import TodayStats from './TodayStats';
import LastSevenStats from './LastSevenStats';
import LastMonthStats from './LastMonthStats';
import LastHourStats from './LastHourStats';
import AllStats from './AllStats';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from "@material-ui/core/styles/";

const styles = theme => ({
  indicator: {
    backgroundColor: '#f76c6c'
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
            <Tab disableRipple style={tabAddStyle} label="Last Hour" />
            <Tab disableRipple style={tabStyle} label="Today" />
            <Tab disableRipple style={tabStyle} label="Last Week" />
            <Tab disableRipple style={tabStyle} label="Last Month" />
          </Tabs>
        </AppBar>
        {value === 0 && <LastHourStats temps={ this.props.temps } />}
        {value === 1 && <TodayStats temps={ this.props.temps } />}
        {value === 2 && <LastSevenStats temps={ this.props.temps } />}
        {value === 3 && <LastMonthStats temps={ this.props.temps } />}
      </div>
    );
  }
}

const appBarStyle = {
  marginTop: '20px',
  backgroundColor: '#e3e2df',
  boxShadow: 'none',
}

const tabStyle = {
  fontSize: '16px',
  color: '#666666',
  fontWeight: 'lighter',
  borderWidth: '1px 1px 1px 0px',
  borderStyle: 'solid',
  textTransform: 'capitalize'
}

const tabAddStyle = {
  fontSize: '16px',
  color: '#666666',
  fontWeight: 'lighter',
  borderWidth: '1px 1px 1px 1px',
  borderStyle: 'solid',
  textTransform: 'capitalize'
}

Stats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default withStyles(styles)(Stats);
