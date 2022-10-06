import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  FlatList,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  ThemeProvider,
  Text,
  Input,
  useTheme,
  Icon,
  SearchBar,
  Image,
} from "react-native-elements";
import QueryString from "qs";
//import { BottomSheet } from "react-native-btr"
import BottomSheet from "react-native-gesture-bottom-sheet";
// import deviceInfoModule, { getFontScale } from 'react-native-device-info';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCoffee, faHeart } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import HTMLView from "react-native-htmlview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useRef } from "react";
import VideoPlayer from "./videoComponent";
const smallMainScreen = ({
  postText,
  video,
  image,
  postId,
  Like,
  viewable,
  postVid,
}) => {
  //  const [viewable , setViewable] = React.useState([]);
  //  const ref = React.useRef(null)

  return (
    <View style={styles.containers}>
      {postData.postImage != "" ? (
        <Image
          source={{ uri: postData.postImage }}
          containerStyle={styles.backgroundImage}
        >
          <View style={styles.loginForm}>
            <HTMLView
              textComponentProps={{
                style: {
                  color: "white",
                  fontSize: Dimensions.get("window").fontScale * 18 + 2,
                },
              }}
              value={`<p>${postData.postbody}</p>`}
            />
          </View>
        </Image>
      ) : postData.postvid != "" ? (
        <View>
          <VideoPlayer id={postId} viewable={viewable} source={postVid} />
          <HTMLView
            textComponentProps={{
              style: {
                color: "white",
                fontSize: Dimensions.get("window").fontScale * 18 + 2,
              },
            }}
            value={`<p>${postData.postbody}</p>`}
          />
        </View>
      ) : (
        <HTMLView
          textComponentProps={{
            style: {
              color: "white",
              fontSize: Dimensions.get("window").fontScale * 18 + 2,
            },
          }}
          value={`<p>${postData.postbody}</p>`}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  loginForm: {},
});
export default smallMainScreen;
