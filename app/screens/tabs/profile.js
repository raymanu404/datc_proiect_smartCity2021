import React , {useContext,useEffect,useState} from 'react';
import {
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    Alert,
    Keyboard,
    FlatList,
    KeyboardAwareFlatList,
    ScrollView
} from "react-native";
import {Card, TextInput} from 'react-native-paper';
import { useFocusEffect,useNavigationState } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { AuthContext} from '../../../config/context';
import * as Animatable from 'react-native-animatable';
import { Title} from 'react-native-paper';
import {UserContext} from '../../../App';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import InputScrollView from 'react-native-input-scroll-view';
import api_axios from '../../../config/api/api_axios';


const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export default function Profile ({navigation,route}){
 
    const {logout} = useContext(AuthContext);
    const userData = useContext(UserContext);
   
    const [data,setData] = useState({
        firstName:userData["firstName"],
        lastName:userData["lastName"],
        profileImage:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        email:userData["email"],
        phone:userData["phone"],
        points:userData["points"],
        key:userData["id"],
        userID:userData["id"],    
    });
    const [textAreaHeight,setTextAreaHeight] = useState(null);
    const [userChange,setUserChange] = useState({
        email:false,
        firstName:false,
        lastName:false,
        phone:false,
        emailValid:true,
        firstNameValid:true,
        lastNameValid:true,
        phoneValid:true,
    });
    const onUpdateUserDetails = async() =>{
        try{
            const dataForUpdate = JSON.stringify({
                UserId:data.userID,
                FirstName:data.firstName,
                LastName:data.lastName,
                PhoneNumber:data.phone
            });
            const headers = {    
                        'Access-Control-Allow-Origin':'http://localhost:19006',  
                        'Access-Control-Allow-Credentials':'true',
                        'Access-Control-Allow-Methods':'GET,POST,OPTIONS',    
                        'Access-Control-Allow-Headers':'Authorization, Content-Type',          
                        'Accept':'application/json',
                        'Content-Type':'application/json',                   
            }
            const response = await api_axios.put("/updateUserInfo",dataForUpdate,{headers});   
            const myResponse = JSON.parse(response.data);    
            console.log(myResponse["ResponseStr"]);
        }catch(error){
            console.log(error);
        }
    }
    const firstNameHandlerEdit = () =>{
         setUserChange({
            ...userChange,
            firstName:true,
        });

    };


    const firstNameHandlerSave = () =>{
         setData({
            ...data,           
        });
        if(userChange.firstNameValid){
            setUserChange({
                ...userChange,
               firstName:false,
            });
            onUpdateUserDetails();
        }
    };

    const lastNameHandlerEdit = () =>{
         setUserChange({
            ...userChange,
            lastName:true,
        });
    };

    const lastNameHandlerSave = () =>{
          setData({
            ...data,           
        });
        if(userChange.lastNameValid){
            setUserChange({
                ...userChange,
               lastName:false,
            });
            onUpdateUserDetails();
        }
    };

    const phoneChangeEdit = () =>{
         setUserChange({
            ...userChange,
            phone:true,
        });
    };
    
    const phoneChangeSave = () =>{
        setData({
            ...data,           
        });
        if(userChange.phoneValid){
             setUserChange({
                ...userChange,
                phone:false,
            });
            onUpdateUserDetails();
        }
       
    };
 
    const firstNameTextHandler = (val) =>{
    
        setData({
            ...data,
            firstName:val
        });
        //    console.log(val); 
        if(val.length != 0){
            //pentru PUT verificat
            //PUT 
            setUserChange({
                ...userChange,
                firstNameValid:true,
            });
        }else{
            //mesaj eroare
            setUserChange({
                ...userChange,
                firstNameValid:false,
            });
        }
    };
    const lastNameTextHandler = (val) =>{
         setData({
            ...data,
            lastName:val
        });
        //    console.log(val); 
        if(val.length != 0){
            //pentru PUT verificat
            //PUT 
            setUserChange({
                ...userChange,
                lastNameValid:true,
            });
        }else{
            //mesaj eroare
            setUserChange({
                ...userChange,
                lastNameValid:false,
            });
        }
    };

    const phoneTextHandler = (val) =>{
        setData({
            ...data,
            phone:val
        });

        if(val.length != 0 && val.startsWith("07")){
            //pentru PUT verificat
            //PUT 
            setUserChange({
                ...userChange,
                phoneValid:true,
            });
        }else{
            //mesaj eroare
            setUserChange({
                ...userChange,
                phoneValid:false,
            });
        }
    };

    const userPostsButtonHandler = () =>{
        console.log("aici ar trebui stack");
        navigation.navigate("UserPosts",{name:"User Posts"});
        //aici ar trebui in stack pentru a vedea postarile sale
    };

    const logoutHandler = () =>{
        Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
            {
            text: "NO",
            onPress: () => console.log("NO pressed")
            },           
            { 
            text: "YES", 
            onPress: () =>  logout()
            }
        ]
        );
    };
 
    const Item = (props)=>(
        <View style={{width:deviceWidth - 20,flex:1,justifyContent:'center',alignItems:"center"}}>
            {/* ---------------------------------- USER PROFILE -------------------------- */}
            <View style={styles.userContainer}>
                <View style={styles.userProfile}>
                        <View>
                            <Avatar 
                                size={70} 
                                rounded 
                                source={{uri:data.profileImage}} 
                                key={data.key}                       
                            /> 
                             
                        </View>
                        <Title style={{textAlign:'center',fontSize:20, color:"#FFF",marginLeft:0}}>
                            {data.email}
                        </Title>                    
                        <Avatar
                            size={40}
                            rounded
                            icon={{ name: 'star', type: 'Feather', color: '#FFFDA2' }}
                            containerStyle={{
                                borderColor: '#FFFDA2',
                                borderStyle: 'solid',
                                                        
                            }}
                            
                        />                                                                                                           
                </View>         
            </View>  

            {/* ---------------------------------- FIRST NAME -------------------------- */}
            <View style={styles.userInfoContainer}>               
                <View style={styles.userInfo}>
                        <AntDesign name={"user"} size={26} color={"#35589A"} />  
                        <View style={{flex:1,flexDirection:'column'}}>
                            <TextInput 
                                style={styles.textInput}
                                autoCapitalize="none"
                                disabled={!userChange.firstName}
                                underlineColorAndroid ={'transparent'}
                                onChangeText={(val) => firstNameTextHandler(val)}                              
                                value={data.firstName}
                            />
                        {!userChange.firstNameValid ?  <Text style={{fontSize:10,color:'red',textAlign:'center'}}>FirstName invalid!</Text>  : null}
                        </View> 
                        {!userChange.firstName ?
                            <Avatar
                                size={40}
                                rounded
                                onPress={() =>firstNameHandlerEdit()}
                                icon={{ name: 'edit', type: 'AntDesign', color: '#05375a' }}
                                containerStyle={{
                                    borderColor: '#05375a',
                                    borderStyle: 'solid',
                                                        
                                }}                               
                            />                         
                            :                         
                            <Avatar
                                size={40}
                                rounded    
                                onPress={()=> firstNameHandlerSave()}                      
                                icon={{ name: 'save', type: 'Foundation', color: '#05375a' }}
                                containerStyle={{
                                    borderColor: '#05375a',
                                    borderStyle: 'solid',
                                                
                                }}                              
                            />
                        }                                                                     
                </View>                  
            </View>

            {/* --------------------------------- LAST NAME ----------------------------------- */}
            <View style={styles.userInfoContainer}>                         
                <View style={styles.userInfo}>
                        <Feather name={"user"} size={26} color={"#35589A"} />   
                        <View style={{flex:1,flexDirection:'column'}}>
                            <TextInput 
                                style={styles.textInput}
                                autoCapitalize="none"
                                disabled={!userChange.lastName}
                                underlineColorAndroid ={'transparent'}
                                onChangeText={(val) => lastNameTextHandler(val)}
                                value={data.lastName}
                            />
                           {!userChange.lastNameValid ?  <Text style={{fontSize:10,color:'red',textAlign:'center'}}>LastName invalid!</Text>  : null}
                        </View>
                         {!userChange.lastName ? 
                          <Avatar
                                size={40}
                                rounded
                                onPress={() =>lastNameHandlerEdit()}
                                icon={{ name: 'edit', type: 'AntDesign', color: '#05375a' }}
                                containerStyle={{
                                    borderColor: '#05375a',
                                    borderStyle: 'solid',
                                                        
                                }}                                    
                            /> 
                        :
                        <Avatar
                            size={40}
                            rounded    
                            onPress={()=> lastNameHandlerSave()}                      
                            icon={{ name: 'save', type: 'Foundation', color: '#05375a' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',                                           
                            }}                                
                        />
                        }                       
                </View>                                                           
            </View>        

            {/* ---------------------------------- PHONE NUMBER -------------------------- */}
            <View style={styles.userInfoContainer}>
                 <View style={styles.userInfo}>
                    <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'phone', type: 'AntDesign', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}
                            
                    />   
                    <View style={{flex:1,flexDirection:'column'}}>
                        <TextInput                        
                            style={styles.textInput}
                            autoCapitalize="none"
                            keyboardType="numeric"
                            maxLength={10}
                            value={data.phone}
                            disabled={!userChange.phone}
                            onChangeText={(val) => phoneTextHandler(val)}
                        />
                    {!userChange.phoneValid ?  <Text style={{fontSize:10,color:'red',textAlign:'center'}}>Phone invalid!</Text>  : null}
                    </View> 
                    {!userChange.phone ?
                         <Avatar
                            size={40}
                            rounded
                            onPress={()=> phoneChangeEdit()}
                            icon={{ name: 'edit', type: 'AntDesign', color: '#05375a' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',
                                            
                            }}                          
                        />
                    :
                        <Avatar
                            size={40}
                            rounded
                            onPress={()=> phoneChangeSave()}
                            icon={{ name: 'save', type: 'Foundation', color: '#05375a' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',
                                            
                            }}
                                
                        />
                    }                 
                </View>           
            </View>

            {/* ---------------------------------- POINTS-------------------------- */}
            <View style={styles.userInfoContainer}>
                <View style={[styles.userInfo,]}>
                    <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'star', type: 'Feather', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}
                            
                    />                     
                    <Title style={{fontSize:16, color:"#FFF",paddingLeft:10}}>
                        Points: {data.points}
                    </Title>
                    <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'star', type: 'Feather', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}
                            
                    />    
                </View>           
            </View>

            {/* ---------------------------------- USER POSTS -------------------------- */}
            {/* <Card style={styles.userInfoContainer}>
                <TouchableWithoutFeedback onPress={()=> userPostsButtonHandler() }>
                    <View style={[styles.userInfo,]}>
                    <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'post-add', type: 'MaterialIcons', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}
                            
                    />   
                    <Title style={{fontSize:16, color:"#FFF",paddingLeft:10}}>
                        check your posts
                    </Title>

                     <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'star', type: 'Feather', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}                          
                    />       
                </View>     
                </TouchableWithoutFeedback>      
            </Card> */}

            {/* ----------------------------------LOGOUT -------------------------- */}
            <View style={[styles.userInfoContainer,{width:"40%",}]}>
                <TouchableWithoutFeedback onPress={()=>logoutHandler()}>                  
                    <View style={[styles.userInfo,{justifyContent:"center",}]}>                     
                        <Title style={{fontSize:16, color:"#FFF",paddingLeft:10}}>
                            LOGOUT
                        </Title>
                        <Avatar
                            size={40}
                            rounded
                            icon={{ name: 'logout', type: 'MaterialIcons', color: '#35589A' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',
                                paddingLeft:10                    
                            }}                           
                        />  
                    </View>           
                </TouchableWithoutFeedback>
            </View>
        </View>
    );

    return(   
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
            }}
        >    
       <View style={styles.container}>
            <Animatable.View style={styles.profileContainer} 
                animation={"fadeInUpBig"}
            >  
            {/* ---------------------------------- USER PROFILE -------------------------- */}
            <View style={styles.userContainer}>
                <View style={styles.userProfile}>
                        <View>
                            <Avatar 
                                size={70} 
                                rounded 
                                source={{uri:data.profileImage}} 
                                key={data.key}                       
                            /> 
                             
                        </View>
                        <Title style={{textAlign:'center',fontSize:20, color:"#FFF",marginLeft:0}}>
                            {data.email}
                        </Title>                    
                        <Avatar
                            size={40}
                            rounded
                            icon={{ name: 'star', type: 'Feather', color: '#FFFDA2' }}
                            containerStyle={{
                                borderColor: '#FFFDA2',
                                borderStyle: 'solid',
                                                        
                            }}
                            
                        />                                                                                                           
                </View>         
            </View>  

            {/* ---------------------------------- FIRST NAME -------------------------- */}
            <View style={styles.userInfoContainer}>               
                <View style={styles.userInfo}>
                        <AntDesign name={"user"} size={26} color={"#35589A"} />  
                        <View style={{flex:1,flexDirection:'column'}}>
                            <TextInput 
                                style={styles.textInput}
                                autoCapitalize="none"
                                disabled={!userChange.firstName}
                                underlineColorAndroid ={'transparent'}
                                onChangeText={(val) => firstNameTextHandler(val)}                              
                                value={data.firstName}
                            />
                        {!userChange.firstNameValid ?  <Text style={{fontSize:10,color:'red',textAlign:'center'}}>FirstName invalid!</Text>  : null}
                        </View> 
                        {!userChange.firstName ?
                            <Avatar
                                size={40}
                                rounded
                                onPress={() =>firstNameHandlerEdit()}
                                icon={{ name: 'edit', type: 'AntDesign', color: '#05375a' }}
                                containerStyle={{
                                    borderColor: '#05375a',
                                    borderStyle: 'solid',
                                                        
                                }}                               
                            />                         
                            :                         
                            <Avatar
                                size={40}
                                rounded    
                                onPress={()=> firstNameHandlerSave()}                      
                                icon={{ name: 'save', type: 'Foundation', color: '#05375a' }}
                                containerStyle={{
                                    borderColor: '#05375a',
                                    borderStyle: 'solid',
                                                
                                }}                              
                            />
                        }                                                                     
                </View>                  
            </View>

            {/* --------------------------------- LAST NAME ----------------------------------- */}
            <View style={styles.userInfoContainer}>                         
                <View style={styles.userInfo}>
                        <Feather name={"user"} size={26} color={"#35589A"} />   
                        <View style={{flex:1,flexDirection:'column'}}>
                            <TextInput 
                                style={styles.textInput}
                                autoCapitalize="none"
                                disabled={!userChange.lastName}
                                underlineColorAndroid ={'transparent'}
                                onChangeText={(val) => lastNameTextHandler(val)}
                                value={data.lastName}
                            />
                           {!userChange.lastNameValid ?  <Text style={{fontSize:10,color:'red',textAlign:'center'}}>LastName invalid!</Text>  : null}
                        </View>
                         {!userChange.lastName ? 
                          <Avatar
                                size={40}
                                rounded
                                onPress={() =>lastNameHandlerEdit()}
                                icon={{ name: 'edit', type: 'AntDesign', color: '#05375a' }}
                                containerStyle={{
                                    borderColor: '#05375a',
                                    borderStyle: 'solid',
                                                        
                                }}                                    
                            /> 
                        :
                        <Avatar
                            size={40}
                            rounded    
                            onPress={()=> lastNameHandlerSave()}                      
                            icon={{ name: 'save', type: 'Foundation', color: '#05375a' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',                                           
                            }}                                
                        />
                        }                       
                </View>                                                           
            </View>        

            {/* ---------------------------------- PHONE NUMBER -------------------------- */}
            <View style={styles.userInfoContainer}>
                 <View style={styles.userInfo}>
                    <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'phone', type: 'AntDesign', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}
                            
                    />   
                    <View style={{flex:1,flexDirection:'column'}}>
                        <TextInput                        
                            style={styles.textInput}
                            autoCapitalize="none"
                            keyboardType="numeric"
                            maxLength={10}
                            value={data.phone}
                            disabled={!userChange.phone}
                            onChangeText={(val) => phoneTextHandler(val)}
                        />
                    {!userChange.phoneValid ?  <Text style={{fontSize:10,color:'red',textAlign:'center'}}>Phone invalid!</Text>  : null}
                    </View> 
                    {!userChange.phone ?
                         <Avatar
                            size={40}
                            rounded
                            onPress={()=> phoneChangeEdit()}
                            icon={{ name: 'edit', type: 'AntDesign', color: '#05375a' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',
                                            
                            }}                          
                        />
                    :
                        <Avatar
                            size={40}
                            rounded
                            onPress={()=> phoneChangeSave()}
                            icon={{ name: 'save', type: 'Foundation', color: '#05375a' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',
                                            
                            }}
                                
                        />
                    }                 
                </View>           
            </View>

            {/* ---------------------------------- POINTS-------------------------- */}
            <View style={styles.userInfoContainer}>
                <View style={[styles.userInfo,]}>
                    <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'star', type: 'Feather', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}
                            
                    />                     
                    <Title style={{fontSize:16, color:"#FFF",paddingLeft:10}}>
                        Points: {data.points}
                    </Title>
                    <Avatar
                        size={40}
                        rounded
                        icon={{ name: 'star', type: 'Feather', color: '#35589A' }}
                        containerStyle={{
                            borderColor: '#05375a',
                            borderStyle: 'solid',
                                                 
                        }}
                            
                    />    
                </View>           
            </View>
          
            {/* ----------------------------------LOGOUT -------------------------- */}
            <View style={[styles.userInfoContainer,{width:"40%",}]}>
                <TouchableWithoutFeedback onPress={()=>logoutHandler()}>                  
                    <View style={[styles.userInfo,{justifyContent:"center",}]}>                     
                        <Title style={{fontSize:16, color:"#FFF",paddingLeft:10}}>
                            LOGOUT
                        </Title>
                        <Avatar
                            size={40}
                            rounded
                            icon={{ name: 'logout', type: 'MaterialIcons', color: '#35589A' }}
                            containerStyle={{
                                borderColor: '#05375a',
                                borderStyle: 'solid',
                                paddingLeft:10                    
                            }}                           
                        />  
                    </View>           
                </TouchableWithoutFeedback>
            </View>
            </Animatable.View>
       </View>
       </TouchableWithoutFeedback>   
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
           
    },
    profileContainer:{
        flex:4,
        alignItems: "center",
        backgroundColor:"#FFF",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginTop:30,
    },
    userContainer:{     
        backgroundColor:'rgba(52, 152, 219, 0.8)',
        width:"100%",
        height:100,
        paddingVertical:10,
        borderBottomRightRadius:150,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    userProfile:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-around",
    },
    userInfoContainer:{
       
        height:50,
        width:'90%',
        backgroundColor:"rgba(52, 152, 219, 0.8)",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        paddingHorizontal:30,
        marginTop:20,
    },
    userInfo:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
    },
    textInput:{
        flex:1,
        paddingLeft:10,
        textAlign:'center',
        color:"#FFF",
        fontSize:16,
        height:60,      
        borderBottomWidth:0,
        backgroundColor:"rgba(52, 152, 219, 0.01)",    
      
    },
      
});