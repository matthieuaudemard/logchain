const express = require('express');
const app = express();
const port = process.env.port || 1337;

app.get('/api/jobs', async function (req, res) {
    res.json({msg: 'Renvoie tous les jobs enregistrés dans la blockchain'})
});
app.get('/api/jobs/:blockId', async function (req, res) {
    const blockId = req.params.blockId;
    res.json({msg: 'Renvoie le job correspondant au blockId ' + blockId + ' de la blockchain'})
});

app.post('/api/jobs/:id', async function (req, res) {
    const id = req.params.id;
    res.json({msg: 'Ajoute un nouveau job correspondant à l\'id ' + id + ' de l\'api gitlab dans la blockchain'})
});

app.listen(port, function () {
    const datetime = new Date();
    const message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});
