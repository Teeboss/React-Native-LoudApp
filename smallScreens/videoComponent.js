import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { Component, memo, useEffect, useRef, useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function VideoPlayer({ viewable, id, source, userIds }) {
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (viewable) {
      if (viewable.length) {
        if (viewable[0].postid === id) {
          videoRef.current.playAsync();
        } else {
          videoRef.current.pauseAsync();
        }
      } else {
        console.log("nos");
        videoRef.current.pauseAsync();
      }
    } else {
      console.log("nooo");
      videoRef.current.pauseAsync();
    }
  }, [viewable]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("focus");
      videoRef.current.playAsync();
    });
    return unsubscribe;
  }, [navigation]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("blur");
      videoRef.current.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("comments", { postId: id, userId: userIds });
        }}
        isLooping
      >
        <Video
          ref={videoRef}
          source={{ uri: source }}
          rate={1.0}
          volume={1.0}
          resizeMode={"contain"}
          shouldPlay
          style={styles.video}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    marginTop: 2,
    marginBottom: 2,
  },
  video: {
    width: Dimensions.get("window").width,
    height: 300,
  },
});
