import {View, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LargeText from '../components/text/largeText';
import DefaultButton from '../components/buttons/defaultButton';
import RegularText from '../components/text/regularText';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import { useState } from 'react';


const CreateAccount = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const auth = getAuth();

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user;
            //Makes acc in db
            const uid = user.uid;
            const sentToDB = setDoc(doc(FIRESTORE_DB, "USERS", user.uid), {email: email, setup: false, fitness: "N/A", photo: "N/A"}).then(() => {
                console.log("Sent to DB")
            })

            navigation.navigate('Setup', {uid: uid});
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
                <LargeText text={"Create Account"} marginTop={100}/>
                <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email}/>
                <TextInput style={styles.input} textContentType="password" placeholder="Password" onChangeText={(text) => setPassword(text)} value={password}/>
                {password.length > 6 && (
                    <TextInput style={styles.input} textContentType="password" placeholder="Confirm Password" onChangeText={(text) => setConfPassword(text)} value={confPassword}/>
                )}
                <DefaultButton 
                    text={"Create Account"} 
                    bgColor={'rgba(118, 118, 128, .30)'} 
                    textColor={'white'}
                    onPress={() => signUp(email, password)}
                    marginTop={50}
                    disabled={password.length < 6 && password !== confPassword}
                />
            </View>
        </ImageBackground>
    )


}

export default CreateAccount;