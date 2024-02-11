import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js/auto";

const MyChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);

    const buildChart = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      const myChartRef = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(myChartRef, {
        type: "pie", // Set chart type to 'pie' for round chart
        data: {
          labels: props.value.reason,
          datasets: [
            {
              label: "",
              data: props.value.amount,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(0, 0, 255, 0.2)",
                "rgba(255, 255, 0, 0.2)",
                "rgba(255, 0, 255, 0.2)",
                "rgba(0, 255, 255, 0.2)",
                "rgba(128, 0, 128, 0.2)",
                "rgba(128, 128, 0, 0.2)",
                "rgba(0, 128, 128, 0.2)",
                "rgba(128, 128, 128, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(0, 0, 255, 0.2)",
                "rgba(255, 255, 0, 0.2)",
                "rgba(255, 0, 255, 0.2)",
                "rgba(0, 255, 255, 0.2)",
                "rgba(128, 0, 128, 0.2)",
                "rgba(128, 128, 0, 0.2)",
                "rgba(0, 128, 128, 0.2)",
                "rgba(128, 128, 128, 0.2)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Set to false to adjust chart size
          plugins: {
            legend: {
              position: "right", // Adjust legend position
            },
          },
        },
      });
    };

    buildChart();
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy chart instance on unmount
      }
    };
  }, [props.value]);

  return (
    <div className="for_chart">
      {" "}
      {/* Adjust the size as needed */}
      <canvas  className="for_chart_in" ref={chartRef} />
    </div>
  );
};

export default MyChart;
