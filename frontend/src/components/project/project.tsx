import {
    Container,
    TextField,
    Autocomplete,
    Box,
    Button,
    IconButton,
    Grid,
    Tooltip
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const Project = () => {
    const [roleOptions, setRoleOptions] = useState<string[]>([]);
    const [employeeOptions, setEmployeeOptions] = useState<string[]>([]);
    const [rows, setRows] = useState<{ role: string | null; employee: string | null }[]>([
        { role: null, employee: null },
    ]);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/ws-report/role');     // Fetching the role to display in the frontend
                setRoleOptions(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchEmployees = async () => {
            try { 
                const res = await axios.get('http://localhost:3001/api/ws-report/employee');   // Fetching the employee to display in the frontend
                setEmployeeOptions(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRoles();
        fetchEmployees();
    }, []);

    const handleChange = (index: number, field: 'employee' | 'role', value: string | null
    ) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { role: null, employee: null }]);
    };

    const handleSubmit = async () => {
        const resourceMap: { [key: string]: string[] } = {};

        for (const row of rows) {
            if (row.role && row.employee) {
                if (!resourceMap[row.role]) {
                    resourceMap[row.role] = [];
                }
                resourceMap[row.role].push(row.employee);
            }
        }

        if (Object.keys(resourceMap).length === 0) {
            alert("You must add at least one employee with a role.");
            return;
        }

        const payload = {
            projectName,
            resources: resourceMap,
        };

        try {
            const res = await axios.post(
                'http://localhost:3001/api/ws-report/projectdetail',               // Posting the data 
                payload
            );
            console.log('success:', res.data);
            setRows([{ role: null, employee: null }]);
            setProjectName("");
            alert('Project submitted successfully!');
        } catch (err) {
            console.error('Submission error:', err);
            alert('Failed to submit project.');
        }
    };



    const isSubmitDisable = rows.some(
        (row) => !(row.employee && row.role) || !projectName
    );

    return (
        <Box >
            <Container maxWidth="md">

                <Grid container spacing={1}>
                    <Grid size={12}>
                        <TextField
                            label="Project Name"
                            variant="outlined"
                            fullWidth
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                    </Grid>
                    <Grid size={12} >
                        {rows.map((row, index) => (
                            <Grid container spacing={1} alignItems="center" key={index}>

                                <Grid size={{ xs: 6 }}>
                                    <Autocomplete
                                        options={employeeOptions}
                                        value={row.employee}
                                        onChange={(e, val) => handleChange(index, 'employee', val)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Employee" />
                                        )}
                                        fullWidth
                                    />

                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Autocomplete
                                        options={roleOptions}
                                        value={row.role}
                                        onChange={(e, val) => handleChange(index, 'role', val)}
                                        renderInput={(params) => <TextField {...params} label="Role" />}
                                        fullWidth
                                    />

                                </Grid>
                                {index === rows.length - 1 && (
                                    <Grid size={{ xs: 2 }} >



                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={handleAddRow}
                                            disabled={
                                                index !== rows.length - 1 || !row.employee || !row.role
                                            }
                                        >
                                            <Tooltip title="Add Employee">
                                                <IconButton  ><AddIcon /></IconButton>
                                            </Tooltip>
                                        </Button>


                                    </Grid>
                                )}
                                <br />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid  >
                    <Button fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                        disabled={isSubmitDisable}
                    >
                        Submit
                    </Button>
                </Grid>

            </Container>
        </Box>
    );
};

export default Project;
