import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function CustomTable({ arr, api }) {
  const [rows, setRows] = React.useState(arr);

  // Include 'id' in the column headers but exclude it from the input form and new row data
  // const columns = Object.keys(arr[0]).map(key => ({
  //   field: key,
  //   headerName: key, // Display id in the column header
  //   editable: key !== 'id' // Make 'id' non-editable
  // }));

  const columns = [
    // Map your data keys into editable columns
    ...Object.keys(arr[0]).map(key => ({
      field: key,
      headerName: key,
      editable: key !== 'id' 
    })),
  
    // Add a custom "Actions" column at the end
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row.id)}
          style={{ color: 'white', background: 'red', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
        >
          Delete
        </button>
      ),
    }
  ];
  

  // Create the initial state for newRowData, exclude 'id'
  const initialRowData = arr[0] ? Object.keys(arr[0]).reduce((acc, key) => {
    if (key !== 'id') {
      acc[key] = ''; // Initialize all fields as empty strings except 'id'
    }
    return acc;
  }, {}) : {};
  
  const [newRowData, setNewRowData] = React.useState(initialRowData);

  // Function to update the server when a row is edited
  function updateServer(newRow) {
    console.log("Data to be sent to the server:", newRow);

    // Update the row on the server
    axios
      .put(`${api}`, newRow) // Send the correct API endpoint with the row id
      .then(response => {
        console.log('Updated row from server:', response.data);

        // Update the state with the updated row
        setRows(prevRows =>
          prevRows.map(row => (row.id === newRow.id ? response.data.data : row))
        );
      })
      .catch(error => {
        console.error('Error updating row:', error);
        alert("Failed to update member.");
      });
  }

  // Function to handle adding a new member (POST request)
  const handleAddRow = async () => {
    if (!newRowData.name || !newRowData.rank) {
      alert('Name and Rank are required.');
      return;
    }

    try {
      // POST the new row data to the server
      const response = await axios.post(api, newRowData);
      const newMember = response.data.data; // Assuming the server returns the new member object

      // Add the new member to the existing rows state
      setRows(prevRows => [...prevRows, newMember]);

      // Clear input fields after adding
      setNewRowData(initialRowData); // Reset fields without 'id'
    } catch (error) {
      console.error('Error adding member:', error);
      alert("Failed to add member.");
    }
  };

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      {/* Dynamically create input fields for each property excluding 'id' */}
      <div style={{ marginBottom: '1rem' }}>
        {columns.map((column) => (
          column.field !== 'id' && ( // Exclude 'id' field from input fields
            <div key={column.field} style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={newRowData[column.field]}
                onChange={(e) => setNewRowData({ ...newRowData, [column.field]: e.target.value })}
                placeholder={column.headerName}
              />
            </div>
          )
        ))}
        <button onClick={handleAddRow}>Add Row</button>
      </div>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.id}
          processRowUpdate={(updatedRow, originalRow) => {
            // Trigger updateServer on row update
            updateServer(updatedRow);
            return updatedRow; // Return the updated row
          }}
          onProcessRowUpdateError={(error) => {
            console.error("MUI row update error:", error);
            alert("Something went wrong while updating the row.");
          }}
          editMode="row"
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
