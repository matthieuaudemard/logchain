const express = require('express');
const app = express();
const port = process.env.port || 1337;
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
const request = require('request');
const Logchain = require('./abis/Logchain.json');

// autorisation des CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/jobs', async function (req, res) {
    res.json({msg: 'Renvoie tous les jobs enregistrés dans la blockchain'});
});

app.get('/api/jobs/:blockId', async function (req, res) {
    const blockId = req.params.blockId;
    res.json({msg: 'Renvoie le job correspondant au blockId ' + blockId + ' de la blockchain'})
});

app.post('/api/jobs/:id', async function (req, res) {
    const jobId = req.params.id;
    // Récupération des donées du job depuis l'api gitlab
    request({
        // TODO: charger l'adresse de l'api à l'aide d'une variable (package.json ?) plutôt qu'en dur
        url: 'http://192.168.1.60/api/v4/projects/3/jobs/' + jobId,
        headers: {'Authorization': 'Bearer sKKsD1h3bJ5fE9J9KqK5'},
        rejectUnauthorized: false
    }, async function (error, response) {
        if (!error) {
            const job = JSON.parse(response.body);
            const accounts = await web3.eth.getAccounts().catch(err => res.status(400).json(err));
            const networkId = await web3.eth.net.getId();
            const networkData = Logchain.networks[networkId];
            if (networkData) {
                const logchain = new web3.eth.Contract(Logchain.abi, networkData.address);
                // création de Job
                logchain.methods
                    .createJob(job.id, job.status, job.started_at ? job.started_at : '')
                    .estimateGas() // on évalue le coût en gas de la transaction ...
                    .then(estimatedGas => {
                        logchain.methods
                            .createJob(job.id, job.status, job.started_at ? job.started_at : '')
                            // ... puis on effectue la transaction en précisant le coût en gas estimé
                            .send({from: accounts[0], gas: estimatedGas})
                            .then(
                                onResolved => res.status(201).json(onResolved.events.JobCreated.returnValues),
                                onRejected => res.status(400).json(onRejected)
                            );
                    })
                    .catch(er => {res.status(400).json({message: 'something went wrong ! find out what', er})});
            }
        } else {
            res.status(400).send();
        }
    });
});

app.listen(port, function () {
    const datetime = new Date();
    const message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});
