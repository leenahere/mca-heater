import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from 'victory';

class TodayStats extends React.Component {
  render() {
    const tempData = this.props.temps.map(temp => ({a: temp.timestamp*1000,b: parseFloat(temp.temp)}));
    const currentDate = new Date();
    const currentDateTimestamp = currentDate.getTime();
    const timesstampDay = currentDateTimestamp - (24 * 60 * 60 * 1000);
    const todayData = tempData.filter(temp =>{
      return (timesstampDay <= temp.a);
    });

    // const tempData = this.props.temps.map(temp => ({a: new Date(temp.timestamp*1000),b: parseFloat(temp.temp)}));
    // const currentDate = new Date();
    // const todayData = tempData.filter(temp =>{
    //   return ((temp.a.getFullYear() === currentDate.getFullYear()) && (temp.a.getMonth() === currentDate.getMonth()) && (temp.a.getDate() === currentDate.getDate()));
    // })

    // const testData = [
    //   { a: new Date(2018, 1, 1), b: 125 },
    //   { a: new Date(2018, 4, 1), b: 257 },
    //   { a: new Date(2018, 8, 1), b: 345 },
    //   { a: new Date(2018, 12, 1), b: 515 },
    //   { a: new Date(2019, 1, 1), b: 132 },
    //   { a: new Date(2019, 4, 1), b: 305 },
    //   { a: new Date(2019, 8, 1), b: 270 },
    //   { a: new Date(2019, 12, 1), b: 470 }
    // ];
    //
    // console.log(testData);

    return (
      <div>
        <VictoryChart width={900} height={470} scale={{ x: "time" }} domain={{ y: [0.0,35.0] }}
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

TodayStats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default TodayStats;
