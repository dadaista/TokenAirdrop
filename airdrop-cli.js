// This is a brute one-by-one token transfer from signer to a list of recipients

const network = "ropsten"; //"ropsten";

var tokenAddress;

if (network == "mainnet") tokenAddress = "0x662bA51F62591830CD380a7A9bEB232DbD7a92a4";
if (network == "ropsten") tokenAddress = "0x3ddc4aa7da985d50b657222403b2e7f9fe2f45e2";




var signer;      

if(network == "mainnet") signer = "0x8387A9f497353af8a54269824f2272195C3C2A0f";
if(network == "ropsten") signer = "0x93f9a1ecb4164c7e42412c3b38b43f1f11f84d8f";



const recipients = [
"0xCA5aA3f0398D5623e4f0A882b13076733581fB1e",
"0xC8F84c737b5F932Dcf625559dB7bb813e419E3ef",
"0x6c22f997e8aae4567c949c444b22b4079b30c37f",
"0x0AEFF25f5B5d77bAa2392cAeb70180Bc37eF2a1a",
"0x298fC0F48578f2bf5858CbD89B8758deE99B7d84",
"0xCA5aA3f0398D5623e4f0A882b13076733581fB1e",
"0x94153b7863a6eE2891D1c12B584840ED4D819222",
"0xeDFAfF683444da0D4e635120fb7530446878dEa0",
"0xC1577870C885555F0c0ceE2cA96b7707Fe718D7a",
"0x96114053dA264AeaCc5D048F430bAda489DF10E9",
"0xE1A706eFBCd1bB393E9732C1014C9608D5fa1ffC",
"0x6f4E2a8bAfd5871FA60f592a02B3c3dF6A537316",
"0x921FF0aa9a2664CbE5A5f82B9246e46EbD7Ffd08",
"0xF2d4bc7D53A54e6EaBc0b649323c6b6cfbe95066",
"0xcCA69e206ffA31164008Cf895AdD082fb7f17e10",
"0x34b365d2b225a28811ec1bba42926080143c6a99",
"0xC8F84c737b5F932Dcf625559dB7bb813e419E3ef",
"0xC1577870C885555F0c0ceE2cA96b7707Fe718D7a"
];


const amount = [
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552,
55555555555555552
];


const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

const getBalance = (account, at) =>
  promisify(cb => web3.eth.getBalance(account, at, cb));



 

const Token = artifacts.require('./build/contracts/Token.sol');

module.exports =  async function(done) {
  // perform actions


  var token = await Token.at(tokenAddress);
  console.log("**"+token.address);


  
  //use getBalance
  const ETHBalance = await getBalance(signer);
  console.log("Balance (ETH):" + ETHBalance.div(1e18));


  
  for (var i = 0; i < recipients.length; i++) {


    let balance = await token.balanceOf(signer);
    console.log("Token.balanceOf() signer is "+balance);

    if(balance < amount[i]){
      done("STOP: tokens are over");
    }

  	console.log("transfer() to:"+ recipients[i]+","+amount[i]);
  	await token.transfer(recipients[i],amount[i]);

  };
    
    

  

  done();

}