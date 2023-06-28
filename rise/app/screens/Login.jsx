import {View, ImageBackground, StyleSheet} from 'react-native';
import LargeText from '../components/text/largeText';
import TempButton from '../components/buttons/tempButton';
import AppleAuthButton from '../components/buttons/appleAuthButton';




const Login = ({navigation}) => {
    const styles = StyleSheet.create({
        background: {
            flex:1,
            resizeMode: 'cover',
        },
    });
    return (
        <ImageBackground 
        source={require('../../assets/images/background.jpg')}
        style={styles.background}
        >
            <View>
                <LargeText text={"Rise"}/>
                <TempButton 
                text={"Countinue with Google"} 
                bgColor={'white'} 
                textColor={'gray'}
                onPress={() => navigation.navigate('List')}
                />
                <AppleAuthButton/>
            </View>
        </ImageBackground>
    )
}

export default Login;