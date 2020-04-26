import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Layout from '../../../components/Layout';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const sessions = [
  {
    id: 1,
    start: '2020-04-27 10:00:00',
    finish: '2020-04-27 10:30:00',
    members: 12,
    title: 'Zumba class',
    video: 'https',
    free: true,
  },
  {
    id: 2,
    start: '2020-04-26 14:00:00',
    finish: '2020-04-26 15:30:00',
    members: 7,
    title: 'Crossfit workshop',
    video: 'https',
    free: false,
  },
  {
    id: 3,
    start: '2020-04-26 10:00:00',
    finish: '2020-04-26 10:45:00',
    members: 4,
    title: 'Zumba class',
    video: 'https',
    free: true,
  },
  {
    id: 4,
    start: '2020-04-25 16:00:00',
    finish: '2020-04-25 18:30:00',
    members: 7,
    title: 'Crossfit workshop',
    video: 'https',
    free: false,
  },
];

const Home = () => {
  const now = dayjs();

  const Session = ({title, start, finish, members, free, video}) => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 24,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
          height: 8,
          width: 0,
        },
        marginHorizontal: 16,
        shadowOpacity: 12,
        shadowRadius: 5,
        elevation: 5,
      }}>
      <View
        style={{
          marginBottom: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {dayjs(start).format('HH:mm')} - {dayjs(finish).format('HH:mm')}
        </Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, marginRight: 4}}>{members}</Text>
          <Icon name="person" size={24} />
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>{title}</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {!free && <Icon name="attach-money" size={24} />}
          {video && <Icon name="video-call" size={24} color="#00A5B8" />}
        </View>
      </View>
    </View>
  );

  const rightIcon = () => null;

  const filterToday = (session) =>
    session.start.includes(now.format('YYYY-MM-DD'));

  return (
    <Layout
      withSafeArea={false}
      contentStyle={styles.layout}
      rightIcon={rightIcon}>
      <Text style={styles.day}>{now.format('DD MMMM YYYY')}</Text>
      <ScrollView style={styles.sessions}>
        {sessions.filter(filterToday).map((session) => (
          <Session key={session.id} {...session} />
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#f5f5f5',
  },
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },

  sessions: {
    marginTop: 24,
  },
});

export default Home;
