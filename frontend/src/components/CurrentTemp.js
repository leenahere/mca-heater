import React from 'react'
import PropTypes from 'prop-types'

class CurrentTemp extends React.Component {

  render () {
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: 30}}>
        </div>
        <div style={currentTempStyle}>
          <h3>Aktuelle Temperatur</h3>
          <p>{ this.props.currTemp }&#8451;</p>
        </div>
        <div style={{flex: 30}}>
        </div>
      </div>
    );
  }
}

const currentTempStyle = {
  flex: '40',
  backgroundColor: '#D79922',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
  margin: '20px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
}

CurrentTemp.propTypes = {
  currTemp: PropTypes.string.isRequired,
}

export default CurrentTemp;
