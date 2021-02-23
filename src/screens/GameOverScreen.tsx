import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import colors from '../constants/colors';
import defaultStyle from '../constants/defaultStyle';
import { deviceHeight, deviceWidth } from '../utils/utilFunctions';

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
    fontSize: deviceHeight < 600 ? 16 : 20,
  },
  button: {
    marginTop: 10,
    width: 100,
  },
  imageContainer: {
    width: deviceWidth * 0.7,
    height: deviceWidth * 0.7,
    borderRadius: (deviceWidth * 0.7) / 2,
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: deviceHeight > 600 ? 60 : 15,
  },
  highlight: {
    color: colors.primary,
  },
});
