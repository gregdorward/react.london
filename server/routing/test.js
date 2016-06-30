import express from 'express';
import request from 'supertest';
import passport from 'passport';

import * as storage from '../storage';
import { routingSetup } from '.';
import { useMemoryStore, getMemoryStoreValue } from '../storage/memory';
import { useFailStore } from '../storage/fail';

function setup(authenticated = true) {
  const app = express();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    req.isAuthenticated = () => authenticated; // eslint-disable-line no-param-reassign
    req.user = {}; // eslint-disable-line no-param-reassign
    next();
  });
  return routingSetup(app);
}

describe('GET routes', () => {
  it('/ 302s and redirect user to login when not authenticated', done => {
    const app = setup(false);
    request(app)
      .get('/')
      .expect(302)
      .expect('Location', '/login')
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('/ 200s when authenticated', done => {
    const app = setup();
    request(app)
      .get('/')
      .expect(200)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('/whatever/route 200s when authenticated', done => {
    const app = setup();
    request(app)
      .get('/whatever/route')
      .expect(200)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });


  it('404s for unknown Javascript', done => {
    const app = setup();
    request(app)
      .get('/angular.js')
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});


describe('POST /site/', () => {
  it('302s and redirect user to login when not authenticated', done => {
    useMemoryStore();
    const app = setup(false);
    request(app)
      .post('/site/')
      .expect(302)
      .expect('Location', '/login')
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('generates the site, stores data, and 201s when authenticated', done => {
    useMemoryStore();
    const app = setup();
    request(app)
      .post('/site/')
      .send({ hello: 'world' })
      .expect(201)
      .end((err) => {
        if (err) throw err;
        const body = getMemoryStoreValue('index.html');
        expect(body).to.match(/meetup/);
        const data = getMemoryStoreValue('data/site.json');
        expect(data).to.equal('{"hello":"world"}');
        done();
      });
  });

  it('500s when unable to upload to S3', done => {
    useFailStore();
    const app = setup();
    request(app)
      .post('/site/', {})
      .expect(503)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});

describe('GET /site/', () => {
  it('302s and redirect user to login when not authenticated', done => {
    useMemoryStore();
    const app = setup(false);
    request(app)
      .get('/site/')
      .expect(302)
      .expect('Location', '/login')
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('returns site data and 201s when authenticated', done => {
    useMemoryStore();
    storage.put('data/site.json', '{"hello":"world"}');
    const app = setup();
    request(app)
      .get('/site/')
      .expect('Content-Type', /json/)
      .expect(200, { data: { hello: 'world' } })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('404s when unable to get data', done => {
    useFailStore();
    const app = setup();
    request(app)
      .get('/site/')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});