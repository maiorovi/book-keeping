const app = require('../../src/server');
const supertest = require('supertest');

it('returns a plain text response', function (done) {
    supertest(app)
        .get('/')
        .set('User-Agent', 'my cool browser')
        .set('Accept', 'text/plain')
        .expect('Content-Type', /text\/html; charset=utf-8/)
        .expect(200, 'hello world')
        .end(done)
});
