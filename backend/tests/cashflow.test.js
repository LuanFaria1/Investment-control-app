const request = require('supertest');
const app = require('../server');

describe('Testando API de fluxo de caixa', () => {
    it('Deve listar todos os registros de caixa', async () => {
        const res = await request(app).get('/api/cashflow');
        expect(res.statusCode).toBe(200);
    });
});
