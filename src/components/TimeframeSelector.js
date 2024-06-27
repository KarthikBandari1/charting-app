import React, { Component } from 'react';

class TimeframeSelector extends Component {
  render() {
    const { onSelect } = this.props;

    return (
      <div className="buttons">
        <button onClick={() => onSelect('daily')}>Daily</button>
        <button onClick={() => onSelect('weekly')}>Weekly</button>
        <button onClick={() => onSelect('monthly')}>Monthly</button>
      </div>
    );
  }
}

export default TimeframeSelector;
