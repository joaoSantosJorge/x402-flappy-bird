// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../contracts/FlappyBirdPrizePool.sol";

contract DeployScript is Script {
    function run() external {
        // Get the deployer's private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Get USDC address from environment variable or use default Base Sepolia USDC
        address usdcAddress = vm.envOr("USDC_ADDRESS", address(0x036CbD53842c5426634e7929541eC2318f3dCF7e));
        
        console.log("Deploying FlappyBirdPrizePool...");
        console.log("Deployer address:", vm.addr(deployerPrivateKey));
        console.log("USDC address:", usdcAddress);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the contract
        FlappyBirdPrizePool pool = new FlappyBirdPrizePool(usdcAddress);
        
        vm.stopBroadcast();
        
        console.log("");
        console.log("==========================================");
        console.log("FlappyBirdPrizePool deployed at:", address(pool));
        console.log("Owner:", pool.owner());
        console.log("USDC token:", address(pool.usdc()));
        console.log("Play cost:", pool.PLAY_COST());
        console.log("==========================================");
        console.log("");
        console.log("Save this contract address to:");
        console.log("1. js/payments.js (flappyBirdContractAddress)");
        console.log("2. cycleManager.js (FLAPPY_BIRD_CONTRACT_ADDRESS)");
        console.log("");
        console.log("Verify on BaseScan with:");
        console.log("forge verify-contract");
        console.log(address(pool));
        console.log("contracts/FlappyBirdPrizePool.sol:FlappyBirdPrizePool");
        console.log("--chain-id 84532");
        console.log("--constructor-args");
        console.log(usdcAddress);
    }
}
