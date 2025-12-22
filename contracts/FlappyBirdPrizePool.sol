// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlappyBirdPrizePool {
    address public owner;
    mapping(address => uint256) public scores;
    mapping(address => uint256) public rewards;
    uint256 public totalPool;

    event ScoreSubmitted(address indexed player, uint256 score);
    event RewardClaimed(address indexed player, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function submitScore(uint256 score) external payable {
        require(msg.value > 0, "Payment required");
        scores[msg.sender] = score;
        totalPool += msg.value;
        emit ScoreSubmitted(msg.sender, score);
    }

    function claimReward() external {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No reward available");
        rewards[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
        emit RewardClaimed(msg.sender, reward);
    }

    // Owner can set rewards for players
    function setReward(address player, uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        rewards[player] = amount;
    }

    // Withdraw remaining pool (owner only)
    function withdrawPool() external {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
}
