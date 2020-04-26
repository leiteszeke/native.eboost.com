import {ifIphoneX} from 'react-native-iphone-x-helper';

export function keyboardAvoiding() {
  const statusBarHeight = ifIphoneX() ? ifIphoneX(44, 20) : 0;
  const navBarHeight = ifIphoneX() ? 44 : 56;
  const headerHeight = statusBarHeight + navBarHeight;

  return {
    offset: headerHeight,
    behavior: ifIphoneX() ? 'padding' : '',
  };
}

export default {
  keyboardAvoiding,
};
