import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Header from './components/layout/Header';
import CurrentTemp from './components/CurrentTemp';
import Stats from './components/Stats';
import Settings from './components/Settings';
import Capacitor from './components/Capacitor';

import './App.css';

class App extends Component {
  state = {
    loading: true,
    temps: [],
    tempTargets: [],
    daySettings: [],
    currTemp: null,
    value: 1
  }

  handleChange = (event, value) => {
    this.setState({ value });
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

    this.state.tempTargets[0].targettemp = valueCurrent;
    this.state.tempTargets[1].targettemp = valueDay;
    this.state.tempTargets[2].targettemp = valueNight;

    var dayid = ""+this.state.daySettings[0].id;
    var start = ""+dayStart;
    var end = ""+dayEnd;

    axios.put('http://localhost:3000/daysettings', {
      "id": dayid,
      "daystart": start,
      "dayend": end
    })
    .then(res => console.log(res))

    this.state.daySettings[0].daystart = dayStart;
    this.state.daySettings[0].dayend = dayEnd;
  }

  componentDidMount() {
    console.log("Component did mount hello");
    axios.get('http://localhost:3000/heater')
        .then(res => this.setState({
          temps: res.data,
          currTemp: res.data.find(function(o){
            return o.timestamp == Math.max.apply(Math, res.data.map(function(o) {
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
    let content;

    if (this.state.loading) {
      content = <div>Loading...</div>;
    } else {
      content =
          <div className="container">
            <Header />
              <ul>
                {this.state.tempTargets.map(hit =>
                  <li key={hit.id}>
                    {hit.mode}, {hit.targettemp}
                  </li>
                )}
              </ul>
            <CurrentTemp currTemp={ this.state.currTemp }/>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Statistics" />
                <Tab label="Settings" />
                <Tab label="Capacitor" />
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



export default App;
