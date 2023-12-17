// ChartSelector.tsx

import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library

interface ChartSelectorProps {}

const ChartSelector: React.FC<ChartSelectorProps> = () => {
  const [selectedChart, setSelectedChart] = useState<string>('table');

  useEffect(() => {
    renderChart(selectedChart);
  }, [selectedChart]);

  const updateChart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChart(event.target.value);
  };

  const renderChart = (chartType: string) => {
    // Clear existing chart if any
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      chartContainer.innerHTML = '';

      if (chartType === 'table') {
        renderTableChart();
      } else if (chartType === 'pie') {
        renderPieChart();
      } else if (chartType === 'line') {
        renderLineChart();
      } else if (chartType === 'bar') {
        renderBarChart();
      }
    }
  };

  const renderTableChart = () => {
    // Logic to render table chart
    const tableChart = document.createElement('div');
    tableChart.innerHTML = '<p>Table Chart will be displayed here</p>';
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      chartContainer.appendChild(tableChart);
    }
  };

  const renderPieChart = () => {
    // Logic to render pie chart using Chart.js
    const pieChartCanvas = document.createElement('canvas');
    pieChartCanvas.id = 'myPieChart';
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      chartContainer.appendChild(pieChartCanvas);

      // Example data
      const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: ['red', 'blue', 'yellow'],
        }]
      };

      // Render the pie chart
      new Chart(pieChartCanvas, {
        type: 'pie',
        data: data,
      });
    }
  };

  const renderLineChart = () => {
    // Logic to render line chart using Chart.js
    // Similar to renderPieChart but with different data and chart type
  };

  const renderBarChart = () => {
    // Logic to render bar chart using Chart.js
    // Similar to renderPieChart but with different data and chart type
  };

  return (
    <div>
      <label htmlFor="chartType">Select Chart Type:</label>
      <select id="chartType" onChange={updateChart} value={selectedChart}>
        <option value="table">Table</option>
        <option value="pie">Pie Chart</option>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>

      <div id="chartContainer">
        {/* Chart will be rendered here */}
      </div>
    </div>
  );
};

export default ChartSelector;
