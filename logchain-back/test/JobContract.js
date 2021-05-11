const JobContract = artifacts.require('./JobContract.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('JobContract', () => {
    let logchain

    before(async  () => {
        logchain = await JobContract.deployed()
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
            const count = await logchain.jobCount()
            assert.isDefined(count)
        })
    })

    describe('jobs', async () => {
        let result, jobCount;

        it('create job', async () => {
            result = await logchain.createJob(55, "success", "develop", "build", "ng-build", "324eed2f99c692345157bd6d2eeb91cb057c356b", 22, "success");
            jobCount = await logchain.jobCount()
            assert.equal(jobCount, 1)
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), 55, 'id is correct')
            assert.equal(event.branch, 'develop', 'branch is correct')
            assert.equal(event.stage, 'build', 'stage is correct')
            assert.equal(event.name, 'ng-build', 'name is correct')
            assert.equal(event.commit, '324eed2f99c692345157bd6d2eeb91cb057c356b', 'commit is correct')
            assert.equal(event.pipeline.toNumber(), 22, 'pipeline is correct')
            assert.equal(event.pipelineStatus, 'success', 'pipelineStatus is correct')
        })
    })

})
