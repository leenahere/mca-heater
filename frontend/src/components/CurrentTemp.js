import React from 'react'
import PropTypes from 'prop-types'

class CurrentTemp extends React.Component {

  render () {
    return (
        <div style={currentTempStyle}>
          It's <div style={numberStyle}>{ this.props.currTemp }&#8451;</div> in your home right now.
        </div>
    );
  }
}

const currentTempStyle = {
  display: 'inline-block',
  textAlign: 'center',
  margin: '20px',
  fontSize: '30px'
}

const numberStyle = {
  display: 'inline-block',
  color: '#f76c6c',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  padding: '5px', backgroundColor: 'rgba(256, 256, 256, 0.8)'
}

CurrentTemp.propTypes = {
  currTemp: PropTypes.string.isRequired,
}

export default CurrentTemp;
