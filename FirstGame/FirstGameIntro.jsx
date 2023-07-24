import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View,  Dimensions, ScrollView, StyleSheet } from 'react-native';
import FirstGameCard from "./FirstGameCard"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';

const { height, width } = Dimensions.get('window');


const FirstGameIntro = () => {

    const [highScore9, setHighScore9] = useState(0);
    const [highScore16, setHighScore16] = useState(0);
    const [highScore25, setHighScore25] = useState(0);
    const [highScore36, setHighScore36] = useState(0);
  
    useEffect(() => {
      loadHighScore();
    }, []);
  
    useFocusEffect(() => {
      loadHighScore();
    });
  
    const loadHighScore = async () => {
      try {
        const score9 = await AsyncStorage.getItem('highScore9');
        const score16 = await AsyncStorage.getItem('highScore16');
        const score25 = await AsyncStorage.getItem('highScore25');
        const score36 = await AsyncStorage.getItem('highScore36');
        if (score9 !== null) {
          setHighScore9(parseInt(score9));
        } else {
          await AsyncStorage.setItem('highScore9', '0');
          setHighScore9(0);
        }
        if (score16 !== null) {
          setHighScore16(parseInt(score16));
        } else {
          await AsyncStorage.setItem('highScore16', '0');
          setHighScore16(0);
        }
        if (score25 !== null) {
          setHighScore25(parseInt(score25));
        } else {
          await AsyncStorage.setItem('highScore25', '0');
          setHighScore25(0);
        }
        if (score36 !== null) {
          setHighScore36(parseInt(score36));
        } else {
          await AsyncStorage.setItem('highScore36', '0');
          setHighScore36(0);
        }
      } catch (error) {
        // console.log('Error loading high score:', error);
      }
    };

  return (
    <View style={[ { height: height * 0.24,}]}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <FirstGameCard game={9} gameTwo={4} gameThree={3} gameFive="highScore9" gameSix="9" score={highScore9}/>
      <FirstGameCard game={16} gameTwo={5} gameThree={2} gameFive="highScore16" gameSix="16" score={highScore16}/>
      <FirstGameCard game={25} gameTwo={7} gameThree={2.4} gameFive="highScore25" gameSix="25" score={highScore25}/>
      <FirstGameCard game={36} gameTwo={8} gameThree={1.8} gameFive="highScore36" gameSix="36" score={highScore36}/>
      </ScrollView>
    </View>
  );

  
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: purpleC,
  },
});

export default FirstGameIntro;

