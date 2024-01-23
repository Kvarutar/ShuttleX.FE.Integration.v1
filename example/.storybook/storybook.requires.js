/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./src/stories",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:src[\\\\/]stories(?:[\\\\/](?!\\.)(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/]|[\\\\/]|$)(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
];

import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./src/stories/Alert.stories.tsx": require("../src/stories/Alert.stories.tsx"),
    "./src/stories/Bar.stories.tsx": require("../src/stories/Bar.stories.tsx"),
    "./src/stories/Button.stories.tsx": require("../src/stories/Button.stories.tsx"),
    "./src/stories/CheckBox.stories.tsx": require("../src/stories/CheckBox.stories.tsx"),
    "./src/stories/CodeInput.stories.tsx": require("../src/stories/CodeInput.stories.tsx"),
    "./src/stories/DatePicker.stories.tsx": require("../src/stories/DatePicker.stories.tsx"),
    "./src/stories/DriverArrivedAlert.stories.tsx": require("../src/stories/DriverArrivedAlert.stories.tsx"),
    "./src/stories/FreeTimeAlert.stories.tsx": require("../src/stories/FreeTimeAlert.stories.tsx"),
    "./src/stories/GroupedBrandIcon.stories.tsx": require("../src/stories/GroupedBrandIcon.stories.tsx"),
    "./src/stories/GroupedButtons.stories.tsx": require("../src/stories/GroupedButtons.stories.tsx"),
    "./src/stories/InternetDisconnectedAlert.stories.tsx": require("../src/stories/InternetDisconnectedAlert.stories.tsx"),
    "./src/stories/PaidTimeAlert.stories.tsx": require("../src/stories/PaidTimeAlert.stories.tsx"),
    "./src/stories/PhoneInput.stories.tsx": require("../src/stories/PhoneInput.stories.tsx"),
    "./src/stories/PlannedTripAlert.stories.tsx": require("../src/stories/PlannedTripAlert.stories.tsx"),
    "./src/stories/RoundButton.stories.tsx": require("../src/stories/RoundButton.stories.tsx"),
    "./src/stories/StopWatch.stories.tsx": require("../src/stories/StopWatch.stories.tsx"),
    "./src/stories/SwipeButton.stories.tsx": require("../src/stories/SwipeButton.stories.tsx"),
    "./src/stories/Text.stories.tsx": require("../src/stories/Text.stories.tsx"),
    "./src/stories/TextInput.stories.tsx": require("../src/stories/TextInput.stories.tsx"),
    "./src/stories/TimePicker.stories.tsx": require("../src/stories/TimePicker.stories.tsx"),
    "./src/stories/Timer.stories.tsx": require("../src/stories/Timer.stories.tsx"),
  };
};

configure(getStories, module, false);
