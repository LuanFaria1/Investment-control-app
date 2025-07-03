const request = require('supertest');
const app = require('../server');

describe('Testando API de investimentos', () => {
    it('Deve listar todos os investimentos', async () => {
        const res = await request(app).get('/api/investments');
        expect(res.statusCode).toBe(200);
    });
});
