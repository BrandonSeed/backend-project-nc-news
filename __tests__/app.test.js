const endpointsJson = require("../endpoints.json");
const app = require('../app')
const request = require('supertest')

const testData = require('../db/data/test-data/index')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('Non-endpoint request', () => {
  
  test('should respond with status(404) and error message on any atempted GET endpoints that do not exist', () => {
    
    return request(app)
    .get('/api/notanend')
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe('That endpoint does not exist')
    })
  });

  test('should respond with status(404) and error message on atemped POST endpoints that do not exist', () => {
    return request(app)
    .post('/api/notanend')
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

  test('should respond with correct object requested', () => {
    return request(app)
    .get('/api/articles/3')
    .expect(200)
    .then(({ body: { article }}) => {
      expect(article).toMatchObject({
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "2020-11-03T09:12:00.000Z",
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        article_id: 3,
        votes: 0
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

describe('GET /api/articles', () => {
  
  test('should respond with status 200 and array of objects of the articles', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({ body: { articles }}) => {
      expect(articles).toHaveLength(13)
      articles.forEach((article) => {

        expect(article).toHaveProperty('author')
        expect(article).toHaveProperty('title')
        expect(article).toHaveProperty('article_id')
        expect(article).toHaveProperty('topic')
        expect(article).toHaveProperty('created_at')
        expect(article).toHaveProperty('votes')
        expect(article).toHaveProperty('article_img_url')
        expect(article).toHaveProperty('comment_count')

        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(String)
        })
      })

      expect(articles).toBeSorted({descending: true, key: 'created_at'})
    })
  });
});

describe('GET /api/articles/:article_id/comments', () => {
  
  test('should respond with status 200 and an array of comment objects', () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then(({ body: { comments }}) => {
      expect(comments).toHaveLength(11)
      comments.forEach((comment) => {

        expect(comment).toHaveProperty("comment_id")
        expect(comment).toHaveProperty("votes")
        expect(comment).toHaveProperty("created_at")
        expect(comment).toHaveProperty("author")
        expect(comment).toHaveProperty("body")
        expect(comment).toHaveProperty("article_id")

        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          article_id: expect.any(Number)
        })
      })

      expect(comments).toBeSorted({ descending: true, key: "created_at"})
    })
  });

  test('should respond with status 200 and an empty array if the article has no comments', () => {
    return request(app)
    .get('/api/articles/4/comments')
    .expect(200)
    .then(({ body: { comments }}) => {
      expect(comments).toEqual([])
    })
  });

  describe('error test', () => {

    test('should respond with status 400 and msg when a non-vaild id is entered', () => {
      return request(app)
      .get('/api/articles/notAnId/comments')
      .expect(400)
      .then(({ body: { msg }}) => {
        expect(msg).toBe("Bad request")
      })
    });

    test('should respond with status 404 and msg when a vaild non-existant id is entered', () => {
      return request(app)
      .get('/api/articles/9999/comments')
      .expect(404)
      .then(({ body: { msg }}) => {
        expect(msg).toBe('That ID has no article')
      })
    });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test('should repond with status 201 and posted comment object when a username and body are entered', () => {
    return request(app)
    .post('/api/articles/4/comments')
    .send({
      username: 'lurker',
      body: 'first comment here'
    })
    .expect(201)
    .then(({ body: { comment }}) => {
      expect(comment).toHaveProperty("comment_id")
      expect(comment).toHaveProperty("votes")
      expect(comment).toHaveProperty("created_at")
      expect(comment).toHaveProperty("author")
      expect(comment).toHaveProperty("body")
      expect(comment).toHaveProperty("article_id")

      expect(comment).toMatchObject({
        comment_id: expect.any(Number),
        votes: expect.any(Number),
        created_at: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        article_id: expect.any(Number)
        })
    })
  });

  test('should respond with the correct comment object', () => {
    return request(app)
    .post('/api/articles/4/comments')
    .send({
      username: 'lurker',
      body: 'first comment here'
    })
    .expect(201)
    .then(({ body: { comment }}) => {
      expect(comment).toMatchObject({
        author: 'lurker',
        body: 'first comment here',
        article_id: 4,
        comment_id: 19,
        votes: 0,
        created_at: expect.any(String),
      })
    })
  });

  describe('error tests', () => {
    test('should repond with status 400 and msg when a non-vaild id is entered', () => {
      return request(app)
      .post('/api/articles/notAnId/comments')
      .send({
        username: 'lurker',
        body: 'first comment here'
      })
      .expect(400)
      .then(({ body: { msg }}) => {
        expect(msg).toBe("Bad request")
      })
    });

    test('should respond with status 404 and msg when a valid non-existant id is entered', () => {
      return request(app)
      .post('/api/articles/999/comments')
      .send({
        username: 'lurker',
        body: 'first comment here'
      })
      .expect(404)
      .then(({ body: { msg }}) => {
        expect(msg).toBe("That ID has no article")
      })
    });

    test('should respond with status 400 and msg when input is invalid', () => {
      return request(app)
      .post('/api/articles/4/comments')
      .send({
        username: 'lurker',
      })
      .expect(400)
      .then(({ body: { msg }}) => {
        expect(msg).toBe("Bad request, input invalid")
      })
    });
  });
});

