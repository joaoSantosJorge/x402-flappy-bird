# Feature 02: Configurable Tries Per Payment

## Overview

Added admin-configurable "number of tries per payment" setting that propagates dynamically to all pages. Previously hardcoded to 10 tries throughout the codebase.

## Implementation Summary

### Backend Changes

**functions/index.js:**
- Added `updateTriesPerPayment` endpoint accepting POST with `{ tries, adminWallet }`
- Validates tries: 1-100 allowed range
- Stores in Firestore `config/settings.triesPerPayment`
- Updated `recordPayment` to fetch `triesPerPayment` from config (defaults to 10)

### Frontend Changes

**frontend/js/config.js:**
- Added `TriesPerPaymentManager` following `PlayCostManager` pattern
- `init()` - Loads from localStorage, then fetches from Firebase
- `getTriesPerPayment()` - Returns current value
- `setTriesPerPayment(tries)` - Updates and broadcasts via localStorage
- `onUpdate(callback)` - Subscribe to changes
- Auto-updates all `.tries-per-payment-display` elements on page
- Cross-tab sync via localStorage events

**frontend/admin.html:**
- Added "Tries Per Payment" admin card
- Input field (1-100)
- Update button calling `updateTriesPerPayment` Cloud Function
- Displays current value
- Broadcasts updates via `TriesPerPaymentManager.setTriesPerPayment()`

**frontend/js/payments.js:**
- Line 438: `triesRemaining = TriesPerPaymentManager.getTriesPerPayment();`
- Line 467: Dynamic alert message with configured tries

**frontend/js/game.js:**
- Alert messages now use `TriesPerPaymentManager.getTriesPerPayment()` instead of hardcoded "10"

**frontend/game.html:**
- Pay button: `<span class="tries-per-payment-display">10</span> tries`

**frontend/index.html:**
- Feature card: `<span class="tries-per-payment-display">10</span> tries`
- How it works step: `<span class="tries-per-payment-display">10</span> tries`

**frontend/rules.html:**
- Added Firebase initialization for TriesPerPaymentManager
- Purchase tries rule: `<span class="tries-per-payment-display">10</span> game tries`
- Pool accumulation: `per <span class="tries-per-payment-display">10</span> tries`

## Firestore Schema

```
config/settings:
  triesPerPayment: number (1-100, default 10)
  updatedAt: timestamp
  updatedBy: string (admin wallet address)
```

## Verification

1. **Admin page test**: Change tries value, verify it saves and displays correctly
2. **Cross-tab sync**: Update in admin, verify other open tabs receive the update
3. **Payment flow**: Make a payment, verify correct number of tries granted
4. **Display test**: Check all pages (index, game, rules) show the configured value
5. **Backend test**: Verify `recordPayment` logs correct `triesGranted` in Firestore
6. **Default value**: Delete config, verify system defaults to 10 tries

## Files Modified

- `functions/index.js` - Backend Cloud Function
- `frontend/js/config.js` - TriesPerPaymentManager
- `frontend/admin.html` - Admin UI
- `frontend/js/payments.js` - Payment logic
- `frontend/js/game.js` - Game alerts
- `frontend/game.html` - Pay button text
- `frontend/index.html` - Marketing copy
- `frontend/rules.html` - Rules text + Firebase init

---

*Implemented: January 2026*
