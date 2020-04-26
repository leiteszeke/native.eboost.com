import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Layout from '../../../components/Layout';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from '../../../components/Video';

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
  const [showVideo, setShowVideo] = React.useState(false);
  const now = dayjs();

  const Session = ({title, start, finish, members, free, video}) => (
    <View style={styles.sessionContainer}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionDate}>
          {dayjs(start).format('HH:mm')} - {dayjs(finish).format('HH:mm')}
        </Text>
        <View style={styles.sessionFooter}>
          <Text style={styles.sessionMembers}>{members}</Text>
          <Icon name="person" size={24} />
        </View>
      </View>
      <View style={styles.sessionBody}>
        <Text style={styles.sessionTitle}>{title}</Text>
        <View style={styles.sessionInfo}>
          {!free && <Icon name="attach-money" size={24} />}
          {video && (
            <Icon
              onPress={() => setShowVideo(true)}
              name="video-call"
              size={24}
              color="#00A5B8"
            />
          )}
        </View>
      </View>
    </View>
  );

  const rightIcon = () => null;

  const filterToday = (session) =>
    session.start.includes(now.format('YYYY-MM-DD'));

  return (
    <>
      <Layout
        withSafeArea={false}
        contentStyle={styles.layout}
        rightIcon={rightIcon}
        withLogo>
        <Text style={styles.day}>{now.format('DD MMMM YYYY')}</Text>
        <ScrollView style={styles.sessions}>
          {sessions.filter(filterToday).map((session) => (
            <Session key={session.id} {...session} />
          ))}
        </ScrollView>
      </Layout>
      <Video
        onClose={() => setShowVideo(false)}
        show={showVideo}
        url="https://s3-us-west-2.amazonaws.com/static.elevate.com/Zumba.mp4"
      />
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#f5f5f5',
  },

  sessionContainer: {
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
  },

  sessionHeader: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sessionDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  sessionFooter: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  sessionMembers: {
    fontSize: 16,
    marginRight: 4,
  },

  sessionBody: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sessionTitle: {
    fontSize: 18,
  },

  sessionInfo: {
    alignItems: 'center',
    flexDirection: 'row',
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
