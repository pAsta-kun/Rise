import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet } from 'react-native';

export default function AppleAuthButton()
{

    const styles = StyleSheet.create({
        container: {
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        button: {
          padding: 20,
          width: '90%',
          height: 50
        },
      });

    return(
        <View style={styles.container}>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={13}
                style={styles.button}
                onPress={async () => {
                    try {
                    const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                    });
                    // signed in
                    } catch (e) {
                    if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow
                        return { cancelled: true };
                    } else {
                        // handle other errors
                        throw e;
                    }
                    }
                }}
            />
        </View>

    )
}
