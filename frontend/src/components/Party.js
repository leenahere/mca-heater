import React from 'react'
import PropTypes from 'prop-types'
import Switch from "react-switch";

import Confetti from 'react-dom-confetti';

class Party extends React.Component {
  render () {
    const config = {
      angle: 90,
      spread: 300,
      startVelocity: 30,
      elementCount: 100,
      dragFriction: 0.1,
      duration: 10000,
      delay: 0,
      width: "10px",
      height: "10px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    return (
      <div style={{display: 'inline-block', float: 'right', marginTop: '30px', marginRight: '20px'}}>
        <Confetti active={ this.props.party } config={ config }/>
        <Switch
          checked={this.props.party}
          onChange={this.props.updateParty.bind()}
          onColor="#00c27b"
          onHandleColor="#00a86b"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={30}
          width={72}
          className="react-switch"
          id="material-switch"
          />
        <div style={{paddingLeft: '10px'}}>
          PARTY!
        </div>
      </div>
    );

  }
}


Party.propTypes = {
  party: PropTypes.object.isRequired,
  updateParty: PropTypes.func.isRequired,
}

export default Party;
