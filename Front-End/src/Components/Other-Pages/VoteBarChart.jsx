import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const VoteBarChart = ({ votePercentages }) => {
  const chartData = {
    labels: Object.keys(votePercentages),
    datasets: [
      {
        label: 'Vote Percentages',
        data: Object.values(votePercentages).map(value => parseFloat(value)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(199, 199, 199, 0.2)', // Add more colors as needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)', // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { display: true }, 
      y: {
        display: false, 
        beginAtZero: true,
        suggestedMax: 100, 
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
    plugins: {
      legend: { display: false }, 
      datalabels: {
        color: '#fff', 
        anchor: 'end',
        align: 'top',
        formatter: (value) => {
          return value + '%';
        },
      },
    },
    layout: {
      padding: {
        top:25, 
      },
    },
  };


  return <Bar data={chartData} options={chartOptions} />;
};

export default VoteBarChart;
