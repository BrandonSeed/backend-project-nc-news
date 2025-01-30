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

  test('should respond with status(404) and error message on atempted PATCH endpoint that do not exist', () => {
    return request(app)
    .patch('/api/notanend')
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe('That endpoint does not exist')
    })
  });

  test('should respond with status(404) and error message on atempted Delete endpoint that do not exist', () => {
    return request(app)
    .delete('/api/notanend')
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

xdescribe('GET /api/articles', () => {
  describe('standard request', () => {
    test('should respond with status 200 and array of objects of the articles', () => {
      return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body: { articles }}) => {
        expect(articles).toHaveLength(13)
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number)
          })
        })
  
        expect(articles).toBeSorted({descending: true, key: 'created_at'})
      })
    });
  });
  describe('query requests', () => {
    test('should respond with status 200 and array of article objects sorted by queried column', () => {
      return request(app)
      .get('/api/articles?sort_by=comment_count')
      .expect(200)
      .then(({ body: { articles }}) => {
        expect(articles).toHaveLength(13)
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number)
          })
        })
  
        expect(articles).toBeSorted({descending: true, key: 'comment_count'})
      })
    });
  
    test('should respond with status 200 and array of article objects sorted by queried column ordered ascending', () => {
      return request(app)
      .get('/api/articles?sort_by=topic&order=asc')
      .expect(200)
      .then(({ body: { articles }}) => {
        expect(articles).toHaveLength(13)
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number)
          })
        })
  
        expect(articles).toBeSorted({descending: false, key: 'topic'})
      })
    });
    
    test('should respond with status 200 and array of article objects filtered by topic queried', () => {
      return request(app)
      .get('/api/articles?topic=cats')
      .expect(200)
      .then(({ body: { articles }}) => {
        expect(articles).toHaveLength(1)
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect('cats'),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number)
          })
        })
      })
    }); //test to make sure topic of no article does send back

    describe('error tests', () => {
      test('should respond with status 404 and msg when sort_by input is non-valid', () => {
        return request(app)
        .get('/api/articles?sort_by=evilInsert')
        .expect(404)
        .then(({ body: { msg }}) => {
          expect(msg).toBe('Invalid sort input')
        })
      });
  
      test('should respond with status 404 and msg when order input is non-valid', () => {
        return request(app)
        .get('/api/articles?sort_by=article_id&order=evilCode')
        .expect(404)
        .then(({ body: { msg }}) => {
          expect(msg).toBe('Invalid order input')
        })
      });
    });
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
  test('should repond with status 201 and correct posted comment object when a username and body are entered', () => {
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

    test('should respond with status 400 and msg on input invaild username', () => {
      return request(app)
      .post('/api/articles/4/comments')
      .send({
        username: 'marine',
        body: 'first comment here'
      })
      .expect(400)
      .then(({ body: { msg }}) => {
        expect(msg).toBe("Bad request, input invalid")
      })
    });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test('should respond with status 200 and an object of the updated article when a vote change is entered', () => {
    return request(app)
    .patch('/api/articles/2')
    .send({ inc_votes: 20})
    .expect(200)
    .then(({ body: { article }}) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        })
    })
  });

  test('should respond with status 200 and the updated article object with positive vote change', () => {
    return request(app)
    .patch('/api/articles/2')
    .send({ inc_votes: 20})
    .expect(200)
    .then(({ body: { article }}) => {
      expect(article).toMatchObject({
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        article_id: 2,
        votes: 20,
        created_at: '2020-10-16T05:03:00.000Z'
      })
    })
  });

  test('should respond with status 200 and the updated article object with negative vote change', () => {
    return request(app)
    .patch('/api/articles/2')
    .send({ inc_votes: -100})
    .expect(200)
    .then(({ body: { article }}) => {
      expect(article).toMatchObject({
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        article_id: 2,
        votes: -100,
        created_at: '2020-10-16T05:03:00.000Z'
      })
    })
  });

  describe('error tests', () => {
    
  test('should respond with status 400 and msg when a non-valid id is entered', () => {
    return request(app)
    .patch('/api/articles/notAnId')
    .send({ inc_votes: -100})
    .expect(400)
    .then(({ body: { msg }}) => {
      expect(msg).toBe('Bad request')
    })
  });
  test('should respond with status 404 and msg when a valid non-existant id is entered', () => {
    return request(app)
    .patch('/api/articles/999')
    .send({ inc_votes: -100})
    .expect(404)
    .then(({ body: { msg }}) => {
      expect(msg).toBe('That ID has no article')
    })
  });
  test('should repond with status 422 and msg when change in votes is 0', () => {
    return request(app)
    .patch('/api/articles/2')
    .send({ inc_votes: 0})
    .expect(422)
    .then(({ body: { msg }}) => {
      expect(msg).toBe('No change in votes')
    })
  });
  test('should respond with status 400 and msg when input object does not have only inc_votes', () => {
    return request(app)
    .patch('/api/articles/2')
    .send({ inc_vtes: 20})
    .expect(400)
    .then(({ body: { msg }}) => {
      expect(msg).toBe('Bad request, input invalid')
    })
  });
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  test('should respond with status 204 when comment deleted', () => {
    return request(app)
    .delete('/api/comments/5')
    .expect(204)
    .then(() => {
      return request(app)
      .delete('/api/comments/5')
      .expect(404)
    })
  });

  describe('error tests', () => {
    test('should respond with status 400 and msg when a non-valid id is entered', () => {
      return request(app)
      .delete('/api/comments/notAnId')
      .expect(400)
      .then(({ body: { msg }}) => {
        expect(msg).toBe('Bad request')
      })
    });

    test('should respond with status 404 and msg when valid non-existant id is entered', () => {
      return request(app)
      .delete('/api/comments/999')
      .expect(404)
      .then(({ body: { msg }}) => {
        expect(msg).toBe('That ID has no comment')
      })
    });
  });
});

describe('GET /api/users', () => {
  test('should respond with status 200 and array of user objects', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({ body: { users }}) => {
      expect(users).toHaveLength(4)
      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String)
        })
      })
    })
  });
});