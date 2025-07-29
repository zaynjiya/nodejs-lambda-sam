const { handler } = require('../../src/index');

describe('Lambda Handler Tests', () => {
    test('GET / should return 200', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/',
            headers: {},
            body: null
        };
        
        const context = {
            awsRequestId: 'test-request-id'
        };

        const result = await handler(event, context);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Hello from Lambda!');
    });

    test('GET /health should return healthy status', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/health',
            headers: {},
            body: null
        };
        
        const context = {
            awsRequestId: 'test-request-id'
        };

        const result = await handler(event, context);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).status).toBe('healthy');
    });

    test('POST /data should process data', async () => {
        const event = {
            httpMethod: 'POST',
            path: '/data',
            headers: {},
            body: JSON.stringify({ test: 'data' })
        };
        
        const context = {
            awsRequestId: 'test-request-id'
        };

        const result = await handler(event, context);
        
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Data received successfully');
    });

    test('Unknown route should return 404', async () => {
        const event = {
            httpMethod: 'GET',
            path: '/unknown',
            headers: {},
            body: null
        };
        
        const context = {
            awsRequestId: 'test-request-id'
        };

        const result = await handler(event, context);
        
        expect(result.statusCode).toBe(404);
    });
});
