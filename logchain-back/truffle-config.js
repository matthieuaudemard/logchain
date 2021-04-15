require('babel-register');
require('babel-polyfill');

module.exports = {
    networks: {
        develop: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        // prod: {
        //     host: "127.0.0.1",
        //     port: 8545,
        //     network_id: "*" // Match any network id
        // },
        test: {
            host: "127.0.0.1",
            port: 7546,
            network_id: "*" // Match any network id
        }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}
