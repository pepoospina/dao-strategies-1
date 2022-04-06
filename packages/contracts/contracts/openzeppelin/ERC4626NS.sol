// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ERC20NS.sol";
import "./IERC4626NS.sol";

import "hardhat/console.sol";

contract ERC4626NS is ERC20NS, IERC4626NS {
    IERC20 internal immutable _asset;

    /** These are the units of asset per units of shares based on the
     * decimals of each ERC20 token (shares are 18 decimals) */
    uint256 public immutable _convRate;

    error TooManyDecimals();

    constructor(
        string memory name,
        string memory symbol,
        IERC20 __asset,
        uint256 __assetDecimals
    ) ERC20NS(name, symbol) {
        if (__assetDecimals > 18) {
            revert TooManyDecimals();
        }
        _asset = __asset;
        _convRate = 10**decimals() / (10**__assetDecimals);
    }

    /** @dev See {IERC4262-asset} */
    function asset() public view override returns (address) {
        return address(_asset);
    }

    /** @dev See {IERC4262-totalAssets} */
    function totalAssets() public view override returns (uint256) {
        return _asset.balanceOf(address(this));
    }

    /**
     * Initialization occurs when supply = 0 and input assets > 0. Total shares are determined by the two tokens decimals ratio.
     * After this, total shares are given by the ratio of shares supply / assets balance.
     *
     * Will revert if assets > 0, totalSupply > 0 and totalAssets = 0. That corresponds to a case where any asset
     * would represent an infinite amout of shares.
     */
    function convertToShares(uint256 assets) public view override returns (uint256 shares) {
        uint256 supply = totalSupply();

        return (assets == 0 || supply == 0) ? assets * _convRate : (assets * supply) / totalAssets();
    }

    /** @dev See {IERC4262-convertToAssets} */
    function convertToAssets(uint256 shares) public view override returns (uint256 assets) {
        uint256 supply = totalSupply();

        console.log("convertToAssets");
        console.log("shares: ", shares);
        console.log("supply: ", supply);
        console.log("_convRate: ", _convRate);
        console.log("totalAssets(): ", totalAssets());
        return (supply == 0) ? shares / _convRate : (shares * totalAssets()) / supply;
    }

    /** @dev See {IERC4262-maxDeposit} */
    function maxDeposit(address) public pure override returns (uint256) {
        return type(uint256).max;
    }

    /** @dev See {IERC4262-maxMint} */
    function maxMint(address) public pure override returns (uint256) {
        return type(uint256).max;
    }

    /** @dev See {IERC4262-maxWithdraw} */
    function maxWithdraw(address owner) public view override returns (uint256) {
        return convertToAssets(balanceOf(owner));
    }

    /** @dev See {IERC4262-maxRedeem} */
    function maxRedeem(address owner) public view override returns (uint256) {
        return balanceOf(owner);
    }

    /** @dev See {IERC4262-previewDeposit} */
    function previewDeposit(uint256 assets) public view override returns (uint256) {
        return convertToShares(assets);
    }

    /** @dev See {IERC4262-previewMint} */
    function previewMint(uint256 shares) public view override returns (uint256) {
        uint256 assets = convertToAssets(shares);
        return assets + (convertToShares(assets) < shares ? 1 : 0);
    }

    /** @dev See {IERC4262-previewWithdraw} */
    function previewWithdraw(uint256 assets) public view override returns (uint256) {
        uint256 shares = convertToShares(assets);
        return shares + (convertToAssets(shares) < assets ? 1 : 0);
    }

    /** @dev See {IERC4262-previewRedeem} */
    function previewRedeem(uint256 shares) public view override returns (uint256) {
        return convertToAssets(shares);
    }

    /** @dev See {IERC4262-deposit} */
    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(assets <= maxDeposit(receiver), "ERC4626: deposit more then max");

        address caller = _msgSender();
        uint256 shares = previewDeposit(assets);

        // if _asset is ERC777, transferFrom can call reenter BEFORE the transfer happens through
        // the tokensToSend hook, so we need to transfer before we mint to keep the invariants.
        SafeERC20.safeTransferFrom(_asset, caller, address(this), assets);
        _mint(receiver, shares);

        emit Deposit(caller, receiver, assets, shares);

        return shares;
    }

    /** @dev See {IERC4262-mint} */
    function mint(uint256 shares, address receiver) public override returns (uint256) {
        require(shares <= maxMint(receiver), "ERC4626: mint more then max");

        address caller = _msgSender();
        uint256 assets = previewMint(shares);

        // if _asset is ERC777, transferFrom can call reenter BEFORE the transfer happens through
        // the tokensToSend hook, so we need to transfer before we mint to keep the invariants.
        SafeERC20.safeTransferFrom(_asset, caller, address(this), assets);
        _mint(receiver, shares);

        emit Deposit(caller, receiver, assets, shares);

        return assets;
    }

    /** @dev See {IERC4262-withdraw} */
    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) public override returns (uint256) {
        require(assets <= maxWithdraw(owner), "ERC4626: withdraw more then max");

        address caller = _msgSender();
        uint256 shares = previewWithdraw(assets);

        if (caller != owner) {
            _spendAllowance(owner, caller, shares);
        }

        // if _asset is ERC777, transfer can call reenter AFTER the transfer happens through
        // the tokensReceived hook, so we need to transfer after we burn to keep the invariants.
        _burn(owner, shares);
        SafeERC20.safeTransfer(_asset, receiver, assets);

        emit Withdraw(caller, receiver, owner, assets, shares);

        return shares;
    }

    /** @dev See {IERC4262-redeem} */
    function redeem(
        uint256 shares,
        address receiver,
        address owner
    ) public override returns (uint256) {
        require(shares <= maxRedeem(owner), "ERC4626: redeem more then max");

        address caller = _msgSender();
        uint256 assets = previewRedeem(shares);

        if (caller != owner) {
            _spendAllowance(owner, caller, shares);
        }

        // if _asset is ERC777, transfer can call reenter AFTER the transfer happens through
        // the tokensReceived hook, so we need to transfer after we burn to keep the invariants.
        _burn(owner, shares);
        SafeERC20.safeTransfer(_asset, receiver, assets);

        emit Withdraw(caller, receiver, owner, assets, shares);

        return assets;
    }
}
