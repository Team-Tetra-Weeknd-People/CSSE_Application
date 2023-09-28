import sampleRouter from './router/sample.js';

function routers(app) {
    app.use('/sample', sampleRouter);
}

export default routers;