import React from 'react';
import {UserType} from '../constants';
import {navigate} from '../navigator';
import {getSession, removeSession} from '../helpers/session';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [isLogged, setIsLogged] = React.useState(null);
  const [userType, setUserType] = React.useState(UserType.FREELANCER);
  const [user, setUser] = React.useState(null);

  const changeType = (type) => setUserType(type);

  const fetchUser = async () => {
    const session = await getSession();
    setUser(session);
  };

  const onLoginSuccess = (type) => {
    fetchUser();

    if (type !== userType) {
      setUserType(type);
    }

    setIsLogged(true);
  };

  const init = async () => {
    const session = await getSession();

    if (session) {
      setIsLogged(true);
      setUser(session);
    } else {
      setIsLogged(false);
    }
  };

  const onLogoutSuccess = async () => {
    await removeSession();
    setIsLogged(false);
  };

  React.useEffect(() => {
    if (isLogged && userType) {
      navigate(userType === UserType.CUSTOMER ? 'Customer' : 'Freelancer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  React.useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        userType,
        setUser,
        user,
        changeType,
        onLoginSuccess,
        onLogoutSuccess,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
