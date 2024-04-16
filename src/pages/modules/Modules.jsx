import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useModules } from '../../ModulesContext';
import AddForm from './AddForm'; // Import the popup form component
import UpdateForm from './UpdateForm'; // Import the update form component
import { useAuth } from '../../AuthContext'; // Import the authentication context
import { DataGrid } from '@mui/x-data-grid';

const Modules = () => {
    const { modules, deleteModule } = useModules();
    const { user } = useAuth(); // Access the user from the authentication context
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);

    const rows = modules.map(module => ({
        id: module.id,
        name: module.name,
        instructor: module.instructor,
        description: module.description,
    }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Module name', width: 250, editable: true },
        { field: 'instructor', headerName: 'Teacher name', width: 150, editable: true },
        { field: 'description', headerName: 'Module details', width: 500, editable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleUpdate(params.row)}
                        style={{ display: user.role === 'teacher' || user.role === 'admin' ? 'inline-block' : 'none', marginRight: '5px', fontSize: '12px' }}
                    >
                        Update
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(params.row.id)}
                        style={{ display: user.role === 'teacher' || user.role === 'admin' ? 'inline-block' : 'none', fontSize: '12px' }}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleUpdate = (module) => {
        setSelectedModule(module);
        setShowUpdateForm(true);
    };

    const handleDelete = (moduleId) => {
        // Call the deleteModule function from the ModulesContext to delete the module
        deleteModule(moduleId);
    };

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="modulesTable">
                    <Button
                        onClick={handleAddClick}
                        style={{ display: user.role === 'teacher' || user.role === 'admin' ? 'block' : 'none', marginBottom: '10px' }}
                    >
                        Add Module
                    </Button>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
                {showAddForm && <AddForm onClose={() => setShowAddForm(false)} />}
                {showUpdateForm && (
                    <UpdateForm module={selectedModule} onClose={() => setShowUpdateForm(false)} />
                )}
            </div>
        </div>
    );
};

export default Modules;
