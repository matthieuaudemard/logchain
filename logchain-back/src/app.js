const express = require('express');
const app = express();

const pipelineRoutes = require('./api/routes/pipelines');

// autorisation des CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/pipelines', pipelineRoutes);

module.exports = app;
