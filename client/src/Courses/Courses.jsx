import { useState, useEffect, useRef } from "react";
import "./Courses.css";
import CourseForm from "./CourseForm.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Gantt from "frappe-gantt"; // Import Frappé Gantt
import GanttChart from './GanttChart.jsx'
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import "./frappe-gantt/frappe-gantt.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false); // State to control the delete dialog
  const [selectedCourseId, setSelectedCourseId] = useState(null); // State to store the course ID to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the course form modal
  const ganttContainer = useRef(null); // Reference to the Gantt chart container

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (ganttContainer.current) {
      // Validate and transform courses data for Frappé Gantt
      const tasks = courses
        .filter((course) => {
          // Ensure both start_date and end_date exist
          if (!course.start_date || !course.end_date) {
            console.warn(`Missing dates for course: ${course.course_name}`);
            return false;
          }

          // Validate date format and range
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
          start: course.start_date, // Format: YYYY-MM-DD
          end: course.end_date, // Format: YYYY-MM-DD
          progress: course.progress || 0,
          dependencies: course.dependencies || "",
        }));

      if (tasks.length === 0) {
        console.warn("No valid tasks available for the Gantt chart.");
        return;
      }

      // Initialize Frappé Gantt
      new Gantt(ganttContainer.current, tasks, {
        view_mode: "Day", // Options: 'Quarter Day', 'Half Day', 'Day', 'Week', 'Month'
        date_format: "YYYY-MM-DD", // Date format
        custom_popup_html: (task) => {
          // Custom popup for task details
          return `
            <div class="popup">
              <h5>${task.name}</h5>
              <p>Start: ${task.start}</p>
              <p>End: ${task.end}</p>
              <p>Progress: ${task.progress}%</p>
            </div>
          `;
        },
      });
    }
  }, [courses]);

  const fetchCourses = async () => {
    try {
      const [coursesData, certsData] = await Promise.all([
        fetch("http://localhost:3001/courses/").then((res) => res.json()),
        fetch("http://localhost:3001/courses/certs").then((res) => res.json()),
      ]);

      const mergedData = coursesData.map((course) => {
        const cert = certsData.find((cert) => cert.c_id === course.cert_id);

        return {
          ...course,
          position: cert ? cert.position : "N/A",
        };
      });
      setCourses(mergedData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleOpen = (id) => {
    setSelectedCourseId(id); // Set the course ID to delete
    setOpen(true); // Open the delete dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the delete dialog
    setSelectedCourseId(null); // Clear the selected course ID
  };

  const deleteCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3001/courses/${selectedCourseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCourses(); // Re-fetch courses after deletion
        handleClose(); // Close the dialog
      } else {
        const errorData = await response.json();
        console.error(errorData.message || "Failed to delete the course.");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const openModal = () => setIsModalOpen(true); // Open the course form modal
  const closeModal = () => setIsModalOpen(false); // Close the course form modal

  return (
    <>
      <div className="courses-container">
        <h1>Course Timeline</h1>
        <div className="gantt-chart-container" ref={ganttContainer}></div>
        <GanttChart courses={courses}/>
        {/* Add Course Button */}
        <button className="add-course-btn" onClick={openModal}>
          Add Course
        </button>

        {/* Modal for Course Form */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Add Course</h3>
              <CourseForm fetchCourses={fetchCourses} />
              <button className="close-modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}

        <div className="course-information-container">
          <h2>Courses Information</h2>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Certified Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((crs) => {
                const formattedStartDate = new Date(crs.start_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                const formattedEndDate = new Date(crs.end_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <tr key={crs.id}>
                    <td>{crs.course_name}</td>
                    <td>{formattedStartDate}</td>
                    <td>{formattedEndDate}</td>
                    <td>{crs.position}</td>
                    <td>
                      <IconButton onClick={() => handleOpen(crs.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Dialog for confirmation */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteCourse} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Courses;
