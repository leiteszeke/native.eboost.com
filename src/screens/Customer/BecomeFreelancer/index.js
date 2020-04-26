import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import LinearGradient from 'react-native-linear-gradient';

const BecomeFreelancer = () => {
  const rightIcon = () => null;

  return (
    <Layout
      headerTitle="Become a Freelancer"
      rightIcon={rightIcon}
      withSafeArea={false}
      withBack={true}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#00A5B8', '#00A5B8']}
        style={styles.full}>
        <View style={styles.blank} />
        <ScrollView style={styles.content}>
          <Text style={styles.title}>How to be a freelancer?</Text>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry’s standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged.
          </Text>
          <Button label="BE A FREELANCER" style={styles.button} />
        </ScrollView>
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
  title: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
  },
  button: {
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
});

export default BecomeFreelancer;
