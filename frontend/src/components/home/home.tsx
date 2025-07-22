import axios from 'axios';
import { useEffect, useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { projectDetail } from '../../types/projectdetail';



const Home = () => {

    const [value, setValue] = useState<projectDetail[]>([]);
    const navigte = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/ws-report/projectdetail')   //Getting the project detail to listing in the home
                setValue(res.data)

            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const handleUpdate = (projectId: string) => {
        navigte(`/project/update/${projectId}`)
    }

    const dateConversion = (createdAt: string) => {
        const d = new Date(createdAt);
        return d.toDateString()
    }


    value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><h2>Project Name</h2></TableCell>
                        <TableCell ><h2>Resources</h2></TableCell>
                        <TableCell align="right"><h2>Sprint</h2></TableCell>
                        <TableCell align="center"><h2>Action</h2></TableCell>
                        <TableCell align="center"><h2>Date</h2></TableCell>
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
                            <TableCell align="right">

                                {/* {val.sprint ? Object.entries(val.sprint).map(([key, value]) => (
                                    <div key={key}>
                                        <p>{key} : {value.join(',')}</p>
                                    </div>
                                )) : null} */}
                            </TableCell>
                            <TableCell align="center">
                                <Grid container spacing={1}>
                                    <Grid size={12}>
                                        <Button variant='contained' color='inherit' onClick={() => handleUpdate(val.projectId)}>update</Button>
                                    </Grid>
                                    <Grid size={12}>
                                        <Button variant='contained' color='error'>delete</Button>
                                    </Grid>
                                </Grid>

                            </TableCell>
                            <TableCell align="right">{dateConversion(val.createdAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Home
