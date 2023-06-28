import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Font from 'expo-font';


function RegularText({text, size, marginT, marginB}) 
{
    const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginT, 
        marginBottom: marginB
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: size,
        textAlign: 'center',
        color: 'white'
    },

});
    const [fontLoaded, setFontLoaded] = useState(false);

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

export default RegularText;
