import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';

const Library = () => {
  const rightIcon = () => null;

  return (
    <Layout
      headerTitle="My Library"
      rightIcon={rightIcon}
      withBack={true}
      withSafeArea={false}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#00A5B8', '#00A5B8']}
        style={styles.full}>
        <View style={styles.blank} />
        <View style={styles.content}>
          <Text style={styles.noSessions}>
            You haven't sessions in your library yet.
          </Text>
        </View>
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  scrollView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  blank: {
    flex: 0.1,
  },
  noSessions: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
  },
});

export default Library;
