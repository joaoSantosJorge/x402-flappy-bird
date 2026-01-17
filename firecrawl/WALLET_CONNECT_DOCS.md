[Skip to main content](https://docs.walletconnect.com/payments/wallets/react-native#content-area)

[WalletConnect Pay Docs home page![light logo](https://mintcdn.com/walletconnect_pay_docs/EMo_PCcHjZDD_sDs/logo/light.svg?fit=max&auto=format&n=EMo_PCcHjZDD_sDs&q=85&s=9522c75b62a32935c1ffa782a6063e20)![dark logo](https://mintcdn.com/walletconnect_pay_docs/EMo_PCcHjZDD_sDs/logo/dark.svg?fit=max&auto=format&n=EMo_PCcHjZDD_sDs&q=85&s=d8a9e029615c5986ed35e2a278fd4d89)](https://docs.walletconnect.com/)

Search...

Ctrl KAsk AI

- [WalletGuide](https://walletguide.walletconnect.network/)
- [Request Demo](https://share.hsforms.com/19Dpp4ayYR9uriB3xNAh0JAnxw6s)
- [Request Demo](https://share.hsforms.com/19Dpp4ayYR9uriB3xNAh0JAnxw6s)

Search...

Navigation

WalletConnect Pay for Wallets

WalletConnect Pay SDK - React Native Installation

[Payments](https://docs.walletconnect.com/payments/overview) [API Reference](https://docs.walletconnect.com/api-reference)

- [WalletConnect Pay](https://walletconnect.com/)
- [Blog](https://walletconnect.network/blog)

##### WalletConnect Pay

- [Introduction](https://docs.walletconnect.com/payments/overview)
- [Paying with WalletConnect Pay](https://docs.walletconnect.com/payments/for-users)

##### Point of Sale (POS) Integration

- [Overview](https://docs.walletconnect.com/payments/point-of-sale)
- [Kotlin - POS Integration](https://docs.walletconnect.com/payments/kotlin/installation)

##### Merchant Dashboard

- [Merchant Onboarding](https://docs.walletconnect.com/payments/merchant/onboarding)

##### WalletConnect Pay for Wallets

- [Wallet Integration](https://docs.walletconnect.com/payments/wallets/overview)
- [Kotlin](https://docs.walletconnect.com/payments/wallets/kotlin)
- [Swift](https://docs.walletconnect.com/payments/wallets/swift)
- [React Native](https://docs.walletconnect.com/payments/wallets/react-native)
- [API-first (No SDK)](https://docs.walletconnect.com/payments/wallets/api-first)

##### Ecommerce and Online Checkout

- [Overview](https://docs.walletconnect.com/payments/ecommerce/overview)

On this page

- [Requirements](https://docs.walletconnect.com/payments/wallets/react-native#requirements)
- [Installation](https://docs.walletconnect.com/payments/wallets/react-native#installation)
- [React Native Setup](https://docs.walletconnect.com/payments/wallets/react-native#react-native-setup)
- [Architecture](https://docs.walletconnect.com/payments/wallets/react-native#architecture)
- [Configuration](https://docs.walletconnect.com/payments/wallets/react-native#configuration)
- [Configuration Parameters](https://docs.walletconnect.com/payments/wallets/react-native#configuration-parameters)
- [Supported Networks](https://docs.walletconnect.com/payments/wallets/react-native#supported-networks)
- [Payment Flow](https://docs.walletconnect.com/payments/wallets/react-native#payment-flow)
- [Complete Example](https://docs.walletconnect.com/payments/wallets/react-native#complete-example)
- [Provider Utilities](https://docs.walletconnect.com/payments/wallets/react-native#provider-utilities)
- [Error Handling](https://docs.walletconnect.com/payments/wallets/react-native#error-handling)
- [Error Types](https://docs.walletconnect.com/payments/wallets/react-native#error-types)
- [Error Codes](https://docs.walletconnect.com/payments/wallets/react-native#error-codes)
- [API Reference](https://docs.walletconnect.com/payments/wallets/react-native#api-reference)
- [WalletConnectPay](https://docs.walletconnect.com/payments/wallets/react-native#walletconnectpay)
- [Constructor](https://docs.walletconnect.com/payments/wallets/react-native#constructor)
- [Methods](https://docs.walletconnect.com/payments/wallets/react-native#methods)
- [Data Types](https://docs.walletconnect.com/payments/wallets/react-native#data-types)
- [PaymentStatus](https://docs.walletconnect.com/payments/wallets/react-native#paymentstatus)
- [PayProviderType](https://docs.walletconnect.com/payments/wallets/react-native#payprovidertype)
- [CollectDataFieldType](https://docs.walletconnect.com/payments/wallets/react-native#collectdatafieldtype)
- [Method Parameters](https://docs.walletconnect.com/payments/wallets/react-native#method-parameters)
- [Response Types](https://docs.walletconnect.com/payments/wallets/react-native#response-types)
- [PaymentOption](https://docs.walletconnect.com/payments/wallets/react-native#paymentoption)
- [Action](https://docs.walletconnect.com/payments/wallets/react-native#action)
- [Amount Types](https://docs.walletconnect.com/payments/wallets/react-native#amount-types)
- [Payment Info Types](https://docs.walletconnect.com/payments/wallets/react-native#payment-info-types)
- [Collect Data Types](https://docs.walletconnect.com/payments/wallets/react-native#collect-data-types)
- [Best Practices](https://docs.walletconnect.com/payments/wallets/react-native#best-practices)

WalletConnect Pay for Wallets

# WalletConnect Pay SDK - React Native Installation

Copy page

Integrate WalletConnect Pay into your React Native wallet to enable seamless crypto payments for your users.

Copy page

**WalletConnect Pay will soon be bundled into the existing [Wallet SDK](https://docs.walletconnect.network/wallet-sdk/overview)**. If your wallet already uses the WalletConnect SDK, it is recommended to wait for the upcoming release and upgrade your SDK to enable WalletConnect Pay, rather than integrating the standalone WalletConnect Pay SDK below.

The WalletConnect Pay SDK is a TypeScript SDK for WalletConnect Pay that enables payment functionality for React Native wallet applications. The SDK uses a provider abstraction that allows different implementations based on your environment.

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#requirements)  Requirements

- React Native 0.70+
- `@walletconnect/react-native-compat` installed and linked

As a wallet provider, you would first need to **obtain an API key from WalletConnect**. You can do this by filling out [this form](https://share.hsforms.com/19Dpp4ayYR9uriB3xNAh0JAnxw6s) and getting in touch with our team.

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#installation)  Installation

Install the WalletConnect Pay SDK using npm or yarn:

- npm

- yarn


Copy

Ask AI

```
npm install @walletconnect/pay
```

Copy

Ask AI

```
yarn add @walletconnect/pay
```

### [​](https://docs.walletconnect.com/payments/wallets/react-native\#react-native-setup)  React Native Setup

This SDK requires the WalletConnect React Native native module. Make sure you have `@walletconnect/react-native-compat` installed and linked in your React Native project:

Copy

Ask AI

```
npm install @walletconnect/react-native-compat
```

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#architecture)  Architecture

The SDK uses a provider abstraction that allows different implementations:

- **NativeProvider**: Uses React Native uniffi module (current)
- **WasmProvider**: Uses WebAssembly module (coming soon for web browsers)

The SDK auto-detects the best available provider for your environment.

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#configuration)  Configuration

Initialize the WalletConnect Pay client with your credentials:

Copy

Ask AI

```
import { WalletConnectPay } from "@walletconnect/pay";

const client = new WalletConnectPay({
  projectId: "your-project-id",
  apiKey: "your-api-key",
});
```

Don’t have an API key? Fill out [this form](https://share.hsforms.com/19Dpp4ayYR9uriB3xNAh0JAnxw6s) and get in touch with our team to obtain an API key.

### [​](https://docs.walletconnect.com/payments/wallets/react-native\#configuration-parameters)  Configuration Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `projectId` | `string` | Yes | Your WalletConnect Cloud project ID |
| `apiKey` | `string` | Yes | Your WalletConnect Pay API key |
| `baseUrl` | `string` | No | Custom API base URL |
| `logger` | `Logger` | No | Custom logger instance or level |

Don’t have a project ID? Create one at the [WalletConnect Dashboard](https://dashboard.walletconnect.com/) by signing up and creating a new project.

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#supported-networks)  Supported Networks

WalletConnect Pay currently supports the following networks with USDC:

| Network | Chain ID | CAIP-10 Format |
| --- | --- | --- |
| Ethereum | 1 | `eip155:1:{address}` |
| Base | 8453 | `eip155:8453:{address}` |
| Optimism | 10 | `eip155:10:{address}` |
| Polygon | 137 | `eip155:137:{address}` |
| Arbitrum | 42161 | `eip155:42161:{address}` |

Support for all EVM chains, Solana, and additional native and non-native assets is coming soon. Include accounts for all supported networks to maximize payment options for your users.

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#payment-flow)  Payment Flow

The payment flow consists of four main steps:**Get Options → Get Actions → Sign Actions → Confirm Payment**

WalletConnect PayPay SDKWalletUserWalletConnect PayPay SDKWalletUseralt\[Data collection required\]Scan QR / Open payment linkgetPaymentOptions(link, accounts)Fetch payment optionsPayment options + merchant infoPaymentOptionsResponseDisplay payment optionsSelect payment optiongetRequiredPaymentActions(paymentId, optionId)Get signing actionsRequired wallet RPC actionsList of actions to signRequest signature(s)Approve & signRequest additional infoProvide dataconfirmPayment(signatures, collectedData)Submit paymentPayment statusConfirmPaymentResponseShow result

1

### Get Payment Options

When a user scans a payment QR code or opens a payment link, fetch available payment options:

Copy

Ask AI

```
const options = await client.getPaymentOptions({
  paymentLink: "https://pay.walletconnect.com/pay_123",
  accounts: [\
    `eip155:1:${walletAddress}`,      // Ethereum Mainnet\
    `eip155:137:${walletAddress}`,    // Polygon\
    `eip155:8453:${walletAddress}`,   // Base\
    `eip155:42161:${walletAddress}`,  // Arbitrum\
  ],
  includePaymentInfo: true,
});

console.log("Payment ID:", options.paymentId);
console.log("Options:", options.options);

// Display merchant info
if (options.info) {
  console.log("Merchant:", options.info.merchant.name);
  console.log("Amount:", options.info.amount.display.assetSymbol, options.info.amount.value);
}

// Check if user data collection is required
if (options.collectData) {
  console.log("Required fields:", options.collectData.fields);
}
```

2

### Get Required Actions

After the user selects a payment option, get the wallet RPC actions required to complete the payment:

Copy

Ask AI

```
const actions = await client.getRequiredPaymentActions({
  paymentId: options.paymentId,
  optionId: options.options[0].id,
});

// Each action contains wallet RPC data to sign
for (const action of actions) {
  console.log("Chain:", action.walletRpc.chainId);
  console.log("Method:", action.walletRpc.method);
  console.log("Params:", action.walletRpc.params);
}
```

3

### Sign Actions

Sign each action with your wallet’s signing implementation:

Copy

Ask AI

```
// Sign each action with your wallet (implementation depends on your wallet SDK)
const signatures = await Promise.all(
  actions.map((action) =>
    wallet.signTypedData(
      action.walletRpc.chainId,
      JSON.parse(action.walletRpc.params)
    )
  )
);
```

Signatures must be in the same order as the actions array.

4

### Collect User Data (If Required)

Some payments may require additional user data. Check for `collectData` in the payment options response:

Copy

Ask AI

```
let collectedData: CollectDataFieldResult[] | undefined;

if (options.collectData) {
  // Show UI to collect required fields
  collectedData = options.collectData.fields.map((field) => ({
    id: field.id,
    value: getUserInput(field.name, field.fieldType),
  }));
}
```

5

### Confirm Payment

Submit the signatures and collected data to complete the payment:

Copy

Ask AI

```
const result = await client.confirmPayment({
  paymentId: options.paymentId,
  optionId: options.options[0].id,
  signatures,
  collectedData, // Include if collectData was present
});

if (result.status === "succeeded") {
  console.log("Payment successful!");
} else if (result.status === "processing") {
  console.log("Payment is processing...");
} else if (result.status === "failed") {
  console.log("Payment failed");
}
```

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#complete-example)  Complete Example

Here’s a complete implementation example:

Copy

Ask AI

```
import { WalletConnectPay, CollectDataFieldResult } from "@walletconnect/pay";

class PaymentManager {
  private client: WalletConnectPay;

  constructor() {
    this.client = new WalletConnectPay({
      projectId: "your-project-id",
      apiKey: "your-api-key",
    });
  }

  async processPayment(paymentLink: string, walletAddress: string) {
    try {
      // Step 1: Get payment options
      const options = await this.client.getPaymentOptions({
        paymentLink,
        accounts: [\
          `eip155:1:${walletAddress}`,\
          `eip155:137:${walletAddress}`,\
          `eip155:8453:${walletAddress}`,\
        ],
        includePaymentInfo: true,
      });

      if (options.options.length === 0) {
        throw new Error("No payment options available");
      }

      // Step 2: Let user select an option (simplified - use first option)
      const selectedOption = options.options[0];

      // Step 3: Get required actions
      const actions = await this.client.getRequiredPaymentActions({
        paymentId: options.paymentId,
        optionId: selectedOption.id,
      });

      // Step 4: Sign all actions
      const signatures = await Promise.all(
        actions.map((action) =>
          this.signAction(action, walletAddress)
        )
      );

      // Step 5: Collect user data if required
      let collectedData: CollectDataFieldResult[] | undefined;
      if (options.collectData) {
        collectedData = await this.collectUserData(options.collectData.fields);
      }

      // Step 6: Confirm payment
      const result = await this.client.confirmPayment({
        paymentId: options.paymentId,
        optionId: selectedOption.id,
        signatures,
        collectedData,
      });

      return result;
    } catch (error) {
      console.error("Payment failed:", error);
      throw error;
    }
  }

  private async signAction(action: Action, walletAddress: string): Promise<string> {
    const { chainId, method, params } = action.walletRpc;

    // Use your wallet's signing implementation
    return await wallet.signTypedData(chainId, JSON.parse(params));
  }

  private async collectUserData(fields: CollectDataField[]): Promise<CollectDataFieldResult[]> {
    // Implement your UI to collect user data
    return fields.map((field) => ({
      id: field.id,
      value: getUserInput(field.name, field.fieldType),
    }));
  }
}
```

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#provider-utilities)  Provider Utilities

The SDK provides utilities for checking provider availability:

Copy

Ask AI

```
import {
  isProviderAvailable,
  detectProviderType,
  isNativeProviderAvailable,
  setNativeModule,
} from "@walletconnect/pay";

// Check if any provider is available
if (isProviderAvailable()) {
  // SDK can be used
}

// Detect which provider type is available
const providerType = detectProviderType(); // 'native' | 'wasm' | null

// Check specifically for native provider
if (isNativeProviderAvailable()) {
  // React Native native module is available
}

// Manually inject native module (if auto-discovery fails)
import { NativeModules } from "react-native";
setNativeModule(NativeModules.RNWalletConnectPay);
```

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#error-handling)  Error Handling

The SDK throws typed errors for different failure scenarios:

Copy

Ask AI

```
import {
  PayError,
  PaymentOptionsError,
  PaymentActionsError,
  ConfirmPaymentError,
  NativeModuleNotFoundError
} from "@walletconnect/pay";

try {
  const options = await client.getPaymentOptions({
    paymentLink: link,
    accounts,
  });
} catch (error) {
  if (error instanceof PaymentOptionsError) {
    console.error("Failed to get options:", error.originalMessage);
  } else if (error instanceof PayError) {
    console.error("Pay error:", error.code, error.message);
  }
}
```

### [​](https://docs.walletconnect.com/payments/wallets/react-native\#error-types)  Error Types

| Error Class | Description |
| --- | --- |
| `PayError` | Base error class for all Pay SDK errors |
| `PaymentOptionsError` | Error when fetching payment options |
| `PaymentActionsError` | Error when fetching required payment actions |
| `ConfirmPaymentError` | Error when confirming payment |
| `NativeModuleNotFoundError` | Error when native module is not available |

### [​](https://docs.walletconnect.com/payments/wallets/react-native\#error-codes)  Error Codes

The `PayError` class includes a `code` property with one of the following values:

Copy

Ask AI

```
type PayErrorCode =
  | "JSON_PARSE"
  | "JSON_SERIALIZE"
  | "PAYMENT_OPTIONS"
  | "PAYMENT_REQUEST"
  | "CONFIRM_PAYMENT"
  | "NATIVE_MODULE_NOT_FOUND"
  | "INITIALIZATION_ERROR"
  | "UNKNOWN";
```

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#api-reference)  API Reference

### [​](https://docs.walletconnect.com/payments/wallets/react-native\#walletconnectpay)  WalletConnectPay

Main client for payment operations.

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#constructor)  Constructor

Copy

Ask AI

```
new WalletConnectPay(options: WalletConnectPayOptions)
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#methods)  Methods

| Method | Description |
| --- | --- |
| `getPaymentOptions(params)` | Fetch available payment options |
| `getRequiredPaymentActions(params)` | Get signing actions for a payment option |
| `confirmPayment(params)` | Confirm and execute the payment |
| `static isAvailable()` | Check if a provider is available |

### [​](https://docs.walletconnect.com/payments/wallets/react-native\#data-types)  Data Types

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#paymentstatus)  PaymentStatus

Copy

Ask AI

```
type PaymentStatus =
  | "requires_action"
  | "processing"
  | "succeeded"
  | "failed"
  | "expired";
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#payprovidertype)  PayProviderType

Copy

Ask AI

```
type PayProviderType = "native" | "wasm";
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#collectdatafieldtype)  CollectDataFieldType

Copy

Ask AI

```
type CollectDataFieldType = "text" | "date";
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#method-parameters)  Method Parameters

Copy

Ask AI

```
interface GetPaymentOptionsParams {
  /** Payment link or ID */
  paymentLink: string;
  /** List of CAIP-10 accounts */
  accounts: string[];
  /** Whether to include payment info in response */
  includePaymentInfo?: boolean;
}

interface GetRequiredPaymentActionsParams {
  /** Payment ID */
  paymentId: string;
  /** Option ID */
  optionId: string;
}

interface ConfirmPaymentParams {
  /** Payment ID */
  paymentId: string;
  /** Option ID */
  optionId: string;
  /** Signatures from wallet RPC calls */
  signatures: string[];
  /** Collected data fields (if required) */
  collectedData?: CollectDataFieldResult[];
}
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#response-types)  Response Types

Copy

Ask AI

```
interface PaymentOptionsResponse {
  /** Payment ID extracted from the payment link */
  paymentId: string;
  /** Payment information (if includePaymentInfo was true) */
  info?: PaymentInfo;
  /** Available payment options */
  options: PaymentOption[];
  /** Data collection requirements (if any) */
  collectData?: CollectDataAction;
}

interface ConfirmPaymentResponse {
  /** Payment status */
  status: PaymentStatus;
  /** True if the payment is in a final state */
  isFinal: boolean;
  /** Time to poll for payment status, in milliseconds */
  pollInMs?: number;
}
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#paymentoption)  PaymentOption

Copy

Ask AI

```
interface PaymentOption {
  /** ID of the option */
  id: string;
  /** The option's token and amount */
  amount: PayAmount;
  /** Estimated time to complete the option, in seconds */
  etaS: number;
  /** Actions required to complete the option */
  actions: Action[];
}
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#action)  Action

Copy

Ask AI

```
interface Action {
  walletRpc: WalletRpcAction;
}

interface WalletRpcAction {
  /** Chain ID in CAIP-2 format (e.g., "eip155:8453") */
  chainId: string;
  /** RPC method name (e.g., "eth_signTypedData_v4") */
  method: string;
  /** JSON-encoded params array */
  params: string;
}
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#amount-types)  Amount Types

Copy

Ask AI

```
interface PayAmount {
  /** Currency unit, prefixed with either "iso4217/" or "caip19/" */
  unit: string;
  /** Amount value, in the currency unit's minor units */
  value: string;
  /** Display information for the amount */
  display: AmountDisplay;
}

interface AmountDisplay {
  /** Ticker/symbol of the asset */
  assetSymbol: string;
  /** Full name of the asset */
  assetName: string;
  /** Number of minor decimals of the asset */
  decimals: number;
  /** URL of the icon of the asset (if token) */
  iconUrl?: string;
  /** Name of the network of the asset (if token) */
  networkName?: string;
}
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#payment-info-types)  Payment Info Types

Copy

Ask AI

```
interface PaymentInfo {
  /** Payment status */
  status: PaymentStatus;
  /** Amount to be paid */
  amount: PayAmount;
  /** Payment expiration timestamp, in seconds since epoch */
  expiresAt: number;
  /** Merchant information */
  merchant: MerchantInfo;
  /** Buyer information (present if payment has been submitted) */
  buyer?: BuyerInfo;
}

interface MerchantInfo {
  /** Merchant name */
  name: string;
  /** Merchant icon URL */
  iconUrl?: string;
}

interface BuyerInfo {
  /** Account CAIP-10 */
  accountCaip10: string;
  /** Account provider name */
  accountProviderName: string;
  /** Account provider icon URL */
  accountProviderIcon?: string;
}
```

#### [​](https://docs.walletconnect.com/payments/wallets/react-native\#collect-data-types)  Collect Data Types

Copy

Ask AI

```
interface CollectDataAction {
  fields: CollectDataField[];
}

interface CollectDataField {
  /** ID of the field for submission */
  id: string;
  /** Human readable name of the field */
  name: string;
  /** Whether the field is required */
  required: boolean;
  /** Type of the field */
  fieldType: CollectDataFieldType;
}

interface CollectDataFieldResult {
  id: string;
  value: string;
}
```

## [​](https://docs.walletconnect.com/payments/wallets/react-native\#best-practices)  Best Practices

1. **Check Provider Availability**: Always check if a provider is available before using the SDK
2. **Account Format**: Always use CAIP-10 format for accounts: `eip155:{chainId}:{address}`
3. **Multiple Chains**: Provide accounts for all supported chains to maximize payment options
4. **Signature Order**: Maintain the same order of signatures as the actions array
5. **Error Handling**: Always handle errors gracefully and show appropriate user feedback
6. **Loading States**: Show loading indicators during API calls and signing operations
7. **User Data**: Only collect data when `collectData` is present in the response

[WalletConnect Pay SDK - Swift Installation\\
\\
Previous](https://docs.walletconnect.com/payments/wallets/swift) [API-first integration (Non-SDK wallets)\\
\\
Next](https://docs.walletconnect.com/payments/wallets/api-first)

Ctrl+I

[website](https://walletconnect.com/) [x](https://x.com/walletconnect) [discord](https://discord.walletconnect.network/) [github](https://github.com/WalletConnect) [linkedin](https://www.linkedin.com/company/walletconnectnetwork/)

[Powered by](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=walletconnect_pay_docs)

Assistant

Responses are generated using AI and may contain mistakes.