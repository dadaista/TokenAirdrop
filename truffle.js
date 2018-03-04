var network = "ropsten";
//var network = "mainnet";
//var network = "test";

var secrets = require ("./secrets.js");


var HDWalletProvider = require('truffle-hdwallet-provider');



provider = new HDWalletProvider(secrets.mnemonic(network), secrets.providerURL(network), 0);


address = "0x" + provider.wallet.getAddress().toString("hex");



console.log('Provider address', provider.getAddress());

console.log('Deploying to ', secrets.providerURL(network));


console.log('address of signer is ', address);

//********************


module.exports = {
   solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },

  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    
    test: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },   

    mainnet: {
    host: "127.0.0.1", 
    port: 8545,
    network_id: 1, // Ethereum network
    // optional config values:
    gas: 3000000,// CHECK GAS USED BY TESTRPC
    gasPrice: 1000000000,
    // from - default address to use for any transaction Truffle makes during migrations
    // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
    //          - if specified, host and port are ignored.
   },

  infura: {
    network_id: 1,// Ethereum test network
    gas: 60000,//CHECK GAS USED BY TESTRPC
    gasPrice: 4e9,//check gasPrice in etherscan
    from: address ,
    provider: provider
   },

   infuraRopsten: {
    network_id: 3,// Ethereum test network
    gas: 60000,//CHECK GAS USED BY TESTRPC
    gasPrice: 20e9,//check gasPrice in etherscan
    from: address,
    provider: provider
   }
  }
};
