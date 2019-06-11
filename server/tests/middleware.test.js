import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('register middleware', () => {
  it('should fail if email is not provided', async () => {
    const res = await chai.request(app).post('/api/v1/register')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        role: 'reader'
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The email field is required');
  });

  it('should fail if email is invalid', async () => {
    const res = await chai.request(app).post('/api/v1/register')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.userName(),
        password: faker.internet.password(),
        role: 'reader'
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The email is invalid');
  });

  it('should fail if username is not provided', async () => {
    const res = await chai.request(app).post('/api/v1/register')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'reader'
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The username field is required');
  });

  it('should fail if username is invalid', async () => {
    const res = await chai.request(app).post('/api/v1/register')
      .send({
        username: 1234,
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'reader'
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The username is invalid');
  });

  it('should fail if password is not provided', async () => {
    const res = await chai.request(app).post('/api/v1/register')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        role: 'reader'
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The password field is required');
  });

  it('should fail if password is less than 8 characters long', async () => {
    const res = await chai.request(app).post('/api/v1/register')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: '23456',
        role: 'reader'
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The password must be at least 8 characters long');
  });
});

describe('login middleware', () => {
  it('should fail if email is not provided', async () => {
    const res = await chai.request(app).post('/api/v1/login')
      .send({
        password: faker.internet.password()
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The email field is required');
  });

  it('should fail if email is invalid', async () => {
    const res = await chai.request(app).post('/api/v1/login')
      .send({
        email: faker.internet.userName(),
        password: faker.internet.password(),
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The email is invalid');
  });

  it('should fail if password is not provided', async () => {
    const res = await chai.request(app).post('/api/v1/login')
      .send({
        email: faker.internet.email(),
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The password field is required');
  });

  it('should fail if password is less than 8 characters long', async () => {
    const res = await chai.request(app).post('/api/v1/login')
      .send({
        email: faker.internet.email(),
        password: '23456',
      });
    expect(res).to.have.status(422);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('The password must be at least 8 characters long');
  });
});
