import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/auth/LoginScreen";
import { View,Text } from "react-native";

const Tab = createBottomTabNavigator();

const Home = () => <View><Text>Home</Text></View>
const Profile = () => <View><Text>Profile</Text></View>
const History = () => <View><Text>History</Text></View>

export  default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}