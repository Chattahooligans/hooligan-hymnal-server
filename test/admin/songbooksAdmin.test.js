process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Songbooks Admin', () => {
  it('it should get songbook page', (done) => {
    chai.request(app)
      .get('/songbooks')
      .end((err, res) => {
        expect(res).to.haveOwnProperty('status');
        expect(res.status).to.eq(200);
        expect(res).to.haveOwnProperty('text');
        expect(res.text).to.contain('Songbooks');
        done();
      });
  });
});
