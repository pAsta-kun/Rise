import {View, Switch, ImageBackground, StyleSheet} from 'react-native';

import RegularText from '../components/text/regularText';
import LargeText from '../components/text/largeText';
import DefaultButton from '../components/buttons/defaultButton';
import { updateDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import React, { useState } from 'react';    

function Setup( {route, navigation} )
{
    const [isFitEnabled, setIsFitEnabled] = useState(false);
    const toggleFitSwitch = () => setIsFitEnabled(previousState => !previousState);
    const [isPhoEnabled, setIsPhoEnabled] = useState(false);
    const togglePhoSwitch = () => setIsPhoEnabled(previousState => !previousState);
    const { uid } = route.params;
    const docRef = doc(FIRESTORE_DB, "USERS", uid);


    const styles = StyleSheet.create({
        background: {
            flex:1,
            resizeMode: 'cover',
        },
        wrapper: {
            flexDirection:'column',
            justifyContent:'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 75
        },
        div: {
            flexDirection:'row',
            justifyContent:'center',
            alignItems: 'center',
            gap: 20,
        }
    });
    return (
        <ImageBackground 
        source={require('../../assets/images/background.jpg')}
        style={styles.background}
        >
            <View>
                <LargeText text={"Set Up"}/>
                <RegularText text={"How would you like to rise?"} size={24}/>
                <View style={styles.wrapper}>
                    <View style={styles.div}>
                        <RegularText text={"Fitness"} size={24}/>
                        <Switch
                            trackColor={{ true: "#ff7e27", false: "#9F86FF" }}
                            thumbColor={isFitEnabled ? "#FFFFFF" : "#FFFFFF"}
                            ios_backgroundColor="#FFFFFF"
                            onValueChange={toggleFitSwitch}
                            value={isFitEnabled}/>
                    </View>
                    <View style={styles.div}>
                        <RegularText text={"Photo"} size={24}/>
                        <Switch
                            trackColor={{ true: "#ff7e27", false: "#9F86FF" }}
                            thumbColor={isPhoEnabled ? "#FFFFFF" : "#FFFFFF"}
                            ios_backgroundColor="#FFFFFF"
                            onValueChange={togglePhoSwitch}
                            value={isPhoEnabled}/>
                    </View>
                </View>
                
                
        
                <DefaultButton 
                    text={"Next"} 
                    bgColor={'rgba(118, 118, 128, .30)'} 
                    textColor={'white'}
                    onPress={() => nextPage(isPhoEnabled, isFitEnabled)}
                    marginTop={200}
                />
            </View>
        </ImageBackground>
    )

    function nextPage(phoEnabled, fitEnabled)
    {
        if(phoEnabled && fitEnabled){ 
            // console.log(userID);
            // const user = firebase.auth().currentUser;
            // console.log(user.uid);
            const sentToDB = updateDoc(docRef, { setup: false, fitness: "N/A", photo: false}).then(() => {
                console.log("Sent to DB")
            })
            navigation.navigate('FitnessSetup', {goToCamera: true, uid: uid})
        }
            
            
        else if(fitEnabled && !phoEnabled)
        {
            const sentToDB = updateDoc(docRef, {setup: false, fitness: "N/A", photo: false}).then(() => {
                console.log("Sent to DB")
            })
            navigation.navigate('FitnessSetup', {goToCamera: false, uid: uid})
        }
            
        else if(phoEnabled && !fitEnabled)
        {
            const sentToDB = updateDoc(docRef, {setup: false, fitness: "N/A", photo: false}).then(() => {
                console.log("Sent to DB")
            })
            navigation.navigate('CameraSetupInfo', {uid: uid})
        }
           
    }
}

export default Setup;
