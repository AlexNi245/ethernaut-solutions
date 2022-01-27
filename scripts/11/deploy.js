
const hre = require("hardhat");

async function main() {
    const [first, second, third] = (await hre.ethers.getSigners());

    const Elevator = await hre.ethers.getContractFactory("Elevator");
    const elevator = await Elevator.deploy();

    console.log("elevator was deployed ad : ",elevator.address);

    const BuildingImpl = await hre.ethers.getContractFactory("BuildingImpl");
    const buildingImpl = await BuildingImpl.deploy(elevator.address);

    await buildingImpl.goToTop();


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
