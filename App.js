import React from 'react';
import 'react-native-gesture-handler';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from './src/screens/Login';
import FreelancerHome from './src/screens/Freelancer/Home';
import FreelancerMembers from './src/screens/Freelancer/Members';
import FreelancerSchedule from './src/screens/Freelancer/Schedule';
import FreelancerProfile from './src/screens/Freelancer/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FreelancerStack = () => (
  <Stack.Navigator name="Freelancer" headerMode="none">
    <Stack.Screen name="Home" component={FreelancerHome} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    name="App"
    headerMode="none"
    tabBarOptions={{
      activeTintColor: '#1e65bc',
      inactiveTintColor: 'gray',
      style: {
        height: 100,
      },
      tabStyle: {
        height: 60,
      },
    }}>
    <Tab.Screen
      name="Freelancer"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Freelancer</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon name="explore" size={28} color={focused ? '#1e65bc' : 'gray'} />
        ),
      }}
      component={FreelancerStack}
    />
    <Tab.Screen
      name="Members"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Members</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon name="people" size={28} color={focused ? '#1e65bc' : 'gray'} />
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
            color={focused ? '#1e65bc' : 'gray'}
          />
        ),
      }}
      component={FreelancerSchedule}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarLabel: ({color}) => (
          <Text style={styles.tabBarLabel(color)}>Profile</Text>
        ),
        tabBarIcon: ({focused}) => (
          <Icon name="person" size={28} color={focused ? '#1e65bc' : 'gray'} />
        ),
      }}
      component={FreelancerProfile}
    />
  </Tab.Navigator>
);

const AuthStack = ({onAuthSuccess}) => (
  <Stack.Navigator name="Auth" headerMode="none">
    <Stack.Screen name="Login">
      {(props) => <Login {...{onAuthSuccess, ...props}} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const AppContainer = () => {
  const [isLogged, setIsLogged] = React.useState(true);

  const onAuthSuccess = () => setIsLogged(true);

  if (isLogged) {
    return <AppStack />;
  }

  return <AuthStack {...{onAuthSuccess}} />;
};

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <ActionSheetProvider>
        <AppContainer />
      </ActionSheetProvider>
    </NavigationContainer>
  </SafeAreaProvider>
);

const styles = {
  tabBarLabel: (color) => ({
    color,
    fontSize: 14,
  }),
};

export default App;
