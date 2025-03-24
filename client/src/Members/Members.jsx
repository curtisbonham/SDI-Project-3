import { IconButton, Button, TextField, Badge} from "@mui/material";
// import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from "react";
import './Members.css'

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        console.log('hi');
        const response = await fetch("http://localhost:3001/members");
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


  //   fetch("http://localhost:3001/members")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setMembers(data);
  //     setLoading(false);
  //     console.log(data);
  //    })
  //    .catch((err) => {
  //     console.error("Failed to fetch members:", err);
  //     setLoading(false);
  //    });
  //  }, []);

  //  return (
  //   <div>
  //     <h1>Members</h1>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       members.map((member) => (
  //         <div key={member.id} style={{ marginBottom: "1rem" }}>
  //           <strong>ID:</strong> {member.id} <br />
  //           <strong>Name:</strong> {member.name} <br />
  //           <strong>Rank:</strong> {member.rank}
  //         </div>
  //       ))
  //     )}
  //   </div>
  // );


  return (
    <div className="members-container">
      <h1>Members Page</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {members.map((member) => (
            <div key={member.id} className="member-card">
              <p><strong>ID:</strong> {member.id}</p>
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Rank:</strong> {member.rank}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default Members;