



// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');


// [GET] /api/actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get(); // Get all actions from the database

    // Check if there are actions available
    if (actions.length > 0) {
      return res.status(200).json(actions); // Respond with all actions
    } else {
      return res.status(200).json([]); // Respond with an empty array if no actions exist
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving actions' });
  }
});

// [GET] /api/actions/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received request for action ID: hipppy blah hiplah ${id}`);

  try {
    const action = await Actions.getById(id); // Retrieve action by ID using the model method
    console.log('Retrieved action:', action);

    if (action) {
      res.status(200).json(action); // Respond with the action if found
    } else {
      console.log('Action not found');
      res.status(404).json({ message: 'Action not found' }); // Respond with 404 if action with ID doesn't exist
    }
  } catch (error) {
    console.error('Error retrieving action:', error);
    res.status(500).json({ message: 'Error retrieving action' }); // Respond with 500 if an error occurs
  }
});
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const action = await Actions.getById(id); // Retrieve action by ID using the model method
//     if (action) {
//       res.status(200).json(action); // Respond with the action if found
//     } else {
//       res.status(404).json({ message: 'Action not found' }); // Respond with 404 if action with ID doesn't exist
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving action' }); // Respond with 500 if an error occurs
//   }
// });



// [POST] /api/actions
router.post('/', async (req, res) => {
  const newActionData = req.body;

  try {
    // Check for missing required fields
    if (!newActionData.notes || !newActionData.description || !newActionData.project_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const createdAction = await Actions.create(newActionData); // Create a new action
    res.status(201).json(createdAction); // Respond with the newly created action
  } catch (error) {
    res.status(400).json({ message: 'Error creating the action' }); // Respond with 400 on error
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedActionData = req.body;
  try {
    const updatedAction = await Actions.update(id, updatedActionData); // Implement a method to update an action
    if (updatedAction) {
      res.status(200).json(updatedAction);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Missing required fields' });
  }
});

// [DELETE] /api/actions/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Actions.remove(id); // Attempt to delete action by ID
    if (deletedCount > 0) {
      return res.status(204).end(); // Respond with 204 No Content if action is successfully deleted
    } else {
      return res.status(404).json({ message: 'Action not found' }); // Respond with 404 if action with ID doesn't exist
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting action' }); // Respond with 500 if an error occurs
  }
});

router.get('/:id/actions', async (req, res) => {
  const { id } = req.params;
  
  try {
    const project = await Actions.get(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const actions = await Actions.getActionsByid(id);

    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving project actions' });
  }
});

module.exports = router;
