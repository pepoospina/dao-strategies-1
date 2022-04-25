//// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Campaign.sol";

contract CampaignFactory {
    Campaign private master;

    event CampaignCreated(address creator, address newCampaign);

    constructor(address payable _master) {
        master = Campaign(_master);
    }

    function createCampaign(
        Campaign.SharesData memory _shares,
        bytes32 _uri,
        address _guardian,
        address _oracle,
        bool _sharesPublished,
        uint256 _claimPeriodStart
    ) external {
        address payable proxy = payable(Clones.clone(address(master)));
        Campaign(proxy).initCampaign(_shares, _uri, _guardian, _oracle, _sharesPublished, _claimPeriodStart);

        emit CampaignCreated(msg.sender, proxy);
    }
}
