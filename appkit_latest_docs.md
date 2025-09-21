# Installation

# React Native

## Introduction

AppKit has support for [Wagmi](https://wagmi.sh) and [Ethers](https://docs.ethers.org/v6/). Choose one of these Ethereum libraries to get started.

<Info>
  **Don't have a project ID?**

  Head over to Reown Dashboard and create a new project now!

  <Card title="Get started" href="https://dashboard.reown.com/?utm_source=cloud_banner&utm_medium=docs&utm_campaign=backlinks" />
</Info>

## Installation

<Tabs>
  <Tab title="React Native CLI">
    <Tabs>
      <Tab title="Wagmi">
        ```
        yarn add @reown/appkit-wagmi-react-native wagmi viem @tanstack/react-query
        ```

        Additionally add these extra packages to help with async storage, polyfills, and SVG's.

        ```
        yarn add @react-native-async-storage/async-storage react-native-get-random-values react-native-svg react-native-modal@14.0.0-rc.1 @react-native-community/netinfo @walletconnect/react-native-compat
        ```

        On iOS, use CocoaPods to add the native modules to your project:

        ```
        npx pod-install
        ```
      </Tab>

      <Tab title="Ethers">
        ```
        yarn add @reown/appkit-ethers-react-native ethers
        ```

        Additionally add these extra packages to help with async storage, polyfills, and SVG's.

        ```
        yarn add @react-native-async-storage/async-storage react-native-get-random-values react-native-svg react-native-modal@14.0.0-rc.1 @react-native-community/netinfo @walletconnect/react-native-compat
        ```

        On iOS, use CocoaPods to add the native modules to your project:

        ```
        npx pod-install
        ```
      </Tab>

      <Tab title="Ethers v5">
        ```
        yarn add @reown/appkit-ethers5-react-native ethers@5.7.2
        ```

        Additionally add these extra packages to help with async storage, polyfills, and SVG's.

        ```
        yarn add @ethersproject/shims@5.7.0 @react-native-async-storage/async-storage react-native-get-random-values react-native-svg react-native-modal@14.0.0-rc.1 @react-native-community/netinfo @walletconnect/react-native-compat
        ```

        On iOS, use CocoaPods to add the native modules to your project:

        ```
        npx pod-install
        ```
      </Tab>
    </Tabs>
  </Tab>

  <Tab title="Expo">
    <Tabs>
      <Tab title="Wagmi">
        ```
        npx expo install @reown/appkit-wagmi-react-native wagmi viem @tanstack/react-query
        ```

        Additionally add these extra packages to help with async storage, polyfills, and SVG's.

        ```
        npx expo install @react-native-async-storage/async-storage react-native-get-random-values react-native-svg react-native-modal@14.0.0-rc.1 @react-native-community/netinfo @walletconnect/react-native-compat expo-application
        ```

        ## Create babel.config.js

        For Expo SDK 53 and later, you need to create a `babel.config.js` file in your project root to properly support the valtio library:

        ```js
        module.exports = function (api) {
          api.cache(true);
          return {
            presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
          };
        };
        ```

        This configuration enables the `unstable_transformImportMeta` option which is required for valtio to work correctly with Expo 53+.

        <details>
          <summary>Additional setup for Expo SDK 48 only</summary>

          <div>
            If you are using Expo SDK 48, you also need to polyfill `crypto` with expo-crypto library.

            1. Add `expo-crypto`

            ```
            npx expo install expo-crypto
            ```

            2. Create a file named `crypto-polyfill.js`

            ```js
            // src/crypto-polyfill.js

            // Apply only with Expo SDK 48
            import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";

            class Crypto {
              getRandomValues = expoCryptoGetRandomValues;
            }

            // eslint-disable-next-line no-undef
            const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

            (() => {
              if (typeof crypto === "undefined") {
                Object.defineProperty(window, "crypto", {
                  configurable: true,
                  enumerable: true,
                  get: () => webCrypto,
                });
              }
            })();
            ```

            3. Import `crypto-polyfill.js` in your App root file

            ```js
            // src/App.js

            import './crypto-polyfill.js'
            import '@walletconnect/react-native-compat';
            ...
            import { createAppKit } from '@reown/appkit-...'
            ```
          </div>
        </details>
      </Tab>

      <Tab title="Ethers">
        ```
        npx expo install @reown/appkit-ethers-react-native ethers
        ```

        Additionally add these extra packages to help with async storage, polyfills, and SVG's.

        ```
        npx expo install @react-native-async-storage/async-storage react-native-get-random-values react-native-svg react-native-modal@14.0.0-rc.1 @react-native-community/netinfo @walletconnect/react-native-compat expo-application
        ```

        ## Create babel.config.js

        For Expo SDK 53 and later, you need to create a `babel.config.js` file in your project root to properly support the valtio library:

        ```js
        module.exports = function (api) {
          api.cache(true);
          return {
            presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
          };
        };
        ```

        This configuration enables the `unstable_transformImportMeta` option which is required for valtio to work correctly with Expo 53+.

        <details>
          <summary>Additional setup for Expo SDK 48 only</summary>

          <div>
            If you are using Expo SDK 48, you also need to polyfill `crypto` with expo-crypto library.

            1. Add `expo-crypto`

            ```
            npx expo install expo-crypto
            ```

            2. Create a file named `crypto-polyfill.js`

            ```js
            // src/crypto-polyfill.js

            // Apply only with Expo SDK 48
            import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";

            class Crypto {
              getRandomValues = expoCryptoGetRandomValues;
            }

            // eslint-disable-next-line no-undef
            const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

            (() => {
              if (typeof crypto === "undefined") {
                Object.defineProperty(window, "crypto", {
                  configurable: true,
                  enumerable: true,
                  get: () => webCrypto,
                });
              }
            })();
            ```

            3. Import `crypto-polyfill.js` in your App root file

            ```js
            // src/App.js

            import './crypto-polyfill.js'
            import '@walletconnect/react-native-compat';
            ...
            import { createAppKit } from '@reown/appkit-...'
            ```
          </div>
        </details>
      </Tab>

      <Tab title="Ethers v5">
        ```
        npx expo install @reown/appkit-ethers5-react-native ethers@5.7.2
        ```

        Additionally add these extra packages to help with async storage, polyfills, and SVG's.

        ```
        npx expo install @ethersproject/shims@5.7.0 @react-native-async-storage/async-storage react-native-get-random-values react-native-svg react-native-modal@14.0.0-rc.1 @react-native-community/netinfo @walletconnect/react-native-compat expo-application
        ```

        ## Create babel.config.js

        For Expo SDK 53 and later, you need to create a `babel.config.js` file in your project root to properly support the valtio library:

        ```js
        module.exports = function (api) {
          api.cache(true);
          return {
            presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
          };
        };
        ```

        This configuration enables the `unstable_transformImportMeta` option which is required for valtio to work correctly with Expo 53+.

        <details>
          <summary>Additional setup for Expo SDK 48 only</summary>

          <div>
            If you are using Expo SDK 48, you also need to polyfill `crypto` with expo-crypto library.

            1. Add `expo-crypto`

            ```
            npx expo install expo-crypto
            ```

            2. Create a file named `crypto-polyfill.js`

            ```js
            // src/crypto-polyfill.js

            // Apply only with Expo SDK 48
            import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";

            class Crypto {
              getRandomValues = expoCryptoGetRandomValues;
            }

            // eslint-disable-next-line no-undef
            const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

            (() => {
              if (typeof crypto === "undefined") {
                Object.defineProperty(window, "crypto", {
                  configurable: true,
                  enumerable: true,
                  get: () => webCrypto,
                });
              }
            })();
            ```

            3. Import `crypto-polyfill.js` in your App root file

            ```js
            // src/App.js

            import './crypto-polyfill.js'
            import '@walletconnect/react-native-compat';
            ...
            import { createAppKit } from '@reown/appkit-...'
            ```
          </div>
        </details>
      </Tab>
    </Tabs>
  </Tab>
</Tabs>

## Implementation

<Tabs>
  <Tab title="Wagmi">
    Start by importing `createAppKit`, and wagmi packages, then create your configs as shown below.
    Finally, pass your configuration to `createAppKit`.

    <Note>
      Make sure you import `@walletconnect/react-native-compat` before `wagmi` to avoid any issues.
    </Note>

    <Note>
      `createAppKit` must be called before rendering the `<AppKit />` component or any other AppKit UI components. Make sure to call `createAppKit` at the module level, outside of your React components.
    </Note>

    ```tsx
    import "@walletconnect/react-native-compat";
    import { WagmiProvider } from "wagmi";
    import { mainnet, polygon, arbitrum } from "@wagmi/core/chains";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import {
      createAppKit,
      defaultWagmiConfig,
      AppKit,
    } from "@reown/appkit-wagmi-react-native";

    // 0. Setup queryClient
    const queryClient = new QueryClient();

    // 1. Get projectId at https://dashboard.reown.com
    const projectId = "YOUR_PROJECT_ID";

    // 2. Create config
    const metadata = {
      name: "AppKit RN",
      description: "AppKit RN Example",
      url: "https://reown.com/appkit",
      icons: ["https://avatars.githubusercontent.com/u/179229932"],
      redirect: {
        native: "YOUR_APP_SCHEME://",
        universal: "YOUR_APP_UNIVERSAL_LINK.com",
      },
    };

    const chains = [mainnet, polygon, arbitrum] as const;

    const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

    // 3. Create modal
    createAppKit({
      projectId,
      metadata,
      wagmiConfig,
      defaultChain: mainnet, // Optional
      enableAnalytics: true, // Optional - defaults to your Cloud configuration
    });

    export default function App() {
      return (
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            // Rest of your app...
            <AppKit />
          </QueryClientProvider>
        </WagmiProvider>
      );
    }
    ```

    #### Trigger the modal

    To open AppKit modal you can use our **default** button component or build your own logic using our hooks.

    <Tabs>
      <Tab title="Components">
        You can use our components to open the modal

        ```tsx
        import { AppKitButton } from "@reown/appkit-wagmi-react-native";

        export default function ConnectView() {
          return (
            <>
              ...rest of your view
              <AppKitButton />
            </>
          );
        }
        ```

        Learn more about the AppKit components [here](../../core/components)
      </Tab>

      <Tab title="Hooks">
        You can trigger the modal by calling the `open` function from `useAppKit` hook.

        ```tsx
        import { Pressable, Text } from "react-native";
        import { useAppKit } from "@reown/appkit-wagmi-react-native";

        export default function ConnectView() {
          const { open } = useAppKit();

          return (
            <>
              <Pressable onClick={() => open()}>
                <Text>Open Connect Modal</Text>
              </Pressable>
            </>
          );
        }
        ```

        Learn more about the AppKit hooks [here](../../core/hooks)
      </Tab>
    </Tabs>
  </Tab>

  <Tab title="Ethers">
    Start by importing `createAppKit` and create your configs as shown below.
    Finally, pass your configuration to `createAppKit`.

    <Note>
      Make sure you import `@walletconnect/react-native-compat` before using our package to avoid any issues.
    </Note>

    <Note>
      `createAppKit` must be called before rendering the `<AppKit />` component or any other AppKit UI components. Make sure to call `createAppKit` at the module level, outside of your React components.
    </Note>

    ```tsx
    import "@walletconnect/react-native-compat";

    import {
      createAppKit,
      defaultConfig,
      AppKit,
    } from "@reown/appkit-ethers-react-native";

    // 1. Get projectId from https://dashboard.reown.com
    const projectId = "YOUR_PROJECT_ID";

    // 2. Create config
    const metadata = {
      name: "AppKit RN",
      description: "AppKit RN Example",
      url: "https://reown.com/appkit",
      icons: ["https://avatars.githubusercontent.com/u/179229932"],
      redirect: {
        native: "YOUR_APP_SCHEME://",
      },
    };

    const config = defaultConfig({ metadata });

    // 3. Define your chains
    const mainnet = {
      chainId: 1,
      name: "Ethereum",
      currency: "ETH",
      explorerUrl: "https://etherscan.io",
      rpcUrl: "https://cloudflare-eth.com",
    };

    const polygon = {
      chainId: 137,
      name: "Polygon",
      currency: "MATIC",
      explorerUrl: "https://polygonscan.com",
      rpcUrl: "https://polygon-rpc.com",
    };

    const chains = [mainnet, polygon];

    // 4. Create modal
    createAppKit({
      projectId,
      metadata,
      chains,
      config,
      enableAnalytics: true, // Optional - defaults to your Cloud configuration
    });

    export default function App() {
      return (
        <>
          // Rest of your app...
          <AppKit />
        </>
      );
    }
    ```

    #### Trigger the modal

    To open AppKit modal you can use our **default** button component or build your own logic using our hooks.

    <Tabs>
      <Tab title="Components">
        You can use our components to open the modal

        ```tsx
        import { AppKitButton } from "@reown/appkit-ethers-react-native";

        export default function ConnectView() {
          return (
            <>
              ...rest of your view
              <AppKitButton />
            </>
          );
        }
        ```

        Learn more about the AppKit components [here](../../core/components)
      </Tab>

      <Tab title="Hooks">
        You can trigger the modal by calling the `open` function from `useAppKit` hook.

        ```tsx
        import { Pressable, Text } from "react-native";
        import { useAppKit } from "@reown/appkit-ethers-react-native";

        export default function ConnectView() {
          const { open } = useAppKit();

          return (
            <>
              <Pressable onClick={() => open()}>
                <Text>Open Connect Modal</Text>
              </Pressable>
            </>
          );
        }
        ```

        Learn more about the AppKit hooks [here](../../core/hooks)
      </Tab>
    </Tabs>
  </Tab>

  <Tab title="Ethers v5">
    Start by importing `createAppKit` and create your configs as shown below.
    Finally, pass your configuration to `createAppKit`.

    <Note>
      Make sure you import `@walletconnect/react-native-compat` and `@ethersproject/shims` before using our package to avoid any issues.
    </Note>

    <Note>
      `createAppKit` must be called before rendering the `<AppKit />` component or any other AppKit UI components. Make sure to call `createAppKit` at the module level, outside of your React components.
    </Note>

    ```tsx
    import "@walletconnect/react-native-compat";
    import "@ethersproject/shims";

    import {
      createAppKit,
      defaultConfig,
      AppKit,
    } from "@reown/appkit-ethers5-react-native";

    // 1. Get projectId from https://dashboard.reown.com
    const projectId = "YOUR_PROJECT_ID";

    // 2. Create config
    const metadata = {
      name: "AppKit RN",
      description: "AppKit RN Example",
      url: "https://reown.com/appkit",
      icons: ["https://avatars.githubusercontent.com/u/179229932"],
      redirect: {
        native: "YOUR_APP_SCHEME://",
      },
    };

    const config = defaultConfig({ metadata });

    // 3. Define your chains
    const mainnet = {
      chainId: 1,
      name: "Ethereum",
      currency: "ETH",
      explorerUrl: "https://etherscan.io",
      rpcUrl: "https://cloudflare-eth.com",
    };

    const polygon = {
      chainId: 137,
      name: "Polygon",
      currency: "MATIC",
      explorerUrl: "https://polygonscan.com",
      rpcUrl: "https://polygon-rpc.com",
    };

    const chains = [mainnet, polygon];

    // 4. Create modal
    createAppKit({
      projectId,
      metadata,
      chains,
      config,
      enableAnalytics: true, // Optional - defaults to your Cloud configuration
    });

    export default function App() {
      return (
        <>
          // Rest of your app...
          <AppKit />
        </>
      );
    }
    ```

    #### Trigger the modal

    To open AppKit modal you can use our **default** button component or build your own logic using our hooks.

    <Tabs>
      <Tab title="Components">
        You can use our components to open the modal

        ```tsx
        import { AppKitButton } from "@reown/appkit-ethers5-react-native";

        export default function ConnectView() {
          return (
            <>
              ...rest of your view
              <AppKitButton />
            </>
          );
        }
        ```

        Learn more about the AppKit components [here](../../core/components)
      </Tab>

      <Tab title="Hooks">
        You can trigger the modal by calling the `open` function from `useAppKit` hook.

        ```tsx
        import { Pressable, Text } from "react-native";
        import { useAppKit } from "@reown/appkit-ethers5-react-native";

        export default function ConnectView() {
          const { open } = useAppKit();

          return (
            <>
              <Pressable onClick={() => open()}>
                <Text>Open Connect Modal</Text>
              </Pressable>
            </>
          );
        }
        ```

        Learn more about the AppKit hooks [here](../../core/hooks)
      </Tab>
    </Tabs>
  </Tab>
</Tabs>

## Getting Support 🙋

Reown is committed to delivering the best developer experience.

If you have any questions, feature requests, or bug reports, feel free to open an issue on [GitHub](https://github.com/reown-com/appkit-react-native)!

## Enable Wallet Detection (Optional)

<Info>
  **This is an optional feature** that enhances the user experience by:

  * Showing a green checkmark next to installed wallets
  * Prioritizing installed wallets at the top of the list

  **All 430+ wallets in the AppKit ecosystem work via WalletConnect protocol regardless of this configuration.** You only need to add the wallets your users most commonly have installed.
</Info>

To enable AppKit to detect wallets installed on the device, you can make specific changes to the native code of your project.

<Tabs>
  <Tab title="React Native CLI">
    <Tabs>
      <Tab title="iOS">
        1. Open your `Info.plist` file.
        2. Locate the `<key>LSApplicationQueriesSchemes</key>` section.
        3. Add the desired wallet schemes as string entries within the `<array>`. These schemes represent the wallets you want to detect.
        4. Refer to our [Info.plist example file](https://github.com/WalletConnect/react-native-examples/blob/main/dapps/ModalUProvider/ios/ModalUProvider/Info.plist) for a detailed illustration.

        Example:

        ```xml
        <key>LSApplicationQueriesSchemes</key>
        <array>
          <string>metamask</string>
          <string>trust</string>
          <string>safe</string>
          <string>rainbow</string>
          <string>uniswap</string>
          <!-- Add other wallet schemes names here -->
        </array>
        ```
      </Tab>

      <Tab title="Android">
        1. Open your `AndroidManifest.xml` file.
        2. Locate the `<queries>` section.
        3. Add the desired wallet package names as `<package>` entries within the `<queries>`. These package names correspond to the wallets you want to detect.
        4. Refer to our [AndroidManifest.xml example file](https://github.com/WalletConnect/react-native-examples/blob/main/dapps/ModalUProvider/android/app/src/main/AndroidManifest.xml) for detailed guidance.

        Example:

        ```xml
        <queries>
          <package android:name="io.metamask"/>
          <package android:name="com.wallet.crypto.trustapp"/>
          <package android:name="io.gnosis.safe"/>
          <package android:name="me.rainbow"/>
          <!-- Add other wallet package names here -->
        </queries>
        ```
      </Tab>
    </Tabs>
  </Tab>

  <Tab title="Expo">
    <Tabs>
      <Tab title="iOS">
        To enable AppKit to detect wallets installed on the device in your Expo project for iOS, follow these steps:

        1. Open your `app.json` (or `app.config.js`) file.
        2. Locate the ios section within the configuration.
        3. Add the `infoPlist` object if it doesn't exist, and within it, include the `LSApplicationQueriesSchemes` array. This array will contain the desired wallet schemes you want to detect.
        4. Add the wallet schemes to the `LSApplicationQueriesSchemes` array.

        Your configuration should look like this:

        ```js {4-13}
        {
          "expo": {
            "ios": {
              "infoPlist": {
                "LSApplicationQueriesSchemes": [
                  "metamask",
                  "trust",
                  "safe",
                  "rainbow",
                  "uniswap"
                  // Add other wallet schemes names here
                ]
              }
            }
          }
        }
        ```
      </Tab>

      <Tab title="Android">
        To enable AppKit to detect wallets installed on the device in your Expo project for Android, follow these steps:

        1. Open your `app.json` (or `app.config.js`) file.
        2. Locate the plugins section within the configuration.
        3. Add `queries.js` in the plugins array:

        ```js {4}
        {
          "plugins": [
            // other plugins,
            "./queries.js"
          ],
        }
        ```

        4. Create the file `queries.js`:

        ```js
        // based on https://github.com/expo/config-plugins/issues/123#issuecomment-1746757954

        const {
          AndroidConfig,
          withAndroidManifest,
          createRunOncePlugin,
        } = require("expo/config-plugins");

        const queries = {
          package: [
            { $: { "android:name": "com.wallet.crypto.trustapp" } },
            { $: { "android:name": "io.metamask" } },
            { $: { "android:name": "me.rainbow" } },
            { $: { "android:name": "io.zerion.android" } },
            { $: { "android:name": "io.gnosis.safe" } },
            { $: { "android:name": "com.uniswap.mobile" } },
            // Add other wallet package names here
          ],
        };

        /**
         * @param {import('@expo/config-plugins').ExportedConfig} config
         */
        const withAndroidManifestService = (config) => {
          return withAndroidManifest(config, (config) => {
            config.modResults.manifest = {
              ...config.modResults.manifest,
              queries,
            };

            return config;
          });
        };

        module.exports = createRunOncePlugin(
          withAndroidManifestService,
          "withAndroidManifestService",
          "1.0.0"
        );
        ```

        5. Add the wallet package names you want to be detected by your app.
      </Tab>
    </Tabs>
  </Tab>
</Tabs>

## Enable Coinbase Wallet (Optional)

<Info>
  **Coinbase Wallet support is optional.** Unlike other wallets that use the WalletConnect protocol, Coinbase Wallet uses its own proprietary SDK. If you skip this setup, Coinbase Wallet simply won't appear in your wallet list, but all other wallets will work normally.
</Info>

Follow these steps to install Coinbase SDK in your project along with our Coinbase package. Check <a href="https://mobilewalletprotocol.github.io/wallet-mobile-sdk/docs/client-sdk/rn-install">here</a> for more detailed information.

<Note>
  **Expo Compatibility:** Coinbase SDK works with [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/) but not with Expo Go. You'll need to use `expo prebuild` to generate native code before building your app.
</Note>

1. Enable Expo Modules in your project running:

```
npx install-expo-modules@latest
```

2. Install Coinbase SDK

```
yarn add @coinbase/wallet-mobile-sdk react-native-mmkv
```

3. Install our custom connector

<Tabs>
  <Tab title="Wagmi">
    `yarn add @reown/appkit-coinbase-wagmi-react-native`
  </Tab>

  <Tab title="Ethers">
    `yarn add @reown/appkit-coinbase-ethers-react-native`
  </Tab>

  <Tab title="Ethers v5">
    `yarn add @reown/appkit-coinbase-ethers-react-native`
  </Tab>
</Tabs>

4. Run pod-install

```
npx pod-install
```

5. Enable Deeplink handling in your project following <a href="https://reactnative.dev/docs/linking?syntax=ios#enabling-deep-links">React Native docs</a>

6. Add Coinbase package in your AndroidManifest.xml and Info.Plist

```xml
// AndroidManifest.xml

<queries>
  <!-- other queries -->
  <package android:name="org.toshi" />
</queries>
```

```xml
// Info.plist

<key>LSApplicationQueriesSchemes</key>
<array>
  <!-- other schemes -->
  <string>cbwallet</string>
</array>
```

7. Add Coinbase response handler in your app. More info <a href="https://mobilewalletprotocol.github.io/wallet-mobile-sdk/docs/client-sdk/rn-setup#listening-for-responses">here</a>

```tsx
import { handleResponse } from "@coinbase/wallet-mobile-sdk";

// Your app's deeplink handling code
useEffect(() => {
  const sub = Linking.addEventListener("url", ({ url }) => {
    const handledBySdk = handleResponse(new URL(url));
    if (!handledBySdk) {
      // Handle other deeplinks
    }
  });

  return () => sub.remove();
}, []);
```

<Tabs>
  <Tab title="Wagmi">
    8. Initialize `coinbaseConnector` and add it in `extraConnectors`

    ```tsx
    import { coinbaseConnector } from '@reown/appkit-coinbase-wagmi-react-native'
    import { MMKV } from 'react-native-mmkv'

    const coinbase = coinbaseConnector({
      redirect: 'https://your-app-universal-link.com' || 'YOUR_APP_SCHEME://',
      storage: new MMKV() // needed if using react native new architecture
    })

    const wagmiConfig = defaultWagmiConfig({
      chains,
      projectId,
      metadata,
      extraConnectors: [coinbase]
    })
    ```

    * Prefer universal links over custom schemes to avoid an app verification warning on Coinbase Wallet
  </Tab>

  <Tab title="Ethers">
    8. Initialize `CoinbaseProvider` and add it in the default config

    ```tsx
    import { CoinbaseProvider } from '@reown/appkit-coinbase-ethers-react-native'
    import { MMKV } from 'react-native-mmkv'

    const coinbaseProvider = new CoinbaseProvider({
      redirect: 'https://your-app-universal-link.com' || 'YOUR_APP_SCHEME://',
      rpcUrl: mainnet.rpcUrl,
      storage: new MMKV() // needed if using react native new architecture
    })

    const config = defaultConfig({
      metadata,
      coinbase: coinbaseProvider
    })
    ```

    * Prefer universal links over custom schemes to avoid an app verification warning on Coinbase Wallet
  </Tab>

  <Tab title="Ethers v5">
    8. Initialize `CoinbaseProvider` and add it in the default config

    ```tsx
    import { CoinbaseProvider } from '@reown/appkit-coinbase-ethers-react-native'
    import { MMKV } from 'react-native-mmkv'

    const coinbaseProvider = new CoinbaseProvider({
      redirect: 'https://your-app-universal-link.com' || 'YOUR_APP_SCHEME://',
      rpcUrl: mainnet.rpcUrl,
      storage: new MMKV() // needed if using react native new architecture
    })

    const config = defaultConfig({
      metadata,
      coinbase: coinbaseProvider
    })
    ```

    * Prefer universal links over custom schemes to avoid an app verification warning on Coinbase Wallet
  </Tab>
</Tabs>

Check <a href="https://mobilewalletprotocol.github.io/wallet-mobile-sdk/docs/client-sdk/rn-install">Coinbase docs</a> for more detailed information.

## Examples

<Tabs>
  <Tab title="Wagmi">
    <Card title="AppKit with Wagmi example" icon="github" href="https://github.com/reown-com/react-native-examples/tree/main/dapps/W3MWagmi">
      Check the React Native example using Wagmi
    </Card>
  </Tab>

  <Tab title="Ethers">
    <Card title="AppKit with Ethers example" icon="github" href="https://github.com/reown-com/react-native-examples/tree/main/dapps/W3MEthers">
      Check the React Native example using Ethers
    </Card>
  </Tab>

  <Tab title="Ethers v5">
    <Card title="AppKit with Ethers v5 example" icon="github" href="https://github.com/reown-com/react-native-examples/tree/main/dapps/W3MEthers5">
      Check the React Native example using Ethers v5
    </Card>
  </Tab>
</Tabs>

## Test Apps

Want to see AppKit in action? Download our sample AppKit apps below and explore what it can do. Enjoy! 😊

* [Android Build (Firebase)](https://appdistribution.firebase.google.com/pub/i/0297fbd3de8f1e3f)
* [iOS Build (Testflight)](https://testflight.apple.com/join/YW2jD2s0)

## Tutorial

<div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
  <iframe
    style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxWidth: '560px',
    margin: '0 auto'
  }}
    src="https://www.youtube.com/embed/R0edIW72fHo?si=KRMqX2AZZPDH7Xig"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</div>
