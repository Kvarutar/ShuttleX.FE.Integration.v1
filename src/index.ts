import { emailRegex } from './core/consts/regex.consts';
import { countryDtos } from './core/countries/countryDtos';
import { type countryDtosProps } from './core/countries/props';
import i18nIntegration from './core/locales/i18n';
import { AnimatedMarker } from './core/map/hooks';
import lightMapStyle from './core/map/lightMapStyle.json';
import MapCameraModeButton from './core/map/MapCameraModeButton';
import MapView from './core/map/MapView';
import { type MapCameraMode } from './core/map/types';
import { nameof } from './core/monkey-patch/ts.helper';
import { SignalR } from './core/signalR/middleware';
import palettes from './core/themes/palettes';
import sizes from './core/themes/sizes';
import { type ThemeContextType, ThemeProvider, useTheme } from './core/themes/themeContext';
import Bar from './shared/atoms/Bar';
import { BarModes } from './shared/atoms/Bar/types';
import Blur from './shared/atoms/Blur';
import Button from './shared/atoms/Button';
import { ButtonModes, ButtonShadows } from './shared/atoms/Button/props';
import CheckBox from './shared/atoms/Checkbox';
import RoundButton from './shared/atoms/RoundButton';
import Separator from './shared/atoms/Separator';
import Text from './shared/atoms/Text';
import TextInput from './shared/atoms/TextInput';
import { TextInputInputMode } from './shared/atoms/TextInput/props';
import ApplePayIcon from './shared/icons/ApplePayIcon';
import ArrowIcon from './shared/icons/ArrowIcon';
import ArrowInPrimaryColorIcon from './shared/icons/ArrowInPrimaryColorIcon';
import BaggageIcon from './shared/icons/BaggageIcon';
import BigCameraIcon from './shared/icons/BigCameraIcon';
import BlueCheck1 from './shared/icons/BlueCheck1';
import BlueCheck2 from './shared/icons/BlueCheck2';
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
import GroupedBrandIconMini from './shared/icons/GroupedBrandIconMini';
import InputXIcon from './shared/icons/InputXIcon';
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
import ReportIcon from './shared/icons/ReportIcon';
import ShortArrowIcon from './shared/icons/ShortArrowIcon';
import ShortArrowSmallIcon from './shared/icons/ShortArrowSmallIcon';
import SpinnerIcon from './shared/icons/SpinnerIcon';
import StarIcon from './shared/icons/StarIcon';
import StatisticsIcon from './shared/icons/StatitsticsIcon';
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
import { type AlertDescendantProps, AlertRunsOn } from './shared/molecules/alerts/Alert/props';
import DriverArrivedAlert from './shared/molecules/alerts/DriverArrivedAlert';
import FreeTimeAlert from './shared/molecules/alerts/FreeTimeAlert';
import { type FreeTimeAlertProps, FreeTimeAlertType } from './shared/molecules/alerts/FreeTimeAlert/props';
import InternetDisconnectedAlert from './shared/molecules/alerts/InternetDisconnectedAlert';
import PaidTimeAlert from './shared/molecules/alerts/PaidTimeAlert';
import { type PaidTimeAlertProps } from './shared/molecules/alerts/PaidTimeAlert/props';
import PlannedTripAlert from './shared/molecules/alerts/PlannedTripAlert';
import { type PlannedTripAlertProps } from './shared/molecules/alerts/PlannedTripAlert/props';
import BottomWindow from './shared/molecules/BottomWindow';
import BottomWindowWithGesture from './shared/molecules/BottomWindowWithGesture';
import CodeInput from './shared/molecules/CodeInput';
import DatePicker from './shared/molecules/DatePicker';
import FlatListWithCustomScroll from './shared/molecules/FlatListWithCustomScroll';
import GroupedButtons from './shared/molecules/GroupedButtons';
import CustomKeyboardAvoidingView from './shared/molecules/KeyboardAvoidingView';
import LocationUnavailable from './shared/molecules/LocationUnavailable';
import { type LocationUnavailableProps } from './shared/molecules/LocationUnavailable/props';
import MenuBase from './shared/molecules/MenuBase';
import { type MenuNavigation } from './shared/molecules/MenuBase/props';
import PhoneInput from './shared/molecules/PhoneInput';
import Popup from './shared/molecules/Popup';
import SafeAreaView from './shared/molecules/SafeAreaView';
import ScrollViewWithCustomScroll from './shared/molecules/ScrollViewWithCustomScroll';
import SwipeButton from './shared/molecules/SwipeButton';
import { SwipeButtonModes } from './shared/molecules/SwipeButton/props';
import TimePicker from './shared/molecules/TimePicker';
import StopWatch from './shared/molecules/timerAndStopwatch/StopWatch';
import Timer from './shared/molecules/timerAndStopwatch/Timer';
import { TimerModes } from './shared/molecules/timerAndStopwatch/Timer/props';
import AddCardScreen from './shared/screens/AddCardScreen';
import { type Card } from './shared/screens/AddCardScreen/props';
import FeedbackScreen from './shared/screens/FeedbackScreen';
import { type FeedbackRating, type FeedbackType } from './shared/screens/FeedbackScreen/props';
import NotificationsScreen from './shared/screens/NotificationsScreen';
import { type Notification, NotificationType } from './shared/screens/NotificationsScreen/props';
import { degToRad, radToDeg } from './utils';
import { calculateExtendedHeading, useCompass } from './utils/compass';
import { useDebounce } from './utils/debounce';
import { getAngleBetweenPoints, getDistanceBetweenPoints, useGeolocationStartWatch } from './utils/geolocation';
import { IntegrationModule } from './utils/integrationModule';
import { useNetworkConnectionStartWatch } from './utils/network';
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
  type AlertDescendantProps,
  AlertRunsOn,
  AnimatedMarker,
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
  calculateExtendedHeading,
  CalendarIcon,
  type Card,
  ChatIcon,
  CheckBox,
  checkCameraUsagePermission,
  checkGalleryUsagePermission,
  checkGeolocationPermissionAndAccuracy,
  CheckIcon2,
  ClockIcon,
  ClockIcon2,
  CloseIcon,
  CloseIconMini,
  CodeInput,
  ComfortXImage,
  countryDtos,
  type countryDtosProps,
  countryFlags,
  CreditCheckIcon,
  CurrencyIcon,
  CustomKeyboardAvoidingView,
  DatePicker,
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
  FreeTimeAlert,
  type FreeTimeAlertProps,
  FreeTimeAlertType,
  getAngleBetweenPoints,
  getDistanceBetweenPoints,
  getPaymentIcon,
  GroupedBrandIcon,
  GroupedBrandIconMini,
  GroupedButtons,
  i18nIntegration,
  InputXIcon,
  IntegrationModule,
  InternetDisconnectedAlert,
  lightMapStyle,
  LikeIcon,
  LocationArrowImage,
  LocationArrowImage2,
  LocationIcon,
  LocationUnavailable,
  type LocationUnavailableProps,
  LockIcon,
  MaestroIcon,
  type MapCameraMode,
  MapCameraModeButton,
  MapPinIcon,
  MapView,
  MasterCardIcon,
  MenuBase,
  MenuIcon,
  type MenuNavigation,
  MenuUserImage,
  MenuUserImage2,
  MinusIcon,
  nameof,
  type Notification,
  NotificationIcon,
  NotificationsScreen,
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
  radToDeg,
  ReportIcon,
  requestCameraUsagePermission,
  requestGalleryUsagePermission,
  requestGeolocationPermission,
  RoundButton,
  SafeAreaView,
  ScrollViewWithCustomScroll,
  Separator,
  ShortArrowIcon,
  ShortArrowSmallIcon,
  SignalR,
  sizes,
  SpinnerIcon,
  StarIcon,
  StatisticsIcon,
  StopWatch,
  SuccessIcon,
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
  UnknownCardIcon,
  useCompass,
  useDebounce,
  useGeolocationStartWatch,
  useNetworkConnectionStartWatch,
  useTheme,
  VisaIcon,
  WarningIcon,
};
