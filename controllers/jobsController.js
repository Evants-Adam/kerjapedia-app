const { Job, Company, Log } = require('../models');

class JobsController {
    static createJob (req, res, next) {
        const { title, description, CompanyId, jobType } = req.body;
        
        let jobCreated;

        Job.create({
            title, description, CompanyId, UserId: req.user.id, jobType
        })
        .then((result) => {
            jobCreated = result;

            return Log.create({
                name: "Create",
                description: `New Job with name ${title} and id ${jobCreated.id} created`,
                JobId: jobCreated.id,
                UserId: req.user.id
            })
        })
        .then((result) => {
            res.status(201).json(jobCreated)
        })
        .catch((err) => {
            next(err);
        })
    }

    static viewAllJob (req, res, next) {
        Job.findAll({
            include: [{
                model: Company
            }],
            order: [
                ['createdAt', 'DESC']
            ],
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            next(err)
        })
    }

    static viewJob (req, res, next) {
        Job.findByPk(req.params.id, {
            include: Company
        })
        .then((result) => {
            if (!result) {
                throw ({ name: "JobNotFound" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch((err) => {
            next(err);        
        })
    }

    static editJob (req, res, next) {
        const { title, description, CompanyId, jobType } = req.body;
        let updatedJob;

        Job.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            if (!result) {
                throw ({ name: "JobNotFound"})
            } else if (result.UserId !== req.user.id && req.user.role !== "Admin") {
                throw ({ name: "Forbidden" })
            } else {
                return Job.update({
                    title, description, CompanyId, jobType
                }, {
                    where: {
                        id: req.params.id
                    },
                    returning: true
                })
            }
        })
        .then((result) => {
            updatedJob = result[1][0];

            return Log.create({
                name: "Update",
                description: `Job with name ${title} and id ${req.params.id} updated`,
                JobId: req.params.id,
                UserId: req.user.id
            })
        })
        .then((result) => {
            res.status(200).json(updatedJob)
        })
        .catch((err) => {
            next(err);
        })
    }

    static deleteJob (req, res, next) {
        let tempTitle = "";

        Job.findByPk(req.params.id, {
            attributes: ["title", "UserId"],
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            if (!result) {
                throw ({ name: "DeleteJobNotFound", jobIdToDelete: req.params.id});
            } else if (result.UserId !== req.user.id && req.user.role !== "Admin") {
                throw ({ name: "Forbidden" });
            } else {
                tempTitle = result.title;
                return Job.update({
                    status: "Archived"
                },{
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then((result) => {
            return Log.create({
                name: "Delete",
                description: `Job with name ${tempTitle} and id ${req.params.id} permanently deleted`,
                JobId: req.params.id,
                UserId: req.user.id
            })
        })
        .then((response) => {
            res.status(200).json({ messages: [`${tempTitle} with ID ${req.params.id} success to delete`] })
        })
        .catch((err) => {
            next(err);
        })
    }

    static editStatusJob (req, res, next) {
        let updatedJob, 
        initialStatus;

        Job.findByPk(req.params.id)
        .then((result) => {
            initialStatus = result.status;

            if (!result) {
                throw ({ name: "JobNotFound" });
            } else if (req.user.role !== "Admin") {
                throw ({ name: "Forbidden"})
            } else {
                return Job.update({
                    status: req.body.status
                }, {
                    where: {
                        id: req.params.id
                    },
                    returning: true
                })
            }
        })
        .then((result) => {
            updatedJob = result[1][0];

            return Log.create({
                name: "Patch",
                description: `The status of Job with name ${updatedJob.title} and id ${req.params.id} has been updated from ${initialStatus} into ${req.body.status}`,
                JobId: req.params.id,
                UserId: req.user.id
            })
        })
        .then((result) => {
            res.status(200).json(updatedJob)
        })
        .catch((err) => {
            next(err)
        })

    }
}

module.exports = JobsController;