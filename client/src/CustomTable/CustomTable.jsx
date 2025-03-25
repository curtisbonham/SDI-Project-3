// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';

// export default function CustomTable({arr, api}){
//   const [rows, setRows] = React.useState(arr);

//     const columns = Object.keys(arr[0]).map(key => 
//         ({field: key, headerName: key, editable :true})
//     )

//     function updateServer(newRow){
//       console.log("Data Posted")
//       console.log(`${api}`)
      
//     // axios.put(`${api}`, newRow) // Make sure the URL is correct for your server
//     // .then(response => {
//     //   console.log('Response:', response.data);
//     //   // Handle success here, maybe update state or UI
//     // })
//     // .catch(error => {
//     //   console.error('Error:', error);
//     //   // Handle error here, maybe show a notification
//     // });
//     }

//   //  Handle existing row update (PUT)
//   // const processUpdate = async (newRow, oldRow) => {
//   //   try {
//   //     const response = await axios.put(`${api}/${newRow.id}`, newRow);
//   //     setRows(prevRows =>
//   //       prevRows.map(row => (row.id === oldRow.id ? response.data : row))
//   //     );
//   //     console.log("Member updated!");
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Error updating row:', error);
//   //     return oldRow;
//   //   }
//   // };

//     // Handle adding a new member (POST)
//     const handleAdd = async (e) => {
//       e.preventDefault();
//       const name = e.target.name.value;
//       const rank = e.target.rank.value;
  
//       if (!name || !rank) {
//         alert("Name and Rank are required");
//         return;
//       }
  
//       try {
//         const response = await axios.post(api, { name, rank });
//         const newMember = response.data.member;
//         setRows(prev => [...prev, newMember]);
//         e.target.reset();
//       } catch (error) {
//         console.error('Error adding member:', error);
//         alert("Failed to add member.");
//       }
//     };

//     // const rows = arr
//     const paginationModel = { page: 0, pageSize: 10 };

    


//         return (
// <>
//         <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
//         <input type="text" name="name" placeholder="Name" required />
//         <input type="text" name="rank" placeholder="Rank" required />
//         <button type="submit">Add Member</button>
//         </form>
          
          
//             <Paper sx={{ height: 400, width: '100%' }}>
//               <DataGrid
//                 editMode = "row"
//                 // processRowUpdate={processUpdate}
//                 // experimentalFeatures={{ newEditingApi: true }}
//                 processRowUpdate={(updatedRow, originalRow) =>
//                   updateServer(updatedRow)
//                 }
//                 onProcessRowUpdateError={(error) => {
//                   console.error("MUI row update error:", error);
//                   alert("Something went wrong while updating the row.");
//                 }}
//                 rows={rows}
//                 columns={columns}
//                 initialState={{ pagination: { paginationModel } }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection
//                 sx={{ border: 0 }}
//               />
//             </Paper>
//             </>
//     );
// }


// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';

// export default function CustomTable({arr, api}){
//   const [rows, setRows] = React.useState(arr);

//   // define editable columns
//   const columns = Object.keys(arr[0]).map(key => ({
//     field: key,
//     headerName: key,
//     editable: true
//     // flex: 1,
// }));
//     const processUpdate = async (newRow, oldRow) => {
//       try {
//         const response = await axios.put(`${api}/${newRow.id}`, newRow);
        
//         setRows((prevRows) =>
//           prevRows.map((row) =>
//             row.id === oldRow.id ? response.data : row // Update the row if IDs match
//           )
//         );
        
//         return response.data;
//       } catch (error) {
//         console.error('Error updating row:', error);
//         return oldRow;        
//       }
//     };

//     const paginationModel = { page: 0, pageSize: 10 };

//         return (
//             <Paper sx={{ height: 400, width: '100%' }}>
//               <DataGrid
//                 //onCellEditStop={processRowUpdate   //
                  
//                 //}
          
//                 editMode="row"
//                 processRowUpdate={processUpdate}
//                 rows={rows}
//                 columns={columns}
//                 initialState={{ pagination: { paginationModel } }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection
//                 sx={{ border: 0 }}
//               />
//             </Paper>
//     );
// }



//      STABLE CODE
// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';

// export default function CustomTable({arr, api}){
  

//     const columns = Object.keys(arr[0]).map(key => 
//         ({field: key, headerName: key, editable :true})
//     )


//     const rows = arr
//     const paginationModel = { page: 0, pageSize: 10 };

//         return (
//             <Paper sx={{ height: 400, width: '100%' }}>
//               <DataGrid
//                  editMode = "row"
//                 rows={rows}
//                 columns={columns}
//                 initialState={{ pagination: { paginationModel } }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection
//                 sx={{ border: 0 }}
//               />
//             </Paper>
//     );
// }



import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function CustomTable({ arr, api }) {
  const [rows, setRows] = React.useState(arr);

  const columns = Object.keys(arr[0]).map(key => ({
    field: key,
    headerName: key,
    editable: true
  }));

  // This function updates the server and updates the rows in the state
  function updateServer(newRow) {
    console.log("Data to be sent to the server:", newRow);

    // Update the row on the server
    axios
      .put(`${api}`, newRow) // Use the correct API endpoint
      .then(response => {
        console.log('Updated row from server:', response.data);

        // Update the state with the updated row
        setRows(prevRows =>
          prevRows.map(row => (row.id === newRow.id ? response.data.data: row))
        );
      })
      .catch(error => {
        console.error('Error updating row:', error);
        alert("Failed to update member.");
      });
  }

  const paginationModel = { page: 0, pageSize: 10 };

  return (
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
  );
}
