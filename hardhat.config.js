require("@nomicfoundation/hardhat-ethers");

module.exports = {
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Sn2yA4FUa8utBd4fCxLvfdiYrUvNeMBT",
      accounts: ["109d9f73b55e4381d1ad9ed96e4ea6c1776ac1c6fd1b53f6559da92caa13586e"],
      chainId: 11155111
    }
  },
  solidity: "0.8.19"
};

