import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/shop/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import globalStyles from '../../utils/globalStyles';

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={{ ...styles.screen }}>
      <Card style={{ padding: 15 }}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            required
            email
            keyboardType="email-address"
            errorText="Please enter a valid email adress"
            onInputChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            required
            secureTextEntry
            keyboardType="default"
            errorText="Please enter a valid email adress"
            onInputChange={() => {}}
            initialValue=""
            autoCapitalize="none"
            minLength={5}
          />
          <View style={globalStyles.absuluteCenter}>
            <View style={{ marginTop: 10, width: 200 }}>
              <Button title="Login" onPress={() => {}} color={Colors.primary} />
              <View style={{ marginTop: 10 }}>
                <Button title="Switch To SignUp" onPress={() => {}} color={Colors.accent} />
              </View>
            </View>
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    height: '80%',
    justifyContent: 'center',
  },
});
