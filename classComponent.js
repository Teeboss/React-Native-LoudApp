import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  AsyncStorageStatic,
  Alert,
} from "react-native";
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
import QueryString from "qs";

const Moment = () => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    switch (month) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "july";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        month = "";
        break;
    }
    setCurrentDate(date + " " + month + "," + year);
  }, []);
  return (
    <Text
      h4
      h4Style={{ color: theme?.colors?.grey3, fontSize: 18, fontWeight: "400" }}
    >
      {currentDate}
    </Text>
  );
};
export default Moment;
