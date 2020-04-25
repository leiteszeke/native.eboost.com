import React from 'react';
import {UserType} from '../constants';
import {navigate} from '../navigator';
import {getSession} from '../helpers/session';

export const UserContext = React.createContext();

const baseUser = {
  name: 'John Doe',
  email: 'john@doe.com',
  image: 'https://picsum.photos/100/100',
  profession: 'Martials Arts Instructor',
};

export const UserProvider = ({children}) => {
  const [isLogged, setIsLogged] = React.useState(true);
  const [userType, setUserType] = React.useState(UserType.CUSTOMER);
  const [user, setUser] = React.useState(baseUser);

  const changeType = (type) => setUserType(type);
  const onLoginSuccess = (type) => {
    if (type !== userType) {
      setUserType(type);
    }

    setIsLogged(true);
  };

  const init = async () => {
    const session = await getSession();

    if (session?.session) {
      setIsLogged(true);
      setUser(session.user);
    }
  };

  const onLogoutSuccess = () => setIsLogged(false);

  React.useEffect(() => {
    if (isLogged && userType) {
      navigate(userType === UserType.CUSTOMER ? 'Customer' : 'Freelancer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    if (isLogged) {
      setUser({
        name: 'John Doe',
        email: 'john@doe.com',
        image: 'https://picsum.photos/100/100',
        profession: 'Martials Arts Instructor',
      });
    }
  }, [isLogged]);

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
