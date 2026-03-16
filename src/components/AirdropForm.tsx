"use client";

import { useState } from "react";
import { InputForm } from "@/components/InputField";
import {readContract} from "@wagmi/core";
import {useChainId,useConfig,useAccount} from "wagmi";
import { chainsToTsSender,erc20Abi, tsenderAbi } from "@/constants";
export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState<string>("");
    const [recipients, setRecipients] = useState(""); // State for recipients
    const [amounts, setAmounts] = useState("");     // State for amounts
    
    const account = useAccount();
    const chainId = useChainId();
    const config = useConfig();

    async function getApprovedAmount(
        // This function encapsulates the logic for calling allowance function on specified ERC20 token contract using `readContract` from `@wagmi/core`.
        spenderAddress : `0x${string}`,
        erc20TokenAddress : `0x${string}`,
        ownerAddress : `0x${string}`
    ): Promise<bigint> {
        console.log("Checking allowance for token",erc20TokenAddress);
        console.log("Spender",spenderAddress);
        console.log("Owner",ownerAddress);
        try {
            const allowance = await readContract({
                abi: erc20Abi,
                address: erc20TokenAddress,
                functionName: "allowance",
                args: [ownerAddress, spenderAddress],
            });
            return allowance as bigint;
        } catch (error) {
            console.error("Error checking allowance", error);
            throw new Error("Failed to check allowance");
            // return BigInt(0);
        }
    }
    
    async function handleSubmit() {
        // logic for submit the form
        console.log("Form submitted");
        console.log("Token address",tokenAddress);
        console.log("Receipents",recipients);
        console.log("Amounts",amounts);
        console.log("ChainId",chainId);
        const tsenderAddress = chainsToTsSender[chainId]?.tsender;
        console.log("Deployed TSender address in this chain",tsenderAddress);
        
        /// Validation
        if(!tsenderAbi) return;
        if(!account.address) return;
        if (!tokenAddress || !/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) return;
        try {
            const approvedAmount = await getApprovedAmount(
                tsenderAddress as `0x${string}`,
                tokenAddress as `0x${string}`,
                account.address
            );
        } catch (error) {
            console.error("Error in submission");
        }
    }

    return (
        <div className="p-4 space-y-4"> {/* Add some padding/spacing */}
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <InputForm
                    label="Token Address"
                    placeholder="Enter token contract address (e.g., 0x...)"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)} // Update state on change
                    type="text"
                />
                <InputForm
                    label="Recipients"
                    placeholder="0x123..., 0x456..."
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    large={true}
                />

                <InputForm
                    label="Amounts"
                    placeholder="100, 200, ..."
                    value={amounts}
                    onChange={(e) => setAmounts(e.target.value)}
                    large={true}
                />
                <button type="submit">Send Tokens</button>
            </form>
        </div>
    );
}