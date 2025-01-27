const endpointsJson = require("../endpoints.json");
const app = require('../app')
const request = require('supertest')
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

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
