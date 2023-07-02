import {View, Switch, ImageBackground, StyleSheet} from 'react-native';

import LargeText from '../components/text/largeText';
import RegularText from '../components/text/regularText';
import DefaultButton from '../components/buttons/defaultButton';
import React, { useState } from 'react';    

function CameraSetupInfo({navigation, route})
{
    const { uid } = route.params;

    const styles = StyleSheet.create({
        background: {
            flex:1,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center'
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
            width: '90%'
        }
    });
    return (
        <ImageBackground 
        source={require('../../assets/images/background.jpg')}
        style={styles.background}
        >
            <View>
                <RegularText text={"Photo Setup"} size={60} marginB={75} marginT={150}/>
                <View style={styles.div}>
                    <RegularText text={"You'll be taking 3 pictures of your desired rise area.\n\n Make sure this area is somewhere where you won't be tempted to immediatly start scrolling. \n\n Every morning you'll be required to take a picture of this same spot in order to rise."} size={24}/>
                </View>
                <DefaultButton 
                    text={"Next"} 
                    bgColor={'rgba(118, 118, 128, .30)'} 
                    textColor={'white'}
                    onPress={() => navigation.navigate('Camera', {uid: uid})}
                    marginTop={50}
                    />
            </View>
        </ImageBackground>
    )

}

export default CameraSetupInfo;
