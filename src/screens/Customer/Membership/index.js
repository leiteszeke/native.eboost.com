import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import {setParams} from '../../../navigator';

const Memberships = () => {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const {params} = useRoute();
  const rightIcon = () => null;
  const [active, setActive] = React.useState(1);

  const selectActive = (id, pay) => () => {
    if (id === active) {
      return false;
    }

    if (pay) {
      const membership = memberships.find((m) => m.id === id);
      return navigate('Pay', {membership});
    }

    setActive(id);
  };

  const memberships = [
    {
      id: 1,
      title: 'Free tier',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      price: 0.0,
      per: 'session',
    },
    {
      id: 2,
      title: 'Pay as you play',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      price: 10.0,
      per: 'session',
    },
    {
      id: 3,
      title: 'Monthly Fee',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      price: 30,
      per: 'month',
      pay: true,
    },
  ];

  const Membership = ({id, title, description, price, pay, per}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.planContainer}
      onPress={selectActive(id, pay)}>
      <View style={styles.planContent}>
        <Text style={styles.planTitle}>{title}</Text>
        {active === id && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1e65bc', '#3080bd']}
            style={styles.planActiveBadge}>
            <Text style={styles.planActiveBadgeText}>ACTIVE</Text>
          </LinearGradient>
        )}
      </View>
      <View style={styles.planBody}>
        <View style={styles.planDescriptionContainer}>
          <Text style={styles.planDescriptionContainer}>{description}</Text>
        </View>
        <View style={styles.planPriceContainer}>
          <Text style={styles.planPrice}>
            € {price}
            <Text style={styles.planPriceDecimals}>.00</Text>
          </Text>
          <Text style={styles.planTime}>/ {per}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  React.useEffect(() => {
    if (isFocused && params?.paySuccess) {
      setActive(params?.membershipId);
      setParams({paySuccess: null, id: null});
    }
  }, [isFocused, params]);

  return (
    <Layout
      headerTitle="My Membership"
      rightIcon={rightIcon}
      withSafeArea={false}
      withBack={true}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1e65bc', '#3080bd']}
        style={styles.full}>
        <ScrollView style={styles.content}>
          {memberships.map((membership) => (
            <Membership key={membership.id} {...membership} />
          ))}
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
    width: '100%',
    paddingHorizontal: 24,
  },

  planContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowOpacity: 12,
    shadowRadius: 5,
    elevation: 5,
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 12,
  },
  planTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  planActiveBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  planActiveBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  planBody: {
    flexDirection: 'row',
    padding: 12,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    paddingTop: 24,
  },
  planDescriptionContainer: {
    flex: 1,
  },
  planDescription: {
    fontSize: 16,
  },
  planPriceContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  planPriceDecimals: {
    fontSize: 20,
  },
  planTime: {
    fontSize: 18,
    marginLeft: 12,
  },
});

export default Memberships;
