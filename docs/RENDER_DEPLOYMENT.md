# Deploying cycleManager to Render with Encrypted Keystore

## Overview

This guide explains how to deploy the cycleManager service to Render using a Foundry encrypted keystore for secure private key management.

## Prerequisites

1. A Foundry encrypted keystore file (created with `cast wallet import`)
2. The password for your keystore
3. A Render account
4. Firebase service account key file

## Step 1: Locate Your Encrypted Keystore

Your Foundry keystore is typically located at:
```
~/.foundry/keystores/<keystore-name>
```

To list your keystores:
```bash
cast wallet list
```

To find the exact path:
```bash
ls -la ~/.foundry/keystores/
```

## Step 2: Prepare for Render Deployment

### Create a Secret Files Archive

Render allows you to upload secret files that will be mounted at `/etc/secrets/` in your deployment.

1. Create a temporary directory for your secrets:
```bash
mkdir ~/render-secrets
cd ~/render-secrets
```

2. Copy your keystore file:
```bash
cp ~/.foundry/keystores/<your-keystore-name> ./keystore
```

3. Copy your Firebase service account key:
```bash
cp /path/to/your/serviceAccountKey.json ./serviceAccountKey.json
```

## Step 3: Set Up Render Service

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `x402-flappy-bird` repository

3. **Configure the Service**:

   **Basic Settings**:
   - **Name**: `flappy-bird-cycle-manager`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install`
   - **Start Command**: `node cycleManager.js`

4. **Add Environment Variables**:

   Click "Advanced" → "Add Environment Variable" and add the following:

   ```
   NODE_ENV=production
   
   # Keystore configuration
   KEYSTORE_PATH=/etc/secrets/keystore
   KEYSTORE_PASSWORD=your_actual_keystore_password
   
   # Contract configuration
   FLAPPY_BIRD_CONTRACT_ADDRESS=0xYourActualContractAddress
   
   # Cycle settings
   CYCLE_DURATION_DAYS=7
   NUMBER_OF_WINNERS=3
   FEE_PERCENTAGE=1000
   
   # Network
   BASE_RPC_URL=https://sepolia.base.org
   
   # Firebase
   GOOGLE_APPLICATION_CREDENTIALS=/etc/secrets/serviceAccountKey.json
   ```

5. **Add Secret Files**:

   In the "Advanced" section:
   - Click "Add Secret File"
   - **Filename**: `keystore`
   - **Contents**: Paste the entire contents of your keystore file (it's a JSON file)
   
   - Click "Add Secret File" again
   - **Filename**: `serviceAccountKey.json`
   - **Contents**: Paste the entire contents of your Firebase service account key

   > **Note**: Render will mount these files at `/etc/secrets/<filename>`

6. **Create Web Service**:
   - Click "Create Web Service"
   - Render will start building and deploying your service

## Step 4: Verify Deployment

1. **Check Logs**:
   - Go to your service in Render
   - Click "Logs" tab
   - You should see:
   ```
   ✓ Successfully decrypted keystore
   ✓ Wallet initialized
   Owner address: 0x...
   ```

2. **Test Cycle Manager**:
   - Ensure no errors in logs
   - Verify Firebase connection
   - Check that cycle state is initialized

## Alternative: Using Render CLI

You can also deploy using the Render CLI:

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy
```

## Security Best Practices

✅ **DO**:
- Use encrypted keystore files for production
- Store the keystore password in Render environment variables (not in code)
- Use Render's Secret Files feature for sensitive files
- Rotate your keystore password periodically
- Use different wallets for testnet and mainnet

❌ **DON'T**:
- Never commit keystore files to Git
- Never commit passwords or private keys to Git
- Don't use plain private keys in production
- Don't share your keystore password

## Troubleshooting

### Error: "Failed to decrypt keystore"
- Verify the password is correct
- Check that the keystore file was uploaded correctly
- Ensure `KEYSTORE_PATH` points to `/etc/secrets/keystore`

### Error: "Keystore file not found"
- Verify the secret file was uploaded in Render
- Check the filename matches exactly (case-sensitive)
- Ensure `KEYSTORE_PATH=/etc/secrets/keystore`

### Error: "Firebase initialization failed"
- Verify `serviceAccountKey.json` was uploaded as a secret file
- Check `GOOGLE_APPLICATION_CREDENTIALS=/etc/secrets/serviceAccountKey.json`
- Ensure the Firebase service account has proper permissions

## Local Testing

Before deploying to Render, test locally:

```bash
# Set environment variables
export KEYSTORE_PATH=~/.foundry/keystores/<your-keystore-name>
export KEYSTORE_PASSWORD="your_password"
export FLAPPY_BIRD_CONTRACT_ADDRESS="0x..."
export NODE_ENV=development

# Run the service
node cycleManager.js
```

You should see:
```
✓ Successfully decrypted keystore
✓ Wallet initialized
=== Flappy Bird Cycle Manager Started ===
Owner address: 0x...
```

## Production Checklist

Before going to production:

- [ ] Tested with encrypted keystore locally
- [ ] Verified keystore decrypts successfully
- [ ] Uploaded keystore as Render secret file
- [ ] Uploaded Firebase service account as Render secret file
- [ ] Set all environment variables in Render
- [ ] Changed `NODE_ENV` to `production`
- [ ] Updated `CYCLE_DURATION_DAYS` to `7`
- [ ] Updated `BASE_RPC_URL` to mainnet if needed
- [ ] Verified contract address is correct
- [ ] Tested on testnet first
- [ ] Backed up your keystore file securely
- [ ] Documented the keystore password securely (password manager)

## Support

If you encounter issues:
1. Check Render logs for error messages
2. Verify all environment variables are set correctly
3. Test locally first before deploying to Render
4. Ensure your wallet has enough ETH for gas fees
