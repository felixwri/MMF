import React, { useState, useEffect, } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC } from '../files/Colors';
const { height, width } = Dimensions.get('window');
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThirdGameCard from "./ThirdGameCard"


const ThirdGameIntro = () => {

  const [highScore10, setHighScore10] = useState(0);
  const [highScore15, setHighScore15] = useState(0);
  const [highScore20, setHighScore20] = useState(0);
  const [highScore25, setHighScore25] = useState(0);
  const [highScore30, setHighScore30] = useState(0);
  
    useEffect(() => {
      loadHighScore();
    }, []);
  
    useFocusEffect(() => {
      loadHighScore();
    });
  
    const loadHighScore = async () => {
      try {
        const score10 = await AsyncStorage.getItem('G3highScore10');
        const score15 = await AsyncStorage.getItem('G3highScore15');
        const score20 = await AsyncStorage.getItem('G3highScore20');
        const score25 = await AsyncStorage.getItem('G3highScore25');
        const score30 = await AsyncStorage.getItem('G3highScore30');
        if (score15 !== null) {
          setHighScore15(parseInt(score15));
        } else {
          await AsyncStorage.setItem('G3highScore15', '0');
          setHighScore15(0);
        }
        if (score20 !== null) {
          setHighScore20(parseInt(score20));
        } else {
          await AsyncStorage.setItem('G3highScore20', '0');
          setHighScore20(0);
        }
        if (score25 !== null) {
          setHighScore25(parseInt(score25));
        } else {
          await AsyncStorage.setItem('G3highScore25', '0');
          setHighScore25(0);
        }
        if (score30 !== null) {
          setHighScore30(parseInt(score30));
        } else {
          await AsyncStorage.setItem('G3highScore30', '0');
          setHighScore30(0);
        }
        if (score10 !== null) {
          setHighScore10(parseInt(score10));
        } else {
          await AsyncStorage.setItem('G3highScore10', '0');
          setHighScore10(0);
        }
      } catch (error) {
        // console.log('Error loading high score:', error);
      }
    };


  return (
    <View style={[styles.container, { height: height * 0.24 }]}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <ThirdGameCard game={10} gameTwo="G3highScore10" score={highScore10} gameThree={3}/> 
      <ThirdGameCard game={15} gameTwo="G3highScore15" score={highScore15} gameThree={3} />
      <ThirdGameCard game={20} gameTwo="G3highScore20" score={highScore20} gameThree={5}/>
      <ThirdGameCard game={25} gameTwo="G3highScore25" score={highScore25} gameThree={5}/>
      <ThirdGameCard game={30} gameTwo="G3highScore30" score={highScore30} gameThree={5}/> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: purpleC,
    marginBottom: height * 0.14,
  },
});


export default ThirdGameIntro;
