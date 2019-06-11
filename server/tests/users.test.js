import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const User = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'reader'
};

describe('POST /signup', () => {
  it('should return 201 and a create a user', async () => {
    const res = await chai.request(app).post('/api/v1/register').send(User);
    expect(res).to.have.status(201);
    expect(res.body.status).to.be.eql('success');
    expect(res.body.message).to.be.eql('Registration was successful');
    expect(res.body.user).to.be.an('object');
  });

  it('should return 409 and user exists error message', async () => {
    const res = await chai.request(app).post('/api/v1/register').send(User);
    expect(res).to.have.status(409);
    expect(res.body.error.status).to.be.eql('error');
    expect(res.body.error.message).to.be.eql('Account already exists');
  });
});
