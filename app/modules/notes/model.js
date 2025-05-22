const { Model } = require('app/modules/common')

class NotesModel extends Model {
    schema() {
        return {
            userId: { // this should be indexed
                type: String,
                ref: 'User',
                required: true,
                index: {
                    unique: false
                }
            },
            title: {
                type: String,
                trim: true,
                required: true
            },
            message: {
                type: String,
                trim: true,
                required: true
            }
        }
    }
}

module.exports = NotesModel
