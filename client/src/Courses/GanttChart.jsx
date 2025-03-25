import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import './GanttChart.css'

const GanttChart = ({ ganttData, ganttOptions }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleCharts = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://www.gstatic.com/charts/loader.js";
        script.onload = () => {
          console.log("Google Charts script loaded:", window.google);
          window.google.charts.load("current", { packages: ["gantt"] });
          window.google.charts.setOnLoadCallback(() => setIsLoaded(true));
        };
        document.body.appendChild(script);
      } else {
        window.google.charts.load("current", { packages: ["gantt"] });
        window.google.charts.setOnLoadCallback(() => setIsLoaded(true));
      }
    };

    loadGoogleCharts();
  }, []);

  if (!isLoaded) {
    return <div>Loading Chart...</div>;
  }

  if (!ganttData || ganttData.length <= 1) {
    return <div>No data available for the Gantt chart.</div>;
  }

  console.log("is google charts loaded:", isLoaded)

  return (
    <>
    <div className='gantt-chart-container'>
    <h1>Courses Timeline</h1>
    <Chart
      chartType="Gantt"
      width="100%"
      height="400px"
      data={ganttData}
      options={ganttOptions}
      chartPackages={['gantt']}
      chartVersion="current"
    />
    </div>
    </>

  );
};

export default GanttChart;