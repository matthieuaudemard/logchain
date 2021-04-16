const Logchain = artifacts.require('./Logchain.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Logchain', () => {
    let logchain

    before(async  () => {
        logchain = await Logchain.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await logchain.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a jobCount', async () => {
            const jobCount = await logchain.jobCount()
            assert.isDefined(jobCount)
        })
    })

    describe('jobs', async () => {
        let result, jobCount;

        it('create jobs', async () => {
            result = await logchain.createJob(155, 'deploy', 'deploy', 'success', '2021-04-12T20:26:38.314Z', '7e44959b7180b0d79c218efa3fa5611f69f8cd76', "Merge branch 'api-init' into 'develop'")
            jobCount = await logchain.jobCount()
            assert.equal(jobCount, 1)
            const event = result.logs[0].args;
            assert.equal(event.blockId.toNumber(), jobCount.toNumber(), 'blockId is correct')
            assert.equal(event.jobId.toNumber(), 155, 'jobId is correct')
            assert.equal(event.jobName, 'deploy', 'jobName is correct')
            assert.equal(event.jobStage, 'deploy', 'jobStage is correct')
            assert.equal(event.jobStatus, 'success', 'jobStatus is correct')
            assert.equal(event.jobStartedAt, '2021-04-12T20:26:38.314Z', 'jobStartedAt is correct')
            assert.equal(event.commitSha, '7e44959b7180b0d79c218efa3fa5611f69f8cd76', 'commitSha is correct')
            assert.equal(event.commitTitle, "Merge branch 'api-init' into 'develop'", 'commitTitle is correct')
        })
    })

})
