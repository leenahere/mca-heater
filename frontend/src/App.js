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

import Confetti from 'react-dom-confetti';

import './App.css';

const styles = theme => ({
  indicator: {
    backgroundColor: "white"
  }
});

const config = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 10000,
  delay: 0,
  width: "10px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

class App extends Component {
  state = {
    loading: true,
    temps: [],
    tempTargets: [],
    daySettings: [],
    currTemp: null,
    value: 1,
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
  updateTempTargets = (valueCurrent, valueDay, valueNight, dayStart, dayEnd) => {
    var targetid = ""+this.state.tempTargets[0].id;
    var target = ""+valueCurrent;
    var modus = ""+this.state.tempTargets[0].mode;

    axios.put('http://localhost:3000/targets', {
      "id": targetid,
      "targettemp": target,
      "mode": modus
    })
    .then(res => console.log(res))

    targetid = ""+this.state.tempTargets[1].id;
    target = ""+valueDay;
    modus = ""+this.state.tempTargets[1].mode;

    axios.put('http://localhost:3000/targets', {
      "id": targetid,
      "targettemp": target,
      "mode": modus
    })
    .then(res => console.log(res))

    targetid = ""+this.state.tempTargets[2].id;
    target = ""+valueNight;
    modus = ""+this.state.tempTargets[2].mode;

    axios.put('http://localhost:3000/targets', {
      "id": targetid,
      "targettemp": target,
      "mode": modus
    })
    .then(res => console.log(res))

    this.setState({
      tempTargets: update(this.state.tempTargets, {0: {targettemp: {$set: valueCurrent}}})
    })

    this.setState({
      tempTargets: update(this.state.tempTargets, {1: {targettemp: {$set: valueDay}}})
    })

    this.setState({
      tempTargets: update(this.state.tempTargets, {2: {targettemp: {$set: valueNight}}})
    })

    var dayid = ""+this.state.daySettings[0].id;
    var start = ""+dayStart;
    var end = ""+dayEnd;

    axios.put('http://localhost:3000/daysettings', {
      "id": dayid,
      "daystart": start,
      "dayend": end
    })
    .then(res => console.log(res))

    this.setState({
      daySettings: update(this.state.daySettings, {0: {daystart: {$set: dayStart}, dayend: {$set: dayEnd}}})
    })
  }

  componentDidMount() {
    console.log("Component did mount hello");
    axios.get('http://localhost:3000/heater')
        .then(res => this.setState({
          temps: res.data,
          currTemp: res.data.find(function(o){
            return o.timestamp = Math.max.apply(Math, res.data.map(function(o) {
                return o.timestamp;
              }))
            }).temp,
            loading: false
        }))
        .catch(error => {
          console.log(error);
        });

    axios.get('http://localhost:3000/targets')
    .then(res => this.setState({
      tempTargets: res.data,
    }))
    .catch(error => {
      console.log(error);
    });

    axios.get('http://localhost:3000/daysettings')
    .then(res => this.setState({
      daySettings: res.data,
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
            <Header />
            <div style={partyStyle}>
              <Confetti active={ this.state.party } config={ config }/>
              <button onClick={this.onParty}>Party Button</button>
            </div>
            <CurrentTemp currTemp={ this.state.currTemp }/>
            <AppBar style={appBarStyle} position="static">
              <Tabs value={value}
                    classes={{ indicator: classes.indicator }}
                    onChange={this.handleChange}>
                <Tab disableRipple style={tabStyle} label="Statistics" />
                <Tab disableRipple style={tabStyle} label="Settings" />
                <Tab disableRipple style={tabStyle} label="Capacitor" />
              </Tabs>
            </AppBar>
            {value === 0 && <Stats temps={ this.state.temps } />}
            {value === 1 && <Settings updateTempTargets={ this.updateTempTargets } tempTargets={ this.state.tempTargets} daySettings= {this.state.daySettings}/>}
            {value === 2 && <Capacitor />}
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
  backgroundColor: '#24305E',
}

const partyStyle = {
  marginLeft: '100px',
  marginRight: '100px',
}

const tabStyle = {
  fontSize: '20px',
  color: 'white',
  fontFamily: 'Helvetica',
  fontWeight: 'lighter',
  textTransform: 'capitalize'
}



export default withStyles(styles)(App);
