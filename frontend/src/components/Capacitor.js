import React from 'react'
import PropTypes from 'prop-types'

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from 'victory';

class Capacitor extends React.Component {
  render() {
    const tempData = this.props.capacitorValues.map(temp => ({a: new Date(temp.timestamp*1000),b: temp.loadingvalue}));
    const currentDate = new Date();
    const todayData = tempData.filter(temp =>{
      return ((temp.a.getFullYear() === currentDate.getFullYear()) && (temp.a.getMonth() === currentDate.getMonth()) && (temp.a.getDate() === currentDate.getDate()));
    })

    return (
      <div>
        <VictoryChart width={900} height={470} scale={{ x: "time" }} domain={{ y: [0.0,30.0] }}
        >
            <VictoryLine
              style={{
                data: { stroke: "#f76c6c" }
              }}
              data={ todayData }
              x="a"
              y="b"
            />
            <VictoryScatter
              style={{ data: { fill: "#f76c6c" } }}
              size={ todayData.size }
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
