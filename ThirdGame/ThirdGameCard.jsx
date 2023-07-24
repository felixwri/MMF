import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';

const { height } = Dimensions.get('window');

const ThirdGameCard = ({ score, game, gameTwo, gameThree }) => {
  const boxWidth = height * 0.26;
  const boxHeight = height * 0.2;
  const marginRight = game === 30 ? height * 0.02 : 0;
  const navigation = useNavigation();

  const numViews = game / 5;
  const blackViews = Array(5).fill().map((_, index) => {
    return (
      <View
        key={index}
        style={{
          ...styles.blackBox,
          height: height * 0.018,
          width: height * 0.13,
          marginBottom: height * 0.01,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',

    
        }}
      >
        {[...Array(numViews)].map((_, index) => (
    <View
      key={index}
      style={{
        height: height * 0.009,
        width: height * 0.009,
        backgroundColor: whiteC,
        borderRadius: 3,
      }}
    />
  ))}
      </View>
    );
  });

  return (
    <TouchableOpacity
      style={[styles.box, { width: boxWidth, height: boxHeight, marginRight }]}
      onPress={() => navigation.navigate('ThirdGameScreen', { game, gameTwo, gameThree })}>


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
    shadowColor: blackC,
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
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ThirdGameCard;
