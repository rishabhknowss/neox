import { ethers } from 'ethers';

let neoline = null;

window.addEventListener('NEOLine.NEO.EVENT.READY', () => {
    neoline = new NEOLine.Init();
});

export async function neoxConnect(chain) {
    if (chain === 'neox') {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            return { walletType: 'NeoX', address, signer };
        } else {
            throw new Error("No Ethereum wallet found. Please install MetaMask or another EVM wallet.");
        }
    } else if (chain === 'neo') {
        if (neoline) {
            try {
                const account = await neoline.getAccount();
                const { address, label, isLedger } = account;
                return { walletType: 'Neo', address, label, isLedger };
            } catch (error) {
                throw new Error("Failed to connect to NeoLine wallet.");
            }
        } else {
            throw new Error("NeoLine wallet not found or not ready. Please make sure NeoLine is installed.");
        }
    } else {
        throw new Error("Invalid chain type. Use 'neox' for NeoX-compatible wallets or 'neo' for NeoLine.");
    }
}

export async function transferTokens(fromChain, toChain, amount, tokenAddress, recipientAddress, signer) {
    const NEOX_CONTRACT_ADDRESS = '0xYourNeoXContractAddress'; // NeoX contract address
    const NEO_N3_CONTRACT_ADDRESS = '0xYourNeoN3ContractAddress'; // Neo N3 contract address
    const NEOX_ABI = [ /* NeoX contract ABI */ ]; // Replace with actual ABI
    const NEO_N3_ABI = [ /* Neo N3 contract ABI */ ]; // Replace with actual ABI

    if (fromChain === 'neox' && toChain === 'neo') {
        const neoxContract = new ethers.Contract(NEOX_CONTRACT_ADDRESS, NEOX_ABI, signer);
        const transaction = await neoxContract.transferToNeo(recipientAddress, amount, tokenAddress);
        await transaction.wait();
        console.log('Transfer complete:', transaction);
    } else if (fromChain === 'neo' && toChain === 'neox') {
        const neoN3Contract = new ethers.Contract(NEO_N3_CONTRACT_ADDRESS, NEO_N3_ABI, signer);
        const transaction = await neoN3Contract.transferToNeoX(recipientAddress, amount, tokenAddress);
        await transaction.wait();
        console.log('Transfer complete:', transaction);
    } else {
        throw new Error('Invalid chain specified for transfer.');
    }
}

export async function neoxTransfer(fromChain, toChain, amount, tokenAddress, recipientAddress) {
    let walletDetails;
    if (fromChain === 'neox') {
        walletDetails = await neoxConnect('neo');
    } else if (fromChain === 'evm') {
        walletDetails = await neoxConnect('neox');
    }

    const signer = walletDetails.signer;
    await transferTokens(fromChain, toChain, amount, tokenAddress, recipientAddress, signer);
}
