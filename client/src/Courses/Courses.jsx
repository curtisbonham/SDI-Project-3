import { useState, useEffect, useRef } from "react";
import "./Courses.css";
import CourseForm from "./CourseForm.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Gantt from "frappe-gantt"; // Import Frappé Gantt
import GanttChart from "./GanttChart.jsx";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import "./frappe-gantt/frappe-gantt.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false); // State to control the delete dialog
  const [selectedCourseId, setSelectedCourseId] = useState(null); // State to store the course ID to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the course form modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
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
          start: course.start_date,
          end: course.end_date,
          progress: course.progress || 0,
          dependencies: course.dependencies || "",
          custom_class: `cert_${course.cert_id}`,
        }));

      if (tasks.length === 0) {
        console.warn("No valid tasks available for the Gantt chart.");
        return;
      }
      new Gantt(ganttContainer.current, tasks, {
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        custom_popup_html: (task) => {
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
        console.log("Courses Data:", coursesData); // Debugging log
        console.log("Certifications Data:", certsData);

        const mergedData = coursesData.map((course) => {
            const cert = certsData.find((cert) => cert.c_id === course.cert_id);
            return {
                ...course,
                start_date: course.start_date,
                end_date: course.end_date,
                position: cert ? cert.position : "N/A",
            };
        });

        setCourses(mergedData);
    } catch (err) {
        console.error("Error fetching data:", err);
    }
};

  const handleOpen = (id) => {
    setSelectedCourseId(id);
    setOpen(true);
  };

  const handleEdit = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    setEdit(true);
    setSelectedCourse(courseToEdit);
    setIsEditModalOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourseId(null);
  };

  const handleEditClose = () => {
    setEdit(false);
    setSelectedCourseId(null);
  };

  const deleteCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3001/courses/${selectedCourseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCourses();
        handleClose();
      } else {
        const errorData = await response.json();
        console.error(errorData.message || "Failed to delete the course.");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (id) => {
    const courseToEdit = courses.find((course) => course.id === id);
    setSelectedCourse(courseToEdit);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <>
      <div className="courses-container">
        <h1>Course Timeline</h1>
        <div className="gantt-chart-container" ref={ganttContainer}></div>
        <GanttChart courses={courses} />
        <button className="add-course-btn" onClick={openModal}>
          Add Course
        </button>

        {/* Modal for Course Form */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Add Course</h3>
              <CourseForm fetchCourses={fetchCourses} course={selectedCourse} />
              <button className="close-modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Course</h3>
              <CourseForm
                fetchCourses={fetchCourses}
                course={selectedCourse}
                edit={true}
                closeEditModal={closeEditModal}
              />
              <button className="close-modal-btn" onClick={closeEditModal}>
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
              {courses.map((crs) => (
                <tr key={crs.id}>
                  <td>{crs.course_name}</td>
                  <td>{crs.start_date}</td>
                  <td>{crs.end_date}</td>
                  <td>{crs.position}</td>
                  <td>
                    <IconButton onClick={() => handleOpen(crs.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(crs.id)}>
                      <EditIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
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
