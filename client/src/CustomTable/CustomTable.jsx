import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function CustomTable({arr}){
    const columns = Object.keys(arr[0]).map(key => 
        ({field: key, headerName: key})
    )


    const rows = arr
    const paginationModel = { page: 0, pageSize: 10 };

        return (
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
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