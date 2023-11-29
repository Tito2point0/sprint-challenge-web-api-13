

// projects-router.js
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');






// // [GET] /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving projects' });
  }
});

// [GET] /api/projects/:id
router.get('/:id', async (req, res) => {
  console.log('received data  from id ')
  const { id } = req.params;
  console.log(`received data  from another  id ${id}`)
  try {
    const project = await Projects.get(id);
    if (project) {
      res.status(200).json(project);
    } else {
      console.log(`this is the problem ${project}`)
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    console.lop(`this is the error ${err}`)
    res.status(500).json({ message: 'Error retrieving the project' });
  }
});

// [POST] /api/projects
// [POST] /api/projects
router.post('/', async (req, res) => {
  const { name, description, completed } = req.body;

  // Check for missing required fields (name and description)
  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  try {
    const newProject = await Projects.insert({ name, description, completed });

    // Check if a new project was successfully created
    if (newProject) {
      return res.status(201).json(newProject); // Respond with the newly created project
    } else {
      return res.status(500).json({ message: 'Error creating the project' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error creating the project' });
  }
});

// [PUT] /api/projects/:id
// [PUT] /api/projects/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  // Check for missing required fields (name, description, or completed)
  if (!name || !description || completed === undefined) {
    return res.status(400).json({ message: 'Name, description, and completed are required' });
  }

  try {
    const updatedProject = await Projects.update(id, { name, description, completed });

    // Check if the project was updated successfully
    if (updatedProject) {
      return res.status(200).json(updatedProject); // Respond with the updated project
    } else {
      return res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error updating the project' });
  }
});


// [DELETE] /api/projects/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Projects.remove(id);
    if (deleted > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the project' });
  }
});

// [GET] /api/projects/:id/actions
router.get('/:id/actions', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const actions = await Projects.getProjectActions(id);
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving project actions' });
  }
});

module.exports = router;
