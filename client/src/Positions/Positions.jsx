
import { useState, useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import './Positions.css'

function Positions() {
  const [positions, setPositions] = useState([]);
  const [open, setOpen] = useState(false); // State to control the dialog
  const [selectedPositionId, setSelectedPositionId] = useState(null); // State to store the course ID to delete

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
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
      setPositions(mergedData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  console.log(positions)

  const handleOpen = (id) => {
    setSelectedPositionId(id); // Set the course ID to delete
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    setSelectedPositionId(null); // Clear the selected course ID
  };

  // const deleteCourse = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/courses/${selectedCourseId}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       fetchCourses(); // Re-fetch courses after deletion
  //       handleClose(); // Close the dialog
  //     } else {
  //       const errorData = await response.json();
  //       console.error(errorData.message || 'Failed to delete the course.');
  //     }
  //   } catch (err) {
  //     console.error('Error deleting course:', err);
  //   }
  // };

  return (
    <div className='positions-container'>
      <div>
        {positions.map((crs) => {

          return (
            <div key={crs.id} className="course-item">
              <p>
                <strong>Position:</strong> {crs.position} <br />
                <strong>Description:</strong> You can tell because the way it is. <br />
              </p>
              <IconButton onClick={() => handleOpen(crs.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </div>
          );
        })}
      </div>

      {/* Dialog for confirmation
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
      </Dialog> */}
    </div>
  );
}

export default Positions;
