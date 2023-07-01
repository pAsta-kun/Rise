import {View, TextInput, ImageBackground, StyleSheet, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import LargeText from '../components/text/largeText';
import RegularText from '../components/text/regularText';
import DefaultButton from '../components/buttons/defaultButton';
import React, { useState } from 'react'; 

const FitnessSetup = ({navigation}) => 
{
    const router = useRouter();
    const [value, setValue] = useState('');
    const dismissKeyboard = () => {
        if(Keyboard !== undefined)
                Keyboard.dismiss();
                dismissKeyboard
    };
    const { state } = useLocalSearchParams();
    const styles = StyleSheet.create({
        background: {
            flex:1,
            resizeMode: 'cover',
        },
        div: {
            flexDirection:'row',
            justifyContent:'center',
            alignItems: 'center',
            marginTop: 75,
            gap: 20,
        }
    });
    function nextPage(state)
    {
        console.log(state);
        if (state == 'false') {
            router.push("/riseSetup")
        } else {
            router.push("/photoSetupExplain")
        }
    }
    return (
        <ImageBackground 
        source={require('../../assets/images/background.jpg')}
        style={styles.background}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View>
                    <LargeText text={"Fitness"}/>
                    <RegularText text={"How many steps to rise?"} size={24}/>

                    <View style={styles.div}>
                        <RegularText text={"Steps:"} size={24}/>
                            <TextInput
                                style={{ height: 40, width: '20%', borderColor: 'white', borderWidth: 1, borderRadius: 10, paddingLeft: 10, color:'white'}}
                                keyboardType='numeric'
                                onChangeText={text => setValue(text)}
                                value={value}
                                returnKeyType='done'
                                onSubmitEditing={dismissKeyboard}
                            />
                    </View>

                    <DefaultButton 
                    text={"Next"} 
                    bgColor={'rgba(118, 118, 128, .30)'} 
                    textColor={'white'}
                    onPress={() => {nextPage(state)}}
                    marginTop={300}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
        
    )
}

export default FitnessSetup;
