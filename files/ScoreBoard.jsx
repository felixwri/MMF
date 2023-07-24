import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, Easing } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from './Colors';

const {height, width} = Dimensions.get('window')

const ScoreBoard = ({ score, highScore }) => {

  return (
    <View style={styles.AContainer}>
    {highScore !== 0 ? (
      <Text style={styles.Text}>Score: {score} / {highScore}</Text>
    ) : (
      <Text style={styles.Text}>Score: {score}</Text>
    )}
  </View>
  );
};

export default ScoreBoard;


const styles = StyleSheet.create({
  AContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: height * 0.08,
    width: width * 0.6,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: orangeC,
  },
  Text: {
    fontFamily: 'Cochin',
    color: whiteC,
    fontSize: 32,
    fontFamily: font,
    fontWeight: 'bold',
    color: whiteC,
  }
});