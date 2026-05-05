import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";
import UserHomeScreen from "../screens/user/Homescreen";
import ApplyScreen from "../screens/user/ApplyScreen";
import UserProfileScreen from "../screens/user/ProfileScreen";
import UserHistoryScreen from "../screens/user/HistoryScreen";
import AdminHomeScreen from "../screens/admin/Homescreen";
import AdminProfileScreen from "../screens/admin/ProfileScreen";
import AdminHistoryScreen from "../screens/admin/HistoryScreen";

const Tab = createBottomTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
      }}
    >
      <Tab.Screen name="Home" component={UserHomeScreen} />
      <Tab.Screen name="Apply" component={ApplyScreen} />
      <Tab.Screen name="History" component={UserHistoryScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
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