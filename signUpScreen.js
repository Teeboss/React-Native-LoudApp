import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View , TextInput , Image , ScrollView , AsyncStorageStatic, Alert } from 'react-native';
import {Button , ThemeProvider , Text , Input, useTheme , Icon } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import QueryString from 'qs';


const Texts = (props) => {
    return (
      <Text styles={{fontFamily:'sans-serif-condensed'}}>
      </Text>
    )
  }
  const MarginButtomView = () => {
    return (
      <View style={{marginBottom : 10}}>
  
      </View>
    )
  }
  const MarginTopView = () => {
    return (
      <View style={{marginTop: 10}}>
  
      </View>
    )
  }
  const ButtonOutline = () => {
    return (
      <Button style={{backgroundColor: 'none' , border : 'white'}}/>
      )
  }
  const MarginLeftView = () => {
    return (
      <View style={{marginLeft:10}}>
  
      </View>
    )
  }



const SignUpScreen = ({navigation}) => {
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const [username , setUsername] = useState()



  const storeToken = async (user) => {
    try {
       await AsyncStorage.setItem("userData", user);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
   const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

   const signUpFunc = async (username , emails , passwords) => {
     const signUpBody = QueryString.stringify({
      uname : username ,
      email : emails,
      password : passwords,
      auth : "dldkhwi489e9fr03fdjdddj4fi0349rj9030r9j903fe"
    })
    await  fetch('https://mycligtestnet.000webhostapp.com/api/register.php' , {
        method: 'POST',
        headers : { "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        },
        body : signUpBody
      }).then((response) => response.json())
      .then((resp) => {
        if (resp.status) {
          navigation.navigate('mains')
          storeToken(JSON.stringify(responseJson))
        }else {
          Alert.alert(resp.messsage)
        }
      })
      .catch((error) => {
        console.log(error)
         Alert.alert('error connecting to the internet')})
   }

    const {theme} = useTheme()
    return(
      <ScrollView style={ styles.bgDark}>
      <SafeAreaView>
       <ThemeProvider>
       <View style={styles.wid90 } >
       <View style={[ styles.flex , styles.marginLeftSmall]}>
       <MarginButtomView />
       <MarginButtomView />
       <MarginButtomView />
       <MarginButtomView />
         <Text 
         style={[styles.text , styles.marginTopSmall]}
         h1 
         h1Style = {{color : theme?.colors?.grey5}}
         > 
         Loud<Text 
          style={styles.text}
          h1
          h1Style={{color : theme?.colors?.grey3}}
         >App
         </Text>
         </Text>
         <Text
          h4
          h4Style = {{color : theme?.colors?.grey5}}
          style = {styles.marginBottoms}
         >
         Sign up today to join our community
       </Text>
       <MarginTopView/>
       <MarginTopView/>
       <MarginTopView/>
       </View>
       <View 
        style={styles.centerAlignment}
       >
      <Input 
        label= 'Username'
        placeholder = ' Enter your Username'
        leftIcon = {
          {type: 'font-awesome' , name: 'user'}
        }
        onChangeText={(event => {setUsername(event)})}
      /> 
       <View 
      style= {styles.marginBottoms}
      />
        <Input 
        label= 'Email'
        placeholder = ' Enter your email here'
        leftIcon = {
          {type: 'font-awesome' , name: 'envelope'}
        }
        onChangeText={(event) => {setEmail(event)}}
      /> 
      <View 
      style= {styles.marginBottoms}
      />
      <Input 
        label = 'Password'
        placeholder = ' Enter your valid password here'
       // style = {styles.marginBottoms}
        secureTextEntry = {true}
        leftIcon = {
          {type: 'font-awesome' , name: 'lock'}
        }
        onChangeText={(event) => {setPassword(event)}}
       />
       
       </View>
       <View style = {{width: '50%' , alignSelf : 'center'}}
  >
       <Button
        buttonStyle={{marginLeft: '0%'}}
        title={'Join the community'}
        onPress={() => signUpFunc(username , email , password)}
       ></Button>
       </View>
       </View>
       </ThemeProvider>
      </SafeAreaView>
     </ScrollView>
    )
  }

  
const styles = StyleSheet.create({
    container: {
     fontFamily : 'sans-serif-condensed'
    },
    bgDark : {
     backgroundColor : 'black'
    },
    wid90 : {
      width : '95%'
    },
  
    rowDisplay : {
     flex : 1,
    },
    text: {
      fontWeight : "600",
      textAlign : "left"
    },
    flex: {
      display: 'flex',
    },
    marginBottoms : {
     marginBottom : 40,
    },
    MarginSmall : {
      marginBottom : 18,
    },
    marginLeftSmall : {
      marginLeft : 18,
    } ,
    marginTopSmall : {
      marginTop : 63
    },
    centerAlignment : {
      alignItems : 'center'
    }
  });
  
  export default SignUpScreen;