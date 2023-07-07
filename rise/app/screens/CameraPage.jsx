import { Camera } from 'expo-camera';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import RegularText from '../components/text/regularText';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../../firebaseConfig';
import DefaultButton from '../components/buttons/defaultButton';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { Image } from 'react-native';
import axios from 'axios';
import FormData from 'form-data';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';


function CameraPage({navigation, route})
{
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photoValue, setPhotoValue] = useState(false)
    const [setupValue, setSetupValue] = useState(false)
    const [cameraEnable, setCameraEnable] = useState(false);
    const cameraRef = useRef(null);
    const [photoCount, setPhotoCount] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const imageRef = collection(FIRESTORE_DB, 'images');
    const { uid } = route.params;
    const userDoc = doc(FIRESTORE_DB, "USERS", uid);
    // const [location, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        isPhoto();
        hasSetup();

        // let { locationStatus } = await Location.requestForegroundPermissionsAsync();
        // console.log(locationStatus)
        // if (locationStatus !== 'granted') {
        //   setErrorMsg('Permission to access location was denied');
        //   return;
        // }

        })();
    }, []);

    // const getLocation = async () => {
    //     let locations = await Location.getCurrentPositionAsync({});
    //     setLocation(locations);
    //     console.log(location);
    // }

    const isPhoto = async() => {
        const docSnap = await getDoc(userDoc);
        const photo = docSnap.data()["photo"];
        setPhotoValue(photo)
    }
    const hasSetup = async() => {
        const docSnap = await getDoc(userDoc);
        const setup = docSnap.data()["setup"];
        setSetupValue(setup)
        console.log(setup)
    }

    // const compareImage = async(uri) => {


    //     setCameraEnable(false);
    //     const image = await fetch(require("./img2.jpg"));

    //     const blob = await image.blob();        
    //     console.log("1")
    //     const formData = new FormData();
    //     console.log("2")
    //     formData.append('imageA', {
    //         name: 'imageA.jpg',
    //         uri: blob,
    //         type: 'image/jpeg',
    //     });
    //     formData.append('imageB', {
    //         name: 'imageB.jpg',
    //         uri: blob,
    //         type: 'image/jpeg',
    //     });
    //     console.log("3")
    
    //     try {
    //         const response = await axios.post("http://192.168.1.77:5000/compare", formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
        
    // }

    const compareImage = async (uri) => {
        // Generate blob from the uri
        const response = await fetch(uri);
        const blob = await response.blob();
    
        // Create a new name for the image file
        const imageName = uri.split("/").pop();
    
        // Create a new FormData instance
        let form = new FormData();
    
        // Append the blob to the FormData instance, giving it the name `imageA`
        form.append('imageA', {
            name: imageName,
            type: 'image/jpeg',
            uri: uri,
        });
    
        // Similarly, append the same image as `imageB` (or use another image if needed)
        form.append('imageB', {
            name: imageName,
            type: 'image/jpeg',
            uri: uri,
        });
    
        // Use Axios to send a POST request with the image in the form data
        axios({
            method: 'post',
            url: 'http://192.168.1.77:5000/compare',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    

    const convertToBlob = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log(blob.size, blob.type);
        return blob;
    }

    const uploadPicture = async (uri) => {
        const doc = addDoc(imageRef, {imageuri: uri})

        //Translates uri to blob
        const blob = convertToBlob(uri);

        //Uploads it to storage
        const storageRef = ref(FIREBASE_STORAGE, 'images/users/' + uid + "/" + Date.now())
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
        setPhotoCount(photoCount+1);
        console.log(photoCount)
        setCameraEnable(false);
        if(photoCount === 2 && !photoValue)
        {
            const sentToDB = updateDoc(userDoc, {setup: true, photo: true}).then(() => {
                console.log("Sent to DB")
            })
        }
    }

    const takePicture = async () => {
        setCameraEnable(true);
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
        if(!setupValue)
        {
            uploadPicture(data.uri)
        }
        else{
            compareImage(data.uri)
        }
            

            // Animated.sequence([
            //     Animated.timing(fadeAnim, {
            //         toValue: 1,
            //         duration: 100,
            //         useNativeDriver: true,
            //     }),
            //     Animated.timing(fadeAnim, {
            //         toValue: 0,
            //         duration: 100,
            //         useNativeDriver: true,
            //     })
            // ]).start();
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    return (
        <View style={{ flex: 1 }}>
        
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
            <View
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                marginHorizontal: 30
            }}>
            {/* Location */}
            <TouchableOpacity
                style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                alignItems: 'center',
                marginBottom: 25,
                }}
                disabled={true}
                onPress={() => {
                    getLocation
                }}>
                    {((photoCount === 3) && !photoValue) && <></>}
                    {(!(photoCount === 3) || photoValue)  && <Ionicons name="location-outline" color="white" size={50}/>}
            </TouchableOpacity>
            {/* Camera */}
            <TouchableOpacity
                style={{
                flex: .5,
                alignSelf: 'flex-end',
                alignItems: 'center',
                marginBottom: 10,
                }}
                onPress={takePicture}
                disabled={cameraEnable}
                >
                {((photoCount === 3) && !photoValue) && <DefaultButton
                    text={"Next"} 
                    bgColor={'rgba(118, 118, 128, .30)'} 
                    textColor={'white'}
                    onPress={() => navigation.navigate('Home', {uid: uid})}
                    marginTop={150}
                    />}
                {(!(photoCount === 3) || photoValue) && <Ionicons name='ellipse-outline' color="white" size={100}/>}
            </TouchableOpacity>
            {/* Settings */}
            <TouchableOpacity
                style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                alignItems: 'center',
                marginBottom: 25,
                }}
                onPress={takePicture}
                >
                {((photoCount === 3) && !photoValue) && <></>}
                {(!(photoCount === 3) || photoValue) && <Ionicons name="settings-outline" color="white" size={50}/>}
            </TouchableOpacity>
            </View>
        </Camera>
        <Animated.View
            pointerEvents="none"
            style={{
                position: 'absolute',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                backgroundColor: 'black',
                opacity: fadeAnim,
            }}/>
        </View>
    );
}

export default CameraPage;
