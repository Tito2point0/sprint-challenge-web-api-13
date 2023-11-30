// add middlewares here related to actions
const Project = require("../projects/projects-model");

function validateBody(req, res, next) {
    let { notes, description } = req.body;
    
    // Trim white spaces from notes and description if they are strings
    if (typeof notes === "string") {
      notes = notes.trim();
    }
    if (typeof description === "string") {
      description = description.trim();
    }
  
    if (notes !== undefined && notes && description !== undefined && description) {
      // Update the request body with trimmed values
      req.body.notes = notes;
      req.body.description = description;
      next();
    } else {
      res.status(400).json({
        message: 'Body fields missing or empty after trimming whitespace'
      });
    }
  }
  

async function validateParentId(req, res, next) {
    const { project_id } = req.body;
    const parent = await Project.get(project_id) 
        try {
            if (parent) {
              next()
    } else { 
        next({status: 404, message:`${project_id} does not exist`})
          }
        } catch(err) {
            next(err)
        }
  }


module.exports = {
    validateBody,
    validateParentId
}
