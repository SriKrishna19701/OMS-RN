import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './Authstack';
import AppTabs from './AppTabs';
import { AuthContext } from '../context/AuthContext';

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}   