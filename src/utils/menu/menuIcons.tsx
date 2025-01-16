import MyRideIcon from '../../shared/icons//MyRideIcon';
import ProfileIcon from '../../shared/icons//ProfileIcon';
import PromocodesIcon from '../../shared/icons//PromocodesIcon';
import SettingsIcon from '../../shared/icons//SettingsIcon';
import StatisticsIcon from '../../shared/icons//StatisticsIcon';
import WalletIcon from '../../shared/icons//WalletIcon';
import ActivityIcon from '../../shared/icons/ActivityIcon';
import BecomeDriverIcon from '../../shared/icons/BecomeDriverIcon';
import HelpIcon from '../../shared/icons/HelpIcon';
import UserIcon from '../../shared/icons/UserIcon';
import { type MenuNavigationBlocks } from './type';

export const getMenuIcons = (type: MenuNavigationBlocks) => {
  switch (type) {
    case 'becomeDriver':
      return <BecomeDriverIcon />;
    case 'ride':
      return <MyRideIcon />;
    case 'help':
      return <HelpIcon />;
    case 'activity':
      return <ActivityIcon />;
    case 'promocodes':
      return <PromocodesIcon />;
    case 'accountSettings':
      return <SettingsIcon />;
    case 'wallet':
      return <WalletIcon />;
    case 'profile':
      return <ProfileIcon />;
    case 'statistics':
      return <StatisticsIcon />;
    case 'subscription':
      return <UserIcon />;
    default:
      return null;
  }
};
