import { useCallback, useRef } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, Linking, StyleSheet, View } from 'react-native';
import { type LatLng } from 'react-native-maps';

import i18nIntegration from '../../../core/locales/i18n';
import MapView from '../../../core/map/MapView';
import { type MapViewRef } from '../../../core/map/types';
import { decodeGooglePolyline } from '../../../core/map/utils';
import { useTheme } from '../../../core/themes/themeContext';
import { formatTime, minToMilSec, mtrToKm } from '../../../utils';
import { getDistanceBetweenPoints } from '../../../utils/geolocation';
import { getPaymentIcon } from '../../../utils/payment/cardIcons';
import Bar from '../../atoms/Bar/v2';
import Button from '../../atoms/Button';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/types';
import Text from '../../atoms/Text';
import CloseIcon from '../../icons/CloseIcon';
import CoinIcon from '../../icons/CoinIcon';
import PointIcon2 from '../../icons/PointIcon2';
import SupportIcon from '../../icons/SupportIcon';
import Fog from '../../molecules/Fog';
import LoadingSpinner from '../../molecules/LoadingSpinner';
import { LoadingSpinnerIconModes } from '../../molecules/LoadingSpinner/types';
import SafeAreaView from '../../molecules/SafeAreaView';
import { type ReceiptScreenProps } from './types';

const windowHeight = Dimensions.get('window').height;

const ReceiptScreenWithoutI18n = ({
  totalDistanceMtr,
  pickUpAddress,
  dropOffAddress,
  isTripCanceled,
  tripPrice,
  startPoint,
  endPoint,
  geometries,
  onClose,
  contractorName,
  carNumber,
  pickUpDate,
  finishedDate,
  ticket,
}: ReceiptScreenProps) => {
  const mapRef = useRef<MapViewRef>(null);

  const { t } = useTranslation();
  const { colors } = useTheme();

  const distance = mtrToKm(totalDistanceMtr);
  const isKilometres = totalDistanceMtr > 1000;

  const computedStyles = StyleSheet.create({
    textSecondaryColor: {
      color: colors.textSecondaryColor,
    },
    textTitleColor: {
      color: colors.textTitleColor,
    },
    timeContainer: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
    separatorCircle: {
      backgroundColor: colors.iconSecondaryColor,
    },
    separatorDistanceText: {
      color: colors.textSecondaryColor,
    },
    ticketLotteryContainer: {
      backgroundColor: colors.lottery.backgroundColor,
    },
    ticketLotteryText: {
      color: colors.textTertiaryColor,
    },
    ticketLotteryTitleText: {
      color: colors.lottery.textColorWithOpacity,
    },
    cancelledTripTitleContainer: {
      backgroundColor: colors.errorColor,
    },
    cancelledTripTitleText: {
      color: colors.textTertiaryColor,
    },
    contractorInfoWrapper: {
      marginBottom: isTripCanceled ? 26 : 10,
    },
  });

  const tripTimeDuration = () => {
    const [pickUpTime, finishedTime] = [new Date(pickUpDate ?? new Date()), new Date(finishedDate ?? new Date())].map(
      date => {
        date.setSeconds(0, 0);
        return date.getTime();
      },
    ) as [number, number];

    const duration = finishedTime - pickUpTime;

    const totalMinutes = Math.floor(duration / minToMilSec(1));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (duration < minToMilSec(1)) {
      return `>${t('ReceiptScreen_minutes', { count: 1 })}`;
    }

    if (hours && minutes) {
      return `${t('ReceiptScreen_hours', { count: hours })} ${t('ReceiptScreen_minutes', { count: minutes })}`;
    } else if (hours) {
      return t('ReceiptScreen_hours', { count: hours });
    } else {
      return t('ReceiptScreen_minutes', { count: minutes });
    }
  };

  const roadTimeData = [
    {
      title: t('ReceiptScreen_start'),
      value: formatTime(new Date(pickUpDate ?? 0)),
    },
    {
      title: t('ReceiptScreen_finish'),
      value: formatTime(new Date(finishedDate ?? 0)),
    },
    {
      title: t('ReceiptScreen_time'),
      value: tripTimeDuration(),
    },
  ];

  //TODO: return when we need to shareButton
  // const shareFile = async () => {
  //   const options = {
  //     title: 'Share File',
  //     url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf ',
  //     message: 'Check out this file!',
  //   };
  //
  //   try {
  //     await Share.open(options);
  //   } catch (error) {
  //     console.log('Error while sharing the file:', error);
  //   }
  // };

  const header = (
    <View style={styles.topButtonsContainer}>
      <Button onPress={onClose} shape={ButtonShapes.Circle} mode={CircleButtonModes.Mode2}>
        <CloseIcon />
      </Button>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerAndPaymentText}>{t('ReceiptScreen_check')}</Text>
      </View>
    </View>
  );

  const roadSeparator = (
    <View style={styles.roadSeparatorContainer}>
      <View style={styles.separatorCircleContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={`left_circle_${index}`} style={[styles.separatorCircle, computedStyles.separatorCircle]} />
        ))}
      </View>
      <View style={[styles.timeContainer, computedStyles.timeContainer]}>
        <Text style={styles.separatorDistanceText}>{distance}</Text>
        <Text style={[styles.separatorDistanceText, computedStyles.separatorDistanceText]}>
          {isKilometres ? t('ReceiptScreen_kilometers') : t('ReceiptScreen_meters')}
        </Text>
      </View>
      <View style={styles.separatorCircleContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={`right_circle_${index}`} style={[styles.separatorCircle, computedStyles.separatorCircle]} />
        ))}
      </View>
    </View>
  );

  const roadTimeBlock = (
    <View style={styles.roadTimeWrapper}>
      {pickUpDate && finishedDate ? (
        roadTimeData.map(time => (
          <View key={time.title} style={styles.roadTimeContainer}>
            <Text style={[styles.roadTimeTitleText, computedStyles.textTitleColor]}>{time.title}</Text>
            <Text style={styles.roadTimeValueText}>{time.value}</Text>
          </View>
        ))
      ) : (
        <LoadingSpinner iconMode={LoadingSpinnerIconModes.Mini} style={styles.roadTimeBlockLoader} />
      )}
    </View>
  );

  const paymentBarBlock = (
    <Bar style={[styles.paymentBarContainer]}>
      {getPaymentIcon('cash', { color: colors.textSecondaryColor, style: styles.barIcon })}
      <View>
        <Text style={[styles.paymentTitleText, computedStyles.textSecondaryColor]}>
          {t('ReceiptScreen_paymentTitle')}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.headerAndPaymentText}>{t('ReceiptScreen_cash')}</Text>
          <Text style={[styles.headerAndPaymentText, computedStyles.textSecondaryColor]}>{tripPrice}</Text>
        </View>
      </View>
    </Bar>
  );

  const contractorInfoBlock = contractorName && carNumber && (
    <View style={[styles.contractorInfoWrapper, computedStyles.contractorInfoWrapper]}>
      <Button
        onPress={() => Linking.openURL('https://t.me/ShuttleX_Support')}
        size={ButtonSizes.S}
        shape={ButtonShapes.Circle}
      >
        <SupportIcon />
      </Button>
      <Bar style={styles.contractorInfoContainer}>
        <Text numberOfLines={1} style={styles.roadTimeValueText}>
          {contractorName}
        </Text>
        <Text style={styles.roadTimeValueText}>{carNumber}</Text>
      </Bar>
    </View>
  );

  const onMapLayout = useCallback(() => {
    if (mapRef.current) {
      const delta = getDistanceBetweenPoints(startPoint, endPoint) / 35000;

      mapRef.current.animateToRegion(
        {
          latitude: (startPoint.latitude + endPoint.latitude) / 2,
          longitude: (startPoint.longitude + endPoint.longitude) / 2,
          latitudeDelta: delta,
          longitudeDelta: delta,
        },
        0,
      );
    }
  }, [startPoint, endPoint]);

  const coordinates: LatLng[] = [];
  geometries.forEach(geometry => coordinates.push(...decodeGooglePolyline(geometry)));

  return (
    <>
      <MapView
        ref={mapRef}
        onLayout={onMapLayout}
        style={StyleSheet.absoluteFill}
        markers={[
          { type: 'simple', colorMode: 'mode1', coordinates: startPoint },
          { type: 'simple', colorMode: 'mode2', coordinates: endPoint },
        ]}
        polylines={[{ type: 'straight', options: { coordinates } }]}
      />
      <Fog widthInPercents={`${windowHeight / 9.5}%`} />
      <SafeAreaView wrapperStyle={styles.safeAreaWrapper} containerStyle={styles.container} withTransparentBackground>
        <View>
          {header}
          <View style={styles.roadPointContainer}>
            <View style={styles.pointContainer}>
              <PointIcon2 outerColor={colors.iconPrimaryColor} innerColor={colors.primaryColor} />
              <Text numberOfLines={1} style={styles.pointText}>
                {t('ReceiptScreen_pickUpTitle')}
              </Text>
            </View>
            <View style={styles.pointContainer}>
              <Text numberOfLines={1} style={styles.pointText}>
                {t('ReceiptScreen_dropOffTitle')}
              </Text>
              <PointIcon2 outerColor={colors.iconTertiaryColor} innerColor={colors.errorColor} />
            </View>
          </View>
          {roadSeparator}
          <View style={styles.addressContainer}>
            <View style={styles.placeContainer}>
              <Text numberOfLines={2} style={[styles.addressDetailsText, computedStyles.textTitleColor]}>
                {pickUpAddress}
              </Text>
            </View>
            <View style={styles.placeContainer}>
              <Text
                numberOfLines={2}
                style={[styles.addressDetailsText, computedStyles.textTitleColor, styles.placeTextRight]}
              >
                {dropOffAddress}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {isTripCanceled ? (
            <>
              {contractorInfoBlock}
              <View style={styles.cancelledTripContainer}>
                <View style={[styles.cancelledTripTitleContainer, computedStyles.cancelledTripTitleContainer]}>
                  <Text style={[styles.cancelledTripTitleText, computedStyles.cancelledTripTitleText]}>
                    {t('ReceiptScreen_cancelledTrip')}
                  </Text>
                </View>
                {paymentBarBlock}
              </View>
            </>
          ) : (
            <>
              {contractorInfoBlock}
              {roadTimeBlock}
              <View style={styles.bottomBarsContainer}>
                {paymentBarBlock}
                {ticket && (
                  <Bar style={[styles.paymentBarContainer, computedStyles.ticketLotteryContainer]}>
                    <CoinIcon style={styles.barIcon} />
                    <View>
                      <Text style={[styles.paymentTitleText, computedStyles.ticketLotteryTitleText]}>{ticket}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={[styles.headerAndPaymentText, computedStyles.ticketLotteryText]}>
                          {t(
                            contractorName && carNumber
                              ? 'ReceiptScreen_ticketToLottery'
                              : 'ReceiptScreen_newTicketToLottery',
                          )}
                        </Text>
                      </View>
                    </View>
                  </Bar>
                )}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const ReceiptScreen = (props: ReceiptScreenProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ReceiptScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  safeAreaWrapper: {
    zIndex: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  pointContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  roadPointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separatorCircleContainer: {
    gap: 6,
    flexDirection: 'row',
  },
  separatorCircle: {
    width: 4,
    height: 4,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  roadSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 14,
    marginHorizontal: 6,
    minWidth: 64,
    justifyContent: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  placeContainer: {
    flex: 1,
    gap: 4,
    marginTop: 2,
  },
  placeTextRight: {
    textAlign: 'right',
  },
  roadTimeWrapper: {
    flexDirection: 'row',
    gap: 18,
  },
  roadTimeContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  paymentBarContainer: {
    padding: 16,
    borderWidth: 0,
    flexGrow: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentTitleText: {
    marginTop: 44,
    marginBottom: 2,
    fontFamily: 'Inter Medium',
    fontSize: 14,
    lineHeight: 22,
  },
  headerAndPaymentText: {
    fontFamily: 'Inter Medium',
    fontSize: 17,
    lineHeight: 22,
  },
  separatorDistanceText: {
    fontFamily: 'Inter Medium',
    fontSize: 12,
    lineHeight: 22,
  },
  pointText: {
    fontFamily: 'Inter Medium',
    fontSize: 32,
    lineHeight: 32,
  },
  addressDetailsText: {
    fontSize: 14,
    lineHeight: 18,
  },
  roadTimeTitleText: {
    fontSize: 14,
    lineHeight: 16,
  },
  roadTimeValueText: {
    fontFamily: 'Inter Medium',
    fontSize: 18,
  },
  bottomBarsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  barIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  cancelledTripContainer: {
    width: '50%',
    minWidth: 180,
    alignSelf: 'center',
  },
  cancelledTripTitleContainer: {
    borderRadius: 12,
    padding: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelledTripTitleText: {
    fontFamily: 'Inter Medium',
    fontSize: 17,
    lineHeight: 22,
  },
  roadTimeBlockLoader: {
    marginBottom: 16,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 44,
  },
  contractorInfoWrapper: {
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contractorInfoContainer: {
    flexShrink: 1,
    maxWidth: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'visible',
    padding: 8,
    gap: 6,
  },
});

export default ReceiptScreen;
