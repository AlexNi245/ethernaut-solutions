const { getCreate2Address } = require("@ethersproject/address");
const hre = require("hardhat");

async function main() {

    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy(1000000000000000);

    const [first, second,third] = (await hre.ethers.getSigners());



    await token.deployed();

    await token.transfer(second.address, 20);

    const balance = await token.balanceOf(second.address);

    console.log(balance)

    await token.connect(second).transfer(third.address,30000);

    const newbalanceSecond = await token.balanceOf(second.address);
    const newbalanceThird = await token.balanceOf(third.address);

    console.log(newbalanceSecond);
    console.log(newbalanceThird);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
