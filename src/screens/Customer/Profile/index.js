import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../../hooks/User';
import {UserType} from '../../../constants';
import DefaultImage from '../../../images/UserDefault.jpg';

const MenuItem = ({label, icon, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
    <View style={styles.menuItemContainer}>
      <Icon name={icon} size={30} color="gray" />
    </View>
    <View style={styles.menuItemLabelContainer}>
      <Text style={styles.menuItemLabel}>{label}</Text>
      <Icon name="chevron-right" size={30} color="gray" />
    </View>
  </TouchableOpacity>
);

const Profile = () => {
  const {navigate} = useNavigation();
  const {user, onLogoutSuccess} = useUser();
  const navigateTo = (route) => () => navigate(route);
  const alertLogout = () =>
    Alert.alert('Log out', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => onLogoutSuccess()},
    ]);

  const menuItems = [
    {
      id: 1,
      label: 'Edit profile',
      icon: 'edit',
      onPress: navigateTo('EditProfile'),
    },
    {
      id: 2,
      label: 'Become a Freelancer',
      icon: 'business',
      type: UserType.CUSTOMER,
      onPress: navigateTo('BecomeFreelancer'),
    },
    {
      id: 3,
      label: 'My Membership',
      icon: 'card-membership',
      onPress: navigateTo('Membership'),
    },
    {id: 5, label: 'Logout', icon: 'exit-to-app', onPress: alertLogout},
  ];

  const rightIcon = () => null;

  const filterType = (item) => !item.type || item.type === user.type;
  const userImage = user?.profile_pic?.image_url
    ? {uri: user?.profile_pic?.image_url}
    : DefaultImage;

  return (
    <Layout headerTitle="My Profile" rightIcon={rightIcon} withSafeArea={false}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#00A5B8', '#00A5B8']}
        style={styles.full}>
        <View style={styles.blank} />
        <View style={styles.content}>
          <View style={styles.userInfo}>
            <View style={styles.imageContainer}>
              <Image style={styles.userImage} source={userImage} />
            </View>
            <View style={styles.userMeta}>
              <Text style={styles.userName}>
                {user?.first_name} {user?.last_name}
              </Text>
            </View>
          </View>
          <ScrollView style={[styles.full, styles.scrollView]}>
            {menuItems.filter(filterType).map((item) => (
              <MenuItem key={item.id} {...item} />
            ))}
          </ScrollView>
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
  content: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
  },
  userInfo: {
    height: 100,
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 40,
  },
  imageContainer: {
    shadowOffset: {
      height: 8,
      width: 0,
    },
    borderRadius: 50,
    position: 'relative',
    top: -20,
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#00A5B8',
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  userMeta: {
    paddingVertical: 16,
    marginLeft: 28,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userData: {
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginBottom: 20,
    width: '100%',
  },
  menuItemContainer: {
    height: 48,
    justifyContent: 'center',
    width: 40,
  },
  menuItemLabelContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    marginLeft: 20,
  },
  menuItemLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
