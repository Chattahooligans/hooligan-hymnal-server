process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const { expect } = chai;

const app = require('../../app');

chai.use(chaiHttp);

describe('Songbooks API', () => {
  it('it should return an array', (done) => {
    chai.request(app)
      .get('/api/songbooks')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        // expect(res.body.length).to.be.eql(1);
        done();
      });
  });
});
