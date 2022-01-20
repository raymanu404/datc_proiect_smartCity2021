import React,{useContext,useState,useEffect} from 'react';
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
    Alert,
} from 'react-native';
import {AuthContext} from '../../config/context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import api_axios from '../../config/api/api_axios';

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

function Register ({navigation}){
    const {register} = useContext(AuthContext);

    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        password:"",
        re_password:"",
        check_textInputChangeFirstName:false,
        check_textInputChangeLastName:false,
        check_textInputChangePhone:false,
        check_textInputChangeEmail:false,
        secureTextEntryPassword:true,
        secureTextEntryRePassword:true,
    });
    const [userRegister, setUserRegister] = useState({
        error_firstName:false,
        error_lastName:false,
        error_phone:false,      
        error_email:false,
        error_password:false,
        error_re_password:false,
    });

    const [textError, setTextError] = useState({
        textPassword:"",
        textRePassword:"",
    });

    let booleans_flag = [false,false,false,false,false,false];

    //The Effect Hook lets you perform side effects in function components:, from API(update some content from API)
    
    const textInputChangeFirstName = (val) =>{
     
        if(val.length != 0){
            setData({
                ...data,
               firstName:val,
               check_textInputChangeFirstName:true,
            });
            setUserRegister({
                ...userRegister,
                error_firstName:false,
            });
        }else{
            setData({
                ...data,
                firstName:val,
                check_textInputChangeFirstName:false,
            });

            setUserRegister({
                ...userRegister,
                error_firstName:true,
            });
        }
      
    };

    const textInputChangeLastName = (val) =>{

        if(val.length != 0){
            setData({
                ...data,
                lastName:val,
                check_textInputChangeLastName:true,
            });
            setUserRegister({
                ...userRegister,
                error_lastName:false,
            });
        }else{
            setData({
                ...data,
                lastName:val,
                check_textInputChangeLastName:false,
            });
            setUserRegister({
                ...userRegister,
                error_lastName:true,
            });
        }
    };

    const textInputChangePhone = (val) =>{
        
        if(val.length != 0 && val.length >= 10){
            setData({
                ...data,
                phone:val,
                check_textInputChangePhone:true,
            });
            setUserRegister({
                ...userRegister,
                error_phone:false,
            });
        }else{
            setData({
                ...data,
                phone:val,
                check_textInputChangePhone:false,
            });
            setUserRegister({
                ...userRegister,
                error_phone:true,
            });
        }
    };

    const textInputChangeEmail = (val) =>{
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(val.length != 0 && emailPattern.test(val)){
            setData({
                ...data,
                email:val,
                check_textInputChangeEmail:true,
            });
            setUserRegister({
                ...userRegister,
                error_email:false,
            });
        }else{
            setData({
                ...data,
                email:val,
                check_textInputChangeEmail:false,
            });
            setUserRegister({
                ...userRegister,
                error_email:true,
            });
        }
    };

    const handlePasswordChange = (val) =>{
      
        // var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if(val.length != 0 ){
            setData({
                ...data,
                password:val,
                
            });
            setUserRegister({
                ...userRegister,
                error_password:false,
            });
            setTextError({
                ...textError,
                textPassword:""
            });
        }else{
            setData({
                ...data,
                password:val,
                
            });
            setUserRegister({
                ...userRegister,
                error_password:true,
            });
            setTextError({
                ...textError,
                textPassword:"Password Incompleted!"
            });
        }
      
    };

    const handleRePasswordChange = (val) =>{
      
        if (typeof data.password !== "undefined" && typeof val !== "undefined") {
          
            if(val.length != 0 ){
                setData({
                    ...data,
                    re_password:val,
                    
                });
                setUserRegister({
                    ...userRegister,
                    error_re_password:false,
                });
                setTextError({
                    ...textError,
                    textRePassword:""
                });
            }else{
                setData({
                    ...data,
                    re_password:val,
                    
                });
                setUserRegister({
                    ...userRegister,
                    error_re_password:true,
                });
                setTextError({
                    ...textError,
                    textRePassword:"Re-Password Incompleted!"
                });
            }
        }else{
            setUserRegister({
                ...userRegister,
                error_re_password:true,
            });
            setTextError({
                ...textError,
                textRePassword:"Re-Password Incompleted!"
            });
        }
    };

    const onLostFocusPassword = (val) =>{
        
        if (typeof data.password !== "undefined" && typeof data.re_password !== "undefined") {
        
            if (data.password != data.re_password) {       
                setUserRegister({
                    ...userRegister,
                    error_password:true,
                });
                setTextError({
                    ...textError,
                    textPassword:"Password doesn't match!"
                });       
            }else{
                setUserRegister({
                    ...userRegister,
                    error_password:false,
                });
                setTextError({
                    ...textError,
                    textPassword:""
                });
            }
        
        }
    };

    const onLostFocusRePassword = (val) =>{
        if (typeof data.password !== "undefined" && typeof data.re_password !== "undefined") {
        
            if (data.password != data.re_password) {       
                setUserRegister({
                    ...userRegister,
                    error_re_password:true,
                });
                setTextError({
                    ...textError,
                    textRePassword:"Re Password doesn't match!"
                });       
            }else{
                setUserRegister({
                    ...userRegister,
                    error_re_password:false,
                });
                setTextError({
                    ...textError,
                    textRePassword:""
                });
            }
        
        }
    };

    const onFocusPassword = (va) =>{
        setUserRegister({
            ...userRegister,
            error_re_password:false,
            error_password:false,
        });
        setTextError({
            ...textError,
            textRePassword:"",
            textPassword:"",
        });
    };

    const updateSecureTextEntryPassword = () =>{
        setData({
           ...data,
           secureTextEntryPassword: !data.secureTextEntryPassword,
        });
    };

    const updateSecureTextEntryRePassword = () =>{
        setData({
           ...data,
           secureTextEntryRePassword: !data.secureTextEntryRePassword,
        });
    };
   
    
    async function registerHandler(){
        //if all fields are valid go to register else messages of error

        if( !userRegister.error_firstName && 
            !userRegister.error_lastName && 
            !userRegister.error_phone && 
            !userRegister.error_email && 
            !userRegister.error_password && 
            !userRegister.error_re_password && 
            data.firstName.length != 0 &&
            data.lastName.length != 0 &&
            data.phone.length != 0 &&
            data.email.length != 0 &&
            data.password.length != 0 &&
            data.re_password.length != 0
            ){
            try{
                const registerData = JSON.stringify({
                    FirstName:data.firstName,
                    LastName:data.lastName,
                    Password:data.password,
                    PhoneNumber:data.phone,
                    Email:data.email,
                    Points:0
                });
                const headers ={    
                    'Access-Control-Allow-Origin':'http://localhost:19006',  
                    'Access-Control-Allow-Credentials':'true',
                    'Access-Control-Allow-Methods':'GET,POST,OPTIONS',    
                    'Access-Control-Allow-Headers':'Authorization, Content-Type',          
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    
                }
                //FirstName
                //LastName
                //Password
                //PhoneNumber
                //Email
                //Points
                const response = await api_axios.post("/register",registerData,{headers});   
                console.log(response); 
                const myResponse = JSON.parse(response.data);
                if(myResponse["ResponseStr"] !== "Email already used!"){
                     Alert.alert(
                        "Welcome on SmartCity!",
                        "You have been successfully registered!",
                        [
                        {
                            text: "OK",
                            onPress: () => navigation.goBack() ,
                            style: "default",
                        },
                        ],
                     
                    );
                    // register();
                }else{
                    //Email already used!
                    Alert.alert(
                        "This Account Exist!",
                        "You have an account in our application!",
                        [
                        {
                            text: "OK",
                            onPress: () =>  navigation.goBack(),
                            style: "default",
                        },
                        ],
                     
                    );                  
                }
               
            }catch(error){

            }             
        }else{
           
            if( data.firstName.length == 0){
               booleans_flag[0] = true;
            }

            if( data.lastName.length == 0){
                booleans_flag[1] = true;
            }

            if( data.phone.length == 0){
                booleans_flag[2] = true;
            }

            if( data.email.length == 0){
                booleans_flag[3] = true;
            }

            if( data.password.length == 0){

                booleans_flag[4] = true;               
            }

            if( data.re_password.length == 0){

                booleans_flag[5] = true;
            }

            
        }       
        setData({
            ...data,                 
            check_textInputChangeFirstName:!booleans_flag[0],
            check_textInputChangeLastName:!booleans_flag[1],
            check_textInputChangePhone:!booleans_flag[2],
            check_textInputChangeEmail:!booleans_flag[3],
        });

        setUserRegister({
            ...userRegister,
            error_firstName:booleans_flag[0],
            error_lastName:booleans_flag[1],
            error_phone:booleans_flag[2],
            error_email:booleans_flag[3],
            error_password:booleans_flag[4],
            error_re_password:booleans_flag[5],
        });

        if(booleans_flag[4] && booleans_flag[5]){
            setTextError({
                ...textError,
                textPassword:"Password field empty!",
                textRePassword:"Re-Password field empty!"
            });
        }
        
    }
    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>
        <View style={styles.container} >   
             <Animatable.View 
                style={styles.footer}
                animation={"fadeInUpBig"}
                >
               
                <Text style={styles.title}>Register now for future of your City!</Text>

                <ScrollView>
                {/*---------------------  FIRST NAME FIELD ---------------- */}
                <Text style={styles.text_footer} >First Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        placeholder="First Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        returnKeyType = {"next"}
                        onChangeText={(val) => textInputChangeFirstName(val)}
                    />
                    {data.check_textInputChangeFirstName ? 
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
                {userRegister.error_firstName ? <Text style={styles.text_error} >First Name Empty!</Text> : null}   

                {/*---------------------  LAST NAME FIELD ---------------- */}    
                <Text style={styles.text_footer} >Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        placeholder="Last Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        returnKeyType = {"next"}
                        onChangeText={(val) => textInputChangeLastName(val)}
                    />
                    {data.check_textInputChangeLastName ? 
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
                {userRegister.error_lastName ? <Text style={styles.text_error} >Last Name Empty!</Text> : null}   

                 {/*---------------------  PHONE NUMBER FIELD ---------------- */}    
                <Text style={styles.text_footer} >Phone</Text>
                <View style={styles.action}>
                    <Feather
                        name="phone"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        placeholder="Phone Number"
                        style={styles.textInput}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        maxLength={10}
                        returnKeyType = {"next"}
                        onChangeText={(val) => textInputChangePhone(val)}
                    />
                    {data.check_textInputChangePhone ? 
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
                {userRegister.error_phone ? <Text style={styles.text_error} >Phone incorect!</Text> : null}       

                {/*---------------------  EMAIL FIELD ---------------- */}    
                <Text style={styles.text_footer} >Email</Text>
                <View style={styles.action}>
                    <Fontisto
                        name="email"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        placeholder="Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        returnKeyType = {"next"}
                        onChangeText={(val) => textInputChangeEmail(val)}
                    />
                    {data.check_textInputChangeEmail ? 
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
                {userRegister.error_email ? <Text style={styles.text_error} >Please enter valid email address.</Text> : null}    

                 {/*--------------------- PASSWORD FIELD ---------------- */}    
                <Text style={styles.text_footer} >Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        secureTextEntry={data.secureTextEntryPassword ? true : false}
                        placeholder="Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        returnKeyType = {"next"}
                        onFocus={(val) => onFocusPassword(val)}
                        onBlur={(val) => onLostFocusPassword(val)}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntryPassword} > 
                        {data.secureTextEntryPassword ? 
                            
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
                {userRegister.error_password ? <Text style={styles.text_error} >{textError.textPassword}</Text> : null} 

                {/*---------------------  CONFIRM PASSWORD FIELD ---------------- */}
                <Text style={styles.text_footer} >Confirm Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput 
                        secureTextEntry={data.secureTextEntryRePassword ? true : false}
                        placeholder="Confirm Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        returnKeyType = {"go"}
                        onFocus={(val) => onFocusPassword(val)}
                        onBlur={(val) => onLostFocusRePassword(val)}
                        onChangeText={(val) => handleRePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntryRePassword} > 
                        {data.secureTextEntryRePassword ? 
                            
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
                {userRegister.error_re_password ? <Text style={styles.text_error} >{textError.textRePassword}</Text> : null} 

                </ScrollView>
                      
                <View style={styles.registerButton}>
                    <TouchableOpacity onPress={() => registerHandler()}  style={styles.button}>                                                            
                            <Text style={styles.textRegister} >Register Now</Text>                  
                            <Feather 
                                name="arrow-up-circle" 
                                color="#FFF"
                                size={20}                        
                            />                                            
                    </TouchableOpacity>
                </View> 
                                                        
             </Animatable.View>
            
        </View>
        </TouchableWithoutFeedback>  
    )
}

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
        marginTop:50,
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
        textAlign:"center"
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
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
        marginBottom:30,
    },
    loginRegisterButtons:{     
        flex:1,
        flexDirection:"row",
        // justifyContent:"center",
        // alignItems:"center",
        justifyContent:"space-around",
        marginLeft:20,
        marginTop:30,
        marginRight:30,
        marginBottom:30,
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

export default Register;


//  <Text onPress={() => register()} >Register</Text>

//ramane sa fac functionalitati pentru fiecare camp