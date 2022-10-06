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

const MarginButtomView = () => {
  return <View style={{ marginBottom: 10 }}></View>;
};

const HomeScreen = ({ navigation }) => {
  const [email, setMail] = useState();
  const [password, setPassword] = useState();
  const [storedId, setStoreId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPicture, setShowPicture] = useState(true);
  const [users, userState] = useState();

  // useEffect(()=> {
  //   async function fetchUsers() {
  //     const userDataJson = await Asy;ncStorage.getItem("userData");
  //     userState(userDataJson)
  //   }
  //   fetchUsers()
  // },[])

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      // alert("🔐 Here's your value 🔐 \n" + result);
      setStoreId(result);
      console.log("44444444444" + result);
    } else {
      //  alert('No values stored under that key.');
    }
  }

  const checkLogin = async () => {
    let data = await SecureStore.getItemAsync("unameData");
    if (data != null) {
      setLoading(true);
      navigation.navigate("mains", { userId: data });
      console.log("uuuuuuuuuu", data);
    } else {
      navigation.navigate("Home");
      // console.log("uuuuuuuuuu",data)
    }
  };

  async function removeValueFor(key) {
    await SecureStore.deleteItemAsync(key);
  }

  const storeToken = async (user) => {
    AsyncStorage.setItem("userData", JSON.stringify(user), () => {
      AsyncStorage.getItem("userData", (err, result) => {
        let data = JSON.parse(result);
        let dat = JSON.parse(data);
        userState(dat.id);
        console.log(dat.id);
      });
    });
  };
  //  const getToken = async () => {
  //   try {
  //     let userDatas = await AsyncStorage.getItem("userData");
  //     let data = JSON.parse(userDatas);
  //     console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuu',data.id)
  //     userState(data.id)
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // }

  // const getUsername = async () => {
  //   try {
  //     let userData = await AsyncStorage.getItem("userData");
  //     let data = JSON.parse(userData);
  //     data.map((item , key) => {
  //       console.log(item.uname)
  //     })
  //    // console.log(data);
  //   } catch (error) {
  //   }
  // }
  useEffect(() => {
    //removeValueFor("unameData")
    setTimeout(() => {
      setShowPicture(false);
    }, 9000);
    checkLogin();
  }, [showPicture]);
  //removeValueFor("unameData")
  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem("userData");
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // }
  // removeToken()
  //getUsername()

  const LoginFunction = (emails, passwords) => {
    setLoading(true);
    const BigBody = QueryString.stringify({
      username: emails,
      password: passwords,
      auth: "dldkhwi489e9fr034fi0349rj9030r9j903fe",
    });
    fetch("https://mycligtestnet.000webhostapp.com/api/login.php", {
      method: "POST",
      body: BigBody,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          //   storeToken(JSON.stringify(responseJson))
          //   console.log('rrrrrrrrrrrrrrrrrrrrr', users)
          //   navigation.navigate('mains' , {userId: users} )
          //  } else {
          //    Alert.alert(responseJson.body)
          save("unameData", responseJson.id);
          //console.log("$$$$$$$$"+ storedId)
          //let result = SecureStore.getItemAsync("unameData");
          setLoading(false);
          navigation.replace("mains", { userId: responseJson.id });
        } else {
          Alert.alert(responseJson.body);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Alert.alert("error connecting to the internet");
      });
  };

  //  useEffect(()=> {
  //    LoginFunction(email , password)
  //  },[])
  const { theme } = useTheme();
  return (
    <ScrollView style={styles.bgDark}>
      <SafeAreaView>
        <ThemeProvider>
          {showPicture ? (
            <Text style={{ color: "white", backgroundColor: "blue" }}>
              Hello This is the screen
            </Text>
          ) : (
            <View>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <MarginButtomView />
                <MarginButtomView />
                <MarginButtomView />
                <MarginButtomView />

                <Text
                  style={[styles.text, styles.marginTopSmall]}
                  h1
                  h1Style={{ color: theme?.colors?.grey5, fontSize: 44 }}
                >
                  Loud
                  <Text
                    style={styles.text}
                    h1
                    h1Style={{ color: theme?.colors?.grey3, fontSize: 44 }}
                  >
                    App
                  </Text>
                </Text>
                <Text
                  h4
                  h4Style={{
                    color: theme?.colors?.grey3,
                    fontSize: 18,
                    fontWeight: "400",
                  }}
                  style={{ fontSize: 12 }}
                >
                  immerse yourself in the future socialism
                </Text>
              </View>
              <View style={[styles.centerAlignment, { width: "95%" }]}>
                <Input
                  placeholder="Username or Email"
                  value={email}
                  style={{ marginTop: 50, width: "100%", color: "white" }}
                  onChangeText={(event) => setMail(event)}
                />
                <View style={styles.marginBottoms} />
                <Input
                  placeholder="Password"
                  // style = {styles.marginBottoms}
                  secureTextEntry={true}
                  value={password}
                  style={{ color: "white" }}
                  onChangeText={(event) => setPassword(event)}
                />
              </View>
              <View
                style={[
                  {
                    width: "90%",
                    alignSelf: "center",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#0A84FF",
                      fontSize: 18,
                      fontWeight: "400",
                    }}
                  >
                    use LOUD ID instead
                  </Text>
                </TouchableOpacity>

                <Icon
                  onPress={() => {
                    LoginFunction(email, password);
                    setLoading(false);
                  }}
                  size={27}
                  type="ionicon"
                  name="arrow-redo-outline"
                  color="white"
                  backgroundColor={"#0A84FF"}
                  containerStyle={{
                    backgroundColor: "#0A84FF",
                    paddingHorizontal: 36,
                    paddingVertical: 10,
                    borderRadius: 2,
                  }}
                />
              </View>
              <ActivityIndicator
                animating={loading}
                color="dodgerblue"
                size={90}
                style={{
                  position: "absolute",
                  width: "100%",
                  top: 450,
                  zIndex: 100,
                }}
              />
              {/* <LoaderKit animating={true}  style={{ width: 50, height: 50 }} name={'BallPulse'} size={50} color={'red'} /> */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "70%",
                  marginTop: 117,
                  alignSelf: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  title={"Sign Up"}
                  icon={{
                    type: "font-awesome",
                    name: "users",
                    color: "slategrey",
                  }}
                  titleStyle={{ color: "slategrey" }}
                  buttonStyle={{ color: "#0A84FF", backgroundColor: "none" }}
                  containerStyle={{ backgroundColor: "none" }}
                  iconPosition="top"
                  onPress={() => {
                    navigation.navigate("signUp");
                  }}
                />
                <View>
                  <Button
                    title={"GET ID"}
                    style={{ fontSize: 12 }}
                    containerStyle={{
                      backgroundColor: "#0A84FF",
                      borderRadius: 8,
                      padding: 4,
                      marginTop: 15,
                    }}
                    buttonStyle={{
                      flex: 1,
                      paddingHorizontal: 4,
                      fontSize: 15,
                      paddingVertical: 1,
                    }}
                  />
                </View>
                <Button
                  title={"Forgot?"}
                  icon={{
                    type: "font-awesome",
                    name: "unlock",
                    color: "slategrey",
                  }}
                  buttonStyle={{
                    backgroundColor: "none",
                    flex: 1,
                    paddingHorizontal: 10,
                  }}
                  iconPosition="top"
                  titleStyle={{ color: "slategrey" }}
                />
              </View>
            </View>
          )}
        </ThemeProvider>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif-condensed",
  },
  bgDark: {
    backgroundColor: "#121212",
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
    marginBottom: 25,
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
    alignSelf: "center",
  },
});

export default HomeScreen;
