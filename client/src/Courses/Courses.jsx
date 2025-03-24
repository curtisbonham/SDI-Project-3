import { useState, useEffect } from 'react';
import './Courses.css';
import CourseForm from './CourseForm.jsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false); // State to control the dialog
  const [selectedCourseId, setSelectedCourseId] = useState(null); // State to store the course ID to delete

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const [coursesData, certsData] = await Promise.all([
        fetch("http://localhost:3001/courses/").then((res) => res.json()),
        fetch("http://localhost:3001/courses/certs").then((res) => res.json()),
      ]);
      console.log("courses data:", coursesData)
      console.log("certs data:", certsData)
      const mergedData = coursesData.map((course) => {
        const cert = certsData.find((cert) => cert.c_id === course.cert_id);

        console.log('course.cert_id:', course.cert_id, 'cert.c_id:', cert ? cert.c_id : 'No cert found');


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
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    setSelectedCourseId(null); // Clear the selected course ID
  };

  const deleteCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3001/courses/${selectedCourseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCourses(); // Re-fetch courses after deletion
        handleClose(); // Close the dialog
      } else {
        const errorData = await response.json();
        console.error(errorData.message || 'Failed to delete the course.');
      }
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  return (
    <div className='courses-container'>
      <CourseForm fetchCourses={fetchCourses}/>
      <div>
        {courses.map((crs) => {
          const formattedStartDate = new Date(crs.start_date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          const formattedEndDate = new Date(crs.end_date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          return (
            <div key={crs.id} className="course-item">
              <p>
                <strong>Course Name:</strong> {crs.course_name} <br />
                <strong>Start:</strong> {formattedStartDate} <br />
                <strong>End:</strong> {formattedEndDate} <br />
                <strong>Certified Position:</strong> {crs.position} <br />
              </p>
              <IconButton onClick={() => handleOpen(crs.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </div>
          );
        })}
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
  );
}

export default Courses;
