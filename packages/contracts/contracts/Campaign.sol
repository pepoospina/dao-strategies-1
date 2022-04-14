// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title Campaign
 */
contract Campaign {
    uint256 public totalShares;
    uint256 public totalClaimed;
    bytes32 public strategyHash;
    address public guardian;
    uint256 public evaluationPeriodEnd;
    bytes32 public merkleRoot;
    address public oracle;
    bool public campaignCancelled;
    bool public rewardsCalculated;

    mapping(address => uint256) public shares;
    mapping(address => uint256) public claimed;
    mapping(address => uint256) public funds;

    error InvalidProof();
    error NoRewardAvailable();
    error RewardTransferFailed();
    error OnlyGuardian();
    error OnlyDuringEvaluationPeriod();
    error WithdrawalNotAllowed();
    error WithdrawTransferFailed();
    error NoFundsForAccount();
    error RewardsAlreadyCalculated();
    error OnlyOracle();

    modifier onlyGuardian() {
        if (msg.sender != guardian) {
            revert OnlyGuardian();
        }
        _;
    }

    modifier onlyOracle() {
        if (msg.sender != oracle) {
            revert OnlyOracle();
        }
        _;
    }

    constructor(
        uint256 _totalShares,
        bytes32 _merkleRoot,
        bool _rewardsCalculated,
        bytes32 _strategyHash,
        address _guardian,
        uint256 _evaluationPeriodDuration
    ) {
        evaluationPeriodEnd = block.timestamp + _evaluationPeriodDuration;
        totalShares = _totalShares;
        strategyHash = _strategyHash;
        merkleRoot = _merkleRoot;
        guardian = _guardian;
        rewardsCalculated = _rewardsCalculated;
    }

    function publishRewardsCalculation(bytes32 _merkleRoot) external onlyOracle {
        if (rewardsCalculated) {
            revert RewardsAlreadyCalculated();
        }
        rewardsCalculated = true;
        merkleRoot = _merkleRoot;
    }

    function claimReward(
        address account,
        uint256 share,
        bytes32[] calldata proof
    ) external {
        bytes32 leaf = keccak256(abi.encodePacked(account, share));
        if (MerkleProof.verify(proof, merkleRoot, leaf) == false) {
            revert InvalidProof();
        }

        uint256 totalFundsReceived = address(this).balance + totalClaimed;
        uint256 currentReward = (totalFundsReceived * share) / totalShares - claimed[account];
        if (currentReward == 0) {
            revert NoRewardAvailable();
        }
        claimed[account] += currentReward;
        totalClaimed += currentReward;

        (bool success, ) = account.call{ value: currentReward }("");
        if (!success) {
            revert RewardTransferFailed();
        }
    }

    function cancelCampaign() external onlyGuardian {
        if (block.timestamp > evaluationPeriodEnd) {
            revert OnlyDuringEvaluationPeriod();
        }
        campaignCancelled = true;
    }

    receive() external payable {
        funds[msg.sender] += msg.value;
    }

    function withdrawFunds(address account) external {
        if (!withdrawAllowed()) {
            revert WithdrawalNotAllowed();
        }

        uint256 amount = funds[account];
        if (amount == 0) {
            revert NoFundsForAccount();
        }
        funds[account] = 0;

        (bool success, ) = account.call{ value: amount }("");
        if (!success) {
            revert WithdrawTransferFailed();
        }
    }

    function withdrawAllowed() private view returns (bool) {
        return campaignCancelled || (block.timestamp > evaluationPeriodEnd && !rewardsCalculated);
    }
}
