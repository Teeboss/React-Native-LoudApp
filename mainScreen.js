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
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomNav } from "./smallScreens/bottomNav";
import {
  Button,
  ThemeProvider,
  Text,
  Input,
  useTheme,
  Icon,
  SearchBar,
} from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import signUpScreen from "./signUpScreen";
import QueryString from "qs";
import React, { Component, useEffect, useState, Suspense, useRef } from "react";
import { render } from "react-dom";
import HomeScreen from "./HomeScreen";
import VideoPlayer from "./smallScreens/videoComponent";
import CommentScreen from "./smallScreens/CommentScreen";
import { useNavigation } from "@react-navigation/native";
import HTMLView from "react-native-htmlview";
//import { pushToken } from './HomeScreen';
import Moment from "./classComponent";
import RenderHTML from "react-native-render-html";

const MarginTopView = () => {
  return <View style={{ marginTop: 10 }}></View>;
};

const Messa = (props) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const [data, setData] = useState([]);
  const [unameData, setUnameData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState();
  const [Viewable, setViewable] = useState([]);
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { route } = props;
  const navigation = useNavigation();
  const userId = route.params.userId;
  const OnviewRef = useRef((viewableItems) => {
    let check = [];
    for (let i = 0; i < viewableItems.viewableItems.length; i++) {
      check.push(viewableItems.viewableItems[i].item);
    }
    setViewable(check);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 });

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    setLoading(true);
    let datas = QueryString.stringify({
      profileuser: userId,
      p_n: pageNumber,
      i_c: 10,
      auth: "mvvmruoaags78774089gvsngrtywpqqwerg34567vbfbn",
    });
    const url = "https://mycligtestnet.000webhostapp.com/api/main.php";
    fetch(url, {
      method: "POST",
      body: datas,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJs) => {
        "%%%%%%%%%%%%%", console.log(responseJs[0].postDate);
        // setPageNumber(pageNumber)
        setData(responseJs);
        setLoading(false);
      })
      .catch((error) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@r", error);
        Alert.alert("Error Loading, Check your connection and try again later");
        setLoading(false);
      });
  };
  const fetchLikes = async (id) => {
    const datas = QueryString.stringify({
      userid: userId,
      postId: id,
    });
    const url = "https://mycligtestnet.000webhostapp.com/api/postlikes.php";
    await fetch(url, {
      method: "POST",
      body: datas,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((responseJs) => {
        console.log(responseJs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Liked = (currentId) => {
    fetchLikes(currentId);
    setData((existingItem) => {
      const itemIndex = existingItem.findIndex(
        (item) => item.postid === currentId
      );
      return [
        ...existingItem.slice(0, itemIndex),
        {
          ...existingItem[itemIndex],
          Like: parseInt(existingItem[itemIndex].Like) + 1,
          like_status: "liked",
        },
        ...existingItem.slice(itemIndex + 1),
      ];
    });
  };
  const unLike = (currentId) => {
    fetchLikes(currentId);
    setData((existingItem) => {
      const itemIndex = existingItem.findIndex(
        (item) => item.postid === currentId
      );
      return [
        ...existingItem.slice(0, itemIndex),
        {
          ...existingItem[itemIndex],
          Like: parseInt(existingItem[itemIndex].Like) - 1,
          like_status: "not_liked",
        },
        ...existingItem.slice(itemIndex + 1),
      ];
    });
  };

  const itemView = ({ item }) => {
    return (
      <View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={{ uri: item.postedbyprofileimage }}
            style={styles.imageContainer}
          />
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text
              style={[
                styles.iconText,
                styles.iconFont,
                { marginTop: 9, fontWeight: "bold" },
              ]}
            >
              {item.postedby}
            </Text>
            <Text
              style={[
                styles.shadowIconText,
                { marginTop: 4, fontWeight: "bold" },
              ]}
            >
              @This is you
            </Text>
          </View>
        </View>
        {item.postImage != "" && item.postbody != "" ? (
          <ImageBackground
            source={{ uri: item.postImage }}
            style={styles.backgroundImage}
          >
            <View
              style={{
                position: "absolute",
                top: 300,
                left: 3,
                right: 0,
                width: "98%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                bottom: 0,
                padding: 13,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HTMLView
                textComponentProps={{
                  style: styles.HTMLtext,
                }}
                value={`<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum eveniet eius voluptatibus est amet aperiam autem, obcaecati ullam exercitationem fuga laborum ipsa officia, voluptas cupiditate consequatur? Magni, in. Qui, ex.  
                ${item.postbody}</p>`}
              />
            </View>
          </ImageBackground>
        ) : item.postImage != "" && item.postbody == "" ? (
          <ImageBackground
            source={{ uri: item.postImage }}
            style={styles.backgroundImage}
          ></ImageBackground>
        ) : item.postvid != "" && item.postbody != "" ? (
          <View>
            <VideoPlayer
              source={item.postvid}
              id={item.postid}
              viewable={Viewable}
              userIds={userId}
            />
            <HTMLView
              textComponentProps={{
                style: styles.HTMLtext,
              }}
              value={`<p>${item.postbody}</p>`}
            />
          </View>
        ) : item.postvid != "" && item.postbody == "" ? (
          <View>
            <VideoPlayer
              source={item.postvid}
              id={item.postid}
              viewable={Viewable}
              userIds={userId}
            />
            <Text style={styles.text}>{item.postid}</Text>
          </View>
        ) : (
          <HTMLView
            textComponentProps={{
              style: styles.HTMLtext,
            }}
            value={`<p>${item.postbody}</p>`}
          />
        )}
        <View
          style={{
            marginTop: "0%",
            marginBottom: "5%",
            marginLeft: "3%",
            flex: 1,
            flexDirection: "row",
            // justifyContent: "space-around",
          }}
        >
          {item.like_status == "liked" ? (
            <Button
              title={item.Like}
              icon={{
                type: "ionicon",
                name: "heart",
                color: "#98002e",
                size: 30,
              }}
              buttonStyle={{ backgroundColor: "transparent", padding: 0 }}
              onPress={() => {
                unLike(item.postid);
              }}
            />
          ) : (
            <Button
              title={item.Like}
              icon={{
                type: "ionicon",
                name: "heart-outline",
                color: "#98002e",
                size: 30,
              }}
              buttonStyle={{ backgroundColor: "transparent", padding: 0 }}
              onPress={() => {
                Liked(item.postid);
              }}
            />
          )}
          <TouchableWithoutFeedback>
            <Button
              title={item.postDate}
              style={{ color: "slategrey" }}
              icon={{
                type: "ionicon",
                name: "time",
                color: "slategrey",
                size: 30,
              }}
              buttonStyle={{ padding: 0, backgroundColor: "transparent" }}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Button
              title={"Replies"}
              style={{ color: "slategrey" }}
              icon={{
                type: "ionicon",
                name: "chatbox-ellipses-outline",
                color: "slategrey",
                size: 30,
              }}
              buttonStyle={{ padding: 0, backgroundColor: "transparent" }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ThemeProvider>
        <View style={styles.bgDark}>
          <MarginTopView />
          <MarginTopView />
          <View style={{ width: "90%", alignSelf: "center", marginBottom: 20 }}>
            {Moment()}
            <Text
              style={styles.text}
              h1
              h1Style={{ color: theme?.colors?.grey5, fontWeight: "400" }}
            >
              LoudApp
            </Text>
            <MarginTopView />
            <SearchBar
              placeholder="yo! Find someone, a trend or service"
              onChangeText={(event) => {
                setSearch(event);
              }}
              value={search}
              inputContainerStyle={{
                padding: 7,
                height: 38,
                borderRadius: 7,
                backgroundColor: "#d7d7d7",
                borderEndWidth: 7,
              }}
              containerStyle={{ backgroundColor: "black", padding: 0 }}
              showCancel
            />
          </View>
          <ActivityIndicator
            animating={loading}
            size={90}
            style={{
              position: "absolute",
              top: "35%",
              left: "37%",
              zIndex: 23,
            }}
            color="dodgerblue"
          ></ActivityIndicator>
          <FlatList
            extraData={data}
            data={data}
            style={styles.postStyle}
            renderItem={itemView}
            keyExtractor={(item, index) => item.postid}
            onViewableItemsChanged={OnviewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
        </View>

        <BottomNav active={"mainPage"} />
      </ThemeProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif-condensed",
  },
  bgDark: {
    backgroundColor: "#121212",
    height: Dimensions.get("window").height,
  },
  wid90: {
    width: "95%",
  },
  postStyle: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 44,
  },
  rowDisplay: {
    flex: 1,
  },
  text: {
    fontWeight: "200",
    color: "slategrey",
  },
  HTMLtext: {
    color: "white",
    fontSize: 18,
    flex: 1,
    marginTop: 200,
    padding: 400,
    fontWeight: "bold",
    height: 100,
  },
  iconText: {
    color: "white",
  },
  shadowIconText: {
    fontSize: 15,
    color: "slategrey",
    marginTop: 0,
    fontStyle: "italic",
  },
  iconFont: {
    fontSize: 20,
  },
  containers: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    margin: 9,
    height: 400,
    textAlign: "center",

    width: "100%",
    resizeMode: "cover", // or 'stretch'
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
  imageContainer: {
    padding: 9,
    margin: 9,
    height: 45,
    width: 45,
    backgroundColor: "dodgerblue",
    resizeMode: "stretch",
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
});
export default Messa;
