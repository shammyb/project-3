/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'


describe('Testing REGISTER', () => {


  beforeEach(done => {

    setup(done)
  })


  afterEach(done => {
    tearDown(done)
  })


  it('Should be able to register a new user', done => {

    api.post('/api/register')
      
      .send({
        username: 'testuser',
        email: 'testemail@testdomain.com',
        password: 'letmein123',
        passwordConfirmation: 'letmein123'
      })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('testuser')
        done()
      })
  })

  it('Should be able to register user, then login a new user', done => {

    api.post('/api/register')
      
      .send({
        username: 'testuser',
        email: 'testemail@testdomain.com',
        password: 'letmein123',
        passwordConfirmation: 'letmein123'
      })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        expect(res.body.username).to.eq('testuser')

        
        api.post('/api/login')
          .send({
            email: 'testemail@testdomain.com',
            password: 'letmein123',
            passwordConfirmation: 'letmein123'
          })
          .end((err, res) => {
            expect(res.status).to.eq(202)
            expect(res.body.token).to.be.a('string')

            done()
          })
      })
  })

})





