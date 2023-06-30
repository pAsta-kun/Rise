import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Font from 'expo-font';

function LargeText({text, marginTop}) 
{
    const [fontLoaded, setFontLoaded] = useState(false);

    if(marginTop === undefined)
        marginTop = 150
    
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: marginTop, 
            marginBottom: 75
        },
        text: {
            fontFamily: 'Montserrat',
            fontSize: 72,
            textAlign: 'center',
            color: 'white'
        },

    });

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Montserrat: require('../../../assets/fonts/Montserrat-Regular.ttf'),
            });
            setFontLoaded(true);
        }
        loadFont();
    }, []);
      
    if (!fontLoaded) {
        return null; // or a loading spinner, for example
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
};

export default LargeText;
