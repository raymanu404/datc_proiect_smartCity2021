import React from 'react';
import 
{
    View,
    Text,
} from 'react-native';

const UserPostsDetails = ({navigation,route}) =>{
    return (
        <View>
            <Text>userPostsDetails</Text>
            <Text onPress={()=>navigation.goBack()}>Go back</Text>
        </View>
    )
};


export default UserPostsDetails;