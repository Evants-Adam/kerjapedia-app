const jobsRouter = require('express').Router();
const JobsController = require('../controllers/jobsController');

jobsRouter.get('/', JobsController.viewAllJob);
jobsRouter.post('/', JobsController.createJob);
jobsRouter.get('/:id', JobsController.viewJob);
jobsRouter.put('/:id', JobsController.editJob);
jobsRouter.patch('/:id', JobsController.editStatusJob);
jobsRouter.delete('/:id', JobsController.deleteJob);

module.exports = jobsRouter;