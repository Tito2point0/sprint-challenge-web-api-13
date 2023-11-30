// add middlewares here related to actions
const Project = require("../projects/projects-model");

function validateBody(req, res, next) {
  const { notes, description } = req.body;
  if (
    notes !== undefined &&
    typeof notes == "string" &&
    notes.trim().length &&
    description !== undefined &&
    description.trim().length
  ) {
      next();
  } else {
      res.status(400).json({
          message: 'Body fields missing '
      })
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
