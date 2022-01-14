const { getCreate2Address } = require("@ethersproject/address");
const hre = require("hardhat");

async function main() {

    const Force = await hre.ethers.getContractFactory("Force");
    const force = await Force.deploy();

    const [first, second, third] = (await hre.ethers.getSigners());


    await force.deployed();

    const oldBalance = await hre.waffle.provider.getBalance(force.address);

    console.log(oldBalance);

    const ForcePayment = await hre.ethers.getContractFactory("ForcePayment");
    const forcePayment = await ForcePayment.deploy(force.address,{value:1000});

    await forcePayment.exec();

    const newBalance = await hre.waffle.provider.getBalance(force.address);

    console.log(newBalance)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
