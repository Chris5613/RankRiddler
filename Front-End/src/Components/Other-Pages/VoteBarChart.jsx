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
  ChartDataLabels 
);

const VoteBarChart = ({ votePercentages }) => {
  const chartData = {
    labels: Object.keys(votePercentages),
    datasets: [
      {
        label: 'Vote Percentages',
        data: Object.values(votePercentages).map(value => parseFloat(value)),
        backgroundColor: [
          '#5d5b65',
          '#804a00',
          '#b7c1cd',
          '#da9100',
          '#0f2f4f',
          '#733380',
          '#44895b', 
          '#6e0202', 
          '#797f03', 
        ],
      }
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false, // This will remove the X axis lines
          drawBorder: false, // Optional: remove the axis border as well
        },
      },
      y: {
        grid: {
          display: false, // This will remove the Y axis lines
          drawBorder: false, // Optional: remove the axis border as well
        },
        ticks: {
          display: false // Optional: hide the Y axis ticks (labels)
        }
      }
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
