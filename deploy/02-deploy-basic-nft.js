const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("-----------------deploying---------")
    const basicNft = await deploy("BasicNft",{
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(basicNft.address, [])
    }
    log("-----------------deployed---------")
}

module.exports.tags = ["all", "basicNft"]
