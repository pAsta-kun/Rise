import { Camera } from 'expo-camera';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import {Entypo} from '@expo/vector-icons'
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import RegularText from '../components/text/regularText';
import { FIRESTORE_DB } from '../../firebaseConfig';

function CameraPage()
{
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const imageRef = collection(FIRESTORE_DB, 'images');

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
            const doc = addDoc(imageRef, {imageuri: data.uri})

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
            <TouchableOpacity
                style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                }}
                onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
                }}>
                <RegularText text={"F"} size={24} marginB={20}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                }}
                onPress={takePicture}
                >
                <RegularText text={"O"} size={24} marginB={20}/>
                {/* <Entypo name="circle" size={70} color="white"/> */}
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                }}
                onPress={takePicture}
                >
                <RegularText text={"N"} size={24} marginB={20}/>
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
