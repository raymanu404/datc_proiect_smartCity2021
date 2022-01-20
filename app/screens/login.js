import React,{useContext,useState,useEffect,useMemo} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import {AuthContext} from '../../config/context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import api_axios from '../../config/api/api_axios';

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

function Login ({navigation}){
    
    const {login} = useContext(AuthContext);
    
    const [data, setData] = useState({
        email:"",
        password:"",
        check_textInputChange:false,
        secureTextEntry:true,
    });
    const [userLogin, setUserLogin] = useState({
        error_email:false,
        error_password:false
    });
    const [textError, setTextError] = useState("");

    //The Effect Hook lets you perform side effects in function components:, from API(update some content from API) 

    const textInputChange = (val) =>{    
        if(val.length != 0){
            setData({
                ...data,
                email:val,
                check_textInputChange:true,
            });
        }else{
            setData({
                ...data,
                email:val,
                check_textInputChange:false,
            });
        }

        if(val.length !== 0){
            setUserLogin({  
                ...userLogin,              
                error_email:false
            });
            
        }else{
            setUserLogin({   
                ...userLogin,             
                error_email:true
            });
           
        }
    };

    const handlePasswordChange = (val) =>{
      
        if(val.length != 0){
            setData({
                ...data,
               password:val,
                
            });
        }else{
         
            setData({
                ...data,
                password:val,
            });
        }
        
        if(val.length !== 0){
            setUserLogin({  
                ...userLogin,           
                error_password:false
            });
            setTextError("");               
        }else{
            setUserLogin({
                ...userLogin,                
                error_password:true
            });
            setTextError("Password Empty!");
        }
    };

    const updateSecureTextEntry = () =>{
        setData({
           ...data,
           secureTextEntry: !data.secureTextEntry,
        });
    };
   
    async function loginHandler (){   

        if(data.email.length === 0 && data.password.length === 0){
           
            setUserLogin({  
                ...userLogin,           
                error_password:true
            });
            setTextError("Fields empty!");             
           
                // setUserLogin({
                //     ...userLogin,                
                //     error_password:true
                // });
                // setTextError("Password Empty!");
            
           
        }  
        const loginData = JSON.stringify({
            Email:data.email,
            Password:data.password,
        });

        try{
            const headers ={    
                    'Access-Control-Allow-Origin':'http://localhost:19006',  
                    'Access-Control-Allow-Credentials':'true',
                    'Access-Control-Allow-Methods':'GET,POST,OPTIONS',    
                    'Access-Control-Allow-Headers':'Authorization, Content-Type',          
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    
            }

            // if(textError.length !== 0){
                const response = await api_axios.post("/login",loginData,{headers});
                const myResponse = JSON.parse(response.data);
                console.log(myResponse);  
                const userData1 = {
                    email:myResponse["Email"],
                    firstName:myResponse["FirstName"],
                    id:myResponse["Id"],
                    lastName:myResponse["LastName"],
                    phone:myResponse["PhoneNumber"],
                    points:myResponse["Points"],
                };
                      
                if(myResponse["ResponseStr"] !== "Invalid data!"){
                   
                    console.log("login");
                    setUserLogin({  
                        ...userLogin,
                        error_email:false,           
                        error_password:false
                    });
                    setTextError("");
                    login(userData1);
                }else{ 
                    setUserLogin({  
                        ...userLogin,           
                        error_password:true
                    });
                    setTextError("Email / Password is incorrect!");               
                    console.log("not login");
                                
                }
            // }
           
                      
        }catch(e){
            console.log(e);
        }
        // if( data.email.length != 0 && data.password.length != 0){
            //     login();
            //     console.log("login");
            //     setTextError("");
            // }else{           
            //     console.log("not login");
                
            // }
    };

    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
            }}>
        <View style={styles.container} >   

            <View style={styles.header} >
                <Animatable.Image 
                    animation={"bounceIn"}
                    duration={800}
                    source={require("../assets/logo_smartcity.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                
             </View>
            
             <Animatable.View 
                style={styles.footer}
                animation={"fadeInUpBig"}
                >
               
                <Text style={styles.title}>Stay connected with everyone!</Text>
                <ScrollView style={styles.footer_login}>
                <Text style={styles.text_footer} >Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        returnKeyType = {"next"}
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ? 
                        <Animatable.View
                            animation="bounceIn"
                            duration={900}        
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            /> 
                        </Animatable.View>
                       
                    : null
                    }
                    
                </View>
                {userLogin.error_email ? <Text style={styles.text_error} >Email incorect!</Text> : null}    
                <Text 
                    style={[styles.text_footer,{marginTop:35}]} >
                    Password
                </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        secureTextEntry={data.secureTextEntry ? true : false}
                        placeholder="Your Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        returnKeyType = {"go"}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry} > 
                        {data.secureTextEntry ? 
                            
                            <Feather
                                name="eye-off"
                                color="#7f8c8d"
                                size={20}
                            /> 
                            : 
                            <Feather
                                name="eye"
                                color="#7f8c8d"
                                size={20}
                            />
                    
                        }
                    </TouchableOpacity>
                </View>
                {userLogin.error_password ? <Text style={styles.text_error} >{textError}</Text> : null} 
                </ScrollView>        
                <View style={styles.loginRegisterButtons}>
                    <View style={styles.LoginButton}>
                        <TouchableOpacity onPress={() => loginHandler()}  style={styles.button}>                                                            
                                <Text style={styles.textLogin} >Login</Text>                  
                                <MaterialIcons 
                                    name="navigation" 
                                    color="#FFF"
                                    size={20}                        
                                />                                            
                        </TouchableOpacity>
                    </View>          
                    <View style={styles.registerButton}>
                        <TouchableOpacity onPress={() => navigation.push('Register')}  style={styles.button}>                                                            
                                <Text style={styles.textRegister}  >Register</Text>                  
                                <MaterialIcons 
                                    name="navigate-next" 
                                    color="#FFF"
                                    size={20}                        
                                />                                            
                        </TouchableOpacity>
                    </View> 
                </View>            
                
             </Animatable.View>
                    
        </View>
        </TouchableWithoutFeedback>  
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3498db',  
        
   
    },
    header:{
        flex:2,
        justifyContent:"center",
        alignItems:"center",
    },
    footer:{
       
        flex:4,
        backgroundColor:"#ecf0f1",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30,
        marginTop:10,
    },
    logo:{
        width:height_logo,
        height:height_logo
    },
    textLogin:{
        color:"#FFF",
        fontWeight:"500",
    },
    textRegister:{
        color:"#FFF",
        fontWeight:"500",
       
    },
    title:{
        flex:2,
        marginBottom:10,
        fontSize:20,
        color:"#2980b9",
        fontWeight:"bold",
    },

    LoginButton:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    registerButton:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    loginRegisterButtons:{     
        flex:1,
        flexDirection:"row",
        // justifyContent:"center",
        alignItems:"center",
        justifyContent:"space-between",
        // marginLeft:20,
        // marginTop:30,
        // marginRight:30,
        // marginBottom:30,
    },
    button:{
        marginTop:50,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        width:140,
        height:40,
        alignItems:"center",
        justifyContent:"space-around",
        flexDirection:'row',
        backgroundColor:"#2980b9",
        
        
    },
    footer_login:{
        // flex:1,
        // marginTop:20,
        // paddingVertical:20,

    },
    text_footer:{
        fontSize:16,
        color:"#05375a",
        fontWeight:"300",
    },
    text_error:{
        fontSize:14,
        color:"red",
        marginLeft:10,
    },
    action:{

        flex:1,
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5,
       
    },
    textInput:{
        flex:1,
        // marginTop: Platform.OS === "android" ? 0 : -12,
        paddingLeft:10,
        color:"#05375a",
        // marginBottom:10,
        fontSize:16,
        

    },
   
});

export default Login;