import React, { useEffect, useState,useContext,useRef } from 'react';
import {

  Button, 
  Image, 
  ImageBackground,
  StyleSheet,
  View, 
  ScrollView,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableNativeFeedback,
  TouchableOpacity,
  } from 'react-native';
import { useFocusEffect,useNavigationState } from '@react-navigation/native';
import {Card} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import api_axios from '../../../config/api/api_axios';

import * as colors from "../../../config/colors/colors";

const deviceWidth = Math.round(Dimensions.get("window").width);
const cardHeight = 500;

export default function NewsFeed ({navigation}){

  const [searchBarValue, useSearchBarValue ] = useState(""); 
  const [usersData,setUsersData] = useState([]);
  const [mySearchPost,setMySearchPosts] = useState([]);
  const flatListRef = React.useRef();
  const [doSearch,setDoSearch] = useState(false);

  const toTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  };

  useEffect(
      React.useCallback( async () => {
        try{

           const headers ={    
                    'Access-Control-Allow-Origin':'http://localhost:19006',  
                    'Access-Control-Allow-Credentials':'true',
                    'Access-Control-Allow-Methods':'GET,POST,OPTIONS',    
                    'Access-Control-Allow-Headers':'Authorization, Content-Type',          
                    'Accept':'application/json',
                    'Content-Type':'application/json',                  
          }
          await api_axios.get("/posts").then(res=>{
          const data = res.data;
          const listPosts = data.split("#")[0];
          const listUsers = data.split("#")[1];

          //UserId
          const listPostsJSON = JSON.parse(listPosts)

          //Id
          const listUsersJSON = JSON.parse(listUsers);
          const myNewListOfPost = [];
                    
          for(var i = 0; i < listPostsJSON.length; i++){
            let myUser = listUsersJSON.find(user => user.Id == listPostsJSON[i].UserId);         
            myNewListOfPost[i] = [listPostsJSON[i],myUser];
           
          }  
        
            setUsersData(myNewListOfPost);
            setMySearchPosts(myNewListOfPost);         
          })
          
        }catch(er){
          console.log(er);
        }        
    }),[]);
  const  Item = (props) => (

    <Card style={styles.cardContainer}>

      <View style={styles.headerPost}>
        <View style={styles.postUser} >
            <FontAwesome name={"user-o"} size={26} color={colors.default.backgroundBottomInactive} />
            <Text style={styles.username} > {props.firstName} {props.lastName}  - {props.email} </Text>          
        </View>

        <View style={{flex:1,flexDirection:'row'}}>
          <Fontisto name={"date"} size={26} color={colors.default.backgroundBottomInactive} />
          <Text style={{marginLeft:10}} >{props.date}</Text>
        </View>
        <Text style={styles.postTitle}>{props.title}</Text>         
      </View>
      
      <View >       
        <TouchableWithoutFeedback 
              onPress={()=> {
              navigation.setOptions({ title: props.title });    
              navigation.navigate('Details',              
              {
               name:props.title,
               image:props.image,
               category:props.category,
               description:props.description,
               status:props.status,
               date:props.postDate,
              });
              }}
        >
        <Image source={{uri:props.image}} resizeMode={"contain"}  style={{width:deviceWidth - 30,height:cardHeight - 120,}} />
        </TouchableWithoutFeedback>       
      </View>
    </Card>

  );

  const renderItem = ({item,index}) =>(  
    <Item 
        firstName={item[1].FirstName}
        lastName={item[1].LastName}
        email={item[1].Email}
        category= {item[0].Category}
        location= {item[0].Location}
        title={item[0].Title} 
        image={item[0].ImagePath} 
        description={item[0].Description}
        status={item[0].Status}
        date={item[0].Date}
    />
  );

  const RenderItem = ({item}) =>(  
    <Item 
        firstName={item[1].FirstName}
        lastName={item[1].LastName}
        email={item[1].Email}
        category= {item[0].Category}
        location= {item[0].Location}
        title={item[0].Title} 
        image={item[0].ImagePath} 
        description={item[0].Description}
        status={item[0].Status}
        date={item[0].Date}
    />
  );

  const searchTextHandler = (val) =>{
    //search user from list    
    useSearchBarValue(val);      
  };

  const searchButtonHandler = () =>{
    Keyboard.dismiss();
    let mySearch = [];
    mySearch = usersData[1].find(item => item.Email == searchBarValue);

    if(mySearch != null){
        // useSearchBarValue("");
        setDoSearch(true);
        let myPost = usersData[0].find(item => item.UserId == mySearch.Id);
        setMySearchPosts([myPost,mySearch]);

        console.log([myPost,mySearch]);
       
    }else{
      // useSearchBarValue("Zero posts!");
      setDoSearch(false);
      console.log("Nu avem postari!");
    }
      
  };

  const refreshHandler = async () =>{

     try{
          useSearchBarValue("");
          setDoSearch(false);
          const headers ={    
                    'Access-Control-Allow-Origin':'http://localhost:19006',  
                    'Access-Control-Allow-Credentials':'true',
                    'Access-Control-Allow-Methods':'GET,POST,OPTIONS',    
                    'Access-Control-Allow-Headers':'Authorization, Content-Type',          
                    'Accept':'application/json',
                    'Content-Type':'application/json',                  
          }
          await api_axios.get("/posts").then(res=>{
          const data = res.data;
          const listPosts = data.split("#")[0];
          const listUsers = data.split("#")[1];

            //UserId
          const listPostsJSON = JSON.parse(listPosts)

            //Id
          const listUsersJSON = JSON.parse(listUsers);
          const myNewListOfPost = [];
                    
          for(var i = 0; i < listPostsJSON.length; i++){
            let myUser = listUsersJSON.find(user => user.Id == listPostsJSON[i].UserId);         
            myNewListOfPost[i] = [listPostsJSON[i],myUser];
           
          }         
            setUsersData(myNewListOfPost);         
          })
          toTop();
        }catch(er){
          console.log(er);
        }    
  };

  return ( 
    <TouchableWithoutFeedback
      onPress={()=>{
          Keyboard.dismiss();
      }}   
    >  
      
      <View  style={styles.container}>
        
        <View style={styles.searchBar}>  
           <TouchableOpacity onPress={()=>refreshHandler()}>
              <MaterialIcons name={"refresh"} size={26} color={"#3498db"} />  
          </TouchableOpacity>           
           <TextInput 
              placeholder="Search..."
              style={styles.textInput}
              autoCapitalize="none"
              value={searchBarValue}             
              onChangeText={(val) => searchTextHandler(val)}
            />  
            <TouchableOpacity 
                onPress={()=> searchButtonHandler()} >
                <Feather name="search" size={26} color={"#3498db"} />
            </TouchableOpacity>
        </View>
        {doSearch ? 
          <View style={{flex:1,}}>
              <RenderItem item={mySearchPost}/>
          </View>
          :
           <FlatList 
            ref={flatListRef}
            data={usersData}
            renderItem={renderItem}
            keyExtractor={item => item.Postid}
            ListFooterComponent={<View style={{height:50}}></View>}
        />  
          }   
                                              
      </View >
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:colors.default.backGroundApp,
    marginTop:10,
    marginBottom:50,
  },
  headerPost:{
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    // backgroundColor:colors.default.colorTextActiveBottomTabs,
    backgroundColor:"#ffffff",
    width:deviceWidth - 10,
    padding:10,
    marginLeft:-10,
    height:80,
    marginBottom:10,
    marginTop:-10,
    borderTopEndRadius:20,
    borderTopLeftRadius:20,   
  },
  cardContainer:{
    width:deviceWidth - 10,
    // backgroundColor:"#3498db",
    height:cardHeight,
    padding:10,
    marginBottom:10,
    borderTopEndRadius:40,
    borderTopLeftRadius:40,    
  },  
 
  title: {
    fontSize: 32,
  },
  postUser:{
    flex:1,
    flexDirection:'row',
    // paddingBottom:25,

  },
  datePost:{
    flex:1,
    flexDirection:'row',
    
  },
  postTitle:{
    fontSize:20,
    textAlign:"center",
    fontWeight:"500",
    
  },
  searchBar:{
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#FFF',
    width:deviceWidth -100,
    paddingTop:3,
    paddingBottom:3,
    marginBottom:10,

  },
    textInput:{   
    textAlign:"left",
    flex:1,
    paddingLeft:10,
    fontSize:16,
    color:"#05375a",

 }

});

//  onPress={() => navigation.navigate('Details',{name:"Details for each new feed"})}