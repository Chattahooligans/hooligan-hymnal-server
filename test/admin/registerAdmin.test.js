process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);
// const chaiWebdriver = require('chai-webdriver');
// const sw = require('selenium-webdriver');

// const driver = new sw.Builder().withCapabilities(sw.Capabilities.chrome()).build();

// chai.use(chaiWebdriver(driver));

describe('Register Admin', () => {
  it('it should return a page', (done) => {
    chai.request(app)
      .post('/register')
      .send({
        name: 'Test',
        familyName: 'Test Name',
        email: 'test@test.com',
        displayName: 'displayname',
        password: 'password',
        passwordConfirm: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
