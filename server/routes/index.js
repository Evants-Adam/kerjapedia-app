// Get Router from Express
const router = require('express').Router();

// Router without Authentication (access_token doesn't needed)
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const publicLoginRouter = require('./publicLoginRouter');
const publicRegisterRouter = require('./publicRegisterRouter');
const landingPageRouter = require('./landingPageRouter');

// Router with Authentication (Need access_token)
const publicJobsRouter = require('./publicJobsRouter');
const publicBookmarkRouter =  require('./publicBookmarkRouter');
const userRouter = require('./userRouter');
const jobsRouter = require('./jobsRouter');
const companyRouter = require('./companyRouter');
const logRouter = require('./logRouter');
const publicUserRouter = require('./publicUserRouter');

// Middlewares
const authenticationMiddleware = require('../middlewares/authentication-middleware');
const errorHandlerMiddleware = require('../middlewares/errorHandler-middleware');
const isCustomer = require('../middlewares/isCostumer-middleware');

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/landing-page-assets', landingPageRouter);
router.use('/public/login', publicLoginRouter);
router.use('/public/register', publicRegisterRouter);

router.use('/jobs', authenticationMiddleware, jobsRouter);
router.use('/users', authenticationMiddleware, userRouter);
router.use('/companies', authenticationMiddleware, companyRouter);
router.use('/logs', authenticationMiddleware, logRouter);
router.use('/public/jobs', isCustomer, publicJobsRouter);
router.use('/public/bookmark', isCustomer, publicBookmarkRouter);
router.use('/public/users', isCustomer, publicUserRouter);

router.use(errorHandlerMiddleware);

module.exports = router;