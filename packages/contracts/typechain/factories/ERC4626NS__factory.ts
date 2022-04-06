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
import type { ERC4626NS, ERC4626NSInterface } from "../ERC4626NS";

const _abi = [
  {
    inputs: [
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
      {
        internalType: "contract IERC20",
        name: "__asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "__assetDecimals",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "TooManyDecimals",
    type: "error",
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
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
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
    name: "Reveal",
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
    name: "TransferNS",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "_convRate",
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
    inputs: [],
    name: "asset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
        name: "shares",
        type: "uint256",
      },
    ],
    name: "convertToAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
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
        name: "assets",
        type: "uint256",
      },
    ],
    name: "convertToShares",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxMint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "maxRedeem",
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
        name: "owner",
        type: "address",
      },
    ],
    name: "maxWithdraw",
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
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
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
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    name: "previewDeposit",
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
        name: "shares",
        type: "uint256",
      },
    ],
    name: "previewMint",
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
        name: "shares",
        type: "uint256",
      },
    ],
    name: "previewRedeem",
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
        name: "assets",
        type: "uint256",
      },
    ],
    name: "previewWithdraw",
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
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "totalAssets",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b5060405162001dd238038062001dd283398101604081905262000034916200022d565b8351849084906200004d906003906020850190620000d0565b50805162000063906004906020840190620000d0565b505050601281111562000089576040516330e571f960e11b815260040160405180910390fd5b6001600160601b0319606083901b16608052620000a881600a6200032c565b620000b66012600a62000341565b620000c29190620002c0565b60a052506200046c92505050565b828054620000de9062000403565b90600052602060002090601f0160209004810192826200010257600085556200014d565b82601f106200011d57805160ff19168380011785556200014d565b828001600101855582156200014d579182015b828111156200014d57825182559160200191906001019062000130565b506200015b9291506200015f565b5090565b5b808211156200015b576000815560010162000160565b600082601f8301126200018857600080fd5b81516001600160401b0380821115620001a557620001a562000456565b604051601f8301601f19908116603f01168101908282118183101715620001d057620001d062000456565b81604052838152602092508683858801011115620001ed57600080fd5b600091505b83821015620002115785820183015181830184015290820190620001f2565b83821115620002235760008385830101525b9695505050505050565b600080600080608085870312156200024457600080fd5b84516001600160401b03808211156200025c57600080fd5b6200026a8883890162000176565b955060208701519150808211156200028157600080fd5b50620002908782880162000176565b604087015190945090506001600160a01b0381168114620002b057600080fd5b6060959095015193969295505050565b600082620002de57634e487b7160e01b600052601260045260246000fd5b500490565b600181815b808511156200032457816000190482111562000308576200030862000440565b808516156200031657918102915b93841c9390800290620002e8565b509250929050565b60006200033a83836200034d565b9392505050565b60006200033a60ff8416835b6000826200035e57506001620003fd565b816200036d57506000620003fd565b81600181146200038657600281146200039157620003b1565b6001915050620003fd565b60ff841115620003a557620003a562000440565b50506001821b620003fd565b5060208310610133831016604e8410600b8410161715620003d6575081810a620003fd565b620003e28383620002e3565b8060001904821115620003f957620003f962000440565b0290505b92915050565b600181811c908216806200041857607f821691505b602082108114156200043a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b60805160601c60a051611905620004cd6000396000818161040b0152818161062c015281816106b50152610c2501526000818161027901528181610458015281816107c40152818161086801528181610a490152610b7301526119056000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806394bf804d116100f9578063c63d75b611610097578063d905777e11610071578063d905777e146103ba578063dd62ed3e146103cd578063e640462d14610406578063ef8b30f71461042d57600080fd5b8063c63d75b6146102b6578063c6e6f59214610394578063ce96cb77146103a757600080fd5b8063a9059cbb116100d3578063a9059cbb14610348578063b3d7f6b91461035b578063b460af941461036e578063ba0876521461038157600080fd5b806394bf804d1461031a57806395d89b411461032d578063a457c2d71461033557600080fd5b8063313ce56711610166578063402d267d11610140578063402d267d146102b65780634cdad506146102cb5780636e553f65146102de57806370a08231146102f157600080fd5b8063313ce5671461025d57806338d52e0f1461026c57806339509351146102a357600080fd5b8063095ea7b3116101a2578063095ea7b31461020c5780630a28a4771461022f57806318160ddd1461024257806323b872dd1461024a57600080fd5b806301e1d114146101c957806306fdde03146101e457806307a2d13a146101f9575b600080fd5b6101d1610440565b6040519081526020015b60405180910390f35b6101ec6104df565b6040516101db91906117ad565b6101d16102073660046116d4565b610571565b61021f61021a366004611688565b6106e1565b60405190151581526020016101db565b6101d161023d3660046116d4565b6106f9565b6002546101d1565b61021f61025836600461164c565b61072d565b604051601281526020016101db565b6040516001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001681526020016101db565b61021f6102b1366004611688565b610751565b6101d16102c43660046115fe565b5060001990565b6101d16102d93660046116d4565b610790565b6101d16102ec366004611706565b6107a1565b6101d16102ff3660046115fe565b6001600160a01b031660009081526020819052604090205490565b6101d1610328366004611706565b610853565b6101ec6108e7565b61021f610343366004611688565b6108f6565b61021f610356366004611688565b610988565b6101d16103693660046116d4565b610996565b6101d161037c366004611729565b6109ae565b6101d161038f366004611729565b610ad8565b6101d16103a23660046116d4565b610bf1565b6101d16103b53660046115fe565b610c4a565b6101d16103c83660046115fe565b610c6c565b6101d16103db366004611619565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101d17f000000000000000000000000000000000000000000000000000000000000000081565b6101d161043b3660046116d4565b610c8a565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b1580156104a257600080fd5b505afa1580156104b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104da91906116ed565b905090565b6060600380546104ee9061187e565b80601f016020809104026020016040519081016040528092919081815260200182805461051a9061187e565b80156105675780601f1061053c57610100808354040283529160200191610567565b820191906000526020600020905b81548152906001019060200180831161054a57829003601f168201915b5050505050905090565b60008061057d60025490565b90506105af6040518060400160405280600f81526020016e636f6e76657274546f41737365747360881b815250610c95565b6105d960405180604001604052806008815260200167039b430b932b99d160c51b81525084610cdb565b61060360405180604001604052806008815260200167039bab838363c9d160c51b81525082610cdb565b6106506040518060400160405280600b81526020016a02fb1b7b73b2930ba329d160ad1b8152507f0000000000000000000000000000000000000000000000000000000000000000610cdb565b6106886040518060400160405280600f81526020016e03a37ba30b620b9b9b2ba3994149d1608d1b815250610683610440565b610cdb565b80156106b05780610697610440565b6106a1908561181c565b6106ab91906117fa565b6106da565b6106da7f0000000000000000000000000000000000000000000000000000000000000000846117fa565b9392505050565b6000336106ef818585610d24565b5060019392505050565b60008061070583610bf1565b90508261071182610571565b1061071d576000610720565b60015b6106da9060ff16826117e2565b60003361073b858285610e49565b610746858585610edb565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906106ef908290869061078b9087906117e2565b610d24565b600061079b82610571565b92915050565b60006107b1565b60405180910390fd5b3360006107bd85610c8a565b90506107eb7f00000000000000000000000000000000000000000000000000000000000000008330886110a9565b6107f58482611114565b836001600160a01b0316826001600160a01b03167fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d78784604051610843929190918252602082015260400190565b60405180910390a3949350505050565b600033600061086185610996565b905061088f7f00000000000000000000000000000000000000000000000000000000000000008330846110a9565b6108998486611114565b836001600160a01b0316826001600160a01b03167fdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d78388604051610843929190918252602082015260400190565b6060600480546104ee9061187e565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561097b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016107a8565b6107468286868403610d24565b6000336106ef818585610edb565b6000806109a283610571565b90508261071182610bf1565b60006109b982610c4a565b841115610a085760405162461bcd60e51b815260206004820152601f60248201527f455243343632363a207769746864726177206d6f7265207468656e206d61780060448201526064016107a8565b336000610a14866106f9565b9050836001600160a01b0316826001600160a01b031614610a3a57610a3a848383610e49565b610a4484826111f3565b610a6f7f0000000000000000000000000000000000000000000000000000000000000000868861133e565b836001600160a01b0316856001600160a01b0316836001600160a01b03167ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db8985604051610ac7929190918252602082015260400190565b60405180910390a495945050505050565b6000610ae382610c6c565b841115610b325760405162461bcd60e51b815260206004820152601d60248201527f455243343632363a2072656465656d206d6f7265207468656e206d617800000060448201526064016107a8565b336000610b3e86610790565b9050836001600160a01b0316826001600160a01b031614610b6457610b64848388610e49565b610b6e84876111f3565b610b997f0000000000000000000000000000000000000000000000000000000000000000868361133e565b836001600160a01b0316856001600160a01b0316836001600160a01b03167ffbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db848a604051610ac7929190918252602082015260400190565b600080610bfd60025490565b9050821580610c0a575080155b610c2057610c16610440565b6106a1828561181c565b6106da7f00000000000000000000000000000000000000000000000000000000000000008461181c565b6001600160a01b03811660009081526020819052604081205461079b90610571565b6001600160a01b03811660009081526020819052604081205461079b565b600061079b82610bf1565b610cd881604051602401610ca991906117ad565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b17905261136e565b50565b610d208282604051602401610cf19291906117c0565b60408051601f198184030181529190526020810180516001600160e01b03166309710a9d60e41b17905261136e565b5050565b6001600160a01b038316610d865760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016107a8565b6001600160a01b038216610de75760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016107a8565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610ed55781811015610ec85760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016107a8565b610ed58484848403610d24565b50505050565b6001600160a01b038316610f3f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016107a8565b6001600160a01b038216610fa15760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016107a8565b6001600160a01b038316600090815260208190526040902054818110156110195760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016107a8565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906110509084906117e2565b92505081905550826001600160a01b0316846001600160a01b03167f84134276be93ac80587d61574df53197425e0dda5a479ef148d2ab119f92bbed8460405161109c91815260200190565b60405180910390a3610ed5565b6040516001600160a01b0380851660248301528316604482015260648101829052610ed59085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915261138f565b6001600160a01b03821661116a5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016107a8565b806002600082825461117c91906117e2565b90915550506001600160a01b038216600090815260208190526040812080548392906111a99084906117e2565b90915550506040518181526001600160a01b038316906000907f84134276be93ac80587d61574df53197425e0dda5a479ef148d2ab119f92bbed9060200160405180910390a35050565b6001600160a01b0382166112535760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016107a8565b6001600160a01b038216600090815260208190526040902054818110156112c75760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016107a8565b6001600160a01b03831660009081526020819052604081208383039055600280548492906112f690849061183b565b90915550506040518281526000906001600160a01b038516907f84134276be93ac80587d61574df53197425e0dda5a479ef148d2ab119f92bbed90602001610e3c565b505050565b6040516001600160a01b03831660248201526044810182905261133990849063a9059cbb60e01b906064016110dd565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b60006113e4826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166114619092919063ffffffff16565b805190915015611339578080602001905181019061140291906116b2565b6113395760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016107a8565b60606114708484600085611478565b949350505050565b6060824710156114d95760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016107a8565b6001600160a01b0385163b6115305760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016107a8565b600080866001600160a01b0316858760405161154c9190611791565b60006040518083038185875af1925050503d8060008114611589576040519150601f19603f3d011682016040523d82523d6000602084013e61158e565b606091505b509150915061159e8282866115a9565b979650505050505050565b606083156115b85750816106da565b8251156115c85782518084602001fd5b8160405162461bcd60e51b81526004016107a891906117ad565b80356001600160a01b03811681146115f957600080fd5b919050565b60006020828403121561161057600080fd5b6106da826115e2565b6000806040838503121561162c57600080fd5b611635836115e2565b9150611643602084016115e2565b90509250929050565b60008060006060848603121561166157600080fd5b61166a846115e2565b9250611678602085016115e2565b9150604084013590509250925092565b6000806040838503121561169b57600080fd5b6116a4836115e2565b946020939093013593505050565b6000602082840312156116c457600080fd5b815180151581146106da57600080fd5b6000602082840312156116e657600080fd5b5035919050565b6000602082840312156116ff57600080fd5b5051919050565b6000806040838503121561171957600080fd5b82359150611643602084016115e2565b60008060006060848603121561173e57600080fd5b8335925061174e602085016115e2565b915061175c604085016115e2565b90509250925092565b6000815180845261177d816020860160208601611852565b601f01601f19169290920160200192915050565b600082516117a3818460208701611852565b9190910192915050565b6020815260006106da6020830184611765565b6040815260006117d36040830185611765565b90508260208301529392505050565b600082198211156117f5576117f56118b9565b500190565b60008261181757634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615611836576118366118b9565b500290565b60008282101561184d5761184d6118b9565b500390565b60005b8381101561186d578181015183820152602001611855565b83811115610ed55750506000910152565b600181811c9082168061189257607f821691505b602082108114156118b357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220e9ee296f28106b7c8de237b45e1889f29c606fb31bb48f15c35190b4837f517264736f6c63430008060033";

type ERC4626NSConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC4626NSConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC4626NS__factory extends ContractFactory {
  constructor(...args: ERC4626NSConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC4626NS";
  }

  deploy(
    name: string,
    symbol: string,
    __asset: string,
    __assetDecimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC4626NS> {
    return super.deploy(
      name,
      symbol,
      __asset,
      __assetDecimals,
      overrides || {}
    ) as Promise<ERC4626NS>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    __asset: string,
    __assetDecimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name,
      symbol,
      __asset,
      __assetDecimals,
      overrides || {}
    );
  }
  attach(address: string): ERC4626NS {
    return super.attach(address) as ERC4626NS;
  }
  connect(signer: Signer): ERC4626NS__factory {
    return super.connect(signer) as ERC4626NS__factory;
  }
  static readonly contractName: "ERC4626NS";
  public readonly contractName: "ERC4626NS";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC4626NSInterface {
    return new utils.Interface(_abi) as ERC4626NSInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC4626NS {
    return new Contract(address, _abi, signerOrProvider) as ERC4626NS;
  }
}
