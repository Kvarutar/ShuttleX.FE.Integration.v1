# ShuttleX.FE.Integration.v1

ShuttleX - FE - Integration contains utilities / shared components and features

## Preparing for installation

Enable yarn:

```sh
corepack enable
# this command is from node.js
```

In this project run this command to install dependencies:

```sh
yarn install
```

Use script for create .tgz:

```sh
yarn run pack
```

> **Note**: If you make some changes in **shuttlex-integration**, always run this command

## Installation to project

```sh
npm install <Path to your library>/shuttlex-integration-<integration version>.tgz
```

> **Note**: If you make some changes in **shuttlex-integration**, always run this command

> [!WARNING]
> You also need to install all library dependencies in the project

### Library dependencies

- [@react-native-community/datetimepicker](https://www.npmjs.com/package/@react-native-community/datetimepicker)
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
- [react](https://www.npmjs.com/package/react)
- [react-native](https://www.npmjs.com/package/react-native)
- [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context)
- [react-native-shadow-2](https://www.npmjs.com/package/react-native-shadow-2)
- [react-native-svg](https://www.npmjs.com/package/react-native-svg)
- [react-native-svg-transformer](https://www.npmjs.com/package/react-native-svg-transformer)
- [react-redux](https://www.npmjs.com/package/react-redux)

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

> **Note**: ShuttleX.FE.Contractor, ShuttleX.FE.Passenger and ShuttleX.FE.Integration projects must be located in the same folder at the same level

## Bootstrap

To run example project use following commands:

```sh
# Android app
yarn example android
# iOS app
yarn example ios
```

## License

ShuttleX Inc. license

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
