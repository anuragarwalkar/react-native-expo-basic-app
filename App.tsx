import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  getExpoPushTokenAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { NOTIFICATIONS } from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getPermissions } from './src/helpers/utilityFunctions';

setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const App = () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    getPermissions(NOTIFICATIONS)
      .then((res) => {
        return getExpoPushTokenAsync();
      })
      .then((res) => {
        setToken(res.data);
        console.log('Expo Token:', res.data);
      });
  }, []);

  useEffect(() => {
    const subscription = addNotificationReceivedListener((notification) => {
      console.log('Forground Notification:', notification);
    });

    const backgroundSubscription = addNotificationResponseReceivedListener((res) => {
      console.log('Background Notification:', res);
    });

    return () => {
      subscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  const triggerNotification = async () => {
    // await scheduleNotificationAsync({
    //   content: {
    //     title: 'my first notification',
    //     body: 'this is my first notificaiton',
    //   },
    //   trigger: {
    //     seconds: 10,
    //   },
    // });

    try {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          title: 'Sent via the app',
          body: 'this push was sent via app',
        }),
      });
    } catch (error) {
      console.log('error:', error);
    }
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
