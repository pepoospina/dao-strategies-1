/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface CampaignFactoryInterface extends utils.Interface {
  contractName: "CampaignFactory";
  functions: {
    "deploy(address,bytes32,bytes32,uint256,address,uint256,string,string,bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deploy",
    values: [
      string,
      BytesLike,
      BytesLike,
      BigNumberish,
      string,
      BigNumberish,
      string,
      string,
      BytesLike
    ]
  ): string;

  decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;

  events: {
    "CampaignCreated(address,address,bytes32,bytes32,uint256,address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CampaignCreated"): EventFragment;
}

export type CampaignCreatedEvent = TypedEvent<
  [string, string, string, string, BigNumber, string, string],
  {
    campaignAddress: string;
    owner: string;
    strategyHash: string;
    merkleRoot: string;
    totalSupply: BigNumber;
    assetAddress: string;
    salt: string;
  }
>;

export type CampaignCreatedEventFilter = TypedEventFilter<CampaignCreatedEvent>;

export interface CampaignFactory extends BaseContract {
  contractName: "CampaignFactory";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CampaignFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deploy(
      _owner: string,
      _strategyHash: BytesLike,
      _merkleRoot: BytesLike,
      __totalSupply: BigNumberish,
      __asset: string,
      _fundTokenDecimals: BigNumberish,
      name: string,
      symbol: string,
      _salt: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deploy(
    _owner: string,
    _strategyHash: BytesLike,
    _merkleRoot: BytesLike,
    __totalSupply: BigNumberish,
    __asset: string,
    _fundTokenDecimals: BigNumberish,
    name: string,
    symbol: string,
    _salt: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deploy(
      _owner: string,
      _strategyHash: BytesLike,
      _merkleRoot: BytesLike,
      __totalSupply: BigNumberish,
      __asset: string,
      _fundTokenDecimals: BigNumberish,
      name: string,
      symbol: string,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "CampaignCreated(address,address,bytes32,bytes32,uint256,address,bytes32)"(
      campaignAddress?: null,
      owner?: null,
      strategyHash?: null,
      merkleRoot?: null,
      totalSupply?: null,
      assetAddress?: null,
      salt?: null
    ): CampaignCreatedEventFilter;
    CampaignCreated(
      campaignAddress?: null,
      owner?: null,
      strategyHash?: null,
      merkleRoot?: null,
      totalSupply?: null,
      assetAddress?: null,
      salt?: null
    ): CampaignCreatedEventFilter;
  };

  estimateGas: {
    deploy(
      _owner: string,
      _strategyHash: BytesLike,
      _merkleRoot: BytesLike,
      __totalSupply: BigNumberish,
      __asset: string,
      _fundTokenDecimals: BigNumberish,
      name: string,
      symbol: string,
      _salt: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deploy(
      _owner: string,
      _strategyHash: BytesLike,
      _merkleRoot: BytesLike,
      __totalSupply: BigNumberish,
      __asset: string,
      _fundTokenDecimals: BigNumberish,
      name: string,
      symbol: string,
      _salt: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
