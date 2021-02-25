/* eslint-disable no-undef */
import { expect } from 'chai'
import setup from './lib/setup.js'
import tearDown from './lib/tearDown.js'



// eslint-disable-next-line no-undef
describe('Testing', () => {

  // eslint-disable-next-line no-undef
  beforeEach(done => {


    setup(done)

  })


  // eslint-disable-next-line no-undef
  afterEach(done => {
    tearDown(done)
  })


  it('should return a 200 response', done => {
    api.get('/api/cityscapes')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })
  it('should return an array of 15 Citys', done => {

    api.get('/api/cityscapes')
      .end((err, res) => {
        
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.eq(15)
        done()
      })
  })


})