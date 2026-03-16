"use client";

import { useState } from "react";
import { InputForm } from "@/components/InputField";
export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState<string>("");
    const [recipients, setRecipients] = useState(""); // State for recipients
    const [amounts, setAmounts] = useState("");     // State for amounts
    async function handleSubmit() {
        // logic for submit the form
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