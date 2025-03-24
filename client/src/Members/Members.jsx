import { IconButton, Button, TextField, Badge} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from "react";
import './Members.css'

<<<<<<< HEAD
const App = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/members")
    .then((res) => res.json())
    .then((data) => {
      setMembers(data);
      setLoading(false);
     })
     .catch((err) => {
      console.error("Failed to fetch members:", err);
      setLoading(false);
     });
   }, []);

   return (
    <div>
      <h1>Members</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        members.map((member) => (
          <div key={member.id} style={{ marginBottom: "1rem" }}>
            <strong>ID:</strong> {member.id} <br />
            <strong>Name:</strong> {member.name} <br />
            <strong>Rank:</strong> {member.rank}
          </div>
        ))
      )}
    </div>
  );
};


function Members() {
=======
function Members({value}) {
>>>>>>> a33bf8ae98022c3c2c366f2330443081c38e489a

    return(
        <div className='members-container'>
          <h1>Members Page</h1>

        </div>
    );
}

export default Members;