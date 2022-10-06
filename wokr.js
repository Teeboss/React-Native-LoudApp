// import { useState , useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StyleSheet, View , TextInput  , ScrollView , AsyncStorageStatic, Alert, FlatList } from 'react-native';
// import {Button , ThemeProvider , Text , Input, useTheme , Icon , SearchBar , Image } from 'react-native-elements';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import QueryString from 'qs';
// import Moment from './classComponent';

// const Texts = (props) => {
//     return (
//       <Text styles={{fontFamily:'sans-serif-condensed'}}>
//       </Text>
//     )
//   }
//   const MarginButtomView = () => {
//     return (
//       <View style={{marginBottom : 10}}>

//       </View>
//     )
//   }
//   const MarginTopView = () => {
//     return (
//       <View style={{marginTop: 10}}>

//       </View>
//     )
//   }
//   const ButtonOutline = () => {
//     return (
//       <Button style={{backgroundColor: 'none' , border : 'white'}}/>
//       )
//   }
//   const MarginLeftView = () => {
//     return (
//       <View style={{marginLeft:10}}>

//       </View>
//     )
//   }

// const mainScreen = ({navigation}) => {
//    const [search , setSearch] = useState()
//    const [unameData , setUnameData] = useState('')
//    const [postData , setPostData] = useState([])
//   // const [loading , setLoading] = useState(true)
//    const [pageNumber , setPageNumber] = useState(1)
//     const {theme} = useTheme()

//     const getUname = async () => {
//       try {
//         let userDatas = await AsyncStorage.getItem("userData");
//         let data = JSON.parse(userDatas);
//         console.log(data.uname)
//         setUnameData(data)
//       } catch (error) {
//         console.log("Something went wrong", error);
//       }
//     }

//     useEffect(()=>{
//       getUname()
//      fetchData()
//     },[])
//     const fetchData = () => {
//       const bigOneBody = QueryString.stringify({
//         profileuser : 19,
//         auth : "mvvmruoaags78774089gvsngrtywpqqwerg34567vbfbn",
//         p_n : pageNumber,
//         i_c : 10
//       })
//       const url = 'https://mycligtestnet.000webhostapp.com/api/main.php'
//       fetch( url , {
//         method : 'POST',
//         data : bigOneBody,
//         headers :  {  "content-type": "application/x-www-form-urlencoded",
//         "cache-control": "no-cache",
//         },
//       })
//       .then((response) =>  response.json())
//       .then((responseJson) => {
//         // setPageNumber(pageNumber + 1)
//         // setPostData(...postData , ...responseJson)
//        // alert(responseJson)
//       //  setLoading(false)
//       }).catch((error) => {
//         console.log(error)
//       })
//    }
//    const Datas = ({postbody , postedby , postedbyprofileimage , postedbyverified , postDate , postImage, postVid , like}) => (
//      <View>
//           <View style={styles.container, styles.bgDark}>
//              <View style= {{flex: 6 , marginLeft : '2%' , flexDirection : 'row'}}>
//                <Image
//                 source={{uri : postedbyprofileimage}}
//                 containerStyle={styles.imageContainer}
//                />
//                <View>
//                <MarginTopView/>
//                <MarginTopView/>
//                 <Text h4 h4Style = {{fontWeight : "900"}} style={styles.text , {color: "white"}}>
//                    {postedby}
//                    </Text>
//                  <Text style={{fontWeight : "bold" ,color : "grey"} }>
//                   {postDate}
//                  </Text>
//                </View>
//              </View>
//           </View>
//           <View style={ styles.containers }>
//             <Image source={{uri : postImage}} containerStyle={styles.backgroundImage}>
//                 <View style={ styles.loginForm }>
//                     <Text>{postbody}</Text>
//                 </View>
//             </Image>
//         </View>
//           <View style= {{flex: 6 , marginLeft : '2%' , flexDirection : 'row'}}>
//            <Button
//            title={like}
//            icon = {{type : 'font-awesome' , name : 'heart'}}
//            buttonStyle={{backgroundColor : "none" , color : "green"}}
//            iconContainerStyle = {{color: "green"}}
//            />
//           <Button
//            icon = {{type : 'font-awesome' , name : 'user'}}
//            iconContainerStyle = {{color: "white"}}
//            buttonStyle={{backgroundColor : "none"}}
//            />
//           <Button
//            title={'Replies:'+5}
//            buttonStyle={{backgroundColor : "none"}}
//            />
//           <Button
//            title={'Likes'}
//            buttonStyle={{backgroundColor : "none"}}
//            />
//           </View>
//      </View>
//    )
//    const itemView = ({item}) => {
//       <Datas postbody={item.postbody} postedby={item.postedby} postedbyprofileimage={item.postedbyprofileimage} postDate={item.postDate} postImage={item.postImage} like={item.like}/>
//    }
//     return(
//       <SafeAreaView  style={ styles.bgDark}>
//        <ThemeProvider>
//          <View>
//          <MarginTopView />
//          <MarginTopView />
//          <MarginTopView />
//          <MarginTopView />
//            <Text
//            h3
//            h3Style={styles.text  , styles.marginLeftSmallOne}
//            >{Moment()}</Text>
//            <Text
//             style={styles.text }
//             h1
//             h1Style = {{color : theme?.colors?.grey5 , marginLeft : '2%'} }
//             >
//             Loud<Text
//               style={styles.text}
//               h1
//               h1Style={{color : theme?.colors?.grey3}}
//             >App
//          </Text>
//          </Text>
//          <MarginTopView />
//          <SearchBar
//          placeholder="yo! Find someone, a trend or service"
//          onChangeText={(event)=>{setSearch(event)}}
//          value={search}
//          containerStyle={{backgroundColor : 'black'}}
//          showCancel
//          />
//         <FlatList
//          data={postData}
//          renderItem={itemView}
//          keyExtractor={(item, index) => index.toString()}
//         />
//           </View>
//        </ThemeProvider>
//       </SafeAreaView>
//     )
//   }

// const styles = StyleSheet.create({
//     container: {
//      fontFamily : 'sans-serif-condensed'
//     },
//     bgDark : {
//      backgroundColor : 'black'
//     },
//     wid90 : {
//       width : '95%'
//     },

//     rowDisplay : {
//      flex : 1,
//     },
//     text: {
//       fontWeight : "600",
//       textAlign : "left"
//     },
//     containers: {
//       flex: 1,
//   },
//   backgroundImage: {
//       flex: 1,
//       margin: 9,
//       height: 400,
//       width: "100%",
//       resizeMode: 'cover', // or 'stretch'
//   },
//     flex: {
//       display: 'flex',
//     },
//     marginBottoms : {
//      marginBottom : 40,
//     },
//     iconImage : {
//       width : "20%",
//     },
//     imageContainer : {
//       padding: 9,
//       margin: 9,
//       height: 45,
//       width: 45,
//       resizeMode: 'stretch',
//     },
//     MarginSmall : {
//       marginBottom : 18,
//     },
//     marginLeftSmall : {
//       marginLeft : 18,
//     } ,

//     marginLeftSmallOne : {
//       marginLeft : '2%',
//     } ,
//     marginTopSmall : {
//       marginTop : 63
//     },
//     centerAlignment : {
//       alignItems : 'center'
//     }
//   });

//   export default mainScreen;
