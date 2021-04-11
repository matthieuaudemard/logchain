const Logchain = artifacts.require('./Logchain.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Logchain', (accounts) => {
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

        it('has a commit', async () => {
            const commit = await logchain.commit()
            assert.equal(commit, '9832ffac51bc13bc5710ed8d3ad3b779a17b6189')
        })
    })
})