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

import './App.css';

class App extends Component {
  state = {
    loading: true,
    temps: [],
    tempTargets: [],
    currTemp: null,
    value: 1
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // Very yucky solution, but it works. Would be better to change data model for targets in database
  updateTempTargets = (valueCurrent, valueDay, valueNight) => {
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

    var targetid = ""+this.state.tempTargets[2].id;
    var target = ""+valueNight;
    var modus = ""+this.state.tempTargets[2].mode;

    axios.put('http://localhost:3000/targets', {
      "id": targetid,
      "targettemp": target,
      "mode": modus
    })
    .then(res => console.log(res))

    this.state.tempTargets[0].targettemp = valueCurrent;
    this.state.tempTargets[1].targettemp = valueDay;
    this.state.tempTargets[2].targettemp = valueNight;
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
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
              </Tabs>
            </AppBar>
            {value === 0 && <Stats temps={ this.state.temps } />}
            {value === 1 && <Settings updateTempTargets={ this.updateTempTargets } tempTargets={ this.state.tempTargets} />}
            {value === 2 && <h1>HEEEY 2</h1>}
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
