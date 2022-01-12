pragma solidity ^0.8.0;

import "./Telephone.sol";

contract Caller {
    Telephone telephone;

    constructor(address _telephoneContractAddress) {
        telephone = Telephone(_telephoneContractAddress);
    }

    function callChangeOwner(address _newOwner) public {
        telephone.changeOwner(_newOwner);
    }
}
