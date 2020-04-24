import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Text} from 'react-native';

import {UserType} from '../../constants';

const Layout = ({children, mode = UserType.FREELANCER}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{mode}</Text>
      </View>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default Layout;
