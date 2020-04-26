import React from 'react';
import {StyleSheet, View} from 'react-native';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';

const Members = () => {
  const rightIcon = () => null;

  return (
    <Layout headerTitle="Members" rightIcon={rightIcon} withSafeArea={false}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#0650d4', '#3080bd']}
        style={styles.full}>
        <View style={styles.blank} />
        <View style={styles.content} />
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  blank: {
    flex: 0.1,
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
  },
});

export default Members;
