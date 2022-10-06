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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";
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
import { BottomNav } from "./bottomNav";
// import deviceInfoModule, { getFontScale } from 'react-native-device-info';
import { LinearGradient } from "expo-linear-gradient";
import HTMLView from "react-native-htmlview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useRef } from "react";
import { Video } from "expo-av";

const MarginTopView = () => {
  return <View style={{ marginTop: 10 }}></View>;
};

const CommentScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [unameData, setUnameData] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [postData, setPostData] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const [commentText, onChangeCommentText] = useState("");
  const [status, setStatus] = React.useState({});
  const { route } = props;
  const Tab = createBottomTabNavigator();
  const postId = route.params.postId;
  const userId = route.params.userId;
  const video = useRef(null);

  const fetchComment = async (postid, userid) => {
    const commentData = QueryString.stringify({
      postid: postid,
      profileuser: userid,
      p_n: 1,
      i_c: 10,
      auth: "2o3389339iedkfjrkek3ewlk323293ierikwer",
    });
    const url = "https://mycligtestnet.000webhostapp.com/api/comments.php";
    await fetch(url, {
      method: "POST",
      body: commentData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((responseJs) => {
        setCommentData(responseJs[0].comments);
        setPostData(responseJs[0].post);
      })
      .catch((error) => {
        console.log(postId);
      });
  };

  const fetchNewComment = async (postid, comment) => {
    const newCommentData = QueryString.stringify({
      postid: postid,
      profileuser: userId,
      p_n: 1,
      i_c: 10,
      comment: comment,
      auth: "2o3389339iedkfjrkek3ewlk323293ierikwer",
    });
    const url = "https://mycligtestnet.000webhostapp.com/api/comments.php";
    await fetch(url, {
      method: "POST",
      body: newCommentData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((responseJs) => {
        setCommentData(responseJs[0].comments);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchComment(postId, userId);
  }, []);
  // console.log(postData)
  //console.log(commentData)
  const bottomSheet = useRef();
  const itemViewComment = ({ item, index }) => {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", borderWidth: 0, zIndex: 3 }}
      >
        <View style={styles.commentContainer}>
          <Image
            source={{ uri: item.commentBYprofilepic }}
            containerStyle={styles.imageContainer}
          />
          <Text
            h5
            h5Style={{ fontWeight: "100" }}
            style={[styles.text, { color: "white" }]}
            onPress={() => {
              Alert.alert(item.comment);
            }}
          >
            {item.comment}
          </Text>
        </View>
        <MarginTopView />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={[styles.bgDark]}>
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
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: postData.postvid,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
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
        <View>
          <Text style={[styles.videoText]}>Music Stream!, Guiter Playing</Text>
        </View>
        <View
          style={{
            marginTop: "3%",
            marginBottom: "10%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {postData.like_status == "liked" ? (
            <Button
              title={postData.Like}
              icon={{ type: "font-awesome", name: "heart", color: "red" }}
              buttonStyle={{
                backgroundColor: "black",
                marginRight: 1,
                borderRadius: 14,
                padding: 9,
              }}
              onPress={() => {
                Unlike(postData.postid);
              }}
            />
          ) : (
            <Button
              title={postData.Like}
              icon={{ type: "font-awesome", name: "heart", color: "grey" }}
              buttonStyle={{
                backgroundColor: "black",
                borderRadius: 14,
                padding: 9,
              }}
              onPress={() => {
                likeUnlike(postData.postid);
              }}
            />
          )}

          <Button
            icon={{ type: "font-awesome", name: "user", color: "white" }}
            iconContainerStyle={{ color: "white" }}
            buttonStyle={{
              backgroundColor: "black",
              borderRadius: 14,
              padding: 9,
            }}
          />
          <Button
            icon={{ type: "font-awesome", name: "comments", color: "white" }}
            iconContainerStyle={{ color: "white" }}
            onPress={() => bottomSheet.current.show()}
            buttonStyle={{
              backgroundColor: "black",
              borderRadius: 14,
              padding: 9,
            }}
          />

          {/* <Button 
           title= {<FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>}
           buttonStyle={{backgroundColor : "white"}}
           onPress={() => {} }
           /> */}
          <TouchableOpacity disabled={false}></TouchableOpacity>
          <LinearGradient
            colors={["#cc2b5e", "#753a88"]}
            style={styles.linearDesign}
            onPress={() => setModalVisibility(true)}
          >
            <Text style={styles.linearText}>TuneIN </Text>
          </LinearGradient>
        </View>
        <BottomNav active={"centScreen"} />
      </View>
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={690}
        sheetBackgroundColor="#282828"
      >
        <FlatList
          extraData={commentData}
          style={{ backgroundColor: "none" }}
          data={commentData}
          renderItem={itemViewComment}
          keyExtractor={(item, index) => item.commentID}
        ></FlatList>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-evenly",
                backgroundColor: "#282828",
                padding: 5,
                width: Dimensions.get("window").width / 1.2,
                borderRadius: 36,
                marginBottom: 27,
              },
            ]}
          >
            <TextInput
              style={styles.inputText}
              onChangeText={(event) => onChangeCommentText(event)}
              value={commentText}
            />
            <Button
              icon={{
                type: "font-awesome",
                name: "camera",
                color: "white",
                size: 18,
              }}
              iconContainerStyle={{ color: "white" }}
              buttonStyle={{
                backgroundColor: "#282828",
                borderRadius: 14,
                padding: 3,
                marginTop: 6,
              }}
            />
            <View style={{ marginTop: 8 }}>
              <Icon
                onPress={() => {
                  console.log(fetchNewComment(postId, commentText));
                }}
                size={18}
                type="ionicon"
                name="send"
                color="white"
                style={{
                  backgroundColor: "#ffff",
                  borderRadius: 14,
                  padding: 3,
                }}
              />
            </View>
          </View>
        </View>
      </BottomSheet>
      {/* </BottomSheet> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif-condensed",
  },
  videoText: {
    // fontSize: useWindowDimensions().fontScale,
    fontSize: Dimensions.get("window").fontScale * 18,
    width: Dimensions.get("window").width / 1.5,
    color: "white",
    marginLeft: 18,
    fontWeight: "400",
  },
  inputText: {
    backgroundColor: "#454545",
    //marginTop: 45,
    borderRadius: 20,
    fontSize: Dimensions.get("window").fontScale * 18,
    padding: 9,
    width: Dimensions.get("window").width / 1.6,
    height: 40,
  },
  commentModal: {
    backgroundColor: "black",
    height: Dimensions.get("window").height / 1.5,
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
  },
  lineBtn: {
    width: 200,
    height: 13,
    color: "#282828",
    backgroundColor: "#282828",
    alignSelf: "center",
    marginTop: "3%",
    borderRadius: 14,
  },
  commentContainer: {
    padding: 7,
    alignSelf: "flex-start",
    flex: 1,
    flexDirection: "row",
    marginLeft: 18,
    marginTop: 18,
    backgroundColor: "#454545",
    borderRadius: 20,
  },
  imageContainer: {
    marginRight: 4,
    height: 22.5,
    width: 22.5,
    borderRadius: 22.5 / 2,
    backgroundColor: "indigo",
    resizeMode: "stretch",
  },
  bgDark: {
    backgroundColor: "#121212",
    marginTop: -30,
    height: Dimensions.get("window").height,
  },
  bgWhite: {
    backgroundColor: "white",
  },
  bgDarkOne: {
    color: "#282828",
  },
  whiteColor: {
    color: "white",
  },
  wid90: {
    width: "95%",
  },

  rowDisplay: {
    flex: 1,
  },
  text: {
    fontWeight: "100",
    fontSize: Dimensions.get("window").fontScale * 14 + 2,
    textAlign: "left",
  },
  linearDesign: {
    textAlign: "center",
    paddingHorizontal: "12%",
    borderRadius: 12,
  },
  linearText: {
    color: "white",
    marginTop: "21%",
    fontWeight: "bold",
    fontSize: Dimensions.get("window").fontScale * 18 + 2,
    textAlign: "center",
  },
  containers: {
    // flex: 1,
  },
  backgroundImage: {
    flex: 1,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 9,
    height: 400,
    width: "100%",
    resizeMode: "cover", // or 'stretch'
  },
  video: {
    width: Dimensions.get("window").width,
    marginTop: 0,
    height: 300,
    borderBottomEndRadius: 14,
    borderBottomStartRadius: 14,
  },
  flex: {
    display: "flex",
  },
  marginBottoms: {
    marginBottom: 40,
  },
  iconImage: {
    width: "20%",
  },
  MarginSmall: {
    marginBottom: 18,
  },
  marginLeftSmall: {
    marginLeft: 18,
  },

  marginLeftSmallOne: {
    marginLeft: "2%",
  },
  marginTopSmall: {
    marginTop: 63,
  },
  centerAlignment: {
    alignItems: "center",
  },

  containerContent: { flex: 1, marginTop: 40 },
  containerHeader: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#F1F1F1",
  },
  headerContent: {
    marginTop: 0,
  },
  Modal: {
    backgroundColor: "#005252",
    marginTop: 0,
  },
});
export default CommentScreen;
