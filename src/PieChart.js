import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ champ }) => {
    const chartRef = useRef(null);
    let chartInstance = useRef(null);
  
    useEffect(() => {
      if (champ) {
  
        const chartConfig = {
          type: 'pie',
          data: {
            labels: ['Attack', 'Defense', 'Magic', 'Difficulty'],
            datasets: [{
              data: [champ.info.attack, champ.info.defense, champ.info.magic, champ.info.difficulty],
              backgroundColor: ['#1E2328', '#32281E', '#005A82', '#3C3C41']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `${champ.name}'s Attributes`,
              },
            },
          },
        };
  
        if (chartRef && chartRef.current) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
          chartInstance.current = new Chart(chartRef.current, chartConfig);
        }
      }
    }, [champ]);
  
    return (
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    );
  };
  
  export default PieChart;