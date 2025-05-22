const { v4: uuid } = require('uuid')

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
    describe('update-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail if the current user does not match the user id to update', async () => {
        return agent
          .client()
          .put('/user/1234')
          .set('authorization', globalAuth.token)
          .send({
            email: `${uuid()}@test.com`,
            firstName: 'Test',
            lastName: 'User',
          })
          .expect(403)
          .promise()
      })

      it('should succeed if the current user matches the user id to update', async () => {
        const user = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .send({
            email: `${uuid()}@test.com`,
            firstName: 'Test',
            lastName: 'User',
          })
          .expect(200)
          .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
      })
    })
  })
})
