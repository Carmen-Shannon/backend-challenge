let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('notes', () => {
    describe('create-note', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail is the note userId does not match the current user', async () => {
        return agent
          .client()
          .post('/note')
          .send({
            userId: '12345',
            title: 'Test note',
            message: 'Test message',
          })
          .set('authorization', globalAuth.token)
          .expect(403)
          .promise()
      })

      it('should succeed and create a note for the current user', async () => {
        const note = await agent
          .client()
          .post('/note')
          .send({
            userId: globalAuth.user,
            title: 'Test note',
            message: 'Test message',
          })
          .set('authorization', globalAuth.token)
          .expect(201)
          .promise()
        should.exist(note)
        note.title.should.equal('Test note')
        note.message.should.equal('Test message')
      })
    })
  })
})
