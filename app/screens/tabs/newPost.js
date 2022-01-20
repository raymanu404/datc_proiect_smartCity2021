import React,{useEffect,useContext,useState} from 'react';
import {
    ImageBackground,
    Text,
    View,
    Image,
    StyleSheet,
    Button,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Picker,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from "react-native"; 
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker  from 'react-native-image-crop-picker';
import GetLocation from 'react-native-get-location';
// import Geocoder from 'react-native-geocoder';
import api_axios from '../../../config/api/api_axios';
import { UserContext } from '../../../App';

const deviceWidth = Math.round(Dimensions.get("window").width);


export default function NewPost (){
    const userData = useContext(UserContext);
    

    const [postData,setPostData] = useState({
        title:"",
        description:"",
        category:"",
        location:{
            accuracy:'',
            altitude:'',
            latitude:'',
            longitude:'',
            time:'',
            localName:'',
        },
        image:"",
        userId:userData["id"]
    });
    const [error,setError] = useState({
        error_title:false,
        error_description:false,
        error_image:false,
        error_total:false,
    });
    const [categories, setCategories] = useState([
        "Groapa",
        "tavan spart",
        "gunoi",
        "apa murdara",
        "geam spart",
        "inundatie"
    ]);
    const [locationAccept,setLocationAccept] = useState(false);

    useEffect(
      React.useCallback( async () => {
        
          // fetch("https://restcountries.com/v3.1/name/peru")
          // .then(response =>{
          //     response.json().then(data =>{
          //       // console.log(data);
          //       }
          //     );
          // })
    }),[]);

    function textTitleHandler (val){
        if(val.length != 0){
            setPostData({
                ...postData,
                title:val
            });
            setError({
                ...error,
                error_total:false
            });

        }else{
            setPostData({
                ...postData,
                title:val
            });
            setError({
                ...error,
                error_total:true
            });
        }
    };

    const textDescriptionHandler = (val) =>{
         if(val.length != 0){
            setPostData({
                ...postData,
                description:val
            });
             setError({
                ...error,
                error_total:false
            });    
        }else{
             setPostData({
                ...postData,
                description:val
            });
             setError({
                ...error,
                error_total:true
            });  
        }       
    };

    const textCategoryHandler = () =>{

    };

    const getLocationHandler =  () =>{
      
        if(!locationAccept){
             Alert.alert(
                "Get your location",
                "Are you agree to get your location?",
            [
            {
                text:"No",
                onPress:()=>{setLocationAccept(false);}
            },
            {
                text:"Yes",
                onPress: ()=>{ 
                     GetLocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 15000,
                    })
                    .then( async (location) => {
                        await getAddress(location.latitude,location.longitude);
                        setLocationAccept(true);
                        setPostData({
                            ...postData,
                            location:{
                                ...location,
                                altitude:location.altitude,
                                latitude:location.latitude,
                                accuracy:location.accuracy,
                                longitude:location.longitude,
                                latitudeDelta:0.01222,
                                longitudeDelta:Dimensions.get('window').width/Dimensions.get('window').height * 0.01222,
                                time:location.time,                            
                            }
                        });
                       
                        navigator.geolocation.getCurrentPosition(pos=>{
                            getAddress(pos.coords.latitude,pos.coords.longitude);
                        })
                    })
                    .catch(error => {
                        const { code, message } = error;
                        console.warn(code, message);
                    })
                }
            }
            ]);
        }else{
            setLocationAccept(false);
        }
         
    };

    const getImageFromCamera = () =>{
        ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        }).then(image => {
            if(image){
                console.log(image.path);
                 setPostData({
                    ...postData,
                    image:image.path
                 });
                setError({
                    ...error,
                    error_total:false,
                });
            }else{
                setError({
                    ...error,
                    error_total:true,
                }); 
            }
                      
        }).catch(er=>{
            setError({
                ...error,
                error_total:true,
            })
        });
    };
    const getAddress = async({lat,long}) =>{
        // Geocoder.fallbackToGoogle('AIzaSyDsWG2FNyEq3U_8Vxp509Tf4JR47yumqRc');
        // let ret = await Geocoder.geocodePosition({lat,long})
        // console.log(ret);
    }

    //optional
    const getImageFromGallery = () =>{

    };

    const  onSubmitButtonHandler = async () =>{
        //POST 
        if(!error.error_total && postData.image.length != 0){
            try{

                var date = new Date().getDate();
                var month = new Date().getMonth() + 1;
                var year = new Date().getFullYear();

                var fullDate = date + "/" + month +"/" + year;
                console.log(fullDate);
        
                const newPostData = JSON.stringify({
                    UserId:postData.userId,
                    Title:postData.title,
                    Description:postData.description,
                    Date:fullDate,
                    Category:postData.category,
                    ImagePath:postData.image,
                    Location:postData.location.longitude,
                });
                console.log(postData.userId);
                const headers ={    
                                'Access-Control-Allow-Origin':'http://localhost:19006',  
                                'Access-Control-Allow-Credentials':'true',
                                'Access-Control-Allow-Methods':'GET,POST,OPTIONS',    
                                'Access-Control-Allow-Headers':'Authorization, Content-Type',          
                                'Accept':'application/json',
                                'Content-Type':'application/json',                   
                }
                const response = await api_axios.post("/insert/post",newPostData,{headers});   
                const myResponse = JSON.parse(response.data);
                console.log(myResponse);  
                if(myResponse["ResponseStr"] == "New post inserted succesffully!"){
                    alert("Congratulations, you submitted successfully!");  
                }
                         
                setPostData({
                    ...postData,
                    title:"",
                    description:"",
                    category:"",
                    location:{
                        accuracy:'',
                        altitude:'',
                        latitude:'',
                        longitude:'',
                        time:'',
                        localName:'',
                    },
                    image:"",
                });
                      
            }catch(ex){
                console.log(ex);
            }
                   
        }else{
            setError({
                ...error,
                error_total:true
            });
        }
    };

    const Item = () =>(
        <View style={{width:deviceWidth - 20,flex:1,justifyContent:'center',alignItems:"center"}}>
            <View >
                {error.error_total ? <Text style={{color:"red",fontSize:16}}>Fields Empty!</Text> : null}
            </View>  
            {/* --------------------------- TITLE -----------------*/}
              <View style={styles.userInfoContainer}>
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}> Title</Text>  
                        <TextInput 
                            textAlignVertical='top'
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={postData.title}                           
                            onChangeText={(val)=> textTitleHandler(val)}                    
                        />
                    </View>
                </View>

                {/* ------------------- DESCRIPTION ----------------------------- */}
                <View style={[styles.userInfoContainer,{height:80}]}>
                     <View style={styles.userInfo}>
                        <Text style={styles.textLabel}>Description</Text>  
                        <TextInput 
                            placeholder=""
                            textAlignVertical='top'
                            style={styles.textInput}
                            autoCapitalize="none"   
                            multiline={true}  
                            value={postData.description}
                            onChangeText={(val)=> textDescriptionHandler(val)}                     
                         />
                    </View>    
                </View>

                {/* -------------------- CATEGORY ------------------------ */}
                <View style={styles.userInfoContainer}>
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}>Category</Text>                                                    
                        <View style={styles.comboBoxCategory} >
                            <Picker
                                selectedValue={postData.category}
                                style={[{ height: 50, width: 150, },styles.textResult]}                               
                                onValueChange={(itemValue, itemIndex) => setPostData({
                                    ...postData,
                                    category:itemValue
                                })}>
                                    {categories.map( item =>{
                                        return (
                                           <Picker.Item label={item} value={item} />
                                        )
                                    })}
                            </Picker>
                        </View>                     
                    </View>
                     
                </View>

                {/* --------------------------- LOCATION -------------------- */}
                <View style={[styles.userInfoContainer,{height:50}]} >              
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}> {locationAccept ? 'Your Location' : 'Get Location'} </Text>
                        <TouchableOpacity onPress={()=>getLocationHandler()} style={{paddingLeft:10}}>
                            {locationAccept ? <MaterialIcons name={"refresh"} size={30} color={"#FFF"} />  : <MaterialIcons name={"location-on"} zie={30} color={"#FFF"} />}
                        </TouchableOpacity>                                                                                              
                    </View>   
                </View>

                {/* --------------------- IMAGE ----------------------- */}
                <View style={[styles.userInfoContainer,{height:50}]}>
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}>Choose Photo</Text>
                        <TouchableOpacity style={{paddingLeft:10}} onPress={()=>getImageFromCamera()}>
                            <MaterialIcons name={"add-a-photo"} size={26} color={"#FFF"} /> 
                        </TouchableOpacity>                                                                         
                    </View>                   
                </View>
                  
                {/*---------------------------- VIEW IMAGE AND SUBMIT -------------------------  */}
                <View style={{marginTop:10,marginBottom:10,paddingBottom:10,marginBottom:50}}>
                    {postData.image ? <Image source={{uri:postData.image}} resizeMode={"contain"} style={{width:400,height:500,}} />  : null}                   
                    <View style={styles.submitButton}>
                    <TouchableOpacity  onPress={() => onSubmitButtonHandler()}  style={styles.button}>                                                            
                        <Text style={styles.textLabel} >Submit</Text>                  
                        <MaterialIcons 
                            name="check-circle-outline" 
                            color="#FFF"
                            size={26}                        
                        />                                            
                    </TouchableOpacity>                   
                    </View>               
                </View>      
                                   
        </View>
    );

    const renderItem = ({item}) => (<Item />)

    return(  
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
            // console.log("press");
        }}>      
            <Animatable.View style={styles.newPostContainer} animation={"fadeInUpBig"}>
            <View >
            {error.error_total ? <Text style={{color:"red",fontSize:16}}>Fields Empty!</Text> : null}
            </View>  
            {/* --------------------------- TITLE -----------------*/}
              <View style={styles.userInfoContainer}>
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}> Title</Text>  
                        <TextInput 
                            textAlignVertical='top'
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={postData.title}                           
                            onChangeText={(val)=> textTitleHandler(val)}                    
                        />
                    </View>
                </View>

                {/* ------------------- DESCRIPTION ----------------------------- */}
                <View style={[styles.userInfoContainer,{height:80}]}>
                     <View style={styles.userInfo}>
                        <Text style={styles.textLabel}>Description</Text>  
                        <TextInput 
                            placeholder=""
                            textAlignVertical='top'
                            style={styles.textInput}
                            autoCapitalize="none"   
                            multiline={true}  
                            value={postData.description}
                            onChangeText={(val)=> textDescriptionHandler(val)}                     
                         />
                    </View>    
                </View>

                {/* -------------------- CATEGORY ------------------------ */}
                <View style={styles.userInfoContainer}>
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}>Category</Text>                                                    
                        <View style={styles.comboBoxCategory} >
                            <Picker
                                selectedValue={postData.category}
                                style={[{ height: 50, width: 150, },styles.textResult]}                               
                                onValueChange={(itemValue, itemIndex) => setPostData({
                                    ...postData,
                                    category:itemValue
                                })}>
                                    {categories.map( item =>{
                                        return (
                                           <Picker.Item label={item} value={item} />
                                        )
                                    })}
                            </Picker>
                        </View>                     
                    </View>
                     
                </View>

                {/* --------------------------- LOCATION -------------------- */}
                <View style={[styles.userInfoContainer,{height:50}]} >              
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}> {locationAccept ? 'Your Location' : 'Get Location'} </Text>
                        <TouchableOpacity onPress={()=>getLocationHandler()} style={{paddingLeft:10}}>
                            {locationAccept ? <MaterialIcons name={"refresh"} size={30} color={"#FFF"} />  : <MaterialIcons name={"location-on"} zie={30} color={"#FFF"} />}
                        </TouchableOpacity>                                                                                              
                    </View>   
                </View>

                {/* --------------------- IMAGE ----------------------- */}
                <View style={[styles.userInfoContainer,{height:50}]}>
                    <View style={styles.userInfo}>
                        <Text style={styles.textLabel}>Choose Photo</Text>
                        <TouchableOpacity style={{paddingLeft:10}} onPress={()=>getImageFromCamera()}>
                            <MaterialIcons name={"add-a-photo"} size={26} color={"#FFF"} /> 
                        </TouchableOpacity>                                                                         
                    </View>                   
                </View>
                  
                {/*---------------------------- VIEW IMAGE AND SUBMIT -------------------------  */}
                <View style={{marginTop:10,marginBottom:10,paddingBottom:10,marginBottom:50}}>
                    {/* {postData.image ? <Image source={{uri:postData.image}} resizeMode={"contain"} style={{width:400,height:500,}} />  : null}                    */}
                    <View style={styles.submitButton}>
                    <TouchableOpacity  onPress={() => onSubmitButtonHandler()}  style={styles.button}>                                                            
                        <Text style={styles.textLabel} >Submit</Text>                  
                        <MaterialIcons 
                            name="check-circle-outline" 
                            color="#FFF"
                            size={26}                        
                        />                                            
                    </TouchableOpacity>                   
                    </View>               
                </View>            
            </Animatable.View>
         </TouchableWithoutFeedback>    
    );
}


const styles = StyleSheet.create({
    newPostContainer:{
        flex:1,
        alignItems: "center",
        backgroundColor:"#FFF",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginTop:20,
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
        marginTop:30,
    },
    userInfo:{
        flex:1,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
    },
    textInput:{
        flex:1,
        marginLeft:10,
        paddingLeft:5,
        color:"#FFF",
        fontSize:16,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        width:100,
        height:30,
      
    },
    comboBoxCategory:{
        flex: 1,
        paddingTop: 10,
        alignItems: "center",
        marginBottom:10,
    },
    submitButton:{
        // flex:1,
        flexDirection:"row",
        justifyContent:"center",
    },
    textSubmit:{
        color:"#FFF",
        fontWeight:"500",
    },
    button:{
        marginTop:10,
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
    textLabel:{
        fontSize:16,
        fontWeight:'bold',
        color:"#FFF",
        textAlign:"center",
        letterSpacing:1,
    },
    textResult:{
        fontSize:16,
        fontWeight:'bold',
        color:"#FFF",
        textAlign:"center",    
    }
    
});