import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

function TempButton({text, bgColor, textColor, onPress})
{

    const styles = StyleSheet.create({
        container: {
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        button: {
          backgroundColor: bgColor,
          padding: 20,
          borderRadius: 13,
          width: '90%',
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

export default TempButton;