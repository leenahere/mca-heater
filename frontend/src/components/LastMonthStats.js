import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';

class LastMonthStats extends React.Component {
  render() {
    const tempData = this.props.temps.map(temp => ({a: temp.timestamp*1000,b: parseFloat(temp.temp)}));
    const currentDate = new Date();
    const currentDateTimestamp = currentDate.getTime();
    const timesstampLastMonth = currentDateTimestamp - (30 * 24 * 60 * 60 * 1000);
    const lastMonthDataTimestamp = tempData.filter(temp =>{
      return (timesstampLastMonth <= temp.a);
    });
    const lastMonthDataAll = lastMonthDataTimestamp.map(temp =>({a: new Date(temp.a), b: temp.b}));
    const monthData = lastMonthDataAll.filter(temp => {
      return(
        // Just for now use all data from minute 0 and 1, since generated data was wrong
        ((temp.a.getHours() % 4) === 0) && ((temp.a.getMinutes() === 1) || (temp.a.getMinutes() === 0))
      );
    })

    return (
      <div>
        <VictoryChart width={900} height={470} scale={{ x: "time" }} domain={{ y: [0.0,35.0] }}>
            <VictoryLine
              style={{
                data: { stroke: "#f76c6c" },
                labels: {display: "none"}
              }}
              data={ lastMonthDataAll }
              x="a"
              y="b"
            />


          </VictoryChart>
      </div>
    );
  }
}

LastMonthStats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default LastMonthStats;
