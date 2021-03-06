import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/shop/Card';

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
      <Card>
        <ScrollView></ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {},
});
