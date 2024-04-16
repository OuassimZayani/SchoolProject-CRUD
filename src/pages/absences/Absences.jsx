import React from 'react'
import "./absences.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAbsences } from '../../AbsencesContext';


const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'moduleName',
    headerName: 'Module name',
    width: 300,
    editable: true,
  },
  {
    field: 'instructor',
    headerName: 'Teacher name',
    width: 200,
    editable: true,
  },
  {
    field: 'totalAbsences',
    headerName: 'Number of absences',
    width: 250,
    editable: true,
  },
];



const Absences = () => {
  const { absences } = useAbsences();
  // Map over the absences data and format it for the table
  const rows = absences.map((absence) => ({
    id: absence.id,
    moduleName: absence.moduleName,
    instructor: absence.instructor,
    totalAbsences: absence.totalAbsences,
  }));

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
          <Navbar />
          <div className="absencesTable">
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

export default Absences