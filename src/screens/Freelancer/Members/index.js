import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  View,
} from 'react-native';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

const userList = [
  {
    key: 'A',
    users: [
      {
        id: 1,
        name: 'Arnold Doe',
        email: 'fake@email.com',
        plan: '2 weeks plan',
        image: 'https://picsum.photos/100/100',
        membership: true,
      },
      {
        id: 2,
        name: 'Arnold Doe',
        email: 'fake@email.com',
        plan: 'monthly plan',
        image: 'https://picsum.photos/100/100',
        membership: true,
      },
      {
        id: 3,
        name: 'Arnold Doe',
        email: 'fake@email.com',
        plan: null,
        image: 'https://picsum.photos/100/100',
      },
    ],
  },
  {
    key: 'J',
    users: [
      {
        id: 1,
        name: 'Jane Doe',
        email: 'fake@email.com',
        plan: null,
        image: 'https://picsum.photos/100/100',
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'fake@email.com',
        plan: null,
        image: 'https://picsum.photos/100/100',
      },
      {
        id: 3,
        name: 'June Doe',
        email: 'fake@email.com',
        plan: 'Lifetime plan',
        image: 'https://picsum.photos/100/100',
        membership: true,
      },
    ],
  },
  {
    key: 'M',
    users: [
      {
        id: 1,
        name: 'Marian Doe',
        email: 'fake@email.com',
        plan: null,
        image: 'https://picsum.photos/100/100',
      },
      {
        id: 2,
        name: 'Mary Doe',
        email: 'fake@email.com',
        plan: 'monthly plan',
        image: 'https://picsum.photos/100/100',
        membership: true,
      },
      {
        id: 3,
        name: 'Molly Doe',
        email: 'fake@email.com',
        plan: '2 weeks plan',
        image: 'https://picsum.photos/100/100',
        membership: true,
      },
    ],
  },
];

const Members = () => {
  const [modalUser, setModalUser] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const rightIcon = () => null;
  const openModal = (userData) => () => {
    setShowModal(true);
    setModalUser(userData);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalUser(null);
  };

  const User = (user) => (
    <TouchableOpacity onPress={openModal(user)} style={styles.user}>
      <Image
        style={styles.userImage}
        source={{uri: `${user.image}?random=${user.id}`}}
      />
      <Text style={styles.userImageName}>{user.name}</Text>
      <Icon
        name={user.membership ? 'check-circle' : 'radio-button-unchecked'}
        size={30}
        color="#00A5B8"
      />
    </TouchableOpacity>
  );

  const UserList = ({letter, users}) => (
    <View style={styles.userList}>
      <Text style={styles.userLetter}>{letter}</Text>
      {users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </View>
  );

  return (
    <>
      <Layout headerTitle="Members" rightIcon={rightIcon} withSafeArea={false}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00A5B8', '#00A5B8']}
          style={styles.full}>
          <View style={styles.blank} />
          <ScrollView style={styles.content}>
            {userList.map((users) => (
              <UserList key={users.key} letter={users.key} {...users} />
            ))}
          </ScrollView>
        </LinearGradient>
      </Layout>
      <Modal
        isVisible={showModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Image
                style={styles.modalImage}
                source={{uri: modalUser?.image}}
              />
              <View style={styles.modalUserData}>
                <Text style={styles.modalUserName}>{modalUser?.name}</Text>
                <Text style={styles.modalUserEmail}>{modalUser?.email}</Text>
              </View>
            </View>
            {modalUser?.plan && (
              <View style={styles.planContainer}>
                <Text style={styles.userPlan}>
                  {modalUser?.plan.toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  userList: {
    paddingHorizontal: 24,
    marginVertical: 12,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  userLetter: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  userImage: {
    width: 50,
    borderRadius: 25,
    height: 50,
  },
  userImageName: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
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
  modalContainer: {
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
  },
  modalUserName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalUserEmail: {
    fontSize: 16,
  },
  modalImage: {
    width: 80,
    borderRadius: 40,
    height: 80,
  },
  modalUserData: {
    marginLeft: 20,
  },
  planContainer: {
    borderWidth: 4,
    borderColor: '#00A5B8',
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  userPlan: {
    color: '#00A5B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Members;
