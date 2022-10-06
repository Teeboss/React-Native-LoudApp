
import { useState  , useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View , TextInput , Image , ScrollView , AsyncStorageStatic, Alert } from 'react-native';
import {Button , ThemeProvider , Text , Input, useTheme , Icon , SearchBar } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import QueryString from 'qs';
const getUname = async () => {
    try {
      let userDatas = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userDatas);
      console.log(data.uname)
      return (
          <Text>
              {data.uname}
          </Text>
      )
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  export default getUname;