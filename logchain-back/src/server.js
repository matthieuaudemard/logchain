const express = require('express');
const app = express();
const port = process.env.API_PORT;
const gitlab = process.env.GITLAB_URL;
const Web3 = require('web3');
const blockchainAddress = process.env.BLOCKCHAIN_ADDRESS;
const web3 = new Web3('ws://' + blockchainAddress);
const request = require('request');
const Logchain = require('./abis/Logchain.json');
const projecttoken = process.env.PROJECT_TOKEN;
const projectid = process.env.PROJECT_ID


// autorisation des CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/jobs', async function (req, res) {
    const networkId = await web3.eth.net.getId().catch(() => res.status(500).json({msg: 'cannot access to networkId'}));
    const networkData = Logchain.networks[networkId];
    console.log("[" + new Date() + "]: received request for jobs listing");
    if (networkData) {
        const logchain = new web3.eth.Contract(Logchain.abi, networkData.address);
        console.log("[" + new Date() + "]: fetching all jobs");
        logchain.getPastEvents('JobCreated', {fromBlock: 0, toBlock: 'latest'}).then((events) => {
            //filtrage des données de l'event pour ne garder que les données des jobs
            const jobs = events.map(event => ({
                blockId: event.returnValues.blockId,
                jobId: event.returnValues.jobId,
                jobName: event.returnValues.jobName,
                jobStage: event.returnValues.jobStage,
                jobStatus: event.returnValues.jobStatus,
                jobStartedAt: event.returnValues.jobStartedAt,
                commitSha: event.returnValues.commitSha,
                commitTitle: event.returnValues.commitTitle,
            }));
            console.log("[" + new Date() + "]: " + jobs.length + " received");
            res.status(200).json(jobs);
        }).catch(err => {
            console.log("[" + new Date() + "]: " + "blockchain unavailable");
            res.status(500).json(err);
        });
    }
});

app.get('/api/jobs/:blockId', async function (req, res) {
    const blockId = req.params.blockId;
    res.json({msg: 'Renvoie le job correspondant au blockId ' + blockId + ' de la blockchain'})
});

app.post('/api/jobs/:id', async function (req, res) {
    const jobId = req.params.id;
    // Récupération des donées du job depuis l'api gitlab;
    request({
        // TODO: charger l'adresse de l'api à l'aide d'une variable (package.json ?) plutôt qu'en dur
        url: gitlab + '/api/v4/projects/' + projectid + '/jobs/' + jobId,
        headers: {'Authorization': 'Bearer ' + projecttoken},
        rejectUnauthorized: false
    }, async function (error, response) {
        if (!error) {
            const job = JSON.parse(response.body);
            const accounts = await web3.eth.getAccounts().catch(() => res.status(500).json({msg: 'error while getting accounts', job}));
            const networkId = await web3.eth.net.getId();
            const networkData = Logchain.networks[networkId];
            if (networkData && job && job.id) {
                const logchain = new web3.eth.Contract(Logchain.abi, networkData.address);
                // création de Job
                logchain.methods
                    .createJob(job.id, job.name, job.stage, job.status, job.started_at ? job.started_at : '', job.commit.id, job.commit.title)
                    .estimateGas() // on évalue le coût en gas de la transaction ...
                    .then(estimatedGas => {
                        logchain.methods
                            .createJob(job.id, job.name, job.stage, job.status, job.started_at ? job.started_at : '', job.commit.id, job.commit.title)
                            // ... puis on effectue la transaction en précisant le coût en gas estimé
                            .send({from: accounts[0], gas: estimatedGas})
                            .then(
                                onResolved => {
                                    const jobCreated = onResolved.events.JobCreated.returnValues;
                                    console.log("[" + new Date() + "]: job created: " + jobCreated);
                                    res.status(201).json(jobCreated);
                                },
                                () => {
                                    console.log("[" + new Date() + "]: error while trying to save job");
                                    res.status(400).json({'msg': 'error while sending transaction'});
                                }
                            )
                            .catch(er => {
                                console.log("[" + new Date() + "]: " + "unable to send to blockchain");
                                res.status(500).json({message: 'something went wrong ! find out what 2', er})
                            });
                    })
                    .catch(er => {
                        console.log("[" + new Date() + "]: " + "unable to compute gas needed");
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
