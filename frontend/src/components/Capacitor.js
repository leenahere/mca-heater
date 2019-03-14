import React from 'react'
import PropTypes from 'prop-types'

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from 'victory';

class Capacitor extends React.Component {
  render() {
    const capacitorData = this.props.capacitorValues.map(temp => ({a: new Date(temp.timestamp*1000),b: temp.loadingvalue}));
    const currentDate = new Date();
    const currentDateTimestamp = currentDate.getTime();
    const timestampDay = currentDateTimestamp - (24 * 60 * 60 * 1000);
    const todayData = capacitorData.filter(temp =>{
      return (timestampDay <= temp.a);
    });

    return (
      <div>
        <VictoryChart width={900} height={470} scale={{ x: "time" }} domain={{ y: [0.0,5.0] }}
        >
            <VictoryLine
              style={{
                data: { stroke: "#f76c6c" }
              }}
              data={ todayData }
              x="a"
              y="b"
            />

          </VictoryChart>
      </div>
    );
  }
}

Capacitor.propTypes = {
  capacitorValues: PropTypes.array.isRequired,
}

export default Capacitor;
