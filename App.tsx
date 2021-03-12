import { scheduleNotificationAsync } from 'expo-notifications';
import { NOTIFICATIONS } from 'expo-permissions';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getPermissions } from './src/helpers/utilityFunctions';

const App = () => {
  useEffect(() => {
    getPermissions(NOTIFICATIONS).then((res) => {
      console.log('res:', res);
    });
  }, []);
  const triggerNotification = async () => {
    await scheduleNotificationAsync({
      content: {
        title: 'my first notification',
        body: 'this is my first notificaiton',
      },
      trigger: {
        seconds: 10,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text>Notification App</Text>
      <Button title="Trigger Notifications" onPress={triggerNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default App;
