// Quick test to verify keystore decryption works
const { Web3 } = require('web3');
const fs = require('fs');
const readline = require('readline');

const web3 = new Web3();

const KEYSTORE_PATH = process.env.KEYSTORE_PATH || `${process.env.HOME}/.foundry/keystores/testnet-contract-deployment`;

async function testKeystoreDecryption() {
    console.log('=== Testing Keystore Decryption ===\n');
    console.log('Keystore path:', KEYSTORE_PATH);
    
    // Check if file exists
    if (!fs.existsSync(KEYSTORE_PATH)) {
        console.error('❌ Keystore file not found at:', KEYSTORE_PATH);
        process.exit(1);
    }
    
    console.log('✓ Keystore file found\n');
    
    // Read keystore file
    let keystoreContent;
    try {
        keystoreContent = fs.readFileSync(KEYSTORE_PATH, 'utf8');
        const keystoreJson = JSON.parse(keystoreContent);
        console.log('✓ Keystore file is valid JSON');
        console.log('  Address:', keystoreJson.address || 'N/A');
        console.log('');
    } catch (error) {
        console.error('❌ Failed to read keystore file:', error.message);
        process.exit(1);
    }
    
    // Get password
    const password = process.env.KEYSTORE_PASSWORD;
    
    if (!password) {
        console.log('Please enter your keystore password:');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        return new Promise((resolve) => {
            rl.question('Password: ', async (inputPassword) => {
                rl.close();
                await attemptDecryption(keystoreContent, inputPassword);
                resolve();
            });
        });
    } else {
        await attemptDecryption(keystoreContent, password);
    }
}

async function attemptDecryption(keystoreContent, password) {
    console.log('Attempting to decrypt...\n');
    
    try {
        const keystoreJson = JSON.parse(keystoreContent);
        
        // Foundry keystores don't include the address field, but we can add it
        // or web3.js will complain. Let's use ethers.js Wallet.fromEncryptedJson instead
        const { ethers } = require('ethers');
        
        console.log('Using ethers.js to decrypt Foundry keystore...');
        const wallet = await ethers.Wallet.fromEncryptedJson(keystoreContent, password);
        
        console.log('✅ SUCCESS! Keystore decrypted successfully!\n');
        console.log('Account details:');
        console.log('  Address:', wallet.address);
        console.log('  Private Key:', wallet.privateKey.substring(0, 10) + '...' + wallet.privateKey.slice(-4));
        console.log('\n✓ Your keystore is working correctly!');
        console.log('✓ You can now use this with cycleManager.js\n');
        
    } catch (error) {
        console.error('\n❌ Failed to decrypt keystore');
        console.error('Error:', error.message);
        console.error('\nPossible issues:');
        console.error('  - Incorrect password');
        console.error('  - Corrupted keystore file');
        console.error('  - Invalid keystore format');
        process.exit(1);
    }
}

testKeystoreDecryption().catch(console.error);
