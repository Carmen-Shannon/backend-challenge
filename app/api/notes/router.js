const controller = require('./controller')
const auth = require('./auth')

module.exports = (router) => {
    router.post('/note', async (req, res) => {
        await auth.requiresCurrentUser(req)
        await controller.save(req, res)
    })
}
