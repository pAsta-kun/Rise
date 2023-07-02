import {View, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LargeText from '../components/text/largeText';
import DefaultButton from '../components/buttons/defaultButton';
import RegularText from '../components/text/regularText';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';


const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasSetup, setHasSetup] = useState(false)
    const auth = getAuth();;

    const signIn = async (email, password) => {
        console.log(email + password);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
            // Signed in
            const user = userCredential.user;
            const uid = user.uid;
            const docRef = doc(FIRESTORE_DB, "USERS", uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data()["email"]);
                if(docSnap.data()["setup"] === true)
                    navigation.navigate('Camera', {uid: uid});
                else navigation.navigate('Setup', {uid: uid});
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error [${errorCode}]: ${errorMessage}`);
        }
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