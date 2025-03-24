import { useState, useEffect } from 'react';
import './Courses.css';
import {Scheduler} from "@bitnoi.se/react-scheduler/dist/style.css";
import CourseForm from './CourseForm.jsx'

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from both endpoints
    Promise.all([
      fetch("http://localhost:3001/courses/").then((res) => res.json()),
      fetch("http://localhost:3001/courses/certs").then((res) => res.json()),
    ])
      .then(([coursesData, certsData]) => {

        // Merge the courses and certs data
        const mergedData = coursesData.map((course) => {
          const cert = certsData.find((cert) => cert.c_id === course.cert_id);

          return {
            ...course,
            position: cert ? cert.position : "N/A", // Add position from certsData
          };
        });
        setCourses(mergedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className='courses-container'>
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
            <div key={crs.id}>
              <p>
                <strong>Course Name:</strong> {crs.course_name} <br />
                <strong>Start:</strong> {formattedStartDate} <br />
                <strong>End:</strong> {formattedEndDate} <br />
                <strong>Certified Position:</strong> {crs.position} <br />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;