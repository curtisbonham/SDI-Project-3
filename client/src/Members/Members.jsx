import CustomTable from "../CustomTable/CustomTable"
import React, { useEffect, useState } from "react";
import './Members.css'
import AssignMemberForm from './AssignMemberForm.jsx';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = "http://localhost:3001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/members/courses');
        const data = await response.json();
        console.log("Members with assigned courses:", data); // Debugging log
        setMembers(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      }
    };
    fetchData();
  }, []);

  console.log("Members state:", members); // Debugging log

  return (
    <div className="members-container">
      <h1>Members Table</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CustomTable arr={members} api={`${api}/members`} />
      )}

      <h2>Assign Member to Course</h2>
      <AssignMemberForm api={api} />
    </div>
  );
};

export default Members;





