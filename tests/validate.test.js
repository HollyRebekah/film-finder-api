const chai = require('chai');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('validation', () => {
  let users;
  beforeEach((done) => {
    Promise.all([
      User.create({
        firstName: 'Holly',
        lastName: 'Fanthorpe',
        email: 'holly@testemail.com',
        password: 'thisismypassword',
      }),
      User.create({
        firstName: 'Mo',
        lastName: 'Chhoangalia',
        email: 'mo@testemail.com',
        password: 'thisismypassword123',
      }),
    ]).then((documents) => {
      users = documents;
      done();
    });
  });

  afterEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  it('authorises a user when they sign in', (done) => {
    chai.request(server)
      .post('/filmfinder/auth')
      .send({ email: users[0].email, password: users[0].password })
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);

        const decoded = jwt.decode(res.body.authorise);
        expect(decoded).to.have.property('firstName');
        expect(decoded).to.have.property('lastName');
        expect(decoded).to.have.property('id');
        done();
      });
  });

  it('will not create a new user with an invalid email', (done) => {
    chai.request(server)
      .post('/filmfinder/users')
      .send({
        firstName: 'Holly',
        lastName: 'Fanthorpe',
        email: 'holly',
        password: 'thisismypassword',
      })
      .end((error, res) => {
        expect(error).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.errors.email).to.equal('Invalid email address');
        done();
      });
  });

  it('will not create a new user with an invalid password', (done) => {
    chai.request(server)
      .post('/filmfinder/users')
      .send({
        firstName: 'Holly',
        lastName: 'Fanthorpe',
        email: 'holly@test.com',
        password: 'p',
      })
      .end((error, res) => {
        expect(error).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.errors.password).to.equal('Password must be at least 8 characters');
        done();
      });
  });
});
