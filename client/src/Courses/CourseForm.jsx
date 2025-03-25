//CourseForm.jsx
import { useState, useEffect } from 'react';
import './CourseForm.css'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';


function CourseForm({fetchCourses, course, edit, closeEditModal}){

    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [certifiedPosition, setCertifiedPosition] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if(course) {
            setCourseName(course.course_name || "");
            setStartDate(course.start_date);
            setEndDate(course.end_date);
            setCertifiedPosition(course.cert_id || "");
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            await updateCourse();
        } else {
            await addCourse();
        }
    };

    const addCourse = async () => {
        try {

            console.log("Adding course with data:", {
                course_name: courseName,
                start_date: startDate,
                end_date: endDate,
                cert_id: certifiedPosition,
            });
            const response = await fetch('http://localhost:3001/courses', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
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
                fetchCourses();
            } else {
                console.error('Failed to add course.');
            }
        } catch (err) {
            console.error('Error adding course:', err);
        }
    };

    const updateCourse = async () => {
        try {
            const response = await fetch(`http://localhost:3001/courses/${course.id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    course_name: courseName,
                    start_date: startDate,
                    end_date: endDate,
                    cert_id: certifiedPosition,
                }),
            });

            if (response.ok) {
                fetchCourses();
                closeEditModal();
            } else {
                console.error('Failed to update course.');
            }
        } catch (err) {
            console.error('Error updating course:', err);
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
                        <option value="4">Deckhand</option>
                        <option value="5">Space Surgeon</option>
                        <option value="6">Crew Commander</option>
                        <option value="7">Space Engineer</option>
                    </select>
                </div>

                <button type='submit'> {edit ? "Update Course" : "Add Course"} </button>
            </form>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogContent>
                    <DialogContentText>
                        {edit ? "The course has been successfully updated"
                        :"The course has been successfully added to the list."
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color='primary'>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CourseForm;

