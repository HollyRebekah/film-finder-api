const chai = require('chai');
const Movie = require('../src/models/movie');

describe('/filmfinder/movies/genre', () => {
  let movies;
  beforeEach((done) => {
    Promise.all([
      Movie.create({
        title: 'Alien',
        image: 'alien.image',
        synopsis: 'Aliens happen',
        runtime: '1hr',
        genre: 'sci-fi',
      }),
      Movie.create({
        title: 'Interstellar',
        image: 'interstellar.image',
        synopsis: 'Things in space happen',
        runtime: '1hr',
        genre: 'sci-fi',
      }),
      Movie.create({
        title: 'Lion King',
        image: 'lionking.image',
        synopsis: 'Mufasa dies',
        runtime: '1hr',
        genre: 'Kids',
      }),
      Movie.create({
        title: 'Star Wars: A New Hope',
        image: 'starwars.image',
        synopsis: 'Things in space happen in the 70s',
        runtime: '1hr',
        genre: 'sci-fi',
      }),
    ]).then((documents) => {
      movies = documents;
      done();
    });
  });

  it('returns all movies with same genre', (done) => {
    chai.request(server)
      .post('/filmfinder/movies/genre')
      .send({
        genre: 'sci-fi',
      })
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.lengthOf(3);
      });
    done();
  });
});
