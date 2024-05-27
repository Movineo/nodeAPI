import supertest from 'supertest';
import app from '../server';

describe ('routes', () => {
    it('should return hello from express', async () => {
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('hello');
    });

    it('should return invalid input', async () => {
        const response = await supertest(app).post('/user');
        expect(response.status).toBe(400);
    });

    it('should return unauthorized', async () => {
        const response = await supertest(app).post('/api/updates');
        expect(response.status).toBe(401);
    });

    it('should return unauthorized', async () => {
        const response = await supertest(app).get('/api/updates');
        expect(response.status).toBe(401);
    });

    it('should return unauthorized', async () => {
        const response = await supertest(app).put('/api/updates/1');
        expect(response.status).toBe(401);
    });

    it('should return unauthorized', async () => {
        const response = await supertest(app).delete('/api/updates/1');
        expect(response.status).toBe(401);
    });

    it('should return unauthorized', async () => {
        const response = await supertest(app).post('/api/products');
        expect(response.status).toBe(401);
    });

});