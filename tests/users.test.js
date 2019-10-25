const chai = require('chai');
const User = require('../src/models/user');

describe('/filmfinder/users', () => {
  afterEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('POST /filmfinder/users', () => {
    it('creates a new user in the database', (done) => {
      chai.request(server)
        .post('/filmfinder/users')
        .send({
          firstName: 'Holly',
          lastName: 'Fanthorpe',
          email: 'holly@testemail.com',
          password: 'thisismypassword',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('Holly');
            expect(user.lastName).to.equal('Fanthorpe');
            expect(user.email).to.equal('holly@testemail.com');
            expect(user.password).not.equal('thisismypassword');
            expect(user.password).to.have.lengthOf(60);
            expect(user.favouriteGenres).to.be.a('array');
            expect(user.filmsWatched).to.be.a('array');
            expect(res.body).not.have.property('password');
            done();
          });
        });
    });
  });

  describe('users in the database', () => {
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
          firstName: 'Romy',
          lastName: 'Salt',
          email: 'romy@email.com',
          password: 'thisisromyspassword',
        }),
        User.create({
          firstName: 'Dee',
          lastName: 'Lowry',
          email: 'dee@email.com',
          password: 'thisisdeespassword',
        }),
      ]).then((documents) => {
        users = documents;
        done();
      });
    });

    describe('GET /filmfinder/users', () => {
      it('returns all user records', (done) => {
        chai.request(server)
          .get('/filmfinder/users')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.lengthOf(3);

            res.body.forEach((user) => {
              const expected = users.find(u => u._id.toString() === user._id);
              expect(user.firstName).to.equal(expected.firstName);
              expect(user.lastName).to.equal(expected.lastName);
              expect(user.email).to.equal(expected.email);
              expect(user.password).to.equal(expected.password);
            });
            done();
          });
      });
    });

    describe('GET /filmfinder/users/:userId', () => {
      it('returns a specific user', (done) => {
        const user = users[0];
        chai.request(server)
          .get(`/filmfinder/users/${user._id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(201);
            expect(res.body.firstName).to.equal(user.firstName);
            expect(res.body.lastName).to.equal(user.lastName);
            expect(res.body.email).to.equal(user.email);
            done();
          });
      });
    });

    it('adds a film to a users films watched field', (done) => {
      const user = users[0];
      chai.request(server)
        .post('/filmfinder/users/movie')
        .send({
          email: user.email,
          movie: 'Jaws',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);
          expect(res.body.filmsWatched).to.contain('Jaws');
          done();
        });
    });
  });
});
