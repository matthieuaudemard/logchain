const express = require('express');
const app = express();
const port = process.env.port || 1337;
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
const request = require('request');
const Logchain = require('./abis/Logchain.json');

app.get('/api/jobs', async function (req, res) {
    res.json({msg: 'Renvoie tous les jobs enregistrés dans la blockchain'});
});

app.get('/api/jobs/:blockId', async function (req, res) {
    const blockId = req.params.blockId;
    res.json({msg: 'Renvoie le job correspondant au blockId ' + blockId + ' de la blockchain'})
});

app.post('/api/jobs/:id', async function (req, res) {
    const id = req.params.id;

    request({
        url: 'http://192.168.1.60/api/v4/projects/3/jobs/' + id,
        headers: {
            'Authorization': 'Bearer sKKsD1h3bJ5fE9J9KqK5'
        },
        rejectUnauthorized: false
    }, async function (error, response) {
        if (!error) {
            const job = JSON.parse(response.body);
            const accounts = await web3.eth.getAccounts().catch(err => res.status(404).json({message: "blockchain not found", err}));
            const networkId = await web3.eth.net.getId();
            const networkData = Logchain.networks[networkId];
            if (networkData) {
                const logchain = new web3.eth.Contract(Logchain.abi, networkData.address);
                await logchain.methods
                    .createJob(job.id, job.status, job.started_at)
                    .send({from: accounts[0], gas: 100000})
                    .catch(err => res.status(500).json(err));
            } else {
                res.status(403);
            }
        } else {
            res.status(404);
        }
    });
    res.status(200);
});

app.listen(port, function () {
    const datetime = new Date();
    const message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});
