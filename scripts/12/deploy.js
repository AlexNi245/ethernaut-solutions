
const hre = require("hardhat");

async function main() {

    const data = [
        hre.ethers.utils.formatBytes32String("Hallo"),
        hre.ethers.utils.formatBytes32String("wie geht es ich hoffe gkplk"),
        hre.ethers.utils.formatBytes32String("dir"),

    ]
    const [first, second, third] = (await hre.ethers.getSigners());

    const Privacy = await hre.ethers.getContractFactory("Privacy");
    const privacy = await Privacy.deploy(data);

    console.log("Privacy deployed at : ", privacy.address);

    const byte1 = hre.waffle.provider.getStorageAt(privacy.address, "0x3");
    const byte2 = hre.waffle.provider.getStorageAt(privacy.address, "0x4");
    const byte3 = hre.waffle.provider.getStorageAt(privacy.address, "0x5");

    const bytes = await Promise.all([byte1, byte2, byte3]);

    const key = getKeyFromBytesArray(bytes);

    await privacy.unlock(key);

    const isUnlocked = await privacy.locked();

    console.log("is locked : ", isUnlocked);

}

const getKeyFromBytesArray = (bytes) => {
    const target = bytes[2];
    const sub = target.substring(0, 34);

    return sub;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
