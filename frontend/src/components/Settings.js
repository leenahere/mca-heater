import React from 'react'
import PropTypes from 'prop-types'

import Slider from '@material-ui/lab/Slider';

class Settings extends React.Component {
  state = {
    valueCurrent: this.props.tempTargets[0].targettemp,
    valueDay: this.props.tempTargets[1].targettemp,
    valueNight: this.props.tempTargets[2].targettemp,
  };

  handleChangeCurrent = (event, valueCurrent) => {
    this.setState({ valueCurrent });
    console.log(valueCurrent);
  };

  handleChangeDay = (event, valueDay) => {
    this.setState({ valueDay });
    console.log(valueDay);
  };

  handleChangeNight = (event, valueNight) => {
    this.setState({ valueNight });
    console.log(valueNight);
  };

  render () {

    const {valueCurrent, valueDay, valueNight} = this.state;

    return(
      <div style={{padding: '40px'}}>
        <h3>Aktuelle Temperatur</h3>
        <div style={{ display: 'flex', padding: '40px', marginLeft: '100px', marginRight: '20px'}}>
          <p style={{ float: 'left', flex: 1}}>0C</p>
          <Slider
            style={{ float: 'left', width: '400px', flex: 20 }}
            value={valueCurrent}
            min={0}
            max={30}
            step={0.5}
            aria-labelledby="label"
            onChange={this.handleChangeCurrent}
            />
          <p style={{float: 'left', flex: 1}}>30C</p>
          <div style={{marginLeft: '20px', flex: 2}}>
            {valueCurrent}
          </div>
        </div>
        <h3>Tag</h3>
        <div style={{ display: 'flex', padding: '40px', marginLeft: '100px', marginRight: '20px'}}>
          <p style={{ float: 'left', flex: 1}}>0C</p>
          <Slider
            style={{ float: 'left', width: '400px', flex: 20 }}
            value={valueDay}
            min={0}
            max={30}
            step={0.5}
            aria-labelledby="label"
            onChange={this.handleChangeDay}
            />
          <p style={{float: 'left', flex: 1}}>30C</p>
          <div style={{marginLeft: '20px', flex: 2}}>
            {valueDay}
          </div>
        </div>
        <h3>Nacht</h3>
        <div style={{ display: 'flex', padding: '40px', marginLeft: '100px', marginRight: '20px'}}>
          <p style={{ float: 'left', flex: 1}}>0C</p>
          <Slider
            style={{ float: 'left', width: '400px', flex: 20 }}
            value={valueNight}
            min={0}
            max={30}
            step={0.5}
            aria-labelledby="label"
            onChange={this.handleChangeNight}
            />
          <p style={{float: 'left', flex: 1}}>30C</p>
          <div style={{marginLeft: '20px', flex: 2}}>
            {valueNight}
          </div>
        </div>

        <button style={btnStyle} onClick={this.props.updateTempTargets.bind(this, valueCurrent, valueDay, valueNight)}>Submit</button>
      </div>
    );
  }
}

const btnStyle = {
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 8px',
  borderRadius: '10%',
  cursor: 'pointer',
}

Settings.propTypes = {
  tempTargets: PropTypes.array.isRequired,
  updateTempTargets: PropTypes.func.isRequired,
}

export default Settings;
