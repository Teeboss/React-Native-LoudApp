import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  ThemeProvider,
  Text,
  Input,
  useTheme,
  Icon,
} from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import signUpScreen from "./signUpScreen";
import QueryString from "qs";
//import LoaderKit from 'react-native-loader-kit'
import React, { Component, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const welcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={styles.container} />
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View
          style={{ padding: "3%", backgroundColor: "white", borderRadius: 12 }}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "50%",
  },
});
