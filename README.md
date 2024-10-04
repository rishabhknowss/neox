# neox-connector

`neox-connector` is a JavaScript library that simplifies the integration of NeoX and Neo wallets with Ethereum-compatible wallets (like MetaMask). It provides functions for connecting to wallets and transferring tokens between NeoX and Neo N3 networks.

## Features

- Connect to EVM wallets over the NeoX network via wallets like MetaMask. (working ✅)
- Connect to Neo wallets via NeoLine. (working ✅)
- Transfer tokens seamlessly between NeoX and Neo N3. ( Coming Soon.......to implement this function i could'nt find contract address of neox and neo n3)


  
## Installation

You can install the package via npm:

```bash
npm install neox-connector
```

## Usage

### 1. Connecting to Wallets

To connect to a wallet, use the `neoxConnect` function:

```javascript
import { neoxConnect } from 'neox-connector';

async function connectWallet(chain) {
    try {
        const walletDetails = await neoxConnect(chain);
        console.log(walletDetails);
    } catch (error) {
        console.error(error);
    }
}

// Connect to NeoX wallet
connectWallet('neox');

// Connect to Neo wallet
connectWallet('neo');
```

### 2. Transferring Tokens

To transfer tokens between NeoX and Neo N3, use the `neoxTransfer` function:

```javascript
import { neoxTransfer } from 'neox-connector';

async function transferTokens() {
    const fromChain = 'neox'; // or 'neo'
    const toChain = fromChain === 'neox' ? 'neo' : 'neox';
    const amount = '10'; // Amount of tokens to transfer
    const tokenAddress = '0xYourTokenAddress'; // Token contract address
    const recipientAddress = '0xRecipientAddress'; // Recipient address

    try {
        await neoxTransfer(fromChain, toChain, amount, tokenAddress, recipientAddress);
        console.log('Transfer successful!');
    } catch (error) {
        console.error(error);
    }
}

// Perform the transfer
transferTokens();
```

## License

This project is licensed under the MIT License.
