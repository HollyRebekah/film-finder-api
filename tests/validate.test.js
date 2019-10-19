const chai = require('chai');
const User = require('../src/models/user');

describe('validation', () => {
  afterEach((done) => {
    User.deleteMany({}, () => {
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

        User.countDocuments({}, (error, count) => {
          expect(count).to.equal(0);
          done();
        });
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

        User.countDocuments({}, (error, count) => {
          expect(count).to.equal(0);
          done();
        });
      });
  });
});
