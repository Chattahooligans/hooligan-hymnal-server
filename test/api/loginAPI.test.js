process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);

const { expect } = chai;

describe('User Login API', () => {
  it('it should return jwt and user info', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({
        email: 'ococncol@gmail.com',
        password: 'password',
      }).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.a('object');
        expect(res.body).to.have.ownProperty('token');
        expect(res.body).to.have.ownProperty('user');
        expect(res.body.user).to.have.ownProperty('id');
        expect(res.body.user).to.have.ownProperty('email');
        done();
      });
  });
});
