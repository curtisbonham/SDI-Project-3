import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

  return (
    <div className="members-container">
      <h1>Members Table</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member ID</TableCell>
                <TableCell align="right">Rank</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {member.id}
                  </TableCell>
                  <TableCell align="right">{member.rank}</TableCell>
                  <TableCell align="right">{member.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};


export default Members;