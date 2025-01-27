const endpointsJson = require("../endpoints.json");
const app = require('../app')
const request = require('supertest')

const {articleData, commentData, topicData, userData} = require('../db/data/test-data/index')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')

beforeEach(() => seed({topicData, userData, articleData, commentData}))
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
  
  test('should respond with status 200 and an obeject with all the topics from the database', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body: { topics } }) => {
      expect(topics).toHaveLength(3)
      topics.forEach((topic) => {
        expect(topic).toHaveProperty('slug')
        expect(topic).toHaveProperty('description')
      })
    })
  });

  test('should respond with the correct data stored in the database', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body: { topics } }) => {
      expect(topics).toEqual([{
        description: 'The man, the Mitch, the legend',
        slug: 'mitch'
      },
      {
        description: 'Not dogs',
        slug: 'cats'
      },
      {
        description: 'what books are made of',
        slug: 'paper'
      }])
    })
  });
});

