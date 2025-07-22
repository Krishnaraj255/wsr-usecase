import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import Project from '../project/project';
import Home from '../home/home';
import ProjectUpdate from '../projectupdate/projectupdate';
import StatusGenerate from '../generate/statusGenerate';
import ProjectStatus from '../projectstatus/projectStatus';




const Navbar = () => {
    return (
        <Router>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                    <Button color="inherit" component={Link} to="/project/create">Project</Button>
                    <Button color="inherit" component={Link} to="/projectstatus">status</Button>
                    <Button color="inherit" component={Link} to="/statusGenerate">Download</Button>
                    {/* <Button color="inherit" component={Link} to="/project/update">Project</Button> */}
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path="/project/create" element={<Project />} />
                    <Route path="/project/update/:projectId" element={<ProjectUpdate />} />
                    <Route path="/statusGenerate" element={<StatusGenerate />} />
                    <Route path="/projectstatus" element={<ProjectStatus />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default Navbar;
