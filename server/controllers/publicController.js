const { Job, Company, User, Log, Bookmark } = require('../models');
const { Op } = require('sequelize');

class PublicController {

    static getPaginationData (data, page, limit) {
        const { count: totalItems, rows: jobs } = data;
        const currentPage = page ? +page: 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, jobs, totalPages, currentPage}
    }

    static getPagination (page) {
        const limit = 9;
        if (page === '1') {
            const offset = 0;
            return {limit, offset}
        } else {
            const offset = page ? page * limit - 9 : 0;
            return {limit, offset}
        }
    }

    static viewAllJob (req, res, next) {
        const { page } = req.query || 0;
        const { limit, offset } = PublicController.getPagination(page);
        const name = req.query.name || "";
        const company = req.query.company || "";

        Job.findAndCountAll({
            include: [{
                model: Company,
                where: {
                    name: { [Op.iLike]: `%${company}%`} 
                }
            }],
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                [Op.and]: [
                    { status: 'Active' },
                    { title: { [Op.iLike]: `%${name}%`} }
                ],
            },
            limit,
            offset
        })
        .then((result) => {
            const response = PublicController.getPaginationData(result, page, limit)
            res.status(200).json(response)
        })
        .catch((err) => {
            next(err)
        })
    }

    static viewJob (req, res, next) {

        Job.findByPk(req.params.id, {
            include: [{
                model: Company
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((result) => {
            if (!result) {
                throw ({ name: "JobNotFound" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static bookmarkJob (req, res, next) {
        Bookmark.findAll({
            where: {
                [Op.and]: [
                    { JobId: req.params.id },
                    { UserId: req.user.id }
                ],
            }
        })
        .then((result) => {
            if (result.length > 0) {
                throw ({
                    name: "JobAlreadyBookmarked"
                })
            } else {
                return Job.findByPk(req.params.id, {
                    include: [{
                        model: Company
                    }],
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            }
        })
        .then((result) => {
            if (!result) {
                throw ({ name: "JobNotFound" })
            } else {
                return Bookmark.create({
                    UserId: req.user.id, JobId: req.params.id
                })
            }
        })
        .then((response) => {
            res.status(201).json(response)
        })
        .catch((err) => {
            next(err)
        })
    }

    static viewAllBookmark (req, res, next) {
        Bookmark.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },  
            where: {
                UserId: req.user.id
            },
            include: {
                model: Job,
                include: {
                    model: Company
                }
            }
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            next(err)
        })
    }

    static deleteBookmarkJob (req, res, next) {
        Bookmark.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            next(err)
        })
    }

    static viewCustomer (req, res, next) {
        if (req.user) {
            const { id, username, email, role } = req.user;
            res.status(200).json({ id, username, email, role })
        } else {
            next()
        }
    }
}

module.exports = PublicController;