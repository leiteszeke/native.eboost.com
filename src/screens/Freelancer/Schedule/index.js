import React from 'react';
import Layout from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
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

const Schedule = () => {
  const now = dayjs();
  const [currentDay, setCurrentDay] = React.useState(now);
  const [showVideo, setShowVideo] = React.useState(false);

  const nextDay = () => {
    const next = currentDay.add(1, 'day');
    setCurrentDay(next);
  };

  const prevDay = () => {
    const prev = currentDay.subtract(1, 'day');
    setCurrentDay(prev);
  };

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

  const rightIcon = () => (
    <Icon name="add-circle-outline" size={28} color="white" />
  );

  const filterToday = (session) =>
    session.start.includes(currentDay.format('YYYY-MM-DD'));

  return (
    <>
      <Layout headerTitle="Schedule" rightIcon={rightIcon} withSafeArea={false}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00A5B8', '#00A5B8']}
          style={styles.full}>
          <View style={styles.blank} />
          <View style={styles.content}>
            <View style={styles.calendarChange}>
              <Icon
                onPress={prevDay}
                name="keyboard-arrow-left"
                size={32}
                color="black"
              />
              <Text style={styles.day}>
                {currentDay.format('DD MMMM YYYY')}
              </Text>
              <Icon
                onPress={nextDay}
                name="keyboard-arrow-right"
                size={32}
                color="black"
              />
            </View>
            <ScrollView style={styles.sessions}>
              {sessions.filter(filterToday).map((session) => (
                <Session key={session.id} {...session} />
              ))}
            </ScrollView>
          </View>
        </LinearGradient>
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
  full: {
    flex: 1,
  },

  calendarChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 12,
    justifyContent: 'space-between',
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
    textAlign: 'center',
  },

  sessions: {
    marginTop: 24,
  },
  blank: {
    flex: 0.1,
  },
  content: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default Schedule;
