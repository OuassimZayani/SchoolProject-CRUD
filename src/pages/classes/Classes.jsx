import React from 'react'
import "./classes.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useClasses } from '../../ClassesContext';


const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Module name',
    width: 300,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 200,
    editable: true,
  },
  {
    field: 'instructor',
    headerName: 'Teacher name',
    width: 150,
    editable: true,
  },
];



const Classes = () => {
  const { classes } = useClasses();
  // Map over the classes data and format it for the table
  const rows = classes.map((classe) => ({
    id: classe.id,
    name: classe.moduleName,
    date: classe.date,
    time: classe.time,
    instructor: classe.instructor,
  }));

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
          <Navbar />
          <div className="classesTable">
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
      </div>
    </div>
  )
}

export default Classes