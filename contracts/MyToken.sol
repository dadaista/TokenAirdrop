pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/**
 * @title Token
 * @dev Very simple ERC20 Token.
 */
contract MyToken is StandardToken {

  string  public constant name            = "MyToken";
  string  public constant symbol          = "MTK";
  uint8   public constant decimals        = 18;
  uint256 public constant max_supply      = 10 * 10**18;

  function MyToken() public  {
  	balances[msg.sender] = max_supply;
  } 


}