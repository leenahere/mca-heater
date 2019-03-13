import React, { Component } from 'react';

import axios from 'axios';
import update from 'react-addons-update';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { withStyles } from "@material-ui/core/styles/";

import Header from './components/layout/Header';
import CurrentTemp from './components/CurrentTemp';
import Stats from './components/Stats';
import Settings from './components/Settings';
import Capacitor from './components/Capacitor';
import Consumption from './components/Consumption';
import Party from './components/Party';

import './App.css';

const styles = theme => ({
  indicator: {
    backgroundColor: '#f76c6c'
  }
});

class App extends Component {
  state = {
    loading: true,
    temps: [],
    tempTargets: [],
    daySettings: [],
    capacitorValues: [],
    currTemp: null,
    value: 2,
    party: false,
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  onParty = (event) => {
    var currentParty = this.state.party;
    currentParty = !currentParty
    this.setState({ party: currentParty});
  };

  // Very yucky solution, but it works. Would be better to change data model for targets in database
  updateTempTargets = (valueDay, valueNight, dayStart, dayEnd) => {
    var locationUrl = 'http://'  + window.location.hostname + ':3000';
    var targetid = ""+this.state.tempTargets[1].id;
    var target = ""+valueDay;
    var modus = ""+this.state.tempTargets[1].mode;

    axios.put(locationUrl + '/targets', {
      "id": targetid,
      "targettemp": target,
      "mode": modus
    })
    .then(res => console.log(res))

    targetid = ""+this.state.tempTargets[2].id;
    target = ""+valueNight;
    modus = ""+this.state.tempTargets[2].mode;

    axios.put(locationUrl + '/targets', {
      "id": targetid,
      "targettemp": target,
      "mode": modus
    })
    .then(res => console.log(res))

    this.setState({
      tempTargets: update(this.state.tempTargets, {1: {targettemp: {$set: valueDay}}})
    })

    this.setState({
      tempTargets: update(this.state.tempTargets, {2: {targettemp: {$set: valueNight}}})
    })

    var dayid = ""+this.state.daySettings.id;
    var start = ""+dayStart;
    var end = ""+dayEnd;

    axios.put(locationUrl + '/daysettings', {
      "id": dayid,
      "daystart": start,
      "dayend": end
    })
    .then(res => console.log(res))

    this.setState({
      daySettings: update(this.state.daySettings, {daystart: {$set: dayStart}, dayend: {$set: dayEnd}})
    })
  }

  componentDidMount() {
    console.log("Component did mount hello");
    var locationUrl = 'http://'  + window.location.hostname + ':3000';
    axios.get(locationUrl + '/heater')
        .then(res => this.setState({
          temps: res.data,
          loading: false
        }))
        .catch(error => {
          console.log(error);
        });

    axios.get(locationUrl + '/heater-latest')
    .then(res => this.setState({
      currTemp: res.data.temp,
    }))
    .catch(error => {
      console.log(error);
    });

    axios.get(locationUrl + '/targets')
    .then(res => this.setState({
      tempTargets: res.data,
    }))
    .catch(error => {
      console.log(error);
    });

    axios.get(locationUrl + '/daysettings')
    .then(res => this.setState({
      daySettings: res.data,
    }))
    .catch(error => {
      console.log(error);
    });

    axios.get(locationUrl + '/capacitor')
    .then(res => this.setState({
      capacitorValues: res.data,
    }))
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    let content;

    if (this.state.loading) {
      content = <div>Loading...</div>;
    } else {
      content =
          <div className="container">
            <div style={{textAlign:'center'}}>
              <CurrentTemp currTemp={ this.state.currTemp }/>
              <Party party={ this.state.party } updateParty={ this.onParty }/>
            </div>
            <AppBar style={appBarStyle} position="static">
              <Tabs value={value}
                    classes={{ indicator: classes.indicator }}
                    onChange={this.handleChange}>
                <Tab disableRipple style={tabStyle} label="Statistics" />
                <Tab disableRipple style={tabStyle} label="Consumption & Costs" />
                <Tab disableRipple style={tabStyle} label="Settings" />
                <Tab disableRipple style={tabStyle} label="Capacitor" />
              </Tabs>
            </AppBar>
            {value === 0 && <Stats temps={ this.state.temps } />}
            {value === 1 && <Consumption />}
            {value === 2 && <Settings updateTempTargets={ this.updateTempTargets } tempTargets={ this.state.tempTargets} daySettings= {this.state.daySettings}/>}
            {value === 3 && <Capacitor capacitorValues={ this.state.capacitorValues }/>}
          </div>;
    }

    return (
      <div className="App">
        { content }
      </div>
    );
  }
}

const appBarStyle = {
  backgroundColor: '#e3e2df',
  boxShadow: 'none',
}

const tabStyle = {
  fontSize: '20px',
  color: '#666666',
  fontWeight: 'lighter',
  textTransform: 'capitalize'
}



export default withStyles(styles)(App);
