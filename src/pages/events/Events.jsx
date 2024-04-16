import React from 'react'
import "./events.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEvents } from '../../EventsContext';


const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Event name',
    width: 150,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Event details',
    width: 350,
    editable: true,
  },
];



const Events = () => {
  const { events } = useEvents();
  // Map over the events data and format it for the table
  const rows = events.map((absence) => ({
    id: absence.id,
    name: absence.name,
    instructor: absence.instructor,
    date: absence.date,
    location: absence.location,
    description: absence.description,
  }));

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
          <Navbar />
          <div className="eventsTable">
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

export default Events