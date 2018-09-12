var Emblem = artifacts.require("./Emblem.sol");

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(Emblem);
};
