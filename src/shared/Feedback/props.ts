import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export enum Options {
  NiceAtmosphere = 'niceAtmosphere',
  FriendlyDriver = 'friendlyDriver',
  GoodDriving = 'goodDriving',
  CleanCar = 'cleanCar',
  BadAtmosphere = 'badAtmosphere',
  RudeDriver = 'rudeDriver',
  BadDriving = 'badDriving',
  DirtyCar = 'dirtyCar',
}

export type Option = {
  title: string;
  apiBody: Options;
  image: ReactNode;
};

export type FeedbackRating = 'like' | 'dislike';

export type FeedbackType = {
  rating: FeedbackRating | null;
  description: string[];
  tip?: number;
};

type TipsVariants = number[];

export type FeedbackProps = {
  onBackButtonPress: () => void;
  title: string;
  userImageUrl: string;
  isFeedbackForContractor?: boolean;
  onSendFeedback: (feedback: FeedbackType) => void;
  tipsVariants?: TipsVariants;
  style?: StyleProp<ViewStyle>;
};

export type TipsPopupProps = {
  onClosePopup: () => void;
  addTip: (tip: number) => void;
  tipsVariants: TipsVariants;
};
