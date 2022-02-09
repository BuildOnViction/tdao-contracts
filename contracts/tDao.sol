pragma solidity 0.5.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/token/ERC20/ERC20Capped.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/token/ERC20/ERC20Detailed.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/token/ERC20/ERC20Burnable.sol";

contract MasterDao is ERC20Capped, ERC20Detailed, ERC20Burnable  {
       constructor()
       ERC20Detailed("TomoMasterDAO","tDAO",18)
       ERC20Capped(100000000*10**18)
       public {}
}
