import React from 'react';
import 
{
    View,
    Text,
    StyleSheet,
} from 'react-native';

const UserPosts = ({navigation,route}) =>{
    return (
        <View style={styles.container}>
            <Text>userPosts</Text>
            <Text onPress={()=>navigation.navigate("UserPostsDetails",{name:"User Posts Details"})}>click here user posts details </Text>
            <Text onPress={()=>navigation.goBack()}>Go back</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
});

export default UserPosts;