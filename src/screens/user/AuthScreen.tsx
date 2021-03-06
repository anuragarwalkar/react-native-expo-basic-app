import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationComponent } from 'react-navigation';
import { useDispatch } from 'react-redux';
import Card from '../../components/shop/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { OPEN_SANS_BOLD } from '../../constants/Fonts';
import { signup } from '../../store/actions/auth.actions';
import globalStyles from '../../utils/globalStyles';
import { isAndroid } from '../../utils/utilityFunctions';

const AuthScreen: NavigationComponent<{}, {}> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);
  const [isEmailVaid, setIsEmailValid] = useState(false);
  const [isPasswordVaid, setIsPasswordValid] = useState(false);
  const dispatch = useDispatch();

  const onInputChange = (id: string, value: string, isValid: boolean) => {
    console.log('id:', id, value, isValid);
    if (id === 'email') {
      setEmail(value);
      setIsEmailValid(isValid);
    } else if (id === 'password') {
      setPassword(value);
      setIsPasswordValid(isValid);
    }
  };

  const onSubmit = () => {
    dispatch(signup(email, password));
  };
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={{ ...styles.screen }}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={{ padding: 15 }}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              required
              email
              keyboardType="email-address"
              errorText="Please enter a valid email adress"
              onInputChange={onInputChange}
              initialValue={email}
            />
            <Input
              id="password"
              label="Password"
              required
              secureTextEntry
              keyboardType="default"
              errorText="Please enter a valid email adress"
              onInputChange={onInputChange}
              initialValue={password}
              autoCapitalize="none"
              minLength={5}
            />
            <View style={globalStyles.absuluteCenter}>
              <View style={{ marginTop: 10, width: 200 }}>
                <Button title={isSignIn ? 'Login' : 'Signup'} onPress={onSubmit} color={Colors.primary} />
                <View style={{ marginTop: 10 }}>
                  <Button
                    title={isSignIn ? 'Switch To SignUp' : 'Switch To Login'}
                    onPress={() => {
                      setIsSignIn((oldState) => !oldState);
                    }}
                    color={Colors.accent}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = () => {
  return {
    headerTitle: 'Authenticate',
    headerStyle: {
      backgroundColor: isAndroid ? Colors.primary : '',
    },
    headerTitleStyle: {
      fontFamily: OPEN_SANS_BOLD,
    },
    headerTintColor: isAndroid ? 'white' : Colors.primary,
  };
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
});
