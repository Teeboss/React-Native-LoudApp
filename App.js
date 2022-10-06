import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import mainScreen from "./mainScreen";
import Popularity from "./popularityScreen";
import CommentScreen from "./smallScreens/CommentScreen";
//import signUp from './signUpScreen'
import {
  Button,
  ThemeProvider,
  Text,
  Input,
  useTheme,
  Icon,
} from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import signUpScreen from "./signUpScreen";
import { Component, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStorage from "expo-secure-store";

const Stack = createNativeStackNavigator();
export default function App() {
  const [loggedIn, setLoggedIn] = useState();
  const { theme } = useTheme();
  const Tab = createBottomTabNavigator();
  const setLogData = async () => {
    let result = await SecureStorage.getItemAsync("unameData");
    if (result) {
      // console.log("resullll" , loggedIn)
      // setLoggedIn(result)
      return result;
    } else {
      return undefined;
    }
  };
  useEffect(() => {
    setLogData().then((w) => {
      setLoggedIn(w);
      console.log("wwwwwwwwwwwwwwww", loggedIn);
    });
  }, [loggedIn]);

  return (
    <NavigationContainer>
      {/* <Tab.Navigator>
        <Tab.Screen
        initialRouteName
        />
      </Tab.Navigator> */}
      {/* <Stack.Navigator  {...loggedIn ? initialRouteName='mains' : initialRouteName='mains'  }> */}
      <Stack.Navigator
        initialRouteName={loggedIn ? "main" : "Home"}
        ini
        headerMode="none"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          component={signUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="mains"
          component={mainScreen}
          options={{ headerShown: false }}
          initialParams={{ userId: loggedIn }}
        />
        <Stack.Screen name="popularity" component={Popularity} />
        <Stack.Screen
          name="comments"
          headerMode={false}
          component={CommentScreen}
          options={{
            headerShown: true,
            headerMode: "none",
            headerStyle: { backgroundColor: "#121212" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            title: "Home",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif-condensed",
  },
  bgDark: {
    backgroundColor: "black",
  },
  wid90: {
    width: "95%",
  },

  rowDisplay: {
    flex: 1,
  },
  text: {
    fontWeight: "600",
    textAlign: "left",
  },
  flex: {
    display: "flex",
  },
  marginBottoms: {
    marginBottom: 40,
  },
  MarginSmall: {
    marginBottom: 18,
  },
  marginLeftSmall: {
    marginLeft: 18,
  },
  marginTopSmall: {
    marginTop: 63,
  },
  centerAlignment: {
    alignItems: "center",
  },
});
