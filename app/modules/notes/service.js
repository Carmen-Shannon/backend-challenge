const { Service } = require('app/modules/common')

class NotesService extends Service {
    async findNotesByUserId(userId) {
        const notes = await this.find({ userId})
        return notes
    }
}

module.exports = NotesService
