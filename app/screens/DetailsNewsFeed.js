import React, { useCallback } from 'react';
import {
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableNativeFeedback,
    ScrollView,
} from "react-native" ;
import { getFocusedRouteNameFromRoute,useNavigationState,useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


import * as colors from "../../config/colors/colors";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export default function DetailsNewsFeed ({navigation,route}){
    const index = useNavigationState(state => state.index);
    console.log("index of newsFeed");
    console.log(index);
    const flag = useIsFocused();
    console.log(flag);
    console.log(route);
    
    useFocusEffect(useCallback(() => {
       return(()=>{
           navigation.goBack();
       })
    },[]));

    
    return(      
        <Animatable.View 
            style={styles.container} 
            animation={"pulse"}
            duration={200}
        >
            <Ionicons 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                name={"arrow-back"}
                size={26}
                color={colors.default.backgroundHeaderActive}
            />
            
            <ScrollView style={styles.cardContainer} >
                <View style={styles.descriptionTitle}>
                    <MaterialIcons  name={"description"} size={26} color={colors.default.backgroundHeaderActive} />
                    <Text 
                        style={{
                            fontSize:16,
                            fontWeight:"500",
                        }}>
                        Description
                    </Text>
                </View>
                              
                <View style={styles.postDescription}>
                    <Text style={styles.postDescriptionText}>{route.params.description}</Text>
                </View> 
                             
                <View style={styles.postCategory}>
                    <MaterialIcons name={"category"} size={26} color={colors.default.backgroundBottomInactive} />
                    <Text style={{fontSize:16,fontWeight:"500",textAlign:"center"}}>{route.params.category} </Text>
                </View> 
                <View style={styles.postStatus}>
                    {route.params.status === "Postat" ? 
                        <AntDesign name={"pluscircleo"}  size={26} color={colors.default.backgroundBottomInactive}  /> : 
                        route.params.status === "In progres" ?
                        <AntDesign name={"clockcircleo"} size={26} color={colors.default.backgroundBottomInactive} /> :
                        route.params.status === "Rezolvat" ?
                        <AntDesign name={"checkcircleo"}  size={26} color={colors.default.backgroundBottomInactive}  /> :
                        route.params.status === "Problema raportata" ?
                        <AntDesign name={"notification"}  size={26} color={colors.default.backgroundBottomInactive}  /> :
                        route.params.status === "Nerezolvat" ?
                        <AntDesign name={"frowno"}  size={26} color={colors.default.backgroundBottomInactive}  /> : 
                       
                        <AntDesign name={"questioncircleo"}  size={26} color={colors.default.backgroundBottomInactive}  />
                    }
                
                    <Text style={{fontSize:16,fontWeight:"500",textAlign:"center"}} > {route.params.status}</Text>
                </View>
                {/* <ScrollView style={styles.postImage}> */}
                    <Image
                        resizeMode="contain"
                        style={{width:deviceWidth,height:deviceHeight -100}}
                        source={{uri:route.params.image}} 
                        
                    />   
                {/* </ScrollView> */}
                                   
            </ScrollView> 
                        
                                                                                           
        </Animatable.View>  
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor:colors.default.backGroundApp,    
        height:50,
    },
    cardContainer:{
        flex:1,
        backgroundColor:colors.default.backGroundApp,
        // width:deviceWidth,
        // height:200,
        // justifyContent:"center",
        // alignItems:"center",
    },
    backButton:{
        // position: 'absolute', 
        // top: 0, 
        // left: 0, 
        // right: 0, 
        // bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    descriptionTitle:{
        flex:1,
        flexDirection:"row",
        paddingVertical:10,
       

    },
    postDescriptionText:{
        textAlign:"center",
        fontSize:14,
        fontFamily:"sans-serif"
    },
    postDescription:{          
        justifyContent:"flex-start",
        alignItems:"center",
    },
    postCategory:{
        // flex:1,
        paddingBottom:10,
        paddingTop:3,
        flexDirection:"row",
        justifyContent:"flex-start",
       
    },

    postStatus:{
        flex:1,
        justifyContent:"flex-start",
        flexDirection:"row",
        alignItems:"center",
        // paddingBottom:10,
        paddingTop:10,
    },
    postImage:{
       marginTop:20,


    }
    
    
});