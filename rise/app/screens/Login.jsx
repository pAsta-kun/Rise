import {View, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LargeText from '../components/text/largeText';
import DefaultButton from '../components/buttons/defaultButton';
import RegularText from '../components/text/regularText';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';


const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user;

            //const doc = addDoc(collection(FIRESTORE_DB, ), {title: todo, done: false})
            console.log("Success!" + user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

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
            backgroundColor: 'rgba(118, 118, 128, .20)',
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
                <TouchableOpacity onPress={() => navigation.navigate('Create Account')}>
                    <RegularText text={"Create Account"} size={16} color={"#9F86FF"}/>
                </TouchableOpacity>
                <DefaultButton 
                    text={"Sign in"} 
                    bgColor={'rgba(118, 118, 128, .30)'} 
                    textColor={'white'}
                    onPress={() => signIn(email, password)}
                    marginTop={150}
                />
            </View>
        </ImageBackground>
    )


}

export default Login;