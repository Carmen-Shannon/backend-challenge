const notesService = require('app/modules/notes')
const { Service } = require('app/modules/common')

class UserService extends Service {
    async findNotesByUserId(userId) {
        const notes = await notesService.findNotesByUserId(userId)
        return notes
    }
}

module.exports = UserService
