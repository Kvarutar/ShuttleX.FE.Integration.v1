import { emailRegex } from './core/consts/regex.consts';
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
import ApplePayIcon from './shared/BrandBook/Icons/ApplePayIcon';
import ArrowIcon from './shared/BrandBook/Icons/ArrowIcon';
import ArrowInPrimaryColorIcon from './shared/BrandBook/Icons/ArrowInPrimaryColorIcon';
import BaggageIcon from './shared/BrandBook/Icons/BaggageIcon';
import BigCameraIcon from './shared/BrandBook/Icons/BigCameraIcon';
import BlueCheck1 from './shared/BrandBook/Icons/BlueCheck1';
import BlueCheck2 from './shared/BrandBook/Icons/BlueCheck2';
import BrandFavIcon from './shared/BrandBook/Icons/BrandFavIcon';
import BrandTextIcon from './shared/BrandBook/Icons/BrandTextIcon';
import CalendarIcon from './shared/BrandBook/Icons/CalendarIcon';
import ChatIcon from './shared/BrandBook/Icons/ChatIcon';
import ClockIcon from './shared/BrandBook/Icons/ClockIcon';
import CloseIcon from './shared/BrandBook/Icons/CloseIcon';
import CurrencyIcon from './shared/BrandBook/Icons/CurrencyIcon';
import DislikeIcon from './shared/BrandBook/Icons/DislikeIcon';
import DropOffIcon from './shared/BrandBook/Icons/DropOffIcon';
import EmergencyServiceIcon from './shared/BrandBook/Icons/EmergencyServiceIcon';
import ExternalMapIcon from './shared/BrandBook/Icons/ExternalMapIcon';
import FeedbackCleanIcon from './shared/BrandBook/Icons/FeedbackCleanIcon';
import FeedbackDirtyIcon from './shared/BrandBook/Icons/FeedbackDirtyIcon';
import FeedbackHeartBrokenIcon from './shared/BrandBook/Icons/FeedbackHeartBrokenIcon';
import FeedbackHeartIcon from './shared/BrandBook/Icons/FeedbackHeartIcon';
import FeedbackThumbDownIcon from './shared/BrandBook/Icons/FeedbackThumbDownIcon';
import FeedbackThumbUpIcon from './shared/BrandBook/Icons/FeedbackThumbUpIcon';
import FeedbackWheelIcon from './shared/BrandBook/Icons/FeedbackWheelIcon';
import InputXIcon from './shared/BrandBook/Icons/InputXIcon';
import LikeIcon from './shared/BrandBook/Icons/LikeIcon';
import LocationIcon from './shared/BrandBook/Icons/LocationIcon';
import MapPinIcon from './shared/BrandBook/Icons/MapPinIcon';
import MasterCardIcon from './shared/BrandBook/Icons/MasterCardIcon';
import MenuIcon from './shared/BrandBook/Icons/MenuIcon';
import MinusIcon from './shared/BrandBook/Icons/MinusIcon';
import NotificationIcon from './shared/BrandBook/Icons/NotificationIcon';
import PassengerIcon from './shared/BrandBook/Icons/PassengerIcon';
import PassengerIcon2 from './shared/BrandBook/Icons/PassengerIcon2';
import PayPalIcon from './shared/BrandBook/Icons/PayPalIcon';
import PhoneIcon from './shared/BrandBook/Icons/PhoneIcon';
import PickUpIcon from './shared/BrandBook/Icons/PickUpIcon';
import PlusIcon from './shared/BrandBook/Icons/PlusIcon';
import PreferencesIcon from './shared/BrandBook/Icons/PreferencesIcon';
import ReportIcon from './shared/BrandBook/Icons/ReportIcon';
import ShortArrowIcon from './shared/BrandBook/Icons/ShortArrowIcon';
import ShortArrowSmallIcon from './shared/BrandBook/Icons/ShortArrowSmallIcon';
import SpinnerIcon from './shared/BrandBook/Icons/SpinnerIcon';
import StatisticsIcon from './shared/BrandBook/Icons/StatitsticsIcon';
import TimeIcon from './shared/BrandBook/Icons/TimeIcon';
import VisaIcon from './shared/BrandBook/Icons/VisaIcon';
import WarningIcon from './shared/BrandBook/Icons/WarningIcon';
import BasicXImage from './shared/BrandBook/Images/BasicXImage';
import BasicXLImage from './shared/BrandBook/Images/BasicXLImage';
import ComfortXImage from './shared/BrandBook/Images/ComfortXImage';
import LocationArrowImage from './shared/BrandBook/Images/LocationArrowImage';
import MenuUserImage from './shared/BrandBook/Images/MenuUserImage';
import MenuUserImage2 from './shared/BrandBook/Images/MenuUserImage2';
import PremiumXImage from './shared/BrandBook/Images/PremiumXImage';
import PremiumXLImage from './shared/BrandBook/Images/PremiumXLImage';
import TariffsCarImage, { type TariffType } from './shared/BrandBook/Images/TariffsCarImage';
import TeslaXImage from './shared/BrandBook/Images/TeslaXImage';
import Text from './shared/BrandBook/Text';
import TextInput from './shared/BrandBook/TextInput';
import { TextInputInputMode } from './shared/BrandBook/TextInput/props';
import Feedback from './shared/Feedback';
import { type FeedbackRating, type FeedbackType } from './shared/Feedback/props';
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
import LocationUnavailable from './shared/Widgets/LocationUnavailable';
import { type LocationUnavailableProps } from './shared/Widgets/LocationUnavailable/props';
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
  ApplePayIcon,
  ArrowIcon,
  ArrowInPrimaryColorIcon,
  BaggageIcon,
  Bar,
  BarModes,
  BasicXImage,
  BasicXLImage,
  BigCameraIcon,
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
  ComfortXImage,
  CurrencyIcon,
  DatePicker,
  DislikeIcon,
  DriverArrivedAlert,
  DropOffIcon,
  emailRegex,
  EmergencyServiceIcon,
  ExternalMapIcon,
  Feedback,
  FeedbackCleanIcon,
  FeedbackDirtyIcon,
  FeedbackHeartBrokenIcon,
  FeedbackHeartIcon,
  type FeedbackRating,
  FeedbackThumbDownIcon,
  FeedbackThumbUpIcon,
  type FeedbackType,
  FeedbackWheelIcon,
  FlatListWithCustomScroll,
  FreeTimeAlert,
  type FreeTimeAlertProps,
  FreeTimeAlertType,
  GroupedBrandIcon,
  GroupedButtons,
  InputXIcon,
  InternetDisconnectedAlert,
  LikeIcon,
  LocationArrowImage,
  LocationIcon,
  LocationUnavailable,
  type LocationUnavailableProps,
  MapPinIcon,
  MasterCardIcon,
  MenuIcon,
  MenuUserImage,
  MenuUserImage2,
  MinusIcon,
  nameof,
  NotificationIcon,
  PaidTimeAlert,
  type PaidTimeAlertProps,
  palettes,
  PassengerIcon,
  PassengerIcon2,
  PayPalIcon,
  PhoneIcon,
  PhoneInput,
  PickUpIcon,
  PlannedTripAlert,
  type PlannedTripAlertProps,
  PlusIcon,
  Popup,
  PreferencesIcon,
  PremiumXImage,
  PremiumXLImage,
  ReportIcon,
  RoundButton,
  ScrollViewWithCustomScroll,
  ShortArrowIcon,
  ShortArrowSmallIcon,
  sizes,
  SpinnerIcon,
  StatisticsIcon,
  StopWatch,
  SwipeButton,
  SwipeButtonModes,
  TariffsCarImage,
  type TariffType,
  TeslaXImage,
  Text,
  TextInput,
  TextInputInputMode,
  type ThemeContextType,
  ThemeProvider,
  TimeIcon,
  TimePicker,
  Timer,
  TimerModes,
  useTheme,
  VisaIcon,
  WarningIcon,
};
