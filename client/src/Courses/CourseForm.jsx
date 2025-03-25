//CourseForm.jsx
import { useState } from 'react';
import './CourseForm.css'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';


function CourseForm({fetchCourses}){
    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [certifiedPosition, setCertifiedPosition] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        addCourse();

}
const addCourse = async (e) => {

    try {
      const response = await fetch('http://localhost:3001/courses', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_name: courseName,
          start_date: startDate,
          end_date: endDate,
          cert_id: certifiedPosition,
        }),
      });

      if (response.ok) {
        setCourseName('');
        setStartDate('');
        setEndDate('');
        setCertifiedPosition('');
        fetchCourses(); // Refresh the course list
        setDialogOpen(true);
    } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add the course.');
      }
    } catch (err) {
      console.error('Error adding course:', err);
      alert('An error occurred while adding the course.');
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  }


return(
    <div className='course-form-container'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="courseName"> Course Name:</label>
                <input
                    type="text"
                    id='courseName'
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="startDate"> Start Date:</label>
                <input
                    type="date"
                    id='startDate'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="endDate"> End Date:</label>
                <input
                    type="date"
                    id='endDate'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="certifiedPosition"> Position:</label>
                <select
                    id='certifiedPosition'
                    value={certifiedPosition}
                    onChange={(e) => setCertifiedPosition(e.target.value)}
                    >
                    <option value="1">Purveyor of Fine Goods</option>
                    <option value="2">Linguist</option>
                    <option value="3">Cook</option>
                </select>
            </div>

            <button type='submit'> Add Course </button>
        </form>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogContent>
                <DialogContentText>
                    The course has been successfully added to the list.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color='primary'>Close</Button>
            </DialogActions>
        </Dialog>
    </div>
)}


export default CourseForm;

