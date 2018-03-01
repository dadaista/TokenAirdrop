var ropsten_secrets = require ("./ropsten-secrets.js");
var mainnet_secrets = require ("./mainnet-secrets.js");


var HDWalletProvider = require('truffle-hdwallet-provider');



ropstenProvider = new HDWalletProvider(ropsten_secrets.mnemonic, ropsten_secrets.providerURL, 0);
mainnetProvider = new HDWalletProvider(mainnet_secrets.mnemonic, mainnet_secrets.providerURL, 0);


ropstenAddress = "0x" + ropstenProvider.wallet.getAddress().toString("hex");
mainnetAddress = "0x" + mainnetProvider.wallet.getAddress().toString("hex");


console.log('Ropsten Provider address', ropstenProvider.getAddress());
console.log('Mainnet Provider address', mainnetProvider.getAddress());

console.log('Ropsten Deploying to ', ropsten_secrets.providerURL);
console.log('Mainnet Deploying to ', mainnet_secrets.providerURL);

console.log('address of signer in ropsten is ', ropstenAddress);
console.log('address of signer in mainnet is ', mainnetAddress);

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
    from: mainnetAddress ,
    provider: mainnetProvider
   },

   infuraRopsten: {
    network_id: 3,// Ethereum test network
    gas: 60000,//CHECK GAS USED BY TESTRPC
    gasPrice: 20e9,//check gasPrice in etherscan
    from: ropstenAddress,
    provider: ropstenProvider
   }
  }
};
