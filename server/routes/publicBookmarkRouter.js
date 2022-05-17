const publicBookmarkRouter = require('express').Router();
const PublicController = require('../controllers/publicController');

publicBookmarkRouter.get('/', PublicController.viewAllBookmark);
publicBookmarkRouter.post('/:id', PublicController.bookmarkJob);
publicBookmarkRouter.delete('/:id', PublicController.deleteBookmarkJob);

module.exports = publicBookmarkRouter;