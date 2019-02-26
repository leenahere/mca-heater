import React from 'react'
import PropTypes from 'prop-types'

class CurrentTemp extends React.Component {

  render () {
    return (
      <div>
        <h3>Aktuelle Temperatur</h3>
        <p>{ this.props.currTemp }</p>
      </div>
    );
  }
}

CurrentTemp.propTypes = {
  currTemp: PropTypes.string.isRequired,
}

export default CurrentTemp;
