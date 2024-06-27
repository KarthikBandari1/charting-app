import React, { Component } from 'react';
import html2canvas from 'html2canvas';

class ExportButton extends Component {
  exportChart = async () => {
    const element = document.getElementById('chart-container');
    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'chart.png';
    link.click();
  };

  render() {
    return (
      <button onClick={this.exportChart}>Export Chart</button>
    );
  }
}

export default ExportButton;
