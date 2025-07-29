import {
    Container,
    TextField,
    Autocomplete,
    Box,
    Button,
    IconButton,
    Grid,
    Tooltip,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import type { projectDetail, projectStatus } from '../../types/projectdetail';
import '../../App.css'


const ProjectUpdate = () => {
    const [roleOptions, setRoleOptions] = useState<string[]>([]);
    const [employeeOptions, setEmployeeOptions] = useState<string[]>([]);
    const [rows, setRows] = useState<{ role: string | null; employee: string | null }[]>([
        { role: null, employee: null },
    ]);
    const [projectName, setProjectName] = useState<string>('');
    const [sprintData, setSprintData] = useState<projectStatus[]>([])
    const { projectId } = useParams<{ projectId: string }>();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [dialogMessage, setDialogMessage] = useState('')


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/ws-report/role');      // Fetching the role to display in the frontend
                setRoleOptions(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchEmployees = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/ws-report/employee');        // Fetching the role to display in the frontend
                setEmployeeOptions(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchEmployee = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/ws-report/projectdetail/${projectId}`);   //Get the projectdetail to update
                const projectData = res.data;


                setProjectName(projectData.projectName);

                setSprintData(projectData.sprint)

                const populatedRows: { role: string; employee: string }[] = [];

                if (projectData.resources) {
                    for (const [role, employees] of Object.entries(projectData.resources)) {
                        (employees as string[]).forEach(employee => {
                            populatedRows.push({ role, employee });
                        });
                    }
                }

                setRows(populatedRows.length > 0 ? populatedRows : [{ role: null, employee: null }]);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRoles();
        fetchEmployees();
        fetchEmployee();
    }, [projectId]);

    const handleChange = (index: number, field: 'employee' | 'role', value: string | null) => {
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
            setDialogMessage("You must add at least one employee with a role.");
            return;
        }

        const payload = {
            projectName,
            projectId,
            resources: resourceMap,
            sprint: sprintData
        };


        try {
            const res = await axios.post(
                `http://localhost:3001/api/ws-report/projectdetail/`,             // update the data
                payload
            );
            setRows([{ role: null, employee: null }]);
            setProjectName("");
            setDialogMessage('Project updated successfully!');
            setDialogOpen(true)
        } catch (err) {
            console.error('Submission error:', err);
            setDialogMessage('Failed to update the project.');
            setDialogOpen(true)
        }
    };

    const isSubmitDisabled = rows.some(
        (row) => !(row.employee && row.role) || !projectName
    );

    const deleteRow = (indexToDelete: number) => {
        setRows((prevRows) => prevRows.filter((_, index) => index !== indexToDelete));
    };




    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Submission</DialogTitle>
                <DialogContent>
                    <Typography>{dialogMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} variant='contained' autoFocus>ok</Button>
                </DialogActions>
            </Dialog>
            <Container maxWidth="md">

                <Grid container spacing={1}>
                    <Grid size={12}>
                        <TextField
                            label="Project Name"
                            variant="outlined"
                            fullWidth
                            disabled
                            value={projectName}
                            sx={{ mb: 3 }}
                        />
                    </Grid>
                    <Grid size={12} >
                        {rows.map((row, index) => (
                            <Grid container spacing={1} alignItems="center" key={index}>

                                <Grid size={{ xs: 5 }}>
                                    <Autocomplete
                                        options={employeeOptions}
                                        value={row.employee}
                                        onChange={(e, val) => handleChange(index, 'employee', val)}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Employee" />
                                        )}
                                        fullWidth
                                    />

                                </Grid>
                                <Grid size={{ xs: 5 }}>
                                    <Autocomplete
                                        options={roleOptions}
                                        value={row.role}
                                        onChange={(e, val) => handleChange(index, 'role', val)}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Role" />
                                        )}
                                        fullWidth
                                    />

                                </Grid>
                                <Grid size={{ xs: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => deleteRow(index)}
                                    >
                                        <Tooltip title="Delete Employee">
                                            <IconButton  ><DeleteIcon /></IconButton>
                                        </Tooltip>
                                    </Button>
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
                        disabled={isSubmitDisabled}
                    >
                        Submit
                    </Button>
                </Grid>

            </Container>
        </Box>
    );
};

export default ProjectUpdate;
