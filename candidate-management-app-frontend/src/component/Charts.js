import React, { Component } from 'react';
import '../App.css';
import PieChartComponent from './Dashboard/PieChartComponent';

class Charts extends Component {
  render() {
    return (
      <div className="container">
		<PieChartComponent/>
      </div>
    );
  }
}

export default Charts;
