// src/index.js
exports.handler = async (event, context) => {
    console.log('Event:', JSON.stringify(event, null, 2));
    console.log('Context:', JSON.stringify(context, null, 2));

    try {
        // Extract HTTP method and path
        const method = event.httpMethod || event.requestContext?.http?.method;
        const path = event.path || event.rawPath;

        // Simple routing
        if (method === 'GET' && path === '/') {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    message: 'Hello from Lambda!',
                    timestamp: new Date().toISOString(),
                    requestId: context.awsRequestId
                })
            };
        }

        if (method === 'GET' && path === '/health') {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    status: 'healthy',
                    version: '1.0.0'
                })
            };
        }

        if (method === 'POST' && path === '/data') {
            const body = JSON.parse(event.body || '{}');
            
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    message: 'Data received successfully',
                    receivedData: body,
                    processedAt: new Date().toISOString()
                })
            };
        }

        // Default 404 response
        return {
            statusCode: 404,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Not Found',
                message: `Route ${method} ${path} not found`
            })
        };

    } catch (error) {
        console.error('Error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: error.message
            })
        };
    }
};
