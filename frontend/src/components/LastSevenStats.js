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
    const tempData = this.props.temps.map(temp => ({a: new Date(temp.timestamp*1000),b: parseFloat(temp.temp)}));
    const currentDate = new Date();
    const sevenDaysData = tempData.filter(temp =>{
      return ((temp.a.getFullYear() === currentDate.getFullYear()) &&
              (temp.a.getMonth() === currentDate.getMonth()) &&
              (temp.a.getDate() >= (currentDate.getDate()-7)) &&
              ((temp.a.getHours() === 0) || (temp.a.getHours() === 6) || (temp.a.getHours() === 12) || (temp.a.getHours() === 18) || (temp.a.getHours() === 23)) &&
              (temp.a.getMinutes() === 0)
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
