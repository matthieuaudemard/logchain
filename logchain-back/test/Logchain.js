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
            result = await logchain.createJob(155, 'success', '2021-04-12T20:26:38.314Z')
            jobCount = await logchain.jobCount()
            assert.equal(jobCount, 1)
            const event = result.logs[0].args;
            assert.equal(event.blockId.toNumber(), jobCount.toNumber(), 'blockId is correct')
            assert.equal(event.jobId.toNumber(), 155, 'jobId is correct')
            assert.equal(event.jobStatus, 'success', 'jobStatus is correct')
            assert.equal(event.jobStartedAt, '2021-04-12T20:26:38.314Z', 'jobStartedAt is correct')
        })
    })

})
