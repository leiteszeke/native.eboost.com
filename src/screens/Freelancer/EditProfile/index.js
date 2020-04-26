import React from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Button from '../../../components/Button';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../../hooks/User';

const EditProfile = () => {
  const rightIcon = () => null;
  const {goBack} = useNavigation();
  const {user, setUser} = useUser();
  const [originalData, setOriginalData] = React.useState(user);
  const [data, setData] = React.useState(originalData);

  const setValue = (name) => (e) => {
    e.persist();
    setData((prev) => ({
      ...prev,
      [name]: e?.nativeEvent?.text,
    }));
  };

  const saveChanges = () => {
    setUser(data);
    setOriginalData(data);
    Alert.alert('Yes!', 'Your changes have been updated successfully');
  };

  const onImageSelect = () => {
    const options = {
      title: 'Select your profile image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxHeight: 300,
      maxWidth: 300,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error && !response.customButton) {
        setData((prev) => ({
          ...prev,
          image: response.uri,
        }));
      }
    });
  };

  const onBack = () => {
    if (_.isEqual(data, originalData)) {
      return goBack();
    }

    Alert.alert('Wait', 'If you go back, you will lose your changes', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => goBack()},
    ]);
  };

  return (
    <Layout
      headerTitle="Edit Profile"
      onBack={onBack}
      rightIcon={rightIcon}
      withSafeArea={false}
      withBack={true}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#0650d4', '#3080bd']}
        style={styles.full}>
        <View style={styles.blank} />
        <View style={styles.content}>
          <TouchableOpacity
            onPress={onImageSelect}
            style={styles.imageContainer}>
            <Image style={styles.userImage} source={{uri: data?.image}} />
          </TouchableOpacity>
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="gray"
              placeholder="Full Name"
              value={data?.name}
              onChange={setValue('name')}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="gray"
              placeholder="Email"
              value={data?.email}
              onChange={setValue('email')}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="gray"
              placeholder="Profession"
              value={data?.profession}
              onChange={setValue('profession')}
            />
            <TextInput
              style={styles.textArea}
              placeholderTextColor="gray"
              placeholder="About me"
              value={data?.description}
              onChange={setValue('description')}
              multiline={true}
            />
          </View>
          <View style={styles.footer}>
            <Button
              gradient={{
                start: {x: 0, y: 0},
                end: {x: 1, y: 0},
                colors: ['#0650d4', '#3080bd'],
              }}
              disabled={_.isEqual(data, originalData)}
              onPress={saveChanges}
              style={styles.button}
              label="SAVE CHANGES"
            />
          </View>
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
  imageContainer: {
    shadowOffset: {
      height: 8,
      width: 0,
    },
    position: 'relative',
    top: -30,
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#0650d4',
    alignItems: 'center',
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  form: {
    paddingHorizontal: 28,
  },
  textInput: {
    backgroundColor: 'lightgray',
    height: 48,
    fontSize: 18,
    color: 'black',
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  textArea: {
    backgroundColor: 'lightgray',
    height: 132,
    fontSize: 18,
    textAlignVertical: 'top',
    color: 'black',
    marginBottom: 12,
    borderRadius: 8,
    lineHeight: 26,
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 28,
  },
  button: {
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
  },
});

export default EditProfile;
