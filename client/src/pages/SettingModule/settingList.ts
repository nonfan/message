import AboutSvg from '../../svg/AboutSvg';
import ThemeSvg from '../../svg/ThemeSvg';
import UserSvg from '../../svg/UserSvg';
import About from './About';
import Theme from './Theme';
import User from './User';

interface IList {
  key: string;
  name: string;
  icon: any;
  component: any;
  description: string;
}

const theme = {
  key: 'theme',
  name: '主题/壁纸',
  icon: ThemeSvg,
  component: Theme,
  description: '深色主题、主题色',
};

const user = {
  key: 'user',
  name: '个人信息',
  icon: UserSvg,
  component: User,
  description: '设置头像、个人信息',
};

const about = {
  key: 'about',
  name: '关于',
  icon: AboutSvg,
  component: About,
  description: '版本：0.1',
};
function handleGetListForSetting() {
  const list: IList[] = [user, theme, about];
  return list;
}

export default handleGetListForSetting;
