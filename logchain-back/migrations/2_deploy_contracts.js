const Logchain = artifacts.require("Logchain");

module.exports = function (deployer) {
    deployer.deploy(Logchain);
};
