import {View, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LargeText from '../components/text/largeText';
import DefaultButton from '../components/buttons/defaultButton';
import RegularText from '../components/text/regularText';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { useState } from 'react';
import { WhiteBalance } from 'expo-camera';


const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const styles = StyleSheet.create({
        background: {
            flex:1,
            resizeMode: 'cover',
        },
        input: {
            borderWidth: 3,
            color: "#f7f7f7",
            fontSize: 16,
            borderColor: "#f7f7f7",
            background: 'rgba(118, 118, 128, .30)',
            height: 60,
            marginVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginHorizontal: 20
        }
    });
    return (
        <ImageBackground 
        source={require('../../assets/images/background.jpg')}
        style={styles.background}
        >
            <View>
                <LargeText text={"Login"}/>
                <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email}/>
                <TextInput style={styles.input} textContentType="password" placeholder="Password" onChangeText={(text) => setPassword(text)} value={password}/>
                <TouchableOpacity onPress={() => navigation.navigate('Setup')}>
                    <RegularText text={"Create Account"} size={16}/>
                </TouchableOpacity>
                <DefaultButton 
                    text={"Sign in"} 
                    bgColor={'rgba(118, 118, 128, .30)'} 
                    textColor={'white'}
                    onPress={() => navigation.navigate('Setup')}
                    marginTop={150}
                />
            </View>
        </ImageBackground>
    )


}

export default Login;