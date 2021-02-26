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

  it('This endpoint requires Authentication', done => {

    api.post('/api/cityscapes')

      .send({
        city: 'Amsterdam',
        about: 'Amsterdam is the Netherlands capital, known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the citys 17th-century Golden Age. Its Museum District houses the Van Gogh Museum, works by Rembrandt and Vermeer at the Rijksmuseum, and modern art at the Stedelijk. Cycling is key to the citys character, and there are numerous bike paths.',
        country: 'The Netherlands',
        currency: 'Euro',
        continent: 'Europe',
        language: 'Dutch',
        image: 'https://i1.wp.com/dutchsfcommunity.org/wp-content/uploads/2019/03/Amsterdam-Canals.jpg?fit=2048%2C1536&ssl=1',
        long: '5.2913',
        lat: '52.1326'
        
      })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        




        done()
      })
  })
})








