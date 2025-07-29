import {
  Box, Grid, Autocomplete, TextField, Container, Typography, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useEffect, useState } from "react";
import type { projectDetail, projectStatus, ResourcesType } from "../../types/projectdetail";
import axios from "axios";
import '../../App.css'

const ProjectStatus = () => {

  const statusOptions = ["Green", "Amber", "Red"];

  const [data, setData] = useState<projectDetail[]>([])

  const [projectData, setProjectData] = useState<projectDetail>()

  const [error, setError] = useState<{ [key: string]: string }>({})

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const defalutValue = {
    projectname: "",
    sprintNo: null,
    sprintGoal: "",
    startDate: null,
    endDate: null,
    accomplishment: "",
    risk: "",
    committedStoryPoints: null,
    deliveredStoryPoints: null,
    velocity: null,
    status: "",
    resources: {}
  }

  const [value, setValue] = useState<projectStatus>(defalutValue)

  useEffect(() => {
    const fetchProject = async () => {
      const response = await axios.get("http://localhost:3001/api/ws-report/projectdetail")     // To display the project name
      setData(response.data)
    }
    fetchProject()

  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleCapacityChange = (role: string, employee: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const capacityValue = e.target.value;

    setValue(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        [role]: {
          ...prev.resources[role],
          [employee]: capacityValue
        }
      }
    }));
  };

  const getProjectData = async (projectId: string) => {
    const response = await axios.get(`http://localhost:3001/api/ws-report/projectdetail/${projectId}`)    // To get the particular project data to display resources
    setProjectData(response.data)

  }


  const handleClick = async () => {

    const newError: { [key: string]: string } = {}

    if (!value.projectname) {
      newError.projectname = "Project name is required"
    }
    if (!value.sprintNo) {
      newError.sprintNo = "Sprint number is required"
    }
    if (value.sprintNo != null && value.sprintNo < 0) {
      newError.sprintNo = "Sprint number should not be negative"
    }
    if (!value.sprintGoal) {
      newError.sprintGoal = "Sprint goal is required"
    }
    if (!value.startDate) {
      newError.startDate = "Start date  is required"
    }
    if (!value.endDate) {
      newError.endDate = "End date is required"
    }
    if (value.startDate && value.endDate) {
      const start = new Date(value.startDate);
      const end = new Date(value.endDate);
      if (start > end) {
        newError.endDate = "End date cannot be before start date"
      }
    }
    if (!value.committedStoryPoints) {
      newError.commitedStoryPoints = "committed story points is required"
    }
    if (value.committedStoryPoints != null && value.committedStoryPoints < 0) {
      newError.commitedStoryPoints = "committed story points should not be negative"
    }
    if (!value.deliveredStoryPoints) {
      newError.deliveredStoryPoints = "delivered story points is required"
    }
    if (value.deliveredStoryPoints != null && value.deliveredStoryPoints < 0) {
      newError.deliveredStoryPoints = "delivered story points should not be negative"
    }

    if (value.velocity != null && value.velocity < 0) {
      newError.velocity = "velocity should not be negative"
    }


    setError(newError)

    if (Object.keys(newError).length > 0) return;

    if (!projectData)
      return

    const updatedSprints = Array.isArray(projectData.sprint) ? [...projectData.sprint, value] : [value];

    const payload = {
      ...projectData,
      sprint: updatedSprints
    };

    try {
      const res = await axios.post("http://localhost:3001/api/ws-report/projectdetail/", payload)   //Posting the data
      setDialogMessage('Sprint details submitted successfully');
      setDialogOpen(true)
      setValue(defalutValue)
      setError({})
    }
    catch (error) {
      console.log("error while posting the data", error)
      setDialogMessage('Sprint details failed to submit');
      setDialogOpen(true)
    }
  }

  return (
    <Container className="status-container">
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Project Submission</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} variant='contained' autoFocus> ok</Button>
        </DialogActions>
      </Dialog>
      <Box component="form" className="status-form" >
        <Typography variant="h4" className="text" sx={{ textAlign: "center" }} > Project Sprint</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
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
                  required
                  error={!!error.projectname}
                  helperText={error.projectname}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField label="Sprint Number"
              variant="outlined"
              type="number"
              fullWidth
              name="sprintNo"
              onChange={handleChange}
              required
              error={!!error.sprintNo}
              helperText={error.sprintNo}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              placeholder="Sprint Goals"
              multiline
              minRows={3}
              fullWidth
              name="sprintGoal"
              onChange={handleChange}
              required
              error={!!error.sprintGoal}
              helperText={error.sprintGoal}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              label="Sprint start Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true, // Makes the label stay above the field
              }}
              InputProps={{
                placeholder: '', // Hides native placeholder
              }}
              className="bg-white"
              name="startDate"
              onChange={handleChange}
              error={!!error.startDate}
              helperText={error.startDate}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              label="Sprint End Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                placeholder: '',
              }}
              className="bg-white"
              name="endDate"
              onChange={handleChange}
              error={!!error.endDate}
              helperText={error.endDate}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              placeholder="Accomplishments"
              multiline
              minRows={3}
              fullWidth
              name="accomplishment"
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField placeholder="Risk"
              multiline minRows={3}
              fullWidth
              name="risk"
              onChange={handleChange} />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              label="Committed Story Points"
              variant="outlined"
              fullWidth
              className="bg-white"
              name="committedStoryPoints"
              onChange={handleChange}
              type="number"
              error={!!error.commitedStoryPoints}
              helperText={error.commitedStoryPoints}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              label="Delivered Story Points"
              variant="outlined"
              fullWidth
              className="bg-white"
              name="deliveredStoryPoints"
              onChange={handleChange}
              type="number"
              error={!!error.deliveredStoryPoints}
              helperText={error.deliveredStoryPoints}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              label="Velocity"
              variant="outlined"
              fullWidth
              className="bg-white"
              name="velocity"
              type="number"
              onChange={handleChange}
              error={!!error.velocity}
              helperText={error.velocity}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <Autocomplete
              disablePortal
              options={statusOptions}
              value={value.status}
              onChange={(event, newValue) => {
                setValue({ ...value, status: newValue || "" });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  variant="outlined"
                  fullWidth
                  className="bg-white"
                  name="status"
                  required
                  error={!!error.status}
                  helperText={error.status}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <Typography sx={{ marginBottom: "5px" }}>Resources</Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Employee</TableCell>
                    <TableCell align="center">Capacity(%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectData ? Object.entries(projectData.resources).flatMap(([role, names]) =>
                    names.map((name: string, index: number) => (
                      <TableRow key={`${role}-${index}`}>
                        <TableCell align="center">{role}</TableCell> {/* Role repeated for each employee */}
                        <TableCell align="center">{name}</TableCell> {/* Individual employee */}
                        <TableCell align="center">
                          <TextField variant="outlined" size="small" onChange={handleCapacityChange(role, name)} type="number" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : null}

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 10 }} >
            <Button fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleClick}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <br />
    </Container>
  );
};

export default ProjectStatus;

