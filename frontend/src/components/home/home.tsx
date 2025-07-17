import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [value, setValue] = useState<{ projectName: string, resources: object, sprint: object }[]>([]);
    const navigte = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/ws-report/projectdetail')
                console.log(res.data)
                setValue(res.data)

            }
            catch (err) {
                console.log(err)
            } 
        }
        fetchData()
    }, [])

    const handleUpdate = () => {
        navigte('/project/update')
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><h2>Project Name</h2></TableCell>
                        <TableCell ><h2>Resources</h2></TableCell>
                        <TableCell align="right"><h2>Sprint</h2></TableCell>
                        <TableCell align="center"><h2>Action</h2></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {value.map((val) => (
                        <TableRow
                            key={val.projectName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {val.projectName}
                            </TableCell>
                            <TableCell align="left">
                                {Object.entries(val.resources).map(([role, name]) => (
                                    <div key={role}>
                                        <p>{role} : {name.join(',')}</p>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="center">
                                <Grid container spacing={1}>
                                    <Grid size={12}>
                                        <Button variant='contained' color='inherit' onClick={handleUpdate}>update</Button>
                                    </Grid>
                                    <Grid size={12}>
                                        <Button variant='contained' color='error'>delete</Button>
                                    </Grid>
                                </Grid>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Home
