import {ActivityIndicator, StyleSheet, View , TextInput , ScrollView  , Alert , FlatList , useWindowDimensions  } from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button , ThemeProvider , Text , Input, useTheme , Icon , SearchBar , Image } from 'react-native-elements';
import { SafeAreaProvider , SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';


const [loading , setLoading ] = useState(false);
const [commentData , setCommentData] = useState([])

 export const getUname = async () => {
    try {
      let userDatas = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userDatas);
      console.log(data.uname)
      setUnameData(data)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
 export const fetchComment = (postid) => {
    const commentData = QueryString.stringify({
      postid : postid,
      profileuser : unameData.id,
      p_n : 1,
      i_c : 10,
      auth : '2o3389339iedkfjrkek3ewlk323293ierikwer'
    })
    const url = 'https://mycligtestnet.000webhostapp.com/api/comments.php'
    fetch(url , {method : 'POST' , body : commentData , headers : {  "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    }, }).then((response) => response.json()).then((responseJs)=> setCommentData(responseJs))
  }