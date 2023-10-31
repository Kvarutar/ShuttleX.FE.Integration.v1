# ShuttleX.FE.Integration.v1
ShuttleX - FE - Integration contains utilities / shared components and features

## Preparing for installation

Install yarn:

```sh
npm install --global yarn
```

In this project run this command:

```sh
yarn
```

Use script:

```sh
npm run pack
```

>**Note**: If you make some changes in **shuttlex-integration**, always run this command

## Installation

```sh
npm install <Path to your library>/shuttlex-integration-<integration version>.tgz
```

>**Note**: If you make some changes in **shuttlex-integration**, always run this command

## Usage

```js
import { ExampleComponent } from 'shuttlex-integration';

// ...
  return (
    <View>
        <ExampleComponent />
    </View>
  )
// ...
```

>**Note**: ShuttleX.FE.Contractor, ShuttleX.FE.Passenger and ShuttleX.FE.Integration projects must be located in the same folder at the same level

## Bootstrap

To run example project use following commands:

```
# Android app
yarn example android
# iOS app
yarn example ios
```

## License

ShuttleX Inc. license

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
