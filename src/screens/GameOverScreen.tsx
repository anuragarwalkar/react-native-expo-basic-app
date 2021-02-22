import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import colors from '../constants/colors';
import defaultStyle from '../constants/defaultStyle';

export default function GameOverScreen(props: { numberOfRounds: number; userNumber: number; resetGame: () => void }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.titleText}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={require('../../assets/success.png')}
        />
      </View>
      <Text style={{ ...styles.subText, ...styles.boldText }}>
        Your phone needed <Text style={styles.highlight}>{props.numberOfRounds}</Text> rounds to guess the number{' '}
        {props.userNumber}.
      </Text>
      <View style={styles.button}>
        <Button color={colors.secondary} title="NEW GAME" onPress={props.resetGame} />
      </View>
    </View>
  );
}

const styles = defaultStyle({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 30,
  },
  subText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 15,
  },
  button: {
    marginTop: 10,
    width: 100,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: 30,
  },
  highlight: {
    color: colors.primary,
  },
});
