import React from 'react';
import Button from '../../../components/Button';
import Layout from '../../../components/Layout';
import dayjs from 'dayjs';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {
  Alert,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

const CreateSession = () => {
  const now = dayjs();
  const {goBack} = useNavigation();
  const [data, setData] = React.useState(null);
  const [showFrom, setShowFrom] = React.useState(false);
  const [showFromTime, setShowFromTime] = React.useState(false);
  const [showTo, setShowTo] = React.useState(false);
  const [showToTime, setShowToTime] = React.useState(false);

  const setValue = (name) => (e) => {
    setData((prev) => ({
      ...prev,
      [name]: e?.nativeEvent?.text || e,
    }));
  };

  const setDateValue = (name, type) => (e) => {
    e.persist();

    if (Platform.OS !== 'ios') {
      let key = '';

      if (name === 'start') {
        setShowFrom(false);
        setShowFromTime((prev) => !prev);
        key = `start${type || 'Date'}`;
      }

      if (name === 'finish') {
        setShowTo(false);
        setShowToTime((prev) => !prev);
        key = `finish${type || 'Date'}`;
      }

      setData((prev) => ({
        ...prev,
        [key]: e?.nativeEvent?.timestamp,
      }));
    } else {
      const keyDate = `${name}Date`;
      const keyTime = `${name}Time`;

      setData((prev) => ({
        ...prev,
        [keyDate]: e?.nativeEvent?.timestamp,
        [keyTime]: e?.nativeEvent?.timestamp,
      }));
    }
  };

  const saveChanges = () => {};

  const onBack = () => {
    if (_.isEmpty(data)) {
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

  const rightIcon = () => null;

  return (
    <>
      <Layout
        headerTitle="Create a Session"
        onBack={onBack}
        rightIcon={rightIcon}
        withBack
        withSafeArea={false}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00A5B8', '#00A5B8']}
          style={styles.full}>
          <View style={styles.blank} />
          <View style={styles.content}>
            <ScrollView style={styles.form}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Title"
                value={data?.title}
                onChange={setValue('title')}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Target"
                value={data?.target}
                onChange={setValue('target')}
              />
              <TouchableOpacity
                style={styles.textInput}
                onPress={() => setShowFrom(true)}>
                <Text
                  style={[
                    styles.textInputText,
                    !data?.startDate && styles.textInputDisabled,
                  ]}>
                  {data?.startDate
                    ? `${dayjs(data?.startDate).format('MM/DD/YYYY')} ${dayjs(
                        data?.startTime,
                      ).format('HH:mm')}`
                    : 'Start Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textInput}
                onPress={() => setShowTo(true)}>
                <Text
                  style={[
                    styles.textInputText,
                    !data?.finishDate && styles.textInputDisabled,
                  ]}>
                  {data?.finishDate
                    ? `${dayjs(data?.finishDate).format('MM/DD/YYYY')} ${dayjs(
                        data?.finishTime,
                      ).format('HH:mm')}`
                    : 'Finish Date'}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Select a Plan"
                value={data?.plan}
                onChange={setValue('plan')}
              />
              <TextInput
                style={styles.textArea}
                placeholderTextColor="gray"
                placeholder="Session description"
                value={data?.description}
                onChange={setValue('description')}
                multiline={true}
              />
            </ScrollView>
            <View style={styles.footer}>
              <Button
                disabled={_.isEmpty(data)}
                gradient={{
                  start: {x: 0, y: 0},
                  end: {x: 1, y: 0},
                  colors: ['#00A5B8', '#00A5B8'],
                }}
                onPress={saveChanges}
                style={styles.button}
                label="SAVE CHANGES"
              />
            </View>
          </View>
        </LinearGradient>
      </Layout>
      {showFrom && (
        <View style={styles.datePicker}>
          <View style={styles.datePickerActions}>
            {Platform.OS === 'ios' && (
              <View style={styles.datePickerFooter}>
                <TouchableOpacity onPress={() => setShowFrom(false)}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            )}
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={new Date(data?.startDate || now.valueOf())}
              mode="datetime"
              is24Hour={true}
              style={styles.datePickerElement}
              display="default"
              onChange={setDateValue('start')}
            />
          </View>
        </View>
      )}
      {showTo && (
        <View style={styles.datePicker}>
          <View style={styles.datePickerActions}>
            {Platform.OS === 'ios' && (
              <View style={styles.datePickerFooter}>
                <TouchableOpacity onPress={() => setShowTo(false)}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            )}
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={new Date(data?.finishDate || now.valueOf())}
              mode="datetime"
              is24Hour={true}
              style={styles.datePickerElement}
              display="default"
              onChange={setDateValue('finish')}
            />
          </View>
        </View>
      )}
      {showFromTime && Platform.OS === 'android' && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={new Date(data?.start || now.valueOf())}
          mode="time"
          is24Hour={true}
          style={styles.datePickerElement}
          display="default"
          onChange={setDateValue('start', 'Time')}
        />
      )}
      {showToTime && Platform.OS === 'android' && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          value={new Date(data?.finish || now.valueOf())}
          mode="time"
          is24Hour={true}
          style={styles.datePickerElement}
          display="default"
          onChange={setDateValue('finish', 'Time')}
        />
      )}
    </>
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
    backgroundColor: '#f5f5f5',
    flex: 1,
    borderTopLeftRadius: 24,
    paddingVertical: 24,
    borderTopRightRadius: 24,
  },
  form: {
    paddingHorizontal: 28,
  },
  textInput: {
    backgroundColor: 'lightgray',
    height: 48,
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  textInputDisabled: {
    color: 'gray',
  },
  textInputText: {
    fontSize: 18,
    color: 'black',
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

  datePicker: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  datePickerFooter: {
    backgroundColor: 'white',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },

  datePickerActions: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  okButton: {
    color: '#00A5B8',
    fontSize: 20,
    fontWeight: 'bold',
  },

  datePickerElement: {
    backgroundColor: 'white',
  },
});

export default CreateSession;
