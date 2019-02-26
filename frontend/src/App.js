import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Header from './components/layout/Header';
import CurrentTemp from './components/CurrentTemp';
import Stats from './components/Stats';

import './App.css';

class App extends Component {
  state = {
    loading: true,
    temps: [],
    currTemp: null,
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
  }

  render() {
    let content;

    if (this.state.loading) {
      content = <div>Loading...</div>;
    } else {
      content =
          <div className="container">
            <Header />
            <CurrentTemp currTemp={ this.state.currTemp }/>
            <Stats temps={ this.state.temps } />
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
