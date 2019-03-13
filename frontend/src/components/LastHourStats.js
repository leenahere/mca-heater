import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';

class LastHourStats extends React.Component {
  render() {
    const tempData = this.props.temps.map(temp => ({a: temp.timestamp*1000,b: parseFloat(temp.temp)}));
    const currentDate = new Date();
    const currentDateTimestamp = currentDate.getTime();
    const timesstampLastMonth = currentDateTimestamp - (60 * 60 * 1000);
    const lastMonthDataTimestamp = tempData.filter(temp =>{
      return (timesstampLastMonth <= temp.a);
    });
    const lastMonthDataAll = lastMonthDataTimestamp.map(temp =>({a: new Date(temp.a), b: temp.b}));

    return (
      <div>
        <VictoryChart width={900} height={470} scale={{ x: "time" }} domain={{ y: [0.0,30.0] }}>
            <VictoryLine
              style={{
                data: { stroke: "#f76c6c" },
                labels: {display: "none"}
              }}
              data={ lastMonthDataAll }
              x="a"
              y="b"
            />
            <VictoryScatter
              labels={(d) => `${d.a.getDate()}.${d.a.getMonth()+1}\n${d.a.getHours()} Uhr\n${d.b} C`}
              labelComponent={<VictoryTooltip/>}
              style={{ data: { fill: "#f76c6c" }
                    }}
              size={ lastMonthDataAll.size }
              data={ lastMonthDataAll }
              x="a"
              y="b"
              />

          </VictoryChart>
      </div>
    );
  }
}

LastHourStats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default LastHourStats;
