
import CustomTable from "../CustomTable/CustomTable"
import React, { useEffect, useState } from "react";
import './Crews.css'

const Members = () => {
  const [crews, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = "http://localhost:3001/crews"

  useEffect(() => {
    const fetchData = async () => {
      try{
        console.log('hi');
        const response = await fetch(api);
        const data = await response.json();
        setMembers(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      }

    }
    fetchData()
  }, []);

  return (
    <div className="crew-container">
      <h1>Crew Table</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CustomTable
          arr={crews}
          api = {api}
        />
      )}
        <p>Your Crew is ready to go!</p>
        <a href="/galaga" className="launch-btn">
          <span className="icon">
            <img src="/Fighter.webp" alt="" />
          </span>
          <span className="text">Launch</span>
          <span className="launch"></span>
        </a>
    </div>
  );
};

// Add a member to database


export default Members;