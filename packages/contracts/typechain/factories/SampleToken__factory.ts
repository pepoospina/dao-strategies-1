/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SampleToken, SampleTokenInterface } from "../SampleToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000f5538038062000f558339810160408190526200003491620002c6565b8151829082906200004d90600390602085019062000169565b5080516200006390600490602084019062000169565b5050506200007833846200008160201b60201c565b505050620003b4565b6001600160a01b038216620000dc5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000f091906200033a565b90915550506001600160a01b038216600090815260208190526040812080548392906200011f9084906200033a565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001779062000361565b90600052602060002090601f0160209004810192826200019b5760008555620001e6565b82601f10620001b657805160ff1916838001178555620001e6565b82800160010185558215620001e6579182015b82811115620001e6578251825591602001919060010190620001c9565b50620001f4929150620001f8565b5090565b5b80821115620001f45760008155600101620001f9565b600082601f8301126200022157600080fd5b81516001600160401b03808211156200023e576200023e6200039e565b604051601f8301601f19908116603f011681019082821181831017156200026957620002696200039e565b816040528381526020925086838588010111156200028657600080fd5b600091505b83821015620002aa57858201830151818301840152908201906200028b565b83821115620002bc5760008385830101525b9695505050505050565b600080600060608486031215620002dc57600080fd5b835160208501519093506001600160401b0380821115620002fc57600080fd5b6200030a878388016200020f565b935060408601519150808211156200032157600080fd5b5062000330868287016200020f565b9150509250925092565b600082198211156200035c57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200037657607f821691505b602082108114156200039857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b610b9180620003c46000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806342966c681161008c578063a0712d6811610066578063a0712d68146101a2578063a457c2d7146101b5578063a9059cbb146101c8578063dd62ed3e146101db57600080fd5b806342966c681461015c57806370a082311461017157806395d89b411461019a57600080fd5b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461011557806323b872dd14610127578063313ce5671461013a5780633950935114610149575b600080fd5b6100dc610214565b6040516100e99190610a86565b60405180910390f35b610105610100366004610a43565b6102a6565b60405190151581526020016100e9565b6002545b6040519081526020016100e9565b610105610135366004610a07565b6102be565b604051601281526020016100e9565b610105610157366004610a43565b6102e2565b61016f61016a366004610a6d565b610321565b005b61011961017f3660046109b2565b6001600160a01b031660009081526020819052604090205490565b6100dc61032e565b61016f6101b0366004610a6d565b61033d565b6101056101c3366004610a43565b610347565b6101056101d6366004610a43565b6103de565b6101196101e93660046109d4565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461022390610b0a565b80601f016020809104026020016040519081016040528092919081815260200182805461024f90610b0a565b801561029c5780601f106102715761010080835404028352916020019161029c565b820191906000526020600020905b81548152906001019060200180831161027f57829003601f168201915b5050505050905090565b6000336102b48185856103ec565b5060019392505050565b6000336102cc858285610511565b6102d78585856105a3565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906102b4908290869061031c908790610adb565b6103ec565b61032b3382610771565b50565b60606004805461022390610b0a565b61032b33826108b7565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156103d15760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102d782868684036103ec565b6000336102b48185856105a3565b6001600160a01b03831661044e5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103c8565b6001600160a01b0382166104af5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103c8565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461059d57818110156105905760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103c8565b61059d84848484036103ec565b50505050565b6001600160a01b0383166106075760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103c8565b6001600160a01b0382166106695760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103c8565b6001600160a01b038316600090815260208190526040902054818110156106e15760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103c8565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610718908490610adb565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161076491815260200190565b60405180910390a361059d565b6001600160a01b0382166107d15760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103c8565b6001600160a01b038216600090815260208190526040902054818110156108455760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103c8565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610874908490610af3565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610504565b6001600160a01b03821661090d5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103c8565b806002600082825461091f9190610adb565b90915550506001600160a01b0382166000908152602081905260408120805483929061094c908490610adb565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b80356001600160a01b03811681146109ad57600080fd5b919050565b6000602082840312156109c457600080fd5b6109cd82610996565b9392505050565b600080604083850312156109e757600080fd5b6109f083610996565b91506109fe60208401610996565b90509250929050565b600080600060608486031215610a1c57600080fd5b610a2584610996565b9250610a3360208501610996565b9150604084013590509250925092565b60008060408385031215610a5657600080fd5b610a5f83610996565b946020939093013593505050565b600060208284031215610a7f57600080fd5b5035919050565b600060208083528351808285015260005b81811015610ab357858101830151858201604001528201610a97565b81811115610ac5576000604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610aee57610aee610b45565b500190565b600082821015610b0557610b05610b45565b500390565b600181811c90821680610b1e57607f821691505b60208210811415610b3f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220e4dff399cc1e46b6d4acec3b21a5bc3a3b99b4df349e1e55968c708a14460a9564736f6c63430008060033";

type SampleTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SampleTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SampleToken__factory extends ContractFactory {
  constructor(...args: SampleTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "SampleToken";
  }

  deploy(
    initialSupply: BigNumberish,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SampleToken> {
    return super.deploy(
      initialSupply,
      name,
      symbol,
      overrides || {}
    ) as Promise<SampleToken>;
  }
  getDeployTransaction(
    initialSupply: BigNumberish,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      initialSupply,
      name,
      symbol,
      overrides || {}
    );
  }
  attach(address: string): SampleToken {
    return super.attach(address) as SampleToken;
  }
  connect(signer: Signer): SampleToken__factory {
    return super.connect(signer) as SampleToken__factory;
  }
  static readonly contractName: "SampleToken";
  public readonly contractName: "SampleToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SampleTokenInterface {
    return new utils.Interface(_abi) as SampleTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SampleToken {
    return new Contract(address, _abi, signerOrProvider) as SampleToken;
  }
}
