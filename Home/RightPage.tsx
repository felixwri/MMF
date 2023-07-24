import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC } from '../files/Colors';
import MainGameIntro from '../MainGame/MainGameIntro';
import TopBar from './TopBar';

const { width, height } = Dimensions.get('window');

const RightPage: React.FC = () => {
  return (
    <>
      <View style={styles.main}>
        <MainGameIntro />
      </View>
    </>
  );
};

export default RightPage;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    alignSelf: 'center',
    width: width - height * 0.06,
    flex: 1,
    backgroundColor: whiteC,
    borderRadius: 10,
    marginBottom: height * 0.17,
    marginTop: height * 0.03,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'center',
  },
  progressBar: {
    width: width * 0.8,
    height: height * 0.05,
    backgroundColor: grayC,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  progressFill: {
    height: '100%',
  },
  marker: {
    position: 'absolute',
    backgroundColor: blackC,
    width: width * 0.005,
    height: '100%',
    left: '80%',
  },
  markerArrow: {
    color: blackC,
    fontSize: width * 0.07,
    marginLeft: width * 0.608,
  },
  textSmall: {
    fontSize: width * 0.015,
  },
  text: {
    fontSize: width * 0.045,
    alignSelf: 'center',
  },
});
