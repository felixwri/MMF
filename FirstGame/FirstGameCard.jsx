import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';

const { height } = Dimensions.get('window');

const FirstGameCard = ({ score, game, gameTwo, gameThree, gameFour, gameFive, gameSix }) => {
  const boxWidth = height * 0.26;
  const boxHeight = height * 0.2;
  const marginRight = game === 36 ? height * 0.02 : 0;
  const navigation = useNavigation();
  
  const [blackBoxHeight, setBlackBoxHeight] = useState(0);
  const [blackBoxMargin, setBlackBoxMargin] = useState(0);

  useEffect(() => {
    switch (game) {
      case 9:
        // setBlackBoxHeight(0.032);
        // setBlackBoxMargin(0.017);
        setBlackBoxHeight(0.032);
        setBlackBoxMargin(0.016);
        break;
      case 16:
        setBlackBoxHeight(0.025);
        setBlackBoxMargin(0.009);
        break;
      case 25:
        setBlackBoxHeight(0.02);
        setBlackBoxMargin(0.0074);
        break;
      case 36:
        setBlackBoxHeight(0.0165);
        setBlackBoxMargin(0.006);
        break;
      default:
        setBlackBoxHeight(0);
        setBlackBoxMargin(0);
    }
  }, [game]);

  const blackViews = Array(game).fill().map((_, index) => {
    const isNoMargin = (index + 1) % Math.sqrt(game) === 0;
    return (
      <View
        key={index}
        style={{
          ...styles.blackBox,
          height: height * blackBoxHeight,
          width: height * blackBoxHeight,
          marginBottom: height * blackBoxMargin,
          marginRight: isNoMargin ? 0 : height * blackBoxMargin,
        }}
      />
    );
  });

  return (
    <TouchableOpacity
      style={[styles.box, { width: boxWidth, height: boxHeight, marginRight }]}
      onPress={() =>
        navigation.navigate('FirstGameScreen', {
          game,
          gameTwo,
          gameThree,
          gameFour,
          gameFive,
          gameSix,
        })
      }
    >
      <View style={styles.mainBox}>{blackViews}</View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          {score}/{game}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${(score / game) * 100}%`,
              backgroundColor: score / game === 1 ? greenC : score / game < 0.25 ? redC : orangeC,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: height * 0.02,
    marginLeft: height * 0.02,
    backgroundColor: whiteC,
    borderRadius: 10,
    elevation: 2,
  },
  mainBox: {
    width: height * 0.13,
    height: height * 0.13,
    position: 'absolute',
    marginLeft: height * 0.01,
    marginTop: height * 0.01,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // shadowColor: blackC,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  scoreContainer: {
    width: height * 0.10,
    height: height * 0.13,
    marginLeft: height * 0.15,
    marginTop: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: orangeC,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scoreText: {
    fontSize: 32,
    fontFamily: font,
    fontWeight: 'bold',
    color: whiteC,
  },
  progressBar: {
    width: '100%',
    height: height * 0.05,
    position: 'absolute',
    bottom: 0,
    backgroundColor: grayC,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  blackBox: {
    backgroundColor: blackC,
    borderRadius: 5,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FirstGameCard;
