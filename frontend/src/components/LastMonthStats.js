import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';

class LastMonthStats extends React.Component {
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
    const monthData = tempData.filter(temp =>{
      return ((temp.a.getFullYear() === currentDate.getFullYear()) &&
              (temp.a.getMonth() === currentDate.getMonth()) &&
              ((temp.a.getHours() === 8) || (temp.a.getHours() === 20)) &&
              (temp.a.getMinutes() === 0)
            );
    })

    return (
      <div>
        <VictoryChart width={900} height={470} scale={{ x: "time" }} domain={{ y: [0.0,30.0] }}>
            <VictoryLine
              style={{
                data: { stroke: "tomato" },
                labels: {display: "none"}
              }}
              data={ monthData }
              x="a"
              y="b"
            />
            <VictoryScatter
              labels={(d) => `${d.a.getDate()}.${d.a.getMonth()+1}\n${d.a.getHours()} Uhr\n${d.b} C`}
              labelComponent={<VictoryTooltip/>}
              style={{ data: { fill: "#c43a31" }
                    }}
              size={ monthData.size }
              data={ monthData }
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
