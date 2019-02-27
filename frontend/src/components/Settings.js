import React from 'react'
import PropTypes from 'prop-types'

import Slider from '@material-ui/lab/Slider';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: '#f76c6c' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

const styles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
});

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
    const { classes } = this.props;

    return(
      <div>
      <div style={explanStyle}>
        In den Einstellungen können die verschiedenen Zieltemperaturen eingestellt werden.
        Die Einstellung der aktuellen Temperatur überschreibt, ja was eigentlich? Vielleicht
        nehmen wir aktuelle Temp einfach raus, das macht nicht wirklich Sinn.
        Dabei können Werte von 0&#8451; bis 30&#8451; eingestellt werden. So oft das Wort
        einstellen. Zusätzlich kann eingestelt werden, von wann bis wann die Temperatur
        für den Tag gelten soll. Die Zeiten für die Nacht errechnen sich automatisch aus den
        verbleibenden der 24 Stunden eines Tages, die zumindest in unserer Welt also normal gelten.
        Um die Einstellungen zu ändern, einfach den Einstellungen ändern Button klicken.
      </div>
      <div style={containerStyle}>
        <div style={settingStyle}>
          <div style={tagSettingStyle}>
            <h3>Aktuell</h3>
            <div style={tempSetFieldStyle}>{(valueCurrent === 0) ? 'Off' : valueCurrent}&#8451;</div>
          </div>
          <MuiThemeProvider theme={muiTheme}>
          <Slider
            value={valueCurrent}
            min={0}
            max={30}
            step={0.5}
            aria-labelledby="label"
            onChange={this.handleChangeCurrent}
            />
        </MuiThemeProvider>
        </div>
        <div style={settingStyle} >
          <div style={tagSettingStyle}>
            <h3>Tag</h3>
            <div style={tempSetFieldStyle}>{(valueDay === 0) ? 'Off' : valueDay}&#8451;</div>
          </div>
          <MuiThemeProvider theme={muiTheme}>
          <Slider
            value={valueDay}
            min={0}
            max={30}
            step={0.5}
            aria-labelledby="label"
            onChange={this.handleChangeDay}
            />
          </MuiThemeProvider>
        </div>
        <div style={settingStyle}>
          <div style={tagSettingStyle}>
            <h3>Nacht</h3>
            <div style={tempSetFieldStyle}>{(valueNight === 0) ? 'Off' : valueNight }&#8451;</div>
          </div>
          <MuiThemeProvider theme={muiTheme}>
          <Slider
            value={valueNight}
            min={0}
            max={30}
            step={0.5}
            aria-labelledby="label"
            onChange={this.handleChangeNight}
            />
          </MuiThemeProvider>
        </div>
        <div style={settingStyle}>
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
      </div>
      <div>
        <button style={btnStyle} onClick={this.props.updateTempTargets.bind(this, valueCurrent, valueDay, valueNight, dayStart, dayEnd)}>Einstellungen ändern</button>
      </div>
      </div>
    );
  }
}

const explanStyle = {
  background: '#24305E',
  color: 'white',
  padding: '20px',
  margin: '20px',
  textAlign: 'justify',
  lineHeight: '1.4',
  fontSize: '14px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
}

const containerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-around'
}

const settingStyle = {
  width: '250px',
  height: '100px',
  textAlign: 'center',
  margin: 'auto'
}

const btnStyle = {
  fontSize: '18px',
  height: '50px',
  width: '50%',
  background: '#D79922',
  color: '#24305E',
  border: 'none',
  padding: '5px 8px',
  borderRadius: '10px',
  cursor: 'pointer',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
}

const tempSetFieldStyle = {
  color: 'white',
  padding: '3px',
  backgroundColor: '#a8d0e6',
  display: 'inline',
  marginLeft: '10px',
  boxShadow: '0 2px 3px rgba(0,0,0,0.16), 0 2px 3px rgba(0,0,0,0.23)'
}

const tagSettingStyle = {
  marginBottom: '20px',
}

Settings.propTypes = {
  daySettings: PropTypes.array.isRequired,
  tempTargets: PropTypes.array.isRequired,
  updateTempTargets: PropTypes.func.isRequired,
}

export default Settings;
