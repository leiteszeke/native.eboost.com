import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import {UserType} from '../../constants';

const Layout = ({
  children,
  contentStyle,
  headerTitle = null,
  hideHeader = false,
  mode = UserType.FREELANCER,
  rightIcon,
  setUserType,
  withBack = false,
  withSafeArea = true,
}) => {
  const {showActionSheetWithOptions} = useActionSheet();

  const showUserTypeSelector = () => {
    const config = {
      options: [
        'Cancel',
        ...Object.entries(UserType).map(([key, value]) => value),
      ],
      cancelButtonIndex: 0,
    };
    const onSelect = (buttonIndex) => {
      if (buttonIndex !== 0) {
        const types = Object.entries(UserType).map(([key, value]) => value);
        setUserType(types[buttonIndex - 1]);
      }
    };

    showActionSheetWithOptions(config, onSelect);
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#1e65bc', '#3080bd']}
      style={styles.wrapper}>
      <SafeAreaView style={styles.safaArea}>
        {!hideHeader && (
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon}>
              {withBack && <Icon name="chevron-left" size={30} color="white" />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showUserTypeSelector}
              style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{headerTitle || mode}</Text>
              {!headerTitle && (
                <Icon name="keyboard-arrow-down" size={30} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              {rightIcon ? (
                rightIcon()
              ) : (
                <Icon name="search" size={30} color="white" />
              )}
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
      {withSafeArea && <View style={styles.safeAreaBottom} />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safaArea: {
    flex: 1,
  },
  safeAreaBottom: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    height: 34,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
  },
  headerIcon: {
    width: 50,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Layout;
