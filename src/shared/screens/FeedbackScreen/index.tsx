import { type ReactNode, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import i18nIntegration from '../../../core/locales/i18n';
import sizes from '../../../core/themes/sizes';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import { BarModes } from '../../atoms/Bar/types';
import BarV1 from '../../atoms/Bar/v1';
import { ButtonV1 } from '../../atoms/Button/index';
import { ButtonV1Modes, ButtonV1Shapes } from '../../atoms/Button/V1/props';
import Text from '../../atoms/Text';
import ArrowInPrimaryColorIcon from '../../icons/ArrowInPrimaryColorIcon';
import CloseIcon from '../../icons/CloseIcon';
import DislikeIcon from '../../icons/DislikeIcon';
import FeedbackCleanIcon from '../../icons/FeedbackCleanIcon';
import FeedbackDirtyIcon from '../../icons/FeedbackDirtyIcon';
import FeedbackHeartBrokenIcon from '../../icons/FeedbackHeartBrokenIcon';
import FeedbackHeartIcon from '../../icons/FeedbackHeartIcon';
import FeedbackThumbDownIcon from '../../icons/FeedbackThumbDownIcon';
import FeedbackThumbUpIcon from '../../icons/FeedbackThumbUpIcon';
import FeedbackWheelIcon from '../../icons/FeedbackWheelIcon';
import LikeIcon from '../../icons/LikeIcon';
import MenuUserImage2 from '../../images/MenuUserImage2';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import FeedbackScreenDescriptionItem from './FeedbackScreenDescriptionItem';
import { type FeedbackRating, type FeedbackScreenProps, type FeedbackType, type Option, Options } from './props';
import TipsPopup from './TipsPopup';

const fadeAnimationDuration = 200;

type FeedbackAdditionalContent = {
  feedbackDescriptions: ReactNode;
  feedbackTitle: string;
  tips: ReactNode;
};

const getFeedbackOptions = (
  t: ReturnType<typeof useTranslation>['t'],
  likeFeedbackWheelIcon?: {
    color?: string;
    backgroundColor?: string;
  },
): Record<FeedbackRating, Option[]> => ({
  like: [
    {
      title: t('Feedback_likeOption1'),
      apiBody: Options.NiceAtmosphere,
      image: <FeedbackThumbUpIcon />,
    },
    {
      title: t('Feedback_likeOption2'),
      apiBody: Options.FriendlyDriver,
      image: <FeedbackHeartIcon />,
    },
    {
      title: t('Feedback_likeOption3'),
      apiBody: Options.GoodDriving,
      image: (
        <FeedbackWheelIcon
          color={likeFeedbackWheelIcon?.color}
          backgroundColor={likeFeedbackWheelIcon?.backgroundColor}
        />
      ),
    },
    {
      title: t('Feedback_likeOption4'),
      apiBody: Options.CleanCar,
      image: <FeedbackCleanIcon />,
    },
  ],
  dislike: [
    {
      title: t('Feedback_dislikeOption1'),
      apiBody: Options.BadAtmosphere,
      image: <FeedbackThumbDownIcon />,
    },
    {
      title: t('Feedback_dislikeOption2'),
      apiBody: Options.RudeDriver,
      image: <FeedbackHeartBrokenIcon />,
    },
    {
      title: t('Feedback_dislikeOption3'),
      apiBody: Options.BadDriving,
      image: <FeedbackWheelIcon />,
    },
    {
      title: t('Feedback_dislikeOption4'),
      apiBody: Options.DirtyCar,
      image: <FeedbackDirtyIcon />,
    },
  ],
});

const FeedbackScreenWithoutI18n = ({
  onBackButtonPress,
  title,
  userImageUrl,
  isFeedbackForContractor = false,
  onSendFeedback,
  tipsVariants,
  style,
}: FeedbackScreenProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors, themeMode } = useThemeV1();

  const [feedback, setFeedback] = useState<FeedbackType>({ rating: null, description: [] });
  const [isTipsPopupVisible, setIsTipsPopupVisible] = useState<boolean>(false);

  let dislikeButtonMode = BarModes.Default;
  let likeButtonMode = BarModes.Default;
  if (feedback.rating && feedback.rating === 'dislike') {
    dislikeButtonMode = BarModes.Active;
  } else if (feedback.rating && feedback.rating === 'like') {
    likeButtonMode = BarModes.Active;
  }

  const onSelectRating = (rating: FeedbackRating) => {
    setFeedback(state => {
      if (state.rating === rating) {
        return {
          rating: null,
          description: [],
        };
      }
      return {
        rating: rating,
        description: [],
      };
    });
  };

  const onOptionSelect = (option: Option) => {
    setFeedback(state => {
      let newDescriptions;
      if (state.description.includes(option.apiBody)) {
        newDescriptions = state.description.filter(el => el !== option.apiBody);
      } else {
        newDescriptions = [...state.description];
        newDescriptions.push(option.apiBody);
      }

      return {
        ...state,
        description: newDescriptions,
      };
    });
  };

  let feedbackAdditionalContent: Record<FeedbackRating, FeedbackAdditionalContent> | null = null;

  if (isFeedbackForContractor) {
    feedbackAdditionalContent = {
      like: {
        feedbackDescriptions: (
          <Animated.View entering={FadeIn} style={styles.descriptionsWrapper} key={'like'}>
            {getFeedbackOptions(t, {
              color: themeMode !== 'light' ? colors.iconTertiaryColor : undefined,
              backgroundColor: colors.primaryColor,
            }).like.map((option, index) => (
              <FeedbackScreenDescriptionItem
                key={index}
                option={option}
                onOptionSelect={() => onOptionSelect(option)}
              />
            ))}
          </Animated.View>
        ),
        feedbackTitle: t('Feedback_likeTitle'),
        tips: tipsVariants && (
          <Pressable onPress={() => setIsTipsPopupVisible(true)}>
            <BarV1 style={styles.tips}>
              <Text style={styles.tipsTitle}>{t('Feedback_tipsTitle')}</Text>
              <ArrowInPrimaryColorIcon />
            </BarV1>
          </Pressable>
        ),
      },
      dislike: {
        feedbackDescriptions: (
          <Animated.View entering={FadeIn} style={styles.descriptionsWrapper} key={'dislike'}>
            {getFeedbackOptions(t).dislike.map((option, index) => (
              <FeedbackScreenDescriptionItem
                key={index}
                option={option}
                onOptionSelect={() => onOptionSelect(option)}
              />
            ))}
          </Animated.View>
        ),
        feedbackTitle: t('Feedback_dislikeTitle'),
        tips: null,
      },
    };
  }

  const addTip = (tip: number) => {
    setFeedback(state => ({
      ...state,
      tip: tip,
    }));
  };

  let additionalContentBody = null;

  if (isFeedbackForContractor && feedbackAdditionalContent && feedback.rating) {
    additionalContentBody = (
      <View style={styles.additionalContent}>
        <Text style={styles.additionalContentTitle}>{feedbackAdditionalContent[feedback.rating].feedbackTitle}</Text>
        {feedbackAdditionalContent[feedback.rating].feedbackDescriptions}
        {feedbackAdditionalContent[feedback.rating].tips}
      </View>
    );
  }

  return (
    <>
      <View style={style}>
        <View style={styles.header}>
          <ButtonV1 shape={ButtonV1Shapes.Circle} onPress={onBackButtonPress}>
            <CloseIcon />
          </ButtonV1>
        </View>
        <ScrollViewWithCustomScroll contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>{title}</Text>
            <MenuUserImage2 url={userImageUrl} />
            <View style={[styles.ratingWrapper, !isFeedbackForContractor ? styles.additionalMargin : {}]}>
              <Pressable onPress={() => onSelectRating('dislike')}>
                <BarV1 mode={dislikeButtonMode} style={styles.ratingItem}>
                  <DislikeIcon />
                </BarV1>
              </Pressable>
              <Pressable onPress={() => onSelectRating('like')}>
                <BarV1 mode={likeButtonMode} style={styles.ratingItem}>
                  <LikeIcon />
                </BarV1>
              </Pressable>
            </View>
            {additionalContentBody}
          </View>
        </ScrollViewWithCustomScroll>
        <View style={styles.buttons}>
          {!feedback.rating && (
            <Animated.View
              style={styles.button}
              entering={FadeIn.duration(fadeAnimationDuration)}
              exiting={FadeOut.duration(fadeAnimationDuration)}
            >
              <ButtonV1 mode={ButtonV1Modes.Mode2} text={t('Feedback_helpButton')} />
            </Animated.View>
          )}
          <ButtonV1
            containerStyle={styles.button}
            text={t('Feedback_sendFeedbackButton')}
            onPress={() => onSendFeedback(feedback)}
          />
        </View>
      </View>
      {isTipsPopupVisible && tipsVariants && (
        <TipsPopup onClosePopup={() => setIsTipsPopupVisible(false)} addTip={addTip} tipsVariants={tipsVariants} />
      )}
    </>
  );
};

const FeedbackScreen = (props: FeedbackScreenProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <FeedbackScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: sizes.paddingHorizontal,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
  },
  buttons: {
    flexDirection: 'row',
    gap: 22,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  contentContainerStyle: {
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    gap: 40,
  },
  contentTitle: {
    fontSize: 18,
    fontFamily: 'Inter Medium',
    textAlign: 'center',
    maxWidth: '80%',
  },
  ratingWrapper: {
    flexDirection: 'row',
    gap: 40,
  },
  ratingItem: {
    borderRadius: 40,
    padding: 34,
  },
  descriptionsWrapper: {
    flexDirection: 'row',
    gap: 16,
  },
  additionalContent: {
    gap: 30,
    marginBottom: 30,
  },
  additionalContentTitle: {
    fontSize: 18,
    fontFamily: 'Inter Medium',
    textAlign: 'center',
  },
  tips: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  tipsTitle: {
    fontFamily: 'Inter Medium',
  },
  additionalMargin: {
    marginBottom: 10,
  },
});

export default FeedbackScreen;
