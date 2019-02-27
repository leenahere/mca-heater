import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
} from 'victory';

class AllStats extends React.Component {
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

    return (
      <div>
        <VictoryChart width={600} height={470} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
            <VictoryLine
              style={{
                data: { stroke: "#f76c6c" }
              }}
              data={ tempData }
              x="a"
              y="b"
            />

          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={600} height={100} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={this.state.zoomDomain}
                onBrushDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "#f76c6c" }
              }}
              data={ tempData }
              x="a"
              y="b"
            />
          </VictoryChart>
      </div>
    );
  }
}

AllStats.propTypes = {
  temps: PropTypes.array.isRequired,
}

export default AllStats;
