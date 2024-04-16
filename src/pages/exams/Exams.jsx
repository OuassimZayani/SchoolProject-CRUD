import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useExams } from '../../ExamsContext'; // Corrected import
import AddExamForm from './AddForm';
import UpdateExamForm from './UpdateForm';
import { useAuth } from '../../AuthContext';
import { DataGrid } from '@mui/x-data-grid';


const Exams = () => {
  const { exams, deleteExam } = useExams(); // Import deleteExam function
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleUpdateClick = (exam) => {
    setSelectedExam(exam);
    setShowUpdateForm(true);
  };

  const handleDeleteClick = (exam) => {
    deleteExam(exam.id); // Call deleteExam function with exam id
  };

  const handleAddFormClose = () => {
    setShowAddForm(false);
  };

  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
    setSelectedExam(null);
  };

  const rows = exams.map((exam) => ({
    id: exam.id,
    name: exam.name,
    moduleName: exam.moduleName,
    date: exam.date,
    description: exam.description,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Exam name', width: 250, editable: true },
    { field: 'moduleName', headerName: 'Module name', width: 250, editable: true },
    { field: 'date', headerName: 'Date', width: 150, editable: true },
    { field: 'description', headerName: 'Exam details', width: 300, editable: true },
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
        <div className="examsTable">
          <Button
            onClick={handleAddClick}
            style={{ display: user.role === 'teacher' || user.role === 'admin' ? 'block' : 'none', marginBottom: '10px', fontSize: '14px', size: 'large' }}
          >
            Add Exam
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
        {showAddForm && <AddExamForm onClose={handleAddFormClose} />}
        {showUpdateForm && selectedExam && (
          <UpdateExamForm exam={selectedExam} onClose={handleUpdateFormClose} />
        )}
      </div>
    </div>
  );
};

export default Exams;
