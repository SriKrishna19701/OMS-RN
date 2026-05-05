import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from "../context/AuthContext";
import UserHomeScreen from "../screens/user/Homescreen";
import ApplyScreen from "../screens/user/ApplyScreen";
import UserProfileScreen from "../screens/user/ProfileScreen";
import UserHistoryScreen from "../screens/user/HistoryScreen";
import AdminHomeScreen from "../screens/admin/Homescreen";
import AdminProfileScreen from "../screens/admin/ProfileScreen";
import AdminHistoryScreen from "../screens/admin/HistoryScreen";

const Tab = createMaterialTopTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarIndicatorStyle: { height: 0 },
        tabBarStyle: { 
          backgroundColor: '#FFF', 
          borderTopWidth: 1, 
          borderTopColor: '#E2E8F0',
          height: 70,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#4B6396',
        tabBarInactiveTintColor: '#718096',
        tabBarLabelStyle: { 
          fontSize: 10, 
          fontWeight: '700', 
          textTransform: 'none',
          marginTop: 2,
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarShowIcon: true,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={UserHomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="History" 
        component={UserHistoryScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarIndicatorStyle: { height: 0 },
        tabBarStyle: { 
          backgroundColor: '#FFF', 
          borderTopWidth: 1, 
          borderTopColor: '#E2E8F0',
          height: 70,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#4B6396',
        tabBarInactiveTintColor: '#718096',
        tabBarLabelStyle: { 
          fontSize: 10, 
          fontWeight: '700', 
          textTransform: 'none',
          marginTop: 2,
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarShowIcon: true,
      }}
    >
      <Tab.Screen 
        name="Requests" 
        component={AdminHomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="assignment" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="History" 
        component={AdminHistoryScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={AdminProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppTabs() {
  const { user } = useContext(AuthContext);
  
  return user?.role === "admin" ? <AdminTabs /> : <UserTabs />;
}