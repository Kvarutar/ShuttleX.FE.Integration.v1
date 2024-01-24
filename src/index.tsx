import { nameof } from './core/monkey-patch/ts.helper';
import palettes from './core/themes/palettes';
import sizes from './core/themes/sizes';
import { type ThemeContextType, ThemeProvider, useTheme } from './core/themes/themeContext';
import Bar from './shared/Bar';
import { BarModes } from './shared/Bar/types';
import Blur from './shared/Blur';
import Button from './shared/BrandBook/Button';
import { ButtonModes, ButtonShadows } from './shared/BrandBook/Button/props';
import CheckBox from './shared/BrandBook/Checkbox';
import ArrowIcon from './shared/BrandBook/Icons/ArrowIcon';
import BlueCheck1 from './shared/BrandBook/Icons/BlueCheck1';
import BlueCheck2 from './shared/BrandBook/Icons/BlueCheck2';
import BrandFavIcon from './shared/BrandBook/Icons/BrandFavIcon';
import BrandTextIcon from './shared/BrandBook/Icons/BrandTextIcon';
import CalendarIcon from './shared/BrandBook/Icons/CalendarIcon';
import ChatIcon from './shared/BrandBook/Icons/ChatIcon';
import ClockIcon from './shared/BrandBook/Icons/ClockIcon';
import CloseIcon from './shared/BrandBook/Icons/CloseIcon';
import CurrencyIcon from './shared/BrandBook/Icons/CurrencyIcon';
import DropOffIcon from './shared/BrandBook/Icons/DropOffIcon';
import EmergencyServiceIcon from './shared/BrandBook/Icons/EmergencyServiceIcon';
import ExternalMapIcon from './shared/BrandBook/Icons/ExternalMapIcon';
import LocationIcon from './shared/BrandBook/Icons/LocationIcon';
import MenuIcon from './shared/BrandBook/Icons/MenuIcon';
import NotificationIcon from './shared/BrandBook/Icons/NotificationIcon';
import PassengerIcon from './shared/BrandBook/Icons/PassengerIcon';
import PhoneIcon from './shared/BrandBook/Icons/PhoneIcon';
import PickUpIcon from './shared/BrandBook/Icons/PickUpIcon';
import PreferencesIcon from './shared/BrandBook/Icons/PreferencesIcon';
import ReportIcon from './shared/BrandBook/Icons/ReportIcon';
import ShortArrowIcon from './shared/BrandBook/Icons/ShortArrowIcon';
import SpinnerIcon from './shared/BrandBook/Icons/SpinnerIcon';
import StatisticsIcon from './shared/BrandBook/Icons/StatitsticsIcon';
import TimeIcon from './shared/BrandBook/Icons/TimeIcon';
import WarningIcon from './shared/BrandBook/Icons/WarningIcon';
import Text from './shared/BrandBook/Text';
import TextInput from './shared/BrandBook/TextInput';
import GroupedBrandIcon from './shared/GroupedBrandIcon';
import Popup from './shared/Popup';
import RoundButton from './shared/RoundButton';
import { type AlertDescendantProps } from './shared/Widgets/alerts/Alert/props';
import DriverArrivedAlert from './shared/Widgets/alerts/DriverArrivedAlert';
import FreeTimeAlert from './shared/Widgets/alerts/FreeTimeAlert';
import { type FreeTimeAlertProps, FreeTimeAlertType } from './shared/Widgets/alerts/FreeTimeAlert/props';
import InternetDisconnectedAlert from './shared/Widgets/alerts/InternetDisconnectedAlert';
import PaidTimeAlert from './shared/Widgets/alerts/PaidTimeAlert';
import { type PaidTimeAlertProps } from './shared/Widgets/alerts/PaidTimeAlert/props';
import PlannedTripAlert from './shared/Widgets/alerts/PlannedTripAlert';
import { type PlannedTripAlertProps } from './shared/Widgets/alerts/PlannedTripAlert/props';
import BottomWindow from './shared/Widgets/BottomWindow';
import BottomWindowWithGesture from './shared/Widgets/BottomWindowWithGesture';
import CodeInput from './shared/Widgets/CodeInput';
import DatePicker from './shared/Widgets/DatePicker';
import FlatListWithCustomScroll from './shared/Widgets/FlatListWithCustomScroll';
import GroupedButtons from './shared/Widgets/GroupedButtons';
import PhoneInput from './shared/Widgets/PhoneInput';
import ScrollViewWithCustomScroll from './shared/Widgets/ScrollViewWithCustomScroll';
import SwipeButton from './shared/Widgets/SwipeButton';
import { SwipeButtonModes } from './shared/Widgets/SwipeButton/props';
import TimePicker from './shared/Widgets/TimePicker';
import StopWatch from './shared/Widgets/timerAndStopwatch/StopWatch';
import Timer from './shared/Widgets/timerAndStopwatch/Timer';
import { TimerModes } from './shared/Widgets/timerAndStopwatch/Timer/props';

export {
  type AlertDescendantProps,
  ArrowIcon,
  Bar,
  BarModes,
  BlueCheck1,
  BlueCheck2,
  Blur,
  BottomWindow,
  BottomWindowWithGesture,
  BrandFavIcon,
  BrandTextIcon,
  Button,
  ButtonModes,
  ButtonShadows,
  CalendarIcon,
  ChatIcon,
  CheckBox,
  ClockIcon,
  CloseIcon,
  CodeInput,
  CurrencyIcon,
  DatePicker,
  DriverArrivedAlert,
  DropOffIcon,
  EmergencyServiceIcon,
  ExternalMapIcon,
  FlatListWithCustomScroll,
  FreeTimeAlert,
  type FreeTimeAlertProps,
  FreeTimeAlertType,
  GroupedBrandIcon,
  GroupedButtons,
  InternetDisconnectedAlert,
  LocationIcon,
  MenuIcon,
  nameof,
  NotificationIcon,
  PaidTimeAlert,
  type PaidTimeAlertProps,
  palettes,
  PassengerIcon,
  PhoneIcon,
  PhoneInput,
  PickUpIcon,
  PlannedTripAlert,
  type PlannedTripAlertProps,
  Popup,
  PreferencesIcon,
  ReportIcon,
  RoundButton,
  ScrollViewWithCustomScroll,
  ShortArrowIcon,
  sizes,
  SpinnerIcon,
  StatisticsIcon,
  StopWatch,
  SwipeButton,
  SwipeButtonModes,
  Text,
  TextInput,
  type ThemeContextType,
  ThemeProvider,
  TimeIcon,
  TimePicker,
  Timer,
  TimerModes,
  useTheme,
  WarningIcon,
};
