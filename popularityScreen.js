import TrackPlayer from "react-native-track-player";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
  Image,
  FlatList,
  useWindowDimensions,
  Dimensions,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component, useEffect, useState, Suspense, useRef } from "react";

const tracks = [
  {
    url: require("./tracks/Alan_WalkerOne.mp3"), // Load media from the network
    title: "Avaritia",
    artist: "deadmau5",
    album: "while(1<2)",
    genre: "Progressive House, Electro House",
    date: "2014-05-20T07:00:00+00:00", // RFC 3339
    duration: 402, // Duration in seconds
  },
  {
    url: require("./tracks/Alan_WalkerTwo.mp3"), // Load media from the app bundle
    title: "Coelacanth I",
    artist: "deadmau5",
    duration: 166,
  },
];

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

const Popularity = () => {
  return <View></View>;
};

const styles = StyleSheet.create({});
export default Popularity;
