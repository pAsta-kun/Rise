import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

function DefaultButton({text, bgColor, textColor, onPress, marginTop})
{

    const styles = StyleSheet.create({
        container: {
          flex: 0,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: marginTop
        },
        button: {
          backgroundColor: bgColor,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          
        },
        buttonText: {
          color: textColor,
          fontSize: 20,
          textAlign: 'center',
        },
      });

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>

    )
}

export default DefaultButton;