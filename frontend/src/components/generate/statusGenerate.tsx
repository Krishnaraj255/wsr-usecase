import { Box, Container, Grid, Autocomplete, TextField, Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import type { projectDetail } from '../../types/projectdetail'

const StatusGenerate = () => {

    const [data, setData] = useState<projectDetail[]>([])

    useEffect(() => {
        const fetchProject = async () => {
            const res = await axios.get("http://localhost:3001/api/ws-report/projectdetail")
            setData(res.data)
        }
        fetchProject()
    }, [])

    const projectName = data.map(p => p.projectName)


    return (
        <>
            <Container>
                <Box>
                    <Typography variant='h4' sx={{textAlign:"center",marginBottom:"10px"}}>Generate weekly report</Typography>
                    <Grid size={12}>
                        <Autocomplete
                            disablePortal
                            options={projectName}
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
                            options={projectName}
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
