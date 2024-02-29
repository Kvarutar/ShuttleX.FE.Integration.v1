import React, { type ReactNode, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import i18nIntegration from '../../core/locales/i18n';
import { useTheme } from '../../core/themes/themeContext';
import Bar from '../Bar';
import { BarModes } from '../Bar/types';
import Button from '../BrandBook/Button';
import { ButtonModes } from '../BrandBook/Button/props';
import ArrowInPrimaryColorIcon from '../BrandBook/Icons/ArrowInPrimaryColorIcon';
import CloseIcon from '../BrandBook/Icons/CloseIcon';
import DislikeIcon from '../BrandBook/Icons/DislikeIcon';
import FeedbackCleanIcon from '../BrandBook/Icons/FeedbackCleanIcon';
import FeedbackDirtyIcon from '../BrandBook/Icons/FeedbackDirtyIcon';
import FeedbackHeartBrokenIcon from '../BrandBook/Icons/FeedbackHeartBrokenIcon';
import FeedbackHeartIcon from '../BrandBook/Icons/FeedbackHeartIcon';
import FeedbackThumbDownIcon from '../BrandBook/Icons/FeedbackThumbDownIcon';
import FeedbackThumbUpIcon from '../BrandBook/Icons/FeedbackThumbUpIcon';
import FeedbackWheelIcon from '../BrandBook/Icons/FeedbackWheelIcon';
import LikeIcon from '../BrandBook/Icons/LikeIcon';
import MenuUserImage2 from '../BrandBook/Images/MenuUserImage2';
import Text from '../BrandBook/Text';
import RoundButton from '../RoundButton';
import ScrollViewWithCustomScroll from '../Widgets/ScrollViewWithCustomScroll';
import FeedbackDescriptionItem from './FeedbackDescriptionItem';
import { type FeedbackProps, type FeedbackRating, type FeedbackType, type Option, Options } from './props';
import TipsPopup from './TipsPopup';

const windowHeight = Dimensions.get('window').height;
const fadeAnimationDuration = 200;

type FeedbackAdditionalContent = {
  feedbackDescriptions: ReactNode;
  feedbackTitle: string;
  tips: ReactNode;
};

const getFeedbackOptions = (
  t: ReturnType<typeof useTranslation>['t'],
  iconPrimaryColor?: string,
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
      image: <FeedbackWheelIcon />,
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
      image: <FeedbackWheelIcon color={iconPrimaryColor} />,
    },
    {
      title: t('Feedback_dislikeOption4'),
      apiBody: Options.DirtyCar,
      image: <FeedbackDirtyIcon />,
    },
  ],
});

const FeedbackWithoutI18n = ({
  onBackButtonPress,
  title,
  userImageUrl,
  isFeedbackForContractor = false,
  onSendFeedback,
  tipsVariants,
}: FeedbackProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();

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
            {getFeedbackOptions(t).like.map((option, index) => (
              <FeedbackDescriptionItem key={index} option={option} onOptionSelect={() => onOptionSelect(option)} />
            ))}
          </Animated.View>
        ),
        feedbackTitle: t('Feedback_likeTitle'),
        tips: (
          <Pressable onPress={() => setIsTipsPopupVisible(true)}>
            <Bar style={styles.tips}>
              <Text style={styles.tipsTitle}>{t('Feedback_tipsTitle')}</Text>
              <ArrowInPrimaryColorIcon />
            </Bar>
          </Pressable>
        ),
      },
      dislike: {
        feedbackDescriptions: (
          <Animated.View entering={FadeIn} style={styles.descriptionsWrapper} key={'dislike'}>
            {getFeedbackOptions(t, colors.iconPrimaryColor).dislike.map((option, index) => (
              <FeedbackDescriptionItem key={index} option={option} onOptionSelect={() => onOptionSelect(option)} />
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
      <View>
        <View style={styles.header}>
          <RoundButton onPress={onBackButtonPress}>
            <CloseIcon />
          </RoundButton>
        </View>
        <ScrollViewWithCustomScroll contentContainerStyle={styles.contentContainerStyle} style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>{title}</Text>
            <MenuUserImage2 url={userImageUrl} />
            <View style={[styles.ratingWrapper, !isFeedbackForContractor ? styles.additionalMargin : {}]}>
              <Pressable onPress={() => onSelectRating('dislike')}>
                <Bar mode={dislikeButtonMode} style={styles.ratingItem}>
                  <DislikeIcon />
                </Bar>
              </Pressable>
              <Pressable onPress={() => onSelectRating('like')}>
                <Bar mode={likeButtonMode} style={styles.ratingItem}>
                  <LikeIcon />
                </Bar>
              </Pressable>
            </View>
            {additionalContentBody}
          </View>
        </ScrollViewWithCustomScroll>
      </View>
      <View style={styles.buttons}>
        {!feedback.rating && (
          <Animated.View
            style={styles.button}
            entering={FadeIn.duration(fadeAnimationDuration)}
            exiting={FadeOut.duration(fadeAnimationDuration)}
          >
            <Button mode={ButtonModes.Mode2} text={t('Feedback_helpButton')} />
          </Animated.View>
        )}
        <Button
          containerStyle={styles.button}
          text={t('Feedback_sendFeedbackButton')}
          onPress={() => onSendFeedback(feedback)}
        />
      </View>
      {isTipsPopupVisible && tipsVariants && (
        <TipsPopup onClosePopup={() => setIsTipsPopupVisible(false)} addTip={addTip} tipsVariants={tipsVariants} />
      )}
    </>
  );
};

const Feedback = (props: FeedbackProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <FeedbackWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 22,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  contentWrapper: {
    height: windowHeight * 0.8,
  },
  contentContainerStyle: {
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 48,
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

export default Feedback;
