



// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateBody, validateParentId} = require('./actions-middlware')
 
// [GET] /api/actions
router.get('/', async (req, res, next) => {
  const actions = await Actions.get()
  try {
  // Get all actions from the database

    // Check if there are actions available
      return res.status(200).json(actions); // Respond with all actions
    
  } catch (err) {
  next(err)
  }
});




router.get('/:id',  (req, res, next) => {
  Actions.get(req.params.id)
    .then((actionId) => {
      console.log(actionId)
      if (!actionId) {
        res.status(404).json({
          message: 'No action with given id'
        })
      } else {
        res.json(actionId)
      }
        
    }).catch((err) => {
    next(err) 
    }) 
  
});


// [POST] /api/actions
router.post('/', validateBody, validateParentId, (req, res, next) => {
  Actions.insert(req.body)
    .then((newAction) => {
    res.status(200).json(newAction)
    })
  .catch(next)
})


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



router.use((err, req, res, next) => { // eslint-disable-line  
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
