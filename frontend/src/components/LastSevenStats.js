import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';

class LastSevenStats extends React.Component {
  render() {
    const tempData = this.props.temps.map(temp => ({a: temp.timestamp*1000,b: parseFloat(temp.temp)}));
    const currentDate = new Date();
    const currentDateTimestamp = currentDate.getTime();
    console.log(currentDateTimestamp);
    const timestampSevenDays = currentDateTimestamp - (7 * 24 * 60 * 60 * 1000);
    console.log(timestampSevenDays);
    const sevenDaysDataTimestamp = tempData.filter(temp =>{
      return (timestampSevenDays <= temp.a);
    });
    console.log(sevenDaysDataTimestamp);
    const sevenDaysDataAll = sevenDaysDataTimestamp.map(temp =>({a: new Date(temp.a), b: temp.b}));
    console.log(sevenDaysDataAll);
    const sevenDaysData = sevenDaysDataAll.filter(temp => {
      return(
        // Just for now use all data from minute 0 and 1, since generated data was wrong
        ((temp.a.getHours() % 2) === 0) && ((temp.a.getMinutes() === 1) || (temp.a.getMinutes() === 0))
      );
    })
    console.log(sevenDaysData);

    return (
      <div>
        <VictoryChart width={900} height={470} scale={{ x: "time" }} domain={{ y: [0.0,30.0] }}>
            <VictoryLine
              style={{
                data: { stroke: "#f76c6c" },
                labels: {display: "none"}
              }}
              data={ sevenDaysData }
              x="a"
              y="b"
            />
            <VictoryScatter
              labels={(d) => `${d.a.getHours()} Uhr\n${d.b} C`}
              labelComponent={<VictoryTooltip/>}
              style={{ data: { fill: "#f76c6c" }
                    }}
              size={ sevenDaysData.size }
              data={ sevenDaysData }
              x="a"
              y="b"
              />

          </VictoryChart>
      </div>
    );
  }
}

LastSevenStats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default LastSevenStats;
