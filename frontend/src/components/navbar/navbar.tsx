import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Container, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Project from '../project/project';
import Home from '../home/home';
import ProjectUpdate from '../projectupdate/projectupdate';
import StatusGenerate from '../generate/statusGenerate';
import ProjectStatus from '../projectstatus/projectStatus';
import '../../App.css';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: any) => {
        setOpen(open);
    };

    return (
        <Router>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />

                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={open}

                onClose={() => toggleDrawer(false)}
                sx={{
                    width: 200,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 200,
                        color: 'white',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
                    <ListItem component={Link} to="/" onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem component={Link} to="/project/create" onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="Project" />
                    </ListItem>
                    <ListItem component={Link} to="/projectstatus" onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="Sprint" />
                    </ListItem>
                    <ListItem component={Link} to="/statusGenerate" onClick={() => toggleDrawer(false)}>
                        <ListItemText primary="Download" />
                    </ListItem>
                </List>
            </Drawer>

            <Toolbar />

            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
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
