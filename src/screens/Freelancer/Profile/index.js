import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  View,
} from 'react-native';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const menuItems = [
    {id: 1, label: 'Edit profile', icon: 'edit'},
    {id: 2, label: 'My Library', icon: 'book'},
    {id: 3, label: 'My Membership', icon: 'card-membership'},
    {id: 4, label: 'Livestream', icon: 'videocam'},
    {id: 5, label: 'Logout', icon: 'exit-to-app'},
  ];

  const rightIcon = () => <Icon name="chat-bubble" size={24} color="white" />;

  return (
    <Layout
      headerTitle="Your Profile"
      rightIcon={rightIcon}
      withSafeArea={false}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1e65bc', '#3080bd']}
        style={styles.full}>
        <View style={styles.blank} />
        <View style={styles.content}>
          <View style={styles.userInfo}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.userImage}
                source={{uri: 'https://picsum.photos/100/100'}}
              />
            </View>
            <View style={styles.userMeta}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userData}>Martials Arts Instructor</Text>
            </View>
          </View>
          <ScrollView style={[styles.full, styles.scrollView]}>
            {menuItems.map((item) => (
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
    position: 'relative',
    top: -20,
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#1e65bc',
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
