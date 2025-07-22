import { Box, Grid, Autocomplete, TextField, Container, Typography, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import type { projectDetail, projectStatus, ResourcesType } from "../../types/projectdetail";
import axios from "axios";

const ProjectStatus = () => {

  const statusOptions = ["Green", "Amber", "Red"];

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
    const response = await axios.get(`http://localhost:3001/api/ws-report/projectdetail/${projectId}`)    // To display the resources
    setProjectData(response.data)

  }


  const handleClick = async () => {

    if (!projectData)
      return

    const updatedSprints = Array.isArray(projectData.sprint)
      ? [...projectData.sprint, value]
      : [value];

    const payload = {
      ...projectData,
      sprint: updatedSprints
    };
    console.log(payload)
    try {
      const res = await axios.post("http://localhost:3001/api/ws-report/projectdetail/", payload)   //Posting the data
      alert("success")
      window.location.reload()

    }
    catch (error) {
      console.log("error while posting the data", error)
    }
  }

  return (
    <Container sx={{ marginBottom: "10px" }} >
      <Box component="form" >
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px" }} > Project Status</Typography>
        <Grid
          container
          spacing={2}

        >
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
                  console.log("Selected Project ID:", projectId);
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

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField label="Sprint Number"
              variant="outlined"
              type="number"
              fullWidth
              name="sprintNo"
              onChange={handleChange} />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              placeholder="Sprint Goals"
              multiline
              minRows={3}
              fullWidth
              name="sprintGoal"
              onChange={handleChange}
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
              name="commitedStoryPoints"
              onChange={handleChange}
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
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 10 }}>
            <TextField
              label="Velocity"
              variant="outlined"
              fullWidth
              className="bg-white"
              name="velocity"
              onChange={handleChange}
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

