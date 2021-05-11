const express = require('express');
const router = express.Router();
const GITLAB_API_URL = process.env.GITLAB_API_URL;
const Web3 = require('web3');
const BLOCKCHAIN_ADDRESS = process.env.BLOCKCHAIN_ADDRESS;
const web3 = new Web3('ws://' + BLOCKCHAIN_ADDRESS);
const request = require('request');
const PROJECT_TOKEN = process.env.PROJECT_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;
const JobContract = require('../../abis/JobContract.json');

router.get('/', async function (req, res) {
    const networkId = await web3.eth.net.getId().catch(() => res.status(500).json({msg: 'cannot access to networkId'}));
    const networkData = JobContract.networks[networkId];
    writeLog("received request for pipelines listing");
    if (networkData) {
        const jobContract = new web3.eth.Contract(JobContract.abi, networkData.address);
        writeLog("fetching all pipelines");
        jobContract
            .getPastEvents('JobCreated', {fromBlock: 0, toBlock: 'latest'})
            .then(events => {
                // filtrage des données de l'event pour ne garder que les données des jobs
                writeLog(events.length + " jobs");
                const jobs = events.map(event => fromEvent(event));
                res.status(200).send(groupByPipeline(jobs));
            })
            .catch(err => res.status(500).json({error: JSON.stringify(err)}));
    }
});

router.post('/all', async function (req, res) {
    const PER_PAGE = 100;
    let page = 1;
    // TODO: boucler sur les pages (response.headers.X-Total-Pages)
    fetchJobsAndPersist(`${GITLAB_API_URL}/projects/${PROJECT_ID}/jobs?per_page=${PER_PAGE}&page=${page}`, res);
});

router.post('/:id', async function (req, res) {
    const pipelineId = req.params.id;`${GITLAB_API_URL}/projects/${PROJECT_ID}/pipelines/${pipelineId}/jobs`
    // Récupération des donées du job depuis l'api GITLAB_API_URL;
    fetchJobsAndPersist(`${GITLAB_API_URL}/projects/${PROJECT_ID}/pipelines/${pipelineId}/jobs`, res);
});

fetchJobsAndPersist = (address, res) => {
    request({
        url: address,
        headers: {'Authorization': 'Bearer ' + PROJECT_TOKEN},
        rejectUnauthorized: false
    }, async function (error, response) {
        if (!error) {
            const jobs = JSON.parse(response.body);
            const accounts = await web3.eth.getAccounts().catch(() => res.status(500).json({msg: 'error while getting accounts'}));
            const networkId = await web3.eth.net.getId();
            const networkData = JobContract.networks[networkId];
            if (networkData && jobs && jobs.length > 0) {
                const jobContract = new web3.eth.Contract(JobContract.abi, networkData.address);
                const jobCreateds = [];
                jobs
                    .map(job => fromGitlab(job))
                    .forEach(job =>
                        estimateGasPromise(jobContract, job)
                            .then(gas =>
                                sendJob(jobContract, accounts[0], job, gas)
                                    .then(onResolved => {
                                        jobCreateds.push(onResolved.events.JobCreated.returnValues);
                                        if (jobCreateds.length === jobs.length) {
                                            res.status(201).send(groupByPipeline(jobCreateds));
                                        }
                                    }))
                            .catch(err => res.status(500).json(err))
                    );
            }
        }
    });
}

groupByPipeline = jobs => {
    const pipelines = [];
    jobs.forEach(job => {
        let pipeline = pipelines.find(p => p.id === job.pipeline);
        if (!pipeline) {
            pipeline = {id: job.pipeline, status: job.pipelineStatus, branch: job.branch, commit: job.commit, jobs: []};
            pipelines.push(pipeline);
        }
        pipeline.jobs.push({
            id: job.id,
            status: job.status,
            branch: job.branch,
            stage: job.stage,
            name: job.name,
            commit: job.commit
        })
    });
    return pipelines;
}

writeLog = msg => console.log("[" + new Date() + "]: " + msg);

fromEvent = jobCreatedEvent => ({
    id: jobCreatedEvent.returnValues.id,
    status: jobCreatedEvent.returnValues.status,
    branch: jobCreatedEvent.returnValues.branch,
    stage: jobCreatedEvent.returnValues.stage,
    name: jobCreatedEvent.returnValues.name,
    commit: jobCreatedEvent.returnValues.commit,
    pipeline: jobCreatedEvent.returnValues.pipeline,
    pipelineStatus: jobCreatedEvent.returnValues.pipelineStatus
});

fromGitlab = apiJobs => ({
    id: apiJobs.id || '',
    status: apiJobs.status || '',
    branch: apiJobs.ref || '',
    stage: apiJobs.stage || '',
    name: apiJobs.name || '',
    commit: apiJobs.commit.id || '',
    pipeline: apiJobs.pipeline.id || '',
    pipelineStatus: apiJobs.pipeline.status || ''
});

estimateGasPromise = (contract, job) => {
    return contract
        .methods
        .createJob(job.id, job.status, job.branch, job.stage, job.name, job.commit, job.pipeline, job.pipelineStatus)
        .estimateGas()
}

sendJob = async function (contract, account, job, gas) {
    return contract
        .methods
        .createJob(job.id, job.status, job.branch, job.stage, job.name, job.commit, job.pipeline, job.pipelineStatus)
        .send({from: account, gas: gas})
}

module.exports = router;
