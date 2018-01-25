import express from 'express';
import logger from '../logger';
import proxy from 'proxy-middleware';
import path from 'path';
import serveStatic from 'serve-static';
import fallback from 'express-history-api-fallback';

const {
    NODE_ENV = 'development',
} = process.env;

const staticPath = path.resolve(__dirname, '../../static');

var appRouter = express.Router();
appRouter.use('/static', serveStatic(staticPath));

// Client Admin serving

if (NODE_ENV === 'development') {
    appRouter.use(proxy('http://localhost:3030'));
    logger.info('Proxy started')
} else {
    appRouter.use(fallback(path.resolve(staticPath, 'index.html')));
    logger.info('Serving static files from %s', staticPath);
}

export default appRouter;
