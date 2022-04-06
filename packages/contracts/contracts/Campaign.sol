// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./openzeppelin/ERC4626NS.sol";

import "hardhat/console.sol";

/**
 * @notice A campaign is deployed together with the merkleRoot of the reward
 * distribution and a hash of the strategy configuration. At any time, reward
 * receivers can claim their rewards, but if they don't wait for the funds to arrive
 * they will receive a lesser portion of the rewards (even none at all).
 */
contract Campaign is ERC4626NS {
    /** storage */
    bytes32 public strategyHash;
    bytes32 public merkleRoot;

    mapping(address => bool) rewardsClaimed;

    /** roles */
    address public owner;

    /** errors */
    error AlreadyClaimed();
    error InvalidProof();
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    constructor(
        address _owner,
        bytes32 _strategyHash,
        bytes32 _merkleRoot,
        uint256 __totalSupply,
        IERC20 __asset,
        uint256 _fundTokenDecimals,
        string memory name,
        string memory symbol
    ) ERC4626NS(name, symbol, __asset, _fundTokenDecimals) {
        owner = _owner;

        strategyHash = _strategyHash;
        merkleRoot = _merkleRoot;
        _totalSupply = __totalSupply; // total supply is associated to the merkleRoot
    }

    function checkProof(
        address to,
        uint256 amount,
        bytes32[] calldata proof
    ) public view {
        bytes32 leaf = keccak256(abi.encodePacked(to, amount));
        console.log("---- checkProof ----");
        console.logBytes32(leaf);

        if (MerkleProof.verify(proof, merkleRoot, leaf) == false) {
            console.log("leaf invalid");
            revert InvalidProof();
        }

        console.log("leaf valid");
    }

    function claimRewardShares(
        address to,
        uint256 amount,
        bytes32[] calldata proof
    ) public {
        if (rewardsClaimed[to] == true) {
            revert AlreadyClaimed();
        }

        rewardsClaimed[to] = true;
        checkProof(to, amount, proof);

        _reveal(to, amount);
    }

    /** claim rewards (can be done by anyone in the name of a reward-claimer) */
    function claimReward(
        address account,
        uint256 amount,
        bytes32[] calldata proof
    ) external {
        console.log(account, amount, msg.sender);

        /** claim shares and redeem in one transaction */
        claimRewardShares(account, amount, proof);

        console.log("---- claimReward() ---- ", account, amount);
        console.log("totalSupply()", totalSupply());
        console.log("totalAssets()", totalAssets());
        console.log("shares claimed", balanceOf(account));

        redeem(balanceOf(account), account, account);

        console.log("redeem() called");

        console.log("totalSupply()", totalSupply());
        console.log("totalAssets()", totalAssets());
    }

    /** For now the owner can simply withdraw the funds at anytime */
    function retrieveFunds(uint256 amount) public onlyOwner {
        _asset.transfer(owner, amount);
    }

    // All ERC4626 and ERC20 methods are available on the shares
}
