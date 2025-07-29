import { Box, Container, Grid, Autocomplete, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import '../../App.css'
import type { projectStatus } from '../../types/projectdetail';
import type { projectDetail } from '../../types/projectdetail';


const StatusGenerate = () => {

    const [projects, setProjects] = useState<projectDetail[]>([]);

    const [selectedProject, setSelectedProject] = useState<projectDetail | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [sprintError, setSprintError] = useState<string | null>(null);

    const [formValues, setFormValues] = useState<projectStatus>({
        projectname: '',
        sprintNo: null,
        sprintGoal: '',
        startDate: null,
        endDate: null,
        accomplishment: '',
        risk: '',
        committedStoryPoints: null,
        deliveredStoryPoints: null,
        velocity: null,
        status: '',
        resources: {},
    });


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/ws-report/projectdetail');   // To display the project to ui
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setErrorMessage('Failed to load projects');
            }
        };
        fetchProjects();
    }, []);

    const fetchProjectDetails = async (projectId: string) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/ws-report/projectdetail/${projectId}`);  //  To fetch the particular project
            setSelectedProject(response.data);
            setSprintError(null);
            setFormValues((prev) => ({ ...prev, sprintNo: null }));
        } catch (error) {
            console.error('Error fetching project details:', error);
            setErrorMessage('Failed to load project details');
            setSelectedProject(null);
            setSprintError(null);
        }
    };

    const sprintNumbers = selectedProject?.sprint?.map((sprint) => sprint.sprintNo) ?? [];



    const formatResources = (resources: { [key: string]: { [key: string]: string | number } }) => {
        const lines: string[] = [];
        for (const role in resources) {
            for (const name in resources[role]) {
                lines.push(`${role} ${name} ${resources[role][name]}`);
            }
        }
        return lines.join('\n');
    };


    const exportToExcel = () => {

        if (!selectedProject) {
            setErrorMessage('Please select a project.');
            return;
        }

        if (formValues.sprintNo === null) {
            setErrorMessage('Please select a sprint.');
            return;
        }

        const selectedSprint = selectedProject.sprint.find(
            (sprint) => sprint.sprintNo === formValues.sprintNo
        );

        if (!selectedSprint) {
            setErrorMessage('Invalid sprint selected.');
            return;
        }


        setErrorMessage('');

        const dataToExport = {
            projectname: formValues.projectname,
            sprintNo: selectedSprint.sprintNo,
            sprintGoal: selectedSprint.sprintGoal,
            startDate: selectedSprint.startDate,
            endDate: selectedSprint.endDate,
            accomplishment: selectedSprint.accomplishment,
            risk: selectedSprint.risk,
            committedStoryPoints: selectedSprint.committedStoryPoints,
            deliveredStoryPoints: selectedSprint.deliveredStoryPoints,
            velocity: selectedSprint.velocity,
            status: selectedSprint.status,
            Resources: formatResources(selectedSprint.resources), // Single column for resources
        };

        const excelData = [dataToExport];
        // Create Excel worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        // Create Excel workbook
        const workbook = XLSX.utils.book_new();
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sprint Data');
        // Save Excel file
        XLSX.writeFile(workbook, 'SprintReport.xlsx');
    };

    return (
        <Container className='generate-container'>
            <Box sx={{ padding: '20px' }}>

                <Typography variant="h4" className='text' sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    Generate Weekly Report
                </Typography>


                {errorMessage && (
                    <Typography color="error" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                        {errorMessage}
                    </Typography>
                )}

                <Grid container spacing={2}>

                    <Grid size={12}>
                        <Autocomplete
                            options={projects}
                            getOptionLabel={(project) => project.projectName}
                            value={projects.find((project) => project.projectName === formValues.projectname) || null}
                            onChange={(event, newValue) => {
                                setFormValues((prev) => ({ ...prev, projectname: newValue?.projectName || '' }));
                                if (newValue?.projectId) {
                                    fetchProjectDetails(newValue.projectId);
                                } else {
                                    setSelectedProject(null);
                                    setErrorMessage(null);
                                    setSprintError(null); 
                                }
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Project Name" variant="outlined" fullWidth />
                            )}
                        />
                    </Grid>


                    <Grid size={12}>

                        {sprintError && (
                            <Typography color="error" sx={{ marginBottom: '8px', fontSize: '14px' }}>
                                {sprintError}
                            </Typography>
                        )}
                        <Autocomplete
                            options={sprintNumbers}
                            getOptionLabel={(option) => option?.toString() || ''}
                            value={formValues.sprintNo}
                            onChange={(event, newValue) => {
                                setFormValues((prev) => ({ ...prev, sprintNo: newValue }));
                                setSprintError(null);
                            }}
                            onFocus={() => {

                                if (selectedProject && (!selectedProject.sprint || selectedProject.sprint.length === 0)) {
                                    setSprintError('This project does not contain sprint');
                                } else {
                                    setSprintError(null);
                                }
                            }}

                            renderInput={(params) => (
                                <TextField {...params} label="Sprint No" variant="outlined" fullWidth />
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ marginTop: '20px' }}
                            onClick={exportToExcel}
                            className='btn'
                        >
                            Export Excel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default StatusGenerate;