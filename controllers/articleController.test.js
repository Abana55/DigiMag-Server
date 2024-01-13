const request = require('supertest');
const app = require('../path/to/your/express/app'); // Import your Express app

describe('GET /api/articles', () => {
    it('should retrieve all articles', async () => {
        const res = await request(app).get('/api/articles');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});