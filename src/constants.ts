// This file contains the information of Deployed contract address and ABI data

interface ContractsConfig{
    [chainid:number]:{
        tsender : string;
        // other contract address if needed
    };
}

export const chainsToTsSender : ContractsConfig = {
    31337 : { // anvil network deployed contract address
        tsender : "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
}

// standard ERC20 ABI example
export const erc20Abi = [
  { constant: true, inputs: [{ name: "_owner", type: "address" }, { name: "_spender", type: "address" }], name: "allowance", outputs: [{ name: "remaining", type: "uint256" }], type: "function" },
  { constant: false, inputs: [{ name: "_spender", type: "address" }, { name: "_value", type: "uint256" }], name: "approve", outputs: [{ name: "success", type: "bool" }], type: "function" },
  // ... other ERC20 functions
] as const;

// Tsender contract ABI example
export const tsenderAbi = [
    {
        type:"function",
        name:"airdropERC20",
        inputs:[/*... */],
        outputs:[],
        stateMutability:"payable"
    },
    // OPTIONAL : Can also add other functions
] as const;

