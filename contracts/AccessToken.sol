// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AccessToken is ERC20  {
    address owner;
    constructor() ERC20("AccessToken", "AT") {
        owner = msg.sender;
        _mint(owner, 1);
    }
    function mint() public {
        require(balanceOf(msg.sender) == 0, 'Limited to one token per address');
        _mint(msg.sender, 1);
    }
}