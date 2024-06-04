import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import './UserForm.css';

const UserForm = () => {
  const [name, setName] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [summary, setSummary] = useState('');
  const [experience, setExperience] = useState([
    { id: '1', company: '', role: '', startDate: '', endDate: '', description: '', order: 1 },
  ]);
  const [projects, setProjects] = useState([
    { id: '1', title: '', role: '', startDate: '', endDate: '', description: '', order: 1 },
  ]);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch existing data from backend on component mount
    axios.get('http://localhost:5000/api/user')
      .then(response => {
        const data = response.data;
        setName(data.name || '');
        setLinkedin(data.linkedin || '');
        setGithub(data.github || '');
        setSummary(data.professional_summary || '');
        setExperience(data.experience || []);
        setProjects(data.projects || []);
        setAddress(data.address || '');
        setEmail(data.email || '');
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      linkedin,
      github,
      professional_summary: summary,
      experience: experience.sort((a, b) => a.order - b.order),
      projects: projects.sort((a, b) => a.order - b.order),
      address,
      email,
    };

    try {
      console.log(formData); // Log the form data to the console
      const response = await axios.post('http://localhost:5000/api/user', formData);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleExperienceChange = (index, key, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][key] = value;
    setExperience(updatedExperience);
  };

  const addExperience = () => {
    setExperience([...experience, { id: `${Date.now()}`, company: '', role: '', startDate: '', endDate: '', description: '', order: experience.length + 1 }]);
  };

  const deleteExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  const handleProjectChange = (index, key, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][key] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { id: `${Date.now()}`, title: '', role: '', startDate: '', endDate: '', description: '', order: projects.length + 1 }]);
  };

  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Configurable Site
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="LinkedIn"
              variant="outlined"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="GitHub"
              variant="outlined"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Professional Summary"
              variant="outlined"
              multiline
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Professional Experience
        </Typography>
        {experience.map((exp, index) => (
          <Paper key={exp.id} elevation={3} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h3">
                Experience {index + 1}
              </Typography>
              <IconButton onClick={() => deleteExperience(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Order"
                  variant="outlined"
                  type="number"
                  value={exp.order}
                  onChange={(e) => handleExperienceChange(index, 'order', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  fullWidth
                  label="Company"
                  variant="outlined"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Role"
                  variant="outlined"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={addExperience}>
            Add Experience
          </Button>
        </Box>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Projects
        </Typography>
        {projects.map((project, index) => (
          <Paper key={project.id} elevation={3} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h3">
                Project {index + 1}
              </Typography>
              <IconButton onClick={() => deleteProject(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Order"
                  variant="outlined"
                  type="number"
                  value={project.order}
                  onChange={(e) => handleProjectChange(index, 'order', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  fullWidth
                  label="Company Title"
                  variant="outlined"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Role"
                  variant="outlined"
                  value={project.role}
                  onChange={(e) => handleProjectChange(index, 'role', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={project.startDate}
                  onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={project.endDate}
                  onChange={(e) => handleProjectChange(index, 'endDate', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={addProject}>
            Add Project
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserForm;
