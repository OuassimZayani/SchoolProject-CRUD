import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useResults } from '../../ResultsContext';
import AddResultForm from './AddForm';
import UpdateResultForm from './UpdateForm';
import { useAuth } from '../../AuthContext';
import { DataGrid } from '@mui/x-data-grid';

const Results = () => {
  const { results, deleteResult } = useResults();
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleUpdateClick = (result) => {
    setSelectedResult(result);
    setShowUpdateForm(true);
  };

  const handleDeleteClick = (result) => {
    deleteResult(result.id);
  };

  const handleAddFormClose = () => {
    setShowAddForm(false);
  };

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
    setSelectedResult(null);
  };

  const rows = results.map((result) => ({
    id: result.id,
    moduleName: result.moduleName,
    examName: result.examName,
    grade: result.grade,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'moduleName', headerName: 'Module name', width: 300, editable: true },
    { field: 'examName', headerName: 'Exam name', width: 250, editable: true },
    { field: 'grade', headerName: 'Grade', width: 100, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdateClick(params.row)}
            style={{ marginRight: '5px', display: user.role === 'teacher' || user.role === 'admin' ? 'inline-block' : 'none', fontSize: '12px' }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteClick(params.row)}
            style={{ display: user.role === 'teacher' || user.role === 'admin' ? 'inline-block' : 'none', fontSize: '12px' }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="resultsTable">
          <Button
            onClick={handleAddClick}
            style={{ display: user.role === 'teacher' || user.role === 'admin' ? 'block' : 'none', marginBottom: '10px', fontSize: '14px', size: 'large' }}
          >
            Add Result
          </Button>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </div>
        {showAddForm && <AddResultForm onClose={handleAddFormClose} />}
        {showUpdateForm && selectedResult && (
          <UpdateResultForm result={selectedResult} onClose={handleUpdateFormClose} />
        )}
      </div>
    </div>
  );
};

export default Results;
