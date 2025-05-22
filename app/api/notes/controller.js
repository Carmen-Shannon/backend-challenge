const notesService = require('app/modules/notes')

/**
 * @method save
 */
exports.save = async (req, res) => {
    const note = await notesService.create(req.body)
    res.status(201).send(note)
}
