import React, { Component } from 'react';
import Chart from './components/Chart';
import TimeframeSelector from './components/TimeframeSelector';
import ExportButton from './components/ExportButton';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      view: 'daily'
    };
  }

  componentDidMount() {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  transformData = (data, view) => {
    switch(view) {
      case 'weekly':
        return this.transformToWeekly(data);
      case 'monthly':
        return this.transformToMonthly(data);
      default:
        return data;
    }
  };
  
  transformToWeekly = (data) => {
    // Assuming data is sorted by timestamp
    const weeklyData = [];
    let currentWeek = null;
    
    data.forEach(point => {
      const date = new Date(point.timestamp);
      const weekNumber = this.getWeekNumber(date);
      
      if (!currentWeek || currentWeek !== weekNumber) {
        currentWeek = weekNumber;
        weeklyData.push({
          week: currentWeek,
          value: point.value
        });
      } else {
        weeklyData[weeklyData.length - 1].value += point.value;
      }
    });
  
    return weeklyData;
  };
  
  transformToMonthly = (data) => {
    // Assuming data is sorted by timestamp
    const monthlyData = [];
    let currentMonth = null;
    
    data.forEach(point => {
      const date = new Date(point.timestamp);
      const month = date.getMonth() + 1; // getMonth() returns 0-11
  
      if (!currentMonth || currentMonth !== month) {
        currentMonth = month;
        monthlyData.push({
          month: currentMonth,
          value: point.value
        });
      } else {
        monthlyData[monthlyData.length - 1].value += point.value;
      }
    });
  
    return monthlyData;
  };
  
  getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  

  handlePointClick = (dataPoint) => {
    alert(`Clicked on data: ${dataPoint.value} at ${dataPoint.timestamp}`);
  };

  render() {
    const { data, view } = this.state;
    const transformedData = this.transformData(data, view);

    return (
      <div className="App">
        <TimeframeSelector onSelect={(view) => this.setState({ view })} />
        <div id="chart-container">
          <Chart data={transformedData} onPointClick={this.handlePointClick} />
        </div>
        <ExportButton />
      </div>
    );
  }
}

export default App;
