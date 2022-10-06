import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Messa from "../mainScreen";
import CommentScreen from "./CommentScreen";
import { Icon } from "react-native-elements";
export const BottomNav = ({ active }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("mains");
        }}
      >
        {active == "mainPage" ? (
          <Icon type="ionicon" name="home" color={"white"} size={25} />
        ) : (
          <Icon type="ionicon" name="home-outline" color={"white"} style />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("popularity");
        }}
      >
        <Icon type="ionicon" name="musical-note" color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          type="ionicon"
          name="megaphone-outline"
          color={"white"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon type="ionicon" name="notifications-outline" color={"white"} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon type="ionicon" name="settings-outline" color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: "#121212",
    paddingVertical: 20,
    flex: 1,
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    top: 800,
    width: "100%",
  },
});
