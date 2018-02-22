pragma solidity ^0.4.17;


import "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";


contract Airdrop{
	ERC20Basic public token;
  address owner;
  //check this counter to know how many recipients got the Airdrop
  uint256 public counter;


	function Airdrop(address _token) public{
		require(_token != address(0));
		token = ERC20Basic(_token);
    owner = msg.sender;
	}



  function doAirdrop(address[] recipients, uint256[] balances) public{
    require(msg.sender == owner);
  	require(recipients.length>0);
    require(balances.length == recipients.length);

    counter = 0;

  	for(uint i=0; i < recipients.length; i++){
      if (token.balanceOf(this)<balances[i]) break;

  		token.transfer(recipients[i],balances[i]);
      counter ++;
    }
  }
    

}