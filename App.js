import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from './src/screens/Login';
import FreelancerHome from './src/screens/Freelancer/Home';

const Stack = createStackNavigator();

const FreelancerStack = () => (
  <Stack.Navigator name="Freelancer" headerMode="none">
    <Stack.Screen name="Home" component={FreelancerHome} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator name="App" headerMode="none">
    <Stack.Screen name="Freelancer" component={FreelancerStack} />
  </Stack.Navigator>
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
      <AppContainer />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
