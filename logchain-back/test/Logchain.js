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

        it('has a pipelineCount', async () => {
            const count = await logchain.pipelineCount()
            assert.isDefined(count)
        })
    })

    describe('pipelines', async () => {
        let result, jobCount;

        it('create pipeline', async () => {
            result = await logchain.createPipeline(173, 'success', "2021-04-24T16:40:10.416Z", "2021-04-24T16:46:18.413Z", "f73416b74e7aa5c7eee4a0aee2be63d4896c69f6", 'job-triggering')
            jobCount = await logchain.pipelineCount()
            assert.equal(jobCount, 1)
            const event = result.logs[0].args;
            assert.equal(event.blockId.toNumber(), jobCount.toNumber(), 'blockId is correct')
            assert.equal(event.id.toNumber(), 173, 'id is correct')
            assert.equal(event.status, 'success', 'status is correct')
            assert.equal(event.startedAt, '2021-04-24T16:40:10.416Z', 'startedAt is correct')
            assert.equal(event.finishedAt, '2021-04-24T16:46:18.413Z', 'finishedAt is correct')
            assert.equal(event.sha, 'f73416b74e7aa5c7eee4a0aee2be63d4896c69f6', 'sha is correct')
            assert.equal(event.ref, 'job-triggering', 'ref is correct')
        })
    })

})
