import {View, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { Dimensions } from 'react-native';
import LargeText from '../components/text/largeText';
import DefaultButton from '../components/buttons/defaultButton';
import RegularText from '../components/text/regularText';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';


const Home = ({navigation, route}) => {
    const { uid } = route.params;
    const cameraRef = useRef(null);
    const [fitnessValue, setFitnessValue] = useState('N/A');
    const [photoValue, setPhotoValue] = useState(false)
    const docRef = doc(FIRESTORE_DB, "USERS", uid);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        isFitness();
        isPhoto();
        console.log("home")
    }, [])
    
    const styles = StyleSheet.create({
        background: {
            flex:1,
            resizeMode: 'cover',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
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
        },
        halfScreen: {
            width: windowWidth/2,
            height: windowHeight,
            justifyContent: 'center',
            alignItems: 'center',
        },
        posAb: {
            position: 'absolute',
            zIndex: 2,
            top: 50,
        }
    });
    const isFitness = async () => {
        const docSnap = await getDoc(docRef);
        const fitness = docSnap.data()["fitness"];
        setFitnessValue(fitness)
    }
    const isPhoto = async() => {
        const docSnap = await getDoc(docRef);
        const photo = docSnap.data()["photo"];
        setPhotoValue(photo)
    }
    return (
        // <ImageBackground 
        // source={require('../../assets/images/background.jpg')}
        // style={styles.background}
        // >
        //     <View>
        //         <LargeText text={"Rise"}/>
        //         {
        //             fitnessValue !== 'N/A' && 
        //             <View>
        //                 <RegularText text={"0/" + fitnessValue} size={32}/>
        //             </View>
        //         }
        //         {
        //             photoValue === true &&
        //             <View>
        //                 <RegularText text={photoValue +""} size={32}/>
        //             </View>
        //         }
        //     </View>
        // </ImageBackground>
        <ImageBackground 
                source={require('../../assets/images/background.jpg')}
                style={styles.background}
                >
                    <View style={styles.posAb}>
                        <LargeText text={"Rise"}/>
                    </View>
                    
            {
                fitnessValue !== 'N/A' &&
                <View style={styles.halfScreen}>
                    <RegularText text={fitnessValue + " Steps"} size={32}/>
                </View>  
            }
            {
                photoValue === true &&
                <TouchableOpacity onPress={() => navigation.navigate('Camera', {uid: uid})}>
                    <Camera style={{ zIndex: 0 }} type={Camera.Constants.Type.back} ref={cameraRef}>
                        <View style={styles.halfScreen}/>
                    </Camera>
                </TouchableOpacity> 
            }
        </ImageBackground> 
    )


}

export default Home;