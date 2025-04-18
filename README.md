# ShuttleX.FE.Integration.v1

ShuttleX - FE - Integration contains utilities / shared components and features

## Preparing for installation

Enable yarn:

```sh
corepack enable
# this command is from node.js
```

Run this command to install dependencies:

```sh
yarn install
```

## Run storybook and example apps

To run storybook:

```sh
yarn example storybook
```

To run example app:

```sh
yarn example start
```

## Installation to project

> [!WARNING]
> You also need to install all library peer dependencies in the project

### Library dependencies

- [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr)
- [@react-native-community/blur](https://www.npmjs.com/package/@react-native-community/blur)
- [@react-native-community/datetimepicker](https://www.npmjs.com/package/@react-native-community/datetimepicker)
- [@react-native-community/netinfo](https://www.npmjs.com/package/@react-native-community/netinfo)
- [@react-navigation/native](https://www.npmjs.com/package/@react-navigation/native)
- [@react-navigation/native-stack](https://www.npmjs.com/package/@react-navigation/native-stack)
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
- [@sentry/react-native](https://www.npmjs.com/package/@sentry/react-native)
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- [react](https://www.npmjs.com/package/react)
- [react-native](https://www.npmjs.com/package/react-native)
- [react-native-device-info](https://www.npmjs.com/package/react-native-device-info)
- [react-native-community/geolocation](https://www.npmjs.com/package/@react-native-community/geolocation)
- [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler)
- [react-native-maps](https://www.npmjs.com/package/react-native-maps)
- [react-native-permissions](https://www.npmjs.com/package/react-native-permissions)
- [react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated)
- [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context)
- [react-native-sensors](https://www.npmjs.com/package/react-native-sensors)
- [react-native-shadow-2](https://www.npmjs.com/package/react-native-shadow-2)
- [react-native-svg](https://www.npmjs.com/package/react-native-svg)
- [react-native-svg-transformer](https://www.npmjs.com/package/react-native-svg-transformer)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-native-firebase/app](https://www.npmjs.com/package/@react-native-firebase/app)
- [react-native-firebase/messaging](https://www.npmjs.com/package/@react-native-firebase/messaging)
- [react-native-localize](https://classic.yarnpkg.com/en/package/react-native-localize)

### Install from GitHub

```sh
npm i DevShuttleXInc/ShuttleX.FE.Integration.v1#<commit hash, tag or branch name>
```

> **Note**: You need access to Integration repository to install it this way

### Install from .tgz

Use script for create .tgz:

```sh
yarn run pack
```

Install .tgz to **your** project

```sh
npm install <Path to your library>/shuttlex-integration-<integration version>.tgz
```

> **Note**: If you make some changes in **shuttlex-integration**, always run both commands again

## Usage

```js
import { ExampleComponent } from 'shuttlex-integration';

// ...
return (
  <View>
    <ExampleComponent />
  </View>
);
// ...
```

## License

ShuttleX Inc. license

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
