import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { user,logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Admin Profile</Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Name: {user.name}</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>Email: {user.email}</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>Role: {user.role}</Text>
        <Text style={{ fontSize: 18, marginTop: 20, color: 'blue' }} onPress={logout}>Logout</Text>
    </View>
  );
};

export default ProfileScreen;