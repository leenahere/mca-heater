import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';

class LastSevenStats extends React.Component {
  constructor() {
    super();
    this.state = {
      zoomDomain: { x: [new Date(2019, 1, 1), new Date(2019, 2, 25)] },

    };
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const tempData = this.props.temps.map(temp => ({a: temp.timestamp*1000,b: parseFloat(temp.temp)}));
    const currentDate = new Date();
    const currentDateTimestamp = currentDate.getTime();
    const timestampSevenDays = currentDateTimestamp - (7 * 24 * 60 * 60 * 1000);
    const sevenDaysDataTimestamp = tempData.filter(temp =>{
      return (timestampSevenDays <= temp.a);
    });
    const sevenDaysDataAll = sevenDaysDataTimestamp.map(temp =>({a: new Date(temp.a), b: temp.b}));
    const sevenDaysData = sevenDaysDataAll.filter(temp => {
      return(
        ((temp.a.getHours() % 2) === 0) && (temp.a.getMinutes() === 0)
      );
    })

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
