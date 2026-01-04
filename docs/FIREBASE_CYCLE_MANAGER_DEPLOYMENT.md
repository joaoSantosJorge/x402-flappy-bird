# Deploying Cycle Manager to Firebase Cloud Functions

## Overview

This guide explains how to deploy the cycleManager.js service to Firebase Cloud Functions. This is a **free alternative** to Render for running your automated prize pool cycle manager. Firebase offers generous free tier limits suitable for this use case.

## Why Firebase?

- ✅ **Free tier**: 2 million invocations/month, 400,000 GB-seconds/month
- ✅ **Native Firestore integration**: Already using Firebase for your database
- ✅ **Built-in scheduling**: Cloud Scheduler included at no cost
- ✅ **Secure secret management**: Environment variables built-in
- ✅ **No billing required**: Unlike Render workers which charge for continuous running

## Prerequisites

1. Firebase project (same one you're using for Firestore)
2. Foundry encrypted keystore file
3. Node.js installed locally
4. Firebase CLI installed

## Architecture

Instead of a continuously running worker, we'll use:
- **Scheduled Function**: Triggers every hour to check if cycle has ended
- **HTTP Function**: Manual trigger option for testing/emergency allocation

## Step 1: Install Firebase CLI

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize your project (if not already done)
cd /home/joaosantosjorge/x402-flappy-bird
firebase init functions
```

When prompted:
- Choose **JavaScript** (not TypeScript)
- Choose **Yes** to use ESLint
- Choose **Yes** to install dependencies

## Step 2: Prepare Your Keystore

Your encrypted Foundry keystore needs to be encoded as base64 for Firebase deployment.

1. **Export your keystore as base64**:
```bash
# Navigate to your keystore location
cd ~/.foundry/keystores/

# Encode your keystore to base64 (single line, no wrapping)
base64 -w 0 <your-keystore-name> > keystore-base64.txt

# Display the encoded keystore
cat keystore-base64.txt
```

2. **Copy the output** - you'll need this for the next step.

**Note**: Keep your keystore password handy (the one you used with `cast wallet import`).

## Step 3: Firebase Functions Structure

The Firebase Functions are located in the `/functions` directory:

- `cycleManager.js` - Main cycle manager logic with scheduled and HTTP functions
- `index.js` - Entry point that exports the Cloud Functions
- `package.json` - Dependencies (web3, ethers, firebase-admin, firebase-functions)
- `.env.local` - Local development environment variables (not committed)
- `.env` - Production environment variables (not committed)

**Key differences from standalone version**:
- Uses scheduled triggers (hourly) instead of continuous loop
- Keystore decrypted from base64 stored in environment variables
- Three exported functions: scheduled check, manual trigger, force allocation
- Uses modern `.env` files instead of deprecated `functions.config()`

## Step 4: Configure Environment Variables

Firebase Functions now uses `.env` files for configuration (the old `functions.config()` method is deprecated).

### For Local Testing:

Edit `functions/.env.local`:

```bash
cd functions
nano .env.local
```

Replace the placeholder values:

```env
# Keystore configuration
KEYSTORE_DATA=<paste-your-base64-keystore-here>
KEYSTORE_PASSWORD=<your-keystore-password>

# Contract configuration
CONTRACT_ADDRESS=0xYourContractAddress
CYCLE_DURATION_DAYS=0.00069  # 1 minute for local testing
NUMBER_OF_WINNERS=3
FEE_PERCENTAGE=1000

# Network configuration
BASE_RPC_URL=https://sepolia.base.org
```

### For Production:

Edit `functions/.env`:

```bash
cd functions
nano .env
```

Same as above, but change:
```env
CYCLE_DURATION_DAYS=7  # 7 days for production
```

**Important**: Both `.env` and `.env.local` are in `.gitignore` and will NOT be committed to your repository.

## Step 5: Install Dependencies and Verify

Install dependencies and verify your setup:

```bash
cd functions
npm install
npm run lint
```

If lint passes without errors, your code is ready to deploy!

## Step 6: Deploy to Firebase

Deploy your functions to Firebase:

```bash
# From project root (ensure you're in /home/joaosantosjorge/x402-flappy-bird)
firebase deploy --only functions
```

This will:
1. Upload your code to Firebase
2. Load environment variables from `functions/.env`
3. Deploy all three Cloud Functions
4. Set up the hourly scheduled trigger

**First-time deployment**: You may be prompted to enable Cloud Scheduler API. Accept to enable it (still free tier).

You can also deploy individual functions:
```bash
firebase deploy --only functions:checkCycleScheduled
firebase deploy --only functions:checkCycleManual
firebase deploy --only functions:forceAllocate
```

## Step 7: Test Your Deployment

### Test Manual Trigger

Get your function URL from the deploy output, then:

```bash
# Test the manual check function
curl https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/checkCycleManual
```

### Test Force Allocation (Emergency)

```bash
curl https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/forceAllocate
```

**⚠️ Warning**: In production, add authentication to `forceAllocate`!

## Step 8: Monitor Your Functions

View logs in real-time:

```bash
firebase functions:log --only checkCycleScheduled
```

Or view in Firebase Console:
1. Go to https://console.firebase.google.com/
2. Select your project
3. Navigate to **Functions** in the left menu
4. Click on your function to see logs and metrics

## Cost Analysis

Firebase Cloud Functions free tier:
- **2,000,000 invocations/month**
- **400,000 GB-seconds/month**
- **200,000 CPU-seconds/month**
- **5GB outbound networking**

Your usage (hourly checks):
- ~720 invocations/month (24 × 30)
- Minimal compute time per invocation
- **Well within free tier! 💰**

## Comparison: Render vs Firebase

| Feature | Render (Worker) | Firebase Functions |
|---------|----------------|-------------------|
| **Cost** | $7/month minimum | FREE (within limits) |
| **Running** | Continuous | On-demand |
| **Scaling** | Manual | Automatic |
| **Setup** | Simple | Slightly more complex |
| **Firestore** | External connection | Native integration |
| **Best for** | Always-on services | Scheduled/triggered tasks |

## Security Best Practices

✅ **DO**:
- Use base64-encoded encrypted keystore
- Store password in Firebase config (not in code)
- Add authentication to HTTP functions
- Use different wallets for testnet/mainnet
- Monitor function logs regularly

❌ **DON'T**:
- Never commit keystore files or passwords to Git
- Don't use plain private keys in production
- Don't expose HTTP functions without authentication
- Don't share Firebase config values

## Troubleshooting

### Error: "Keystore configuration missing"
- Verify `functions/.env` exists and has correct values
- Check that `KEYSTORE_DATA` and `KEYSTORE_PASSWORD` are set
- Ensure you're deploying from the correct directory
- Try re-deploying: `firebase deploy --only functions`

### Error: "Failed to decrypt keystore"
- Verify base64 encoding is correct (use `base64 -w 0`, no line breaks)
- Check that the password matches your keystore
- Ensure the base64 string is complete (no truncation)
- Test locally first with `npm run serve`

### Function timeout
- Default timeout is 60 seconds
- Increase if needed: `functions.runWith({ timeoutSeconds: 300 })`

### Scheduled function not running
- Check Cloud Scheduler in Google Cloud Console
- Ensure billing is enabled (required for Cloud Scheduler, but still free tier)
- View scheduler logs for errors

## Local Testing

Test your functions locally before deploying to production:

```bash
# From project root
cd functions

# Start Firebase emulator (uses .env.local)
npm run serve
# or
firebase emulators:start --only functions

# In another terminal, test the manual trigger
curl http://localhost:5001/flappy-bird-leaderboard-463e0/us-central1/checkCycleManual
```

The emulator will:
- Load environment variables from `.env.local`
- Run your functions locally
- Show logs in the terminal
- Allow testing without deploying

## Production Checklist

- [ ] Base64-encoded keystore in `functions/.env`
- [ ] Keystore password in `functions/.env`
- [ ] Contract address configured correctly
- [ ] Cycle duration set to 7 days (not 0.00069)
- [ ] Tested locally with emulator first
- [ ] `.env` and `.env.local` NOT committed to git
- [ ] Deployed successfully: `firebase deploy --only functions`
- [ ] Verified deployment in Firebase Console
- [ ] Tested manual trigger endpoint
- [ ] Checked Cloud Scheduler is active
- [ ] Monitored logs for first cycle
- [ ] Firestore database indexes created if needed
- [ ] Backed up keystore file securely offline
- [ ] Documented keystore password in password manager

## Migrating from Render

If you're currently using Render:

1. Deploy to Firebase following this guide
2. Test Firebase deployment thoroughly
3. Monitor both for 1-2 cycles
4. Once confident, disable Render worker
5. Delete Render service to stop billing

## Support Resources

- **Firebase Functions Docs**: https://firebase.google.com/docs/functions
- **Firebase Console**: https://console.firebase.google.com/
- **Firestore Console**: View your cycleState collection
- **Cloud Scheduler**: Google Cloud Console → Cloud Scheduler

---

**You're now running your cycle manager for FREE on Firebase! 🎉**
