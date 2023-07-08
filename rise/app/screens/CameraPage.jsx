import { Camera } from 'expo-camera';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../../firebaseConfig';
import DefaultButton from '../components/buttons/defaultButton';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import FormData from 'form-data';

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

    const getImagURI = async(uri) => {
        const listRef = ref(FIREBASE_STORAGE, 'images/users/' + uid)
        listAll(listRef)
        .then((res) => {
          res.items.forEach( async (itemRef) => {

            const itemRefPath =  itemRef._location.path_;
            getDownloadURL(ref(FIREBASE_STORAGE, itemRefPath)).then((url) => {
                console.log(url);
                compareImage(uri, url)
            })
            
            // .then( async (url) => {
            //     const response = await fetch(url)
            //     console.log("fetched")
            //     const blob = await response.blob()
            //     console.log("Translated to blob")
            //     console.log(blob.size, blob.type)
            // });
          });
          
        }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
        });
    }

    const compareImage = async (uriA, uriB) => {
        setCameraEnable(false);
        // FIREBASE_STORAGE, 'images/users/' + uid
        // blob from the uri
        const responseA = await fetch(uriA);
        const blobA = await responseA.blob();
        const imageNameA = uriA.split("/").pop();

        const responseB = await fetch(uriB);
        const blobB = await responseB.blob();
        const imageNameB = uriB.split("/").pop();

    
        let form = new FormData();
    
        // blob => formdata = imageA
        form.append('imageA', {
            name: imageNameA,
            type: 'image/jpeg',
            uri: uriA,
        });
    
        // blob => formdata = imageB
        form.append('imageB', {
            name: imageNameB,
            type: 'image/jpeg',
            uri: uriB,
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
    

    const uploadPicture = async (uri) => {
        const doc = addDoc(imageRef, {imageuri: uri})

        //Translates uri to blob
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log(blob.size, blob.type);
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
            getImagURI(data.uri)
        }
            

            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                })
            ]).start();
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
