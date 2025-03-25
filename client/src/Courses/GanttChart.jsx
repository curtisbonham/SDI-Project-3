import React, { useEffect, useRef, memo } from "react";
import Gantt from "frappe-gantt"; // Import Frappé Gantt
import "./GanttChart.css";
import "./frappe-gantt/frappe-gantt.css";

const GanttChart = memo(({ courses }) => {
  const ganttRef = useRef(null); // Reference to the Gantt container

  useEffect(() => {
    if (ganttRef.current) {
      // Clear the container before initializing the Gantt chart
      ganttRef.current.innerHTML = "";

      console.log("Gantt container:", ganttRef.current);
      console.log("Courses data:", courses);

      const tasks = courses
        .filter((course) => {
          if (!course.start_date || !course.end_date) {
            console.warn(`Missing dates for course: ${course.course_name}`);
            return false;
          }

          const startDate = new Date(course.start_date);
          const endDate = new Date(course.end_date);
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
            console.warn(`Invalid date range for course: ${course.course_name}`);
            return false;
          }

          return true;
        })
        .map((course, index) => ({
          id: course.id || `Course-${index + 1}`,
          name: course.course_name || `Course ${index + 1}`,
          start: course.start_date,
          end: course.end_date,
          progress: course.progress || 0,
          dependencies: course.dependencies || "",
        }));

      console.log("Validated tasks:", tasks);

      if (tasks.length === 0) {
        console.warn("No valid tasks available for the Gantt chart.");
        return;
      }

      try {
        new Gantt(ganttRef.current, tasks, {
          view_mode: "Day",
          date_format: "YYYY-MM-DD",
          custom_popup_html: (task) => `
            <div class="popup">
              <h5>${task.name}</h5>
              <p>Start: ${task.start}</p>
              <p>End: ${task.end}</p>
              <p>Progress: ${task.progress}%</p>
            </div>
          `,
        });
      } catch (error) {
        console.error("Error initializing Frappé Gantt:", error);
      }
    }
  }, [courses]);

  if (!courses || courses.length === 0) {
    return <div>No data available for the Gantt chart.</div>;
  }

  return (
  <></>
  );
  })

export default GanttChart;