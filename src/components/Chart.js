import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

class Chart extends Component {
  render() {
    const { data, onPointClick } = this.props;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} onClick={e => onPointClick(e.activePayload[0]?.payload)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default Chart;
