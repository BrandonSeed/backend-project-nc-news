const endpointsJson = require("../endpoints.json");
const app = require('../app')
const request = require('supertest')

const testData = require('../db/data/test-data/index')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('Non-endpoint request', () => {
  
  test('should return a status(404) and error message on any atempted endpoint that does not exist', () => {
    
    return request(app)
    .get('/api/notanend')
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe('That endpoint does not exist')
    })
  });
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('GET /api/topics', () => {
  
  test('should respond with status 200 and an array with all the topics from the database', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body: { topics } }) => {
      expect(topics).toHaveLength(3)
      topics.forEach((topic) => {
        expect(topic).toHaveProperty('slug')
        expect(topic).toHaveProperty('description')
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String)
        })
      })
    })
  });
});

describe('GET /api/articles/:article_id', () => {
  
  test('should respond with status 200 and an object of the article requested', () => {
    return request(app)
    .get('/api/articles/4')
    .expect(200)
    .then(({ body: { article }}) => {
      expect(article).toHaveProperty('author')
      expect(article).toHaveProperty('title')
      expect(article).toHaveProperty('article_id')
      expect(article).toHaveProperty('body')
      expect(article).toHaveProperty('topic')
      expect(article).toHaveProperty('created_at')
      expect(article).toHaveProperty('votes')
      expect(article).toHaveProperty('article_img_url')

      expect(article).toMatchObject({
        author: expect.any(String),
        title: expect.any(String),
        article_id: expect.any(Number),
        body: expect.any(String),
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        article_img_url: expect.any(String)
      })
    })
  });

  describe('error tests', () => { 
    
    test('should respond with status 404 and msg when a vaild but non-existant id is entered', () => {
      return request(app)
      .get('/api/articles/999')
      .expect(404)
      .then(({body: {msg}}) =>{
        expect(msg).toBe('That ID has no article')
      })
    });

    test('should respond with status 400 and msg when a non-vaild id is entered', () => {
      return request(app)
      .get('/api/articles/notAnId')
      .expect(400)
      .then(({body: {msg}}) =>{
        expect(msg).toBe('Bad request')
      })
    });
  });
});
