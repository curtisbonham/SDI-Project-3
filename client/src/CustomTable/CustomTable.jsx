import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import axios from 'axios';
import './CustomTable.css';

export default function CustomTable({ arr, api }) {
  // Ensure `arr` is always an array and has at least one element
  if (!arr || arr.length === 0) {
    return <p>No data available.</p>;
  }

  const [rows, setRows] = React.useState(arr);

  // Dynamically generate columns from the keys of the first object in `arr`
  const columns = React.useMemo(() => [
    ...Object.keys(arr[0]).filter((key) => key !== 'assigned_courses').map((key) => ({
      field: key,
      headerName: key,
      editable: key !== 'id', // Make all fields editable except 'id'
    })),

    // Add a custom "Assigned Courses" column
    {
      field: 'assigned_courses',
      headerName: 'Assigned Courses',
      editable: false, // This column is not editable
      width: 300,
      renderCell: (params) => (
        <span>{params.row.assigned_courses || "None"}</span> // Display "None" if no courses are assigned
      ),
    },

    // Add a custom "Actions" column
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteForeverIcon />
        </IconButton>
      ),
    },
  ], [arr]);

  // Function to update the server when a row is edited
  const updateServer = (newRow) => {
    console.log("Data to be sent to the server:", newRow);

    axios
      .put(`${api}`, newRow) // Send the correct API endpoint with the row id
      .then((response) => {
        console.log('Updated row from server:', response.data);

        // Update the state with the updated row
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === newRow.id ? response.data.data : row))
        );
      })
      .catch((error) => {
        console.error('Error updating row:', error);
        alert("Failed to update member.");
      });
  };

  // Function to handle adding a new member (POST request)
  const handleAddRow = async (newRowData) => {
    if (!newRowData.name || !newRowData.rank) {
      alert('Name and Rank are required.');
      return;
    }

    try {
      const response = await axios.post(api, newRowData);
      const newMember = response.data.data; // Assuming the server returns the new member object

      // Add the new member to the existing rows state
      setRows((prevRows) => [...prevRows, newMember]);
    } catch (error) {
      console.error('Error adding member:', error);
      alert("Failed to add member.");
    }
  };

  // Function to handle deleting a member
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await axios.delete(`${api}/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
      alert("Failed to delete member.");
    }
  };

  return (
    <>
      <Paper sx={{ height: 800, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.member_id}
          rows={rows}
          columns={columns}
          processRowUpdate={(updatedRow) => {
            updateServer(updatedRow); // Trigger server update on row edit
            return updatedRow; // Return the updated row
          }}
          onProcessRowUpdateError={(error) => {
            console.error("MUI row update error:", error);
            alert("Something went wrong while updating the row.");
          }}
          editMode="row"
          pageSizeOptions={[10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
