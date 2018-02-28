




  // perform actions

const tokenAddress = "0x3ddc4aa7da985d50b657222403b2e7f9fe2f45e2";

const tokenABI=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
];



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




// some constants to manage amounts
const second     = 1;
const day        = 86400 * second;
const week       = day * 7;
const wei        = 1; //1 wei = 1 wei
const ether      = 1e18 * wei;

 

const Token = artifacts.require('./build/contracts/Token.sol');

module.exports = async function(done) {
  // perform actions


  let token = await Token.at(tokenAddress);
  console.log(token.address);

  let balance = await token.balanceOf("0x93f9a1ecb4164c7e42412c3b38b43f1f11f84d8f");
  console.log("balanceOf signer is "+balance);

  for (var i = 0; i < recipients.length; i++) {
  	await token.transfer(recipients[i],amount[i]);
    let b = await token.balanceOf(recipients[i]);
    console.log("new balance of "+recipients[i]+" is:"+b);

  }

  done();

}