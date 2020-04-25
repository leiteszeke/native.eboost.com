import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {capitalize} from '../../helpers/strings';
import {UserType} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../hooks/User';

const Layout = ({
  children,
  headerTitle = null,
  hideHeader = false,
  onBack,
  rightIcon,
  withBack = false,
  withSafeArea = true,
}) => {
  const {showActionSheetWithOptions} = useActionSheet();
  const {goBack} = useNavigation();
  const {changeType, userType} = useUser();

  const showUserTypeSelector = () => {
    if (headerTitle) {
      return false;
    }

    const config = {
      options: [
        'Cancel',
        ...Object.entries(UserType).map(([, value]) => capitalize(value)),
      ],
      cancelButtonIndex: 0,
    };
    const onSelect = (buttonIndex) => {
      if (buttonIndex !== 0) {
        const types = Object.entries(UserType).map(([, value]) => value);
        changeType(types[buttonIndex - 1]);
      }
    };

    showActionSheetWithOptions(config, onSelect);
  };

  const handleBack = () => {
    if (typeof onBack === 'function') {
      return onBack();
    }

    return goBack();
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
              {withBack && (
                <Icon
                  name="chevron-left"
                  size={40}
                  onPress={handleBack}
                  color="white"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showUserTypeSelector}
              style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{headerTitle || userType}</Text>
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
    height: 56,
  },
  headerIcon: {
    width: 56,
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
