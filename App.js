import React,{ useState ,useEffect ,useMemo} from "react";
import {
  Image,
  useColorScheme, 
  TouchableOpacity,
}from "react-native";
import { NavigationContainer , DefaultTheme, DarkTheme,  useNavigationState} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import axios from 'axios';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


import NewsFeed  from "./app/screens/tabs/newsFeed";
import Profile from "./app/screens/tabs/profile";
import NewPost from "./app/screens/tabs/newPost";
import DetailsNewsFeed from "./app/screens/DetailsNewsFeed";
import UserPosts from "./app/screens/userPosts";
import UserPostsDetails from "./app/screens/userPostsDetails";
import Splash from "./app/screens/splash";

import Login from "./app/screens/login";
import Register from "./app/screens/register";
import {AuthContext} from './config/context';
import * as colors from './config/colors/colors';

const AuthStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const NewsFeedStack = createStackNavigator();
const RootStack = createStackNavigator();
const UserPostsStack = createStackNavigator();

export const UserContext = React.createContext();

export default function App(){
  
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData]  = useState({
    email:'',
    firstName:"",
    id:"",
    lastName:"",
    phone:"",
    points:"",
  });

  const authContext = useMemo( ()=>{
    return {
      login: (props)=>{
        setIsLoading(false);
        setUserToken("la fel ceva token aici ");
       
            setUserData({
              email:props.email,
              firstName:props.firstName,
              id:props.id,
              lastName:props.lastName,
              phone:props.phone,
              points:props.points,
            });              
      },
      register: ()=>{
        setIsLoading(false);
        setUserToken("ceva token aici");
      },
      logout: ()=>{
        setIsLoading(false);
        setUserToken(null);
      },
    }
  }, []);



  useEffect( ()=>{
    setTimeout(()=>{
        setIsLoading(false);
    },100);
  },[]);

  if(isLoading){
    return <Splash/>
  }

  // headerMode="none"
  const NewsFeedScreen = () =>
    <NewsFeedStack.Navigator screenOptions={{headerShown:false}}>
      <NewsFeedStack.Screen 
            name="NewsFeed" 
            options={{
              title:"News Feed",             
              headerStyle:{
                backgroundColor:colors.default.backgroundBottomInactive
                
              },     
              headerTintColor: colors.default.colorTextActiveBottomTabs,
            }} 
            component={NewsFeed} 
      />
      <NewsFeedStack.Screen 
            name="Details" 
            component={DetailsNewsFeed} 
            options={({route})=> ({              
                headerStyle:{
                  backgroundColor:colors.default.backgroundBottomInactive
                  
                },  
                title:route.params.name,   
                headerTintColor: colors.default.colorTextActiveBottomTabs,
            })} 
      />
    </NewsFeedStack.Navigator>

  const UserPostsScreen = () =>
  
    <UserPostsStack.Navigator screenOptions={{headerShown:false}}>
        <UserPostsStack.Screen        
            name="ProfileUser" 
            component={Profile} 
          
            options={{              
                headerStyle:{
                  backgroundColor:colors.default.backgroundBottomInactive
                  
                },  
                title:"Profile", 
                headerTintColor: colors.default.colorTextActiveBottomTabs,
            }} 
        />
        <UserPostsStack.Screen        
            name="UserPosts" 
            component={UserPosts} 
            options={({route})=> ({              
                headerStyle:{
                  backgroundColor:colors.default.backgroundBottomInactive
                  
                },  
                title:route.params.name,   
                headerTintColor: colors.default.colorTextActiveBottomTabs,
            })} 
        />
        <UserPostsStack.Screen        
            name="UserPostsDetails" 
            component={UserPostsDetails} 
            options={({route})=> ({              
                headerStyle:{
                  backgroundColor:colors.default.backgroundBottomInactive
                  
                },  
                title:route.params.name,   
                headerTintColor: colors.default.colorTextActiveBottomTabs,
            })} 
        />
    </UserPostsStack.Navigator>

  const AppTabs = () => 
   <UserContext.Provider value={userData}>
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
       
      }}
     
    >
      <BottomTab.Screen  
            name="NewsFeedScreen" 
            component={NewsFeedScreen}                             
            options={{                   
              headerStyle:{
                backgroundColor:colors.default.backgroundBottomInactive
                
              },    
             
              headerTintColor: colors.default.colorTextActiveBottomTabs,
              tabBarInactiveTintColor: colors.default.colorTextInactiveBottomTabs,
              tabBarInactiveBackgroundColor:colors.default.backgroundBottomInactive,
              tabBarActiveTintColor:colors.default.colorTextActiveBottomTabs,
              tabBarActiveBackgroundColor:colors.default.backgroundHeaderActive,   
              title:"News Feed",   
              tabBarIcon:({ color }) => (
                <FontAwesome name="newspaper-o" color={color} size={26} style={{marginTop:10}} />
              ),
             
            }}
           
      />   
      <BottomTab.Screen  
            name="New Post" 
            component={NewPost}          
            options={{
              headerStyle:{
                backgroundColor:colors.default.backgroundBottomInactive
                
              },     
              headerTintColor: colors.default.colorTextActiveBottomTabs,
              tabBarInactiveTintColor:colors.default.colorTextInactiveBottomTabs,
              tabBarInactiveBackgroundColor:colors.default.backgroundBottomInactive,
              tabBarActiveTintColor:colors.default.colorTextActiveBottomTabs,
              tabBarActiveBackgroundColor:colors.default.backgroundHeaderActive,
              title:"New Post",
              tabBarIcon:({ color }) => (
                <MaterialCommunityIcons name="newspaper-plus" color={color} size={26} style={{marginTop:10}} />
              ),
            }} 
      />
      <BottomTab.Screen  
            name="Profile"  
            component={UserPostsScreen}             
            options={{      
              headerStyle:{
                backgroundColor:colors.default.backgroundBottomInactive
                
              },     
              headerTintColor: colors.default.colorTextActiveBottomTabs,      
              tabBarInactiveTintColor:colors.default.colorTextInactiveBottomTabs,
              tabBarInactiveBackgroundColor:colors.default.backgroundBottomInactive,
              tabBarActiveTintColor:colors.default.colorTextActiveBottomTabs,
              tabBarActiveBackgroundColor:colors.default.backgroundHeaderActive,
              title:"Profile",                     
              tabBarIcon:({ color }) => (
                <AntDesign name="user" color={color} size={26} style={{marginTop:10}} />
              ),
            }}
      />       
    </BottomTab.Navigator>
    </UserContext.Provider>  
  
  const AuthStackScreen = () =>
      <AuthStack.Navigator > 
        <AuthStack.Screen  
            name="Login" 
            component={Login} 
            options={{
                title:"Login",
                headerStyle:{
                  backgroundColor:colors.default.colorTextActiveBottomTabs
                  
                },     
                headerTintColor: colors.default.backgroundHeaderActive,
            }} 

        />                
        <AuthStack.Screen  
            name="Register" 
            component={Register}
            options={{
              title:"Register",
              headerStyle:{
                backgroundColor:colors.default.colorTextActiveBottomTabs
                
              },     
              headerTintColor: colors.default.backgroundHeaderActive,
            }}
        />                              
      </AuthStack.Navigator>

  const RootStackScreen = ({userToken}) =>(
    <RootStack.Navigator screenOptions={{headerShown:false}}>
      {userToken ? (
          <RootStack.Screen 
              name="App" 
              component={AppTabs}
              options={{
                animationEnabled:false
              }} 
          />) 
          : (
          <RootStack.Screen 
              name="Auth" 
              component={AuthStackScreen}
              options={{
                animationEnabled:false
              }} 
          />) 
      }   
    </RootStack.Navigator>
  );    
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};