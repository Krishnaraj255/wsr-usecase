import { Box, Container, Grid, Autocomplete, TextField, Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import type { projectDetail } from '../../types/projectdetail'
import type { projectStatus } from '../../types/projectdetail'

const StatusGenerate = () => {

    const arr = ["hel", "hello"]
    const [data, setData] = useState<projectDetail[]>([])

    const [projectData, setProjectData] = useState<projectDetail>()

    const [value, setValue] = useState<projectStatus>({
        projectname: "",
        sprintNo: null,
        sprintGoal: "",
        startDate: null,
        endDate: null,
        accomplishment: "",
        risk: "",
        commitedStoryPoints: "",
        deliveredStoryPoints: "",
        velocity: null,
        status: "",
        resources: {}
    })

    useEffect(() => {
        const fetchProject = async () => {
            const res = await axios.get("http://localhost:3001/api/ws-report/projectdetail")  // To display the projectname
            setData(res.data)
        }
        fetchProject()
    }, [])


    const getProjectData = async (projectId: string) => {
        const response = await axios.get(`http://localhost:3001/api/ws-report/projectdetail/${projectId}`)    // To get the particular project data
        setProjectData(response.data)

    }
    
   const t = [
    {id:1,name:"krish"},
    {id:2,name:"raj"}
   ]

   const g = t.find(i=>i.id===1)
   console.log(g)

    return (
        <>
            <Container>
                <Box>
                    <Typography variant='h4' sx={{ textAlign: "center", marginBottom: "10px" }}>Generate weekly report</Typography>
                    <Grid size={12}>
                        <Autocomplete
                            disablePortal
                            options={data}
                            getOptionLabel={(option) => option.projectName}
                            value={data.find(project => project.projectName === value.projectname) || null}
                            onChange={(event, newValue) => {
                                const projectId = newValue?.projectId || null;
                                setValue({ ...value, projectname: newValue?.projectName || "" });
                                if (projectId) {
                                    getProjectData(projectId)
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Project Name"
                                    variant="outlined"
                                    fullWidth
                                    name="projectname"
                                />
                            )}
                        />
                    </Grid>
                    <br />
                    <Grid size={12}>
                        <Autocomplete
                            disablePortal
                            options={arr}
                            // value={value.projectname}
                            // onChange={(event, newValue) => {
                            //     setValue({ ...value, projectname: newValue || "" });
                            // }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Sprint"
                                    variant="outlined"
                                    fullWidth
                                    name="projectname"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}

                        > submit
                        </Button>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default StatusGenerate
