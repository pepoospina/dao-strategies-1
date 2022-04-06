// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CampaignFactory {
    event CampaignCreated(address);

    // Returns the address of the newly deployed contract
    function deploy(
        address _owner,
        bytes32 _strategyHash,
        bytes32 _merkleRoot,
        uint256 __totalSupply,
        IERC20 __asset,
        uint256 _fundTokenDecimals,
        string memory name,
        string memory symbol,
        bytes32 _salt
    ) public payable returns (address) {
        address campaignAddress = address(
            new Campaign{ salt: _salt }(_owner, _strategyHash, _merkleRoot, __totalSupply, __asset, _fundTokenDecimals, name, symbol)
        );
        emit CampaignCreated(campaignAddress);
        return campaignAddress;
    }
}
