const express = require('express');
const app = express();
const port = process.env.API_PORT;
const gitlab = process.env.GITLAB_URL;
const Web3 = require('web3');
const blockchainAddress = process.env.BLOCKCHAIN_ADDRESS;
const web3 = new Web3('ws://' + blockchainAddress);
const request = require('request');
const Logchain = require('./abis/Logchain.json');
const projectToken = process.env.PROJECT_TOKEN;
const projectid = process.env.PROJECT_ID


// autorisation des CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/pipelines', async function (req, res) {
    const networkId = await web3.eth.net.getId().catch(() => res.status(500).json({msg: 'cannot access to networkId'}));
    const networkData = Logchain.networks[networkId];
    console.log("[" + new Date() + "]: received request for pipelines listing");
    if (networkData) {
        const logchain = new web3.eth.Contract(Logchain.abi, networkData.address);
        console.log("[" + new Date() + "]: fetching all pipelines");
        logchain.getPastEvents('PipelineCreated', {fromBlock: 0, toBlock: 'latest'}).then((events) => {
            //filtrage des données de l'event pour ne garder que les données des pipelines
            const pipelines = events.map(event => ({
                blockId: event.returnValues.blockId,
                id: event.returnValues.id,
                status: event.returnValues.status,
                startedAt: event.returnValues.startedAt,
                finishedAt: event.returnValues.finishedAt,
                sha: event.returnValues.sha,
                ref: event.returnValues.ref
            }));
            console.log("[" + new Date() + "]: " + pipelines.length + " received");
            res.status(200).json(pipelines);
        }).catch(err => {
            console.log("[" + new Date() + "]: " + "blockchain unavailable");
            res.status(500).json(err);
        });
    }
});

app.get('/api/pipelines/:blockId', async function (req, res) {
    const blockId = req.params.blockId;
    res.json({msg: 'Renvoie le job correspondant au blockId ' + blockId + ' de la blockchain'})
});

app.post('/api/pipelines/:id', async function (req, res) {
    const pipelineId = req.params.id;
    // Récupération des donées du job depuis l'api gitlab;
    request({
        url: gitlab + '/api/v4/projects/' + projectid + '/pipelines/' + pipelineId,
        headers: {'Authorization': 'Bearer ' + projectToken},
        rejectUnauthorized: false
    }, async function (error, response) {
        if (!error) {
            const pipeline = JSON.parse(response.body);
            const accounts = await web3.eth.getAccounts().catch(() => res.status(500).json({msg: 'error while getting accounts', job: pipeline}));
            const networkId = await web3.eth.net.getId();
            const networkData = Logchain.networks[networkId];
            if (networkData && pipeline && pipeline.id) {
                const logchain = new web3.eth.Contract(Logchain.abi, networkData.address);
                // création de pipeline
                logchain.methods
                    .createPipeline(pipeline.id, pipeline.status, pipeline.started_at ? pipeline.started_at : '', pipeline.finished_at ? pipeline.finished_at : '', pipeline.sha, pipeline.ref)
                    .estimateGas() // on évalue le coût en gas de la transaction ...
                    .then(estimatedGas => {
                        logchain.methods
                            .createPipeline(pipeline.id, pipeline.status, pipeline.started_at ? pipeline.started_at : '', pipeline.finished_at ? pipeline.finished_at : '', pipeline.sha, pipeline.ref)
                            // ... puis on effectue la transaction en précisant le coût en gas estimé
                            .send({from: accounts[0], gas: estimatedGas})
                            .then(onResolved => {
                                    const pipelineCreated = onResolved.events.PipelineCreated.returnValues;
                                    console.log("[" + new Date() + "]: pipeline created: " + pipelineCreated);
                                    res.status(201).json(pipelineCreated);
                                },
                                () => {
                                    console.log("[" + new Date() + "]: error while trying to save pipeline");
                                    res.status(400).json({'msg': 'error while sending transaction'});
                                }
                            )
                            .catch(er => {
                                console.log("[" + new Date() + "]: " + "unable to send to blockchain");
                                res.status(500).json({message: 'something went wrong ! find out what 2', er})
                            });
                    })
                    .catch(er => {
                        console.log("[" + new Date() + "]: " + "unable to compute needed gas");
                        res.status(500).json({message: 'something went wrong ! find out what 1', er})
                    });
            } else {
                console.log("[" + new Date() + "]: unable to find network data");
            }
        } else {
            console.log("[" + new Date() + "]: " + "unable to reach gitlab api");
            res.status(404).json({message: "Unable to reach gitlab api"});
        }
    });
});

app.listen(port, function () {
    const message = "Server runnning on Port:- " + port + ". Started at :- " + new Date();
    console.log(message);
});
