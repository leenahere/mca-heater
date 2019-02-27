import React from 'react'
import PropTypes from 'prop-types'

import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';

class Settings extends React.Component {
  state = {
    valueCurrent: this.props.tempTargets[0].targettemp,
    valueDay: this.props.tempTargets[1].targettemp,
    valueNight: this.props.tempTargets[2].targettemp,
    dayStart: this.props.daySettings[0].daystart,
    dayEnd: this.props.daySettings[0].dayend,
    dayStartString: (this.props.daySettings[0].daystart.length > 1)
      ? `${this.props.daySettings[0].daystart}:00`
      : `0${this.props.daySettings[0].daystart}:00`,
    dayEndString: (this.props.daySettings[0].dayend.length > 1)
      ? `${this.props.daySettings[0].dayend}:00`
      : `0${this.props.daySettings[0].dayend}:00`,
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

    const {valueCurrent, valueDay, valueNight, dayStart, dayEnd, dayStartString, dayEndString} = this.state;

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
            {(valueCurrent === 0) ? 'Off' : valueCurrent}
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
            {(valueDay === 0) ? 'Off' : valueDay}
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
            {(valueNight === 0) ? 'Off' : valueNight }
          </div>
        </div>
        <div>
          <TextField
            id="time"
            label="Start"
            type="time"
            defaultValue={dayStartString}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 3600,
            }}
            onChange={event => {
              const { value } = event.target;
              this.setState({ dayStart: value.substring(0,2) });
            }}
            />
            <TextField
              id="time"
              label="End"
              type="time"
              defaultValue={dayEndString}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 3600,
              }}
              onChange={event => {
                const { value } = event.target;
                this.setState({ dayEnd: value.substring(0,2) });
              }}
              />
        </div>
        <button style={btnStyle} onClick={this.props.updateTempTargets.bind(this, valueCurrent, valueDay, valueNight, dayStart, dayEnd)}>Submit</button>
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
  daySettings: PropTypes.array.isRequired,
  tempTargets: PropTypes.array.isRequired,
  updateTempTargets: PropTypes.func.isRequired,
}

export default Settings;
