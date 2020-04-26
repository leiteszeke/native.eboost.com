import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Animated,
  Easing,
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import {UserType} from '../../constants';
import {useUser} from '../../hooks/User';
import LogoImage from '../../images/logo.png';
import {parseErrors} from '../../helpers/errors';
import {LoginUserSchema, RegisterUserSchema} from '../../schemas/User';
import * as User from '../../services/User';
import {setSession, updateSession} from '../../helpers/session';

const Login = () => {
  const loginLeft = React.useRef(new Animated.Value(400)).current;
  const registerLeft = React.useRef(new Animated.Value(0)).current;
  const [loginData, setLoginData] = React.useState(null);
  const [registerData, setRegisterData] = React.useState(null);
  const {onLoginSuccess} = useUser();
  const [userType, setUserType] = React.useState(UserType.FREELANCER);
  const [errors, setErrors] = React.useState(null);

  const goLogin = () => {
    Animated.timing(registerLeft, {
      toValue: -400,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(loginLeft, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const goRegister = () => {
    Animated.timing(registerLeft, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(loginLeft, {
      toValue: 400,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const setValue = (name, form) => (e) => {
    e.persist();

    if (form === 'login') {
      setLoginData((prev) => ({
        ...prev,
        [name]: e?.nativeEvent?.text,
      }));
    }

    if (form === 'register') {
      setRegisterData((prev) => ({
        ...prev,
        [name]: e?.nativeEvent?.text,
      }));
    }
  };

  const setType = (type) => () => setUserType(type);

  const onLogin = async () => {
    try {
      setErrors(null);

      await LoginUserSchema.validateSync(loginData || {}, {
        abortEarly: false,
      });

      User.login(loginData).then(async (res) => {
        await setSession(res);

        User.get(res.type).then(async (resp) => {
          await updateSession(resp);
        });
      });
    } catch (e) {
      const parsedErrors = parseErrors(e);
      setErrors(parsedErrors);
    }
  };

  const onRegister = async () => {
    try {
      setErrors(null);

      await RegisterUserSchema.validateSync(registerData || {}, {
        abortEarly: false,
      });

      User.register(registerData).then(async (res) => {
        await setSession(res);

        User.get(res.type).then(async (resp) => {
          await updateSession(resp);
        });
      });
    } catch (e) {
      const parsedErrors = parseErrors(e);
      setErrors(parsedErrors);
    }
  };

  React.useEffect(() => {
    if (errors !== null) {
      Alert.alert(
        'Error',
        Object.entries(errors)
          .map(([key, value]) => `${value}.`)
          .join('\r\n'),
      );
    }
  }, [errors]);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#0650d4', '#3080bd']}
      style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={LogoImage}
            />
          </View>
          <View style={styles.content}>
            <Animated.View
              style={[
                styles.login,
                {
                  transform: [{translateX: registerLeft}],
                },
              ]}>
              <Text style={styles.title}>Create an Account</Text>
              <View style={styles.userButtons}>
                <Button
                  gradient={{
                    start: {x: 0, y: 0},
                    end: {x: 1, y: 0},
                    colors: ['#0650d4', '#3080bd'],
                  }}
                  round
                  style={styles.marginRight}
                  onPress={setType(UserType.FREELANCER)}
                  disableStyle={userType !== UserType.FREELANCER}
                  label={UserType.FREELANCER}
                />
                <Button
                  gradient={{
                    start: {x: 0, y: 0},
                    end: {x: 1, y: 0},
                    colors: ['#0650d4', '#3080bd'],
                  }}
                  style={styles.marginLeft}
                  round
                  onPress={setType(UserType.CUSTOMER)}
                  disableStyle={userType !== UserType.CUSTOMER}
                  label={UserType.CUSTOMER}
                />
              </View>
              <View style={styles.form}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="gray"
                  placeholder="Full Name"
                  value={registerData?.username}
                  autoCapitalize="none"
                  onChange={setValue('username', 'register')}
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="gray"
                  placeholder="Email"
                  value={registerData?.email}
                  autoCapitalize="none"
                  onChange={setValue('email', 'register')}
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="gray"
                  placeholder="Password"
                  value={registerData?.password}
                  autoCapitalize="none"
                  onChange={setValue('password', 'register')}
                  secureTextEntry={true}
                />
              </View>

              <Button
                gradient={{
                  start: {x: 0, y: 0},
                  end: {x: 1, y: 0},
                  colors: ['#0650d4', '#3080bd'],
                }}
                style={styles.submitButton}
                onPress={onRegister}
                label="SIGN UP"
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={goLogin}>
                  <Text style={styles.link}>Log In</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            <Animated.View
              style={[styles.register, {transform: [{translateX: loginLeft}]}]}>
              <Text style={styles.title}>Welcome back!</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="gray"
                  placeholder="Email"
                  value={loginData?.email}
                  autoCapitalize="none"
                  onChange={setValue('email', 'login')}
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="gray"
                  placeholder="Password"
                  value={loginData?.password}
                  autoCapitalize="none"
                  onChange={setValue('password', 'login')}
                  secureTextEntry={true}
                />
              </View>

              <Button
                gradient={{
                  start: {x: 0, y: 0},
                  end: {x: 1, y: 0},
                  colors: ['#0650d4', '#3080bd'],
                }}
                style={styles.submitButton}
                onPress={onLogin}
                label="SIGN IN"
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={goRegister}>
                  <Text style={styles.link}>Create an account</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.safeAreaBottom} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safeAreaBottom: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    height: 34,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center',
  },
  logo: {
    height: 100,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    flex: 1,
    position: 'relative',
    borderTopRightRadius: 24,
    padding: 24,
  },
  login: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 24,
    top: 24,
  },
  register: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 24,
    top: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  userButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  marginLeft: {
    marginLeft: 6,
  },
  marginRight: {
    marginRight: 6,
  },
  form: {
    marginVertical: 20,
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
  submitButton: {
    marginBottom: 12,
    borderRadius: 8,
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'gray',
    marginBottom: 8,
  },
  link: {
    color: '#0650d4',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;
