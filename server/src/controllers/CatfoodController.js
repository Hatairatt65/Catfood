const { Catfood } = require('../models');

module.exports = {
    // get all catfood
    async index(req, res) {
        try {
            const catfoods = await Catfood.findAll()
            res.send(catfoods)
        } catch (err) {
            res.status(500).send({
                error: 'The catfoods information was incorrect'
            })
        }
    },
    // create catfood
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            const catfood = await Catfood.create(req.body)
            res.send(catfood.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create catfood incorrect'
            })
        }
    },
    // edit catfood, suspend, active
    async put(req, res) {
        try {
            await Catfood.update(req.body, {
                where: {
                    id: req.params.catfoodId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update catfood incorrect'
            })
        }
    },
    // delete catfood
    async remove(req, res) {
        try {
            const catfood = await Catfood.findOne({
                where: {
                    id: req.params.catfoodId
                }
            })
            if (!catfood) {
                return res.status(403).send({
                    error: 'The catfood information was incorrect'
                })
            }
            await catfood.destroy()
            res.send(catfood)
        } catch (err) {
            res.status(500).send({
                error: 'The catfood information was incorrect'
            })
        }
    },
    // get catfood by id
    async show(req, res) {
        try {
            const catfood = await Catfood.findByPk(req.params.catfoodId)
            res.send(catfood)
        } catch (err) {
            req.status(500).send({
                error: 'The catfood information was incorrect'
            })
        }
    }
}