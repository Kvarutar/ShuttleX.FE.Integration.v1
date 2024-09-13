import createAxiosInstance from './core/client';
import defaultAxiosRetryConfig from './core/client/helpers/defaultRetryConfig';
import getAxiosErrorInfo from './core/client/helpers/getAxiosErrorInfo';
import { emailRegex } from './core/consts/regex.consts';
import { countryDtos } from './core/countries/countryDtos';
import { type countryDtosProps } from './core/countries/props';
import i18nIntegration from './core/locales/i18n';
import { AnimatedMarker } from './core/map/hooks';
import lightMapStyle from './core/map/lightMapStyle.json';
import MapCameraModeButton from './core/map/MapCameraModeButton';
import MapView from './core/map/MapView';
import { type MapCameraMode, type MapViewProps } from './core/map/types';
import { nameof } from './core/monkey-patch/ts.helper';
import { SignalR } from './core/signalR/middleware';
import sizes from './core/themes/sizes';
import palettes from './core/themes/v1/palettes';
import { type ThemeContextTypeV1, ThemeProviderV1, useThemeV1 } from './core/themes/v1/themeContext';
import { type ThemeContextType, ThemeProvider, useTheme } from './core/themes/v2/themeContext';
import { BarModes } from './shared/atoms/Bar/types';
import BarV1 from './shared/atoms/Bar/v1';
import Bar from './shared/atoms/Bar/v2';
import Blur from './shared/atoms/Blur';
import ButtonV1 from './shared/atoms/Button/v1';
import { ButtonV1Modes, ButtonV1Shadows, ButtonV1Shapes } from './shared/atoms/Button/v1/props';
import Button from './shared/atoms/Button/v2';
import { type ButtonProps } from './shared/atoms/Button/v2/props';
import {
  ButtonShadows,
  ButtonShapes,
  ButtonSizes,
  CircleButtonModes,
  SquareButtonModes,
} from './shared/atoms/Button/v2/props';
import CheckBox from './shared/atoms/Checkbox';
import Separator from './shared/atoms/Separator';
import Shade from './shared/atoms/Shade';
import Text from './shared/atoms/Text';
import { TextElipsizeMode } from './shared/atoms/Text/props';
import TextInputV1 from './shared/atoms/TextInput/v1';
import { TextInputV1InputMode } from './shared/atoms/TextInput/v1/props';
import TextInput from './shared/atoms/TextInput/v2';
import { TextInputInputMode } from './shared/atoms/TextInput/v2/props';
import ApplePayIcon from './shared/icons/ApplePayIcon';
import ArrowIcon from './shared/icons/ArrowIcon';
import ArrowInPrimaryColorIcon from './shared/icons/ArrowInPrimaryColorIcon';
import BaggageIcon from './shared/icons/BaggageIcon';
import BigCameraIcon from './shared/icons/BigCameraIcon';
import BrandFavIcon from './shared/icons/BrandFavIcon';
import BrandTextIcon from './shared/icons/BrandTextIcon';
import CalendarIcon from './shared/icons/CalendarIcon';
import ChatIcon from './shared/icons/ChatIcon';
import CheckIcon2 from './shared/icons/CheckIcon2';
import ClockIcon from './shared/icons/ClockIcon';
import ClockIcon2 from './shared/icons/ClockIcon2';
import CloseIcon from './shared/icons/CloseIcon';
import CloseIconMini from './shared/icons/CloseIconMini';
import CreditCheckIcon from './shared/icons/CreditCheckIcon';
import CurrencyIcon from './shared/icons/CurrencyIcon';
import DislikeIcon from './shared/icons/DislikeIcon';
import DocumentIcon from './shared/icons/DocumentIcon';
import DropDownIcon from './shared/icons/DropDownArrowIcon';
import DropOffIcon from './shared/icons/DropOffIcon';
import EmergencyServiceIcon from './shared/icons/EmergencyServiceIcon';
import ExternalMapIcon from './shared/icons/ExternalMapIcon';
import FeedbackCleanIcon from './shared/icons/FeedbackCleanIcon';
import FeedbackDirtyIcon from './shared/icons/FeedbackDirtyIcon';
import FeedbackHeartBrokenIcon from './shared/icons/FeedbackHeartBrokenIcon';
import FeedbackHeartIcon from './shared/icons/FeedbackHeartIcon';
import FeedbackThumbDownIcon from './shared/icons/FeedbackThumbDownIcon';
import FeedbackThumbUpIcon from './shared/icons/FeedbackThumbUpIcon';
import FeedbackWheelIcon from './shared/icons/FeedbackWheelIcon';
import { countryFlags } from './shared/icons/Flags';
import GroupedBrandIcon from './shared/icons/GroupedBrandIcon';
import GroupedBrandIconMiniV1 from './shared/icons/GroupedBrandIconMini/V1';
import GroupedBrandIconMini from './shared/icons/GroupedBrandIconMini/V2';
import InputXIcon from './shared/icons/InputXIcon';
import Like2Icon from './shared/icons/Like2Icon';
import LikeIcon from './shared/icons/LikeIcon';
import LocationIcon from './shared/icons/LocationIcon';
import LockIcon from './shared/icons/LockIcon';
import MaestroIcon from './shared/icons/MaestroIcon';
import MapPinIcon from './shared/icons/MapPinIcon';
import MasterCardIcon from './shared/icons/MasterCardIcon';
import MenuIcon from './shared/icons/MenuIcon';
import MinusIcon from './shared/icons/MinusIcon';
import NotificationIcon from './shared/icons/NotificationIcon';
import PassengerIcon from './shared/icons/PassengerIcon';
import PassengerIcon2 from './shared/icons/PassengerIcon2';
import PayPalIcon from './shared/icons/PayPalIcon';
import PhoneIcon from './shared/icons/PhoneIcon';
import PickUpIcon from './shared/icons/PickUpIcon';
import PlusIcon from './shared/icons/PlusIcon';
import PreferencesIcon from './shared/icons/PreferencesIcon';
import ProfileIconMini from './shared/icons/ProfileIconMini';
import ReportIcon from './shared/icons/ReportIcon';
import RoundCheckIcon1 from './shared/icons/RoundCheckIcon1';
import RoundCheckIcon2 from './shared/icons/RoundCheckIcon2';
import ShortArrowIcon from './shared/icons/ShortArrowIcon';
import ShortArrowSmallIcon from './shared/icons/ShortArrowSmallIcon';
import SpinnerIcon from './shared/icons/SpinnerIcon';
import StarIcon from './shared/icons/StarIcon';
import StatisticsIcon from './shared/icons/StatitsticsIcon';
import SteeringWheelIcon from './shared/icons/SteeringWheelIcon';
import SuccessIcon from './shared/icons/SuccessIcon';
import TimeIcon from './shared/icons/TimeIcon';
import UnknownCardIcon from './shared/icons/UnknownCardIcon';
import VisaIcon from './shared/icons/VisaIcon';
import WarningIcon from './shared/icons/WarningIcon';
import BasicXImage from './shared/images/BasicXImage';
import BasicXLImage from './shared/images/BasicXLImage';
import ComfortXImage from './shared/images/ComfortXImage';
import LocationArrowImage from './shared/images/LocationArrowImage';
import LocationArrowImage2 from './shared/images/LocationArrowImage2';
import MenuUserImage from './shared/images/MenuUserImage';
import MenuUserImage2 from './shared/images/MenuUserImage2';
import PremiumXImage from './shared/images/PremiumXImage';
import PremiumXLImage from './shared/images/PremiumXLImage';
import TariffsCarImage, { type TariffType } from './shared/images/TariffsCarImage';
import TeslaXImage from './shared/images/TeslaXImage';
import { type AlertDescendantProps } from './shared/molecules/alerts/Alert/props';
import DriverArrivedAlert from './shared/molecules/alerts/DriverArrivedAlert';
import FreeTimeAlert from './shared/molecules/alerts/FreeTimeAlert';
import { type FreeTimeAlertProps } from './shared/molecules/alerts/FreeTimeAlert/props';
import InternetDisconnectedAlert from './shared/molecules/alerts/InternetDisconnectedAlert';
import PaidTimeAlert from './shared/molecules/alerts/PaidTimeAlert';
import { type PaidTimeAlertProps } from './shared/molecules/alerts/PaidTimeAlert/props';
import PlannedTripAlert from './shared/molecules/alerts/PlannedTripAlert';
import { type PlannedTripAlertProps } from './shared/molecules/alerts/PlannedTripAlert/props';
import RideHasFinishedAlert from './shared/molecules/alerts/RideHasFinishedAlert';
import { type RideHasFinishedAlertProps } from './shared/molecules/alerts/RideHasFinishedAlert/props';
import SecondRideAlert from './shared/molecules/alerts/SecondRideAlert';
import BottomWindow from './shared/molecules/BottomWindow';
import BottomWindowWithGesture from './shared/molecules/BottomWindowWithGesture';
import {
  type BottomWindowWithGestureProps,
  type BottomWindowWithGestureRef,
} from './shared/molecules/BottomWindowWithGesture/props';
import CodeInputV1 from './shared/molecules/CodeInput/v1';
import CodeInput from './shared/molecules/CodeInput/v2';
import DatePicker from './shared/molecules/DatePicker';
import FlatListWithCustomScroll from './shared/molecules/FlatListWithCustomScroll';
import Fog from './shared/molecules/Fog';
import GroupedButtons from './shared/molecules/GroupedButtons';
import CustomKeyboardAvoidingView from './shared/molecules/KeyboardAvoidingView';
import LocationUnavailable from './shared/molecules/LocationUnavailable';
import { type LocationUnavailableProps } from './shared/molecules/LocationUnavailable/props';
import { type MenuNavigation } from './shared/molecules/MenuBase/props';
import MenuBaseV1 from './shared/molecules/MenuBase/v1';
import MenuBase from './shared/molecules/MenuBase/v2';
import PhoneInput from './shared/molecules/PhoneInput';
import Popup from './shared/molecules/Popup';
import SafeAreaView from './shared/molecules/SafeAreaView';
import ScrollViewWithCustomScroll from './shared/molecules/ScrollViewWithCustomScroll';
import { SwipeButtonModes } from './shared/molecules/SwipeButton/props';
import SwipeButtonV1 from './shared/molecules/SwipeButton/v1';
import SwipeButton from './shared/molecules/SwipeButton/v2';
import TimePicker from './shared/molecules/TimePicker';
import CountingComponentV1 from './shared/molecules/timerAndStopwatch/CountingComponent/V1';
import StopWatch from './shared/molecules/timerAndStopwatch/StopWatch';
import TimerV1 from './shared/molecules/timerAndStopwatch/Timer/V1';
import { TimerV1Modes } from './shared/molecules/timerAndStopwatch/Timer/V1/props';
import Timer from './shared/molecules/timerAndStopwatch/Timer/V2';
import { TimerColorModes, TimerSizesModes } from './shared/molecules/timerAndStopwatch/Timer/V2/props';
import { type Card } from './shared/screens/AddCardScreen/props';
import AddCardScreenV1 from './shared/screens/AddCardScreen/v1';
import AddCardScreen from './shared/screens/AddCardScreen/v2';
import FeedbackScreen from './shared/screens/FeedbackScreen';
import { type FeedbackRating, type FeedbackType } from './shared/screens/FeedbackScreen/props';
import LockOutScreen from './shared/screens/LockOutScreen';
import { type Notification, NotificationType } from './shared/screens/NotificationsScreen/props';
import NotificationsScreenV1 from './shared/screens/NotificationsScreen/v1';
import NotificationsScreen from './shared/screens/NotificationsScreen/v2';
import { minToMilSec } from './utils';
import { calculateExtendedHeading, useCompass } from './utils/compass';
import { useDebounce } from './utils/debounce';
import {
  degToRad,
  getAngleBetweenPoints,
  getDistanceBetweenPoints,
  radToDeg,
  useGeolocationStartWatch,
} from './utils/geolocation';
import { IntegrationModule } from './utils/integrationModule';
import { useNetworkConnectionStartWatch } from './utils/network';
import { getNotificationToken } from './utils/notifications/getNotificationToken';
import { getPaymentIcon } from './utils/payment/cardIcons';
import { type PaymentMethod } from './utils/payment/types';
import {
  checkCameraUsagePermission,
  checkGalleryUsagePermission,
  checkGeolocationPermissionAndAccuracy,
  requestCameraUsagePermission,
  requestGalleryUsagePermission,
  requestGeolocationPermission,
} from './utils/permissions';

export {
  AddCardScreen,
  AddCardScreenV1,
  type AlertDescendantProps,
  AnimatedMarker,
  ApplePayIcon,
  ArrowIcon,
  ArrowInPrimaryColorIcon,
  BaggageIcon,
  Bar,
  BarModes,
  BarV1,
  BasicXImage,
  BasicXLImage,
  BigCameraIcon,
  Blur,
  BottomWindow,
  BottomWindowWithGesture,
  type BottomWindowWithGestureProps,
  type BottomWindowWithGestureRef,
  BrandFavIcon,
  BrandTextIcon,
  Button,
  type ButtonProps,
  ButtonShadows,
  ButtonShapes,
  ButtonSizes,
  ButtonV1,
  ButtonV1Modes,
  ButtonV1Shadows,
  ButtonV1Shapes,
  calculateExtendedHeading,
  CalendarIcon,
  type Card,
  ChatIcon,
  CheckBox,
  checkCameraUsagePermission,
  checkGalleryUsagePermission,
  checkGeolocationPermissionAndAccuracy,
  CheckIcon2,
  CircleButtonModes,
  ClockIcon,
  ClockIcon2,
  CloseIcon,
  CloseIconMini,
  CodeInput,
  CodeInputV1,
  ComfortXImage,
  CountingComponentV1,
  countryDtos,
  type countryDtosProps,
  countryFlags,
  createAxiosInstance,
  CreditCheckIcon,
  CurrencyIcon,
  CustomKeyboardAvoidingView,
  DatePicker,
  defaultAxiosRetryConfig,
  degToRad,
  DislikeIcon,
  DocumentIcon,
  DriverArrivedAlert,
  DropDownIcon,
  DropOffIcon,
  emailRegex,
  EmergencyServiceIcon,
  ExternalMapIcon,
  FeedbackCleanIcon,
  FeedbackDirtyIcon,
  FeedbackHeartBrokenIcon,
  FeedbackHeartIcon,
  type FeedbackRating,
  FeedbackScreen,
  FeedbackThumbDownIcon,
  FeedbackThumbUpIcon,
  type FeedbackType,
  FeedbackWheelIcon,
  FlatListWithCustomScroll,
  Fog,
  FreeTimeAlert,
  type FreeTimeAlertProps,
  getAngleBetweenPoints,
  getAxiosErrorInfo,
  getDistanceBetweenPoints,
  getNotificationToken,
  getPaymentIcon,
  GroupedBrandIcon,
  GroupedBrandIconMini,
  GroupedBrandIconMiniV1,
  GroupedButtons,
  i18nIntegration,
  InputXIcon,
  IntegrationModule,
  InternetDisconnectedAlert,
  lightMapStyle,
  Like2Icon,
  LikeIcon,
  LocationArrowImage,
  LocationArrowImage2,
  LocationIcon,
  LocationUnavailable,
  type LocationUnavailableProps,
  LockIcon,
  LockOutScreen,
  MaestroIcon,
  type MapCameraMode,
  MapCameraModeButton,
  MapPinIcon,
  MapView,
  type MapViewProps,
  MasterCardIcon,
  MenuBase,
  MenuBaseV1,
  MenuIcon,
  type MenuNavigation,
  MenuUserImage,
  MenuUserImage2,
  minToMilSec,
  MinusIcon,
  nameof,
  type Notification,
  NotificationIcon,
  NotificationsScreen,
  NotificationsScreenV1,
  NotificationType,
  PaidTimeAlert,
  type PaidTimeAlertProps,
  palettes,
  PassengerIcon,
  PassengerIcon2,
  type PaymentMethod,
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
  ProfileIconMini,
  radToDeg,
  ReportIcon,
  requestCameraUsagePermission,
  requestGalleryUsagePermission,
  requestGeolocationPermission,
  RideHasFinishedAlert,
  type RideHasFinishedAlertProps,
  RoundCheckIcon1,
  RoundCheckIcon2,
  SafeAreaView,
  ScrollViewWithCustomScroll,
  SecondRideAlert,
  Separator,
  Shade,
  ShortArrowIcon,
  ShortArrowSmallIcon,
  SignalR,
  sizes,
  SpinnerIcon,
  SquareButtonModes,
  StarIcon,
  StatisticsIcon,
  SteeringWheelIcon,
  StopWatch,
  SuccessIcon,
  SwipeButton,
  SwipeButtonModes,
  SwipeButtonV1,
  TariffsCarImage,
  type TariffType,
  TeslaXImage,
  Text,
  TextElipsizeMode,
  TextInput,
  TextInputInputMode,
  TextInputV1,
  TextInputV1InputMode,
  type ThemeContextType,
  type ThemeContextTypeV1,
  ThemeProvider,
  ThemeProviderV1,
  TimeIcon,
  TimePicker,
  Timer,
  TimerColorModes,
  TimerSizesModes,
  TimerV1,
  TimerV1Modes,
  UnknownCardIcon,
  useCompass,
  useDebounce,
  useGeolocationStartWatch,
  useNetworkConnectionStartWatch,
  useTheme,
  useThemeV1,
  VisaIcon,
  WarningIcon,
};
