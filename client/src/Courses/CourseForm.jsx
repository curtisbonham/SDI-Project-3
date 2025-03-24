//CourseForm.jsx
import { useState } from 'react';
import './CourseForm.css'


function CourseForm(){
    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [certifiedPosition, setCertifiedPosition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


    const newCourse = {
        course_name: courseName,
        start_date: startDate,
        end_date: endDate,
        position: certifiedPosition,
    };
}
const response = fetch('http://localhost:3001/courses', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCourse)
})

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
                <input
                    type="text"
                    id='certifiedPosition'
                    value={certifiedPosition}
                    onChange={(e) => setCertifiedPosition(e.target.value)}
                />
            </div>

            <button type='submit'> Add Course </button>

        </form>
    </div>
)}


export default CourseForm;

