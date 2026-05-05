import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
          height: 60,
          paddingBottom: 5
        },
        tabBarActiveTintColor: '#4B6396',
        tabBarInactiveTintColor: '#718096',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tab.Screen name="Home" component={UserHomeScreen} />
      <Tab.Screen name="History" component={UserHistoryScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
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
          height: 60,
          paddingBottom: 5
        },
        tabBarActiveTintColor: '#4B6396',
        tabBarInactiveTintColor: '#718096',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tab.Screen name="Requests" component={AdminHomeScreen} />
      <Tab.Screen name="History" component={AdminHistoryScreen} />
      <Tab.Screen name="Profile" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppTabs() {
  const { user } = useContext(AuthContext);
  
  return user?.role === "admin" ? <AdminTabs /> : <UserTabs />;
}