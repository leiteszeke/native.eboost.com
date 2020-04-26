import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Pay = () => {
  const rightIcon = () => null;
  const {params} = useRoute();
  const navigation = useNavigation();
  const {membership} = params;
  const [loading, setLoading] = React.useState(false);

  const onPay = () => {
    if (loading) {
      return true;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Membership', {
        paySuccess: true,
        membershipId: membership.id,
      });
    }, 1500);
  };

  return (
    <Layout
      headerTitle="Purchase"
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
          <Text style={styles.title}>{membership.title}</Text>
          <Text style={styles.price}>€ {membership.price}.00</Text>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00A5B8', '#00A5B8']}
            style={styles.gradientButton}>
            <TouchableOpacity style={styles.button} onPress={onPay}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Icon name="paypal" size={30} color="white" />

                  <Text style={styles.buttonPaypal}>Pay with PayPal</Text>
                </>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
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
  content: {
    paddingTop: 12,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  gradientButton: {
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  description: {
    fontSize: 20,
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPaypal: {
    fontSize: 20,
    marginLeft: 12,
    color: 'white',
  },
});

export default Pay;
