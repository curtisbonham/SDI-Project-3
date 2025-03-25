import React, { useState, useEffect } from "react";

const AssignMemberForm = ({ api, fetchCourses }) => {
  const [courseId, setCourseId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [certId, setCertId] = useState("");
  const [courses, setCourses] = useState([]);
  const [members, setMembers] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [coursesResponse, membersResponse, certificationsResponse] = await Promise.all([
          fetch(`${api}/courses`).then((res) => res.json()),
          fetch(`${api}/members`).then((res) => res.json()),
          fetch(`${api}/certifications`).then((res) => res.json()),
        ]);

        setCourses(coursesResponse);
        setMembers(membersResponse);
        setCertifications(certificationsResponse);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
      }
    };

    fetchDropdownData();
  }, [api]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        course_id: courseId,
        member_id: memberId,
        cert_id: certId,
      };

      console.log("Payload being sent to the server:", payload); // Debugging log

      const response = await fetch(`${api}/assign-member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status); // Debugging log

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data from server:", responseData); // Debugging log
        alert("Member assigned to course successfully!");
        fetchCourses(); // Refresh the courses list
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData); // Debugging log
        alert(`Failed to assign member: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error assigning member:", err); // Debugging log
      alert("An error occurred while assigning the member.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="courseId">Course:</label>
        <select
          id="courseId"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="memberId">Member:</label>
        <select
          id="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required
        >
          <option value="">Select a member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="certId">Certification:</label>
        <select
          id="certId"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          required
        >
          <option value="">Select a certification</option>
          {certifications.map((cert) => (
            <option key={cert.id} value={cert.id}>
              {cert.position}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Assign Member</button>
    </form>
  );
};

export default AssignMemberForm;