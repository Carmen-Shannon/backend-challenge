let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('find-notes-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail if the current user does not match the user id to find notes for', async () => {
        return agent
          .client()
          .get(`/user/12345/notes`)
          .set('authorization', globalAuth.token)
          .expect(403)
          .promise()
      })

      it('should succeed and return notes for the current user', async () => {
        const mockNotes = await mockData.mockNotes(globalAuth.user)
        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(notes)
        notes.length.should.equal(1)
        notes[0].id.should.equal(mockNotes.id)
      })
    })
  })
})
