process.env.NODE_ENV = 'test';

const sw = require('selenium-webdriver');

const driver = new sw.Builder().withCapabilities(sw.Capabilities.chrome()).build();

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Songbooks Admin', () => {
  //
});
