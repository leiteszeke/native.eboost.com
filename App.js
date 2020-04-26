import React from 'react';
import 'react-native-gesture-handler';
import {Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ifIphoneX} from 'react-native-iphone-x-helper';

import {UserProvider} from './src/contexts/User';
import {navigationRef} from './src/navigator';

import Login from './src/screens/Login';
import CustomerHome from './src/screens/Customer/Home';
import CustomerProfile from './src/screens/Customer/Profile';
import CustomerEditProfile from './src/screens/Customer/EditProfile';
import CustomerBecomeFreelancer from './src/screens/Customer/BecomeFreelancer';
import CustomerMembership from './src/screens/Customer/Membership';
import CustomerPay from './src/screens/Customer/Pay';

import FreelancerHome from './src/screens/Freelancer/Home';
import FreelancerMembers from './src/screens/Freelancer/Members';
import FreelancerSchedule from './src/screens/Freelancer/Schedule';
import FreelancerProfile from './src/screens/Freelancer/Profile';
import FreelancerEditProfile from './src/screens/Freelancer/EditProfile';
import FreelancerLibrary from './src/screens/Freelancer/Library';
import FreelancerLivestream from './src/screens/Freelancer/Livestream';
import FreelancerCreateSession from './src/screens/Freelancer/CreateSession';

import {useUser} from './src/hooks/User';
import {UserType} from './src/constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomerStack = () => (
  <Tab.Navigator
    name="Customer"
    headerMode="none"
    tabBarOptions={{
      activeTintColor: '#00A5B8',
      inactiveTintColor: 'gray',
      ...iphoneXTabProps,
    }}>
    <Tab.Screen
      name="Explore"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Explore</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon name="explore" size={28} color={focused ? '#00A5B8' : 'gray'} />
        ),
      }}
      component={CustomerHome}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Profile</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon name="person" size={28} color={focused ? '#00A5B8' : 'gray'} />
        ),
      }}
      component={CustomerProfileStack}
    />
  </Tab.Navigator>
);

const iphoneXTabProps = ifIphoneX(
  {
    style: {
      height: 100,
    },
    tabStyle: {
      height: 60,
    },
  },
  {
    style: {
      height: 64,
    },
    tabStyle: {
      height: 56,
      marginTop: 2,
    },
  },
);

const FreelancerScheduleStack = () => (
  <Stack.Navigator name="ScheduleStack" headerMode="none">
    <Stack.Screen name="Schedule" component={FreelancerSchedule} />
    <Stack.Screen name="CreateSession" component={FreelancerCreateSession} />
  </Stack.Navigator>
);

const FreelancerStack = () => (
  <Tab.Navigator
    name="Freelancer"
    headerMode="none"
    tabBarOptions={{
      activeTintColor: '#00A5B8',
      inactiveTintColor: 'gray',
      ...iphoneXTabProps,
    }}>
    <Tab.Screen
      name="Dashboard"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Dashboard</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon
            name="dashboard"
            size={28}
            color={focused ? '#00A5B8' : 'gray'}
          />
        ),
      }}
      component={FreelancerHome}
    />
    <Tab.Screen
      name="Members"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Members</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon name="people" size={28} color={focused ? '#00A5B8' : 'gray'} />
        ),
      }}
      component={FreelancerMembers}
    />
    <Tab.Screen
      name="Schedule"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Schedule</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon
            name="date-range"
            size={28}
            color={focused ? '#00A5B8' : 'gray'}
          />
        ),
      }}
      component={FreelancerScheduleStack}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Profile</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon name="person" size={28} color={focused ? '#00A5B8' : 'gray'} />
        ),
      }}
      component={FreelancerProfileStack}
    />
  </Tab.Navigator>
);

const CustomerProfileStack = () => (
  <Stack.Navigator name="CustomerProfileStack" headerMode="none">
    <Stack.Screen name="Profile" component={CustomerProfile} />
    <Stack.Screen name="EditProfile" component={CustomerEditProfile} />
    <Stack.Screen
      name="BecomeFreelancer"
      component={CustomerBecomeFreelancer}
    />
    <Stack.Screen name="Membership" component={CustomerMembership} />
    <Stack.Screen name="Pay" component={CustomerPay} />
  </Stack.Navigator>
);

const FreelancerProfileStack = () => (
  <Stack.Navigator name="FreelancerProfileStack" headerMode="none">
    <Stack.Screen name="Profile" component={FreelancerProfile} />
    <Stack.Screen name="EditProfile" component={FreelancerEditProfile} />
    <Stack.Screen name="Library" component={FreelancerLibrary} />
    <Stack.Screen name="Livestream" component={FreelancerLivestream} />
  </Stack.Navigator>
);

const AppStack = ({userType}) => (
  <Stack.Navigator
    name="App"
    headerMode="none"
    initialRouteName={
      userType === UserType.CUSTOMER ? 'Customer' : 'Freelancer'
    }>
    {userType === UserType.FREELANCER && (
      <Stack.Screen name="Freelancer" component={FreelancerStack} />
    )}
    <Stack.Screen name="Customer" component={CustomerStack} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator name="Auth" headerMode="none">
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const AppContainer = () => {
  const {isLogged, userType} = useUser();

  if (isLogged === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="white" style={styles.indicator} />
      </View>
    );
  }

  if (isLogged) {
    return <AppStack {...{userType}} />;
  }

  return <AuthStack />;
};

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
      <ActionSheetProvider>
        <UserProvider>
          <AppContainer />
        </UserProvider>
      </ActionSheetProvider>
    </NavigationContainer>
  </SafeAreaProvider>
);

const styles = {
  tabBarLabel: (color) => ({
    color,
    fontSize: 14,
  }),
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  indicator: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export default App;
