export enum NotificationType {
  TripWasRated = 'trip_was_rated',
  RatingIncreased = 'rating_increased',
  PlannedTrip = 'planned_trip',
}

export type Notification = {
  type: NotificationType;
  title: string;
  description: string;
  isRead: boolean;
  time: string;
  image?: {
    uri: string;
  };
};

export type NotificationsProps = {
  notifications: Notification[];
};
