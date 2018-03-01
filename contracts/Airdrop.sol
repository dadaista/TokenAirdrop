pragma solidity ^0.4.17;



import "./Token.sol";

contract Airdrop{
	Token public token;
  address public owner;
  //check this counter to know how many recipients got the Airdrop
  uint256 public counter;


	function Airdrop(address _token) public{
		require(_token != address(0));
		token = Token(_token);
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

  /*
  this function gives remaining tokens back to owner
  */
  function getRemainder(){
    require(msg.sender == owner);
    token.transfer(owner, token.balanceOf(this));
  }
  
    

}