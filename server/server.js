import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';

import appRoter from './routes/app';

const {
    NODE_ENV = 'development',
    APP_PORT = 8080,
    APP_HOST = 'localhost'
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', appRoter);

// Error handling
app.use((error, request, response, next) => {
    logger.error(error);
    next(error);
});

app.use((error, request, response, next) => {
    if (error) {
        return response.status(error.statusCode || 500).json({
            status: 'error',
            message: String(error.message),
        })
    }

    return next();
});

async function start() {
    logger.info('Starting server on %s:%s', APP_HOST, APP_PORT);

    const server = app.listen(APP_PORT, (error) => {
        if (error) {
            throw error
        }

        logger.info('Server listening on %s:%s', APP_HOST, APP_PORT);
    });

    server.timeout = 10 * 60 * 1000;
}

start();




