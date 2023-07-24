import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles';
import { useRoute } from '@react-navigation/native';
import ScoreBoard from '../files/ScoreBoard';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';

const {height, width} = Dimensions.get('window')

const FirstGameScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();

  const { game, gameTwo, gameThree, gameFive } = route.params;
  
  const squareSize = Math.min(width * 0.96, height * 0.96);
  const smallSquareSize = squareSize / gameTwo;

  const [myArray, setMyArray] = useState([]);
  const [typeArray, setTypeArray] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem(gameFive);
      const parsedScore = parseInt(storedScore);
      const storedGameCount = await AsyncStorage.getItem('gameCount');
      const parsedGameCount = parseInt(storedGameCount);
      if (!isNaN(parsedScore)) {
        setHighScore(parsedScore);
      }
      if (!isNaN(parsedGameCount)) {
        setGamesPlayed(parsedGameCount);
      }
    } catch (error) {
      // console.log('Error loading high score:', error);
    }
  };

  const updateHighScore = async () => {
    if (score > highScore) {
      try {
        await AsyncStorage.setItem(gameFive, score.toString());
        setHighScore(score);
      } catch (error) {
        // console.log('Error updating high score:', error);
      }
    }
  };


  const winHighScore = async () => {
      try {
        await AsyncStorage.setItem(gameFive, game.toString());
        setHighScore(score);
      } catch (error) {
        // console.log('Error updating high score:', error);
      }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleStartButtonPress();
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  
  const handleNumberPress = (number) => {
    const newTypeArray = [...typeArray, number];
    setTypeArray(newTypeArray);
    checkCode(newTypeArray);
  };

  const checkCode = (code) => {
    for (let i = 0; i < code.length; i++) {
      if (code[i] !== myArray[i]) {
        setStart(true);
        handleStopButtonPress()
        return;
      }
    }
    if (code.length === myArray.length) {
      setScore(score + 1)
      handleStartButtonPress()
    }
  };

  

  const displayArray = async (array) => {
    setStart(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    for (let i = 0; i < array.length; i++) {
      setSelectedSquare(array[i]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    setSelectedSquare(null);
    setStart(false);
  };
  
  const [start, setStart] = useState(true);

  const handleStopButtonPress = () => {
    setMyArray([]);
    setTypeArray([]);
    EndingLights()
  };

  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleStartButtonPress = async () => {
    if (myArray.length < game) {
      let randomNumber = Math.floor(Math.random() * game) + 1;
      while (myArray.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * game) + 1;
      }
      const updatedArray = [...myArray, randomNumber];
      setMyArray(updatedArray);
      displayArray(updatedArray);
      setTypeArray([])
    }else{
      setFlashingColor(greenC)
      setStart(true);
      winHighScore();
      NewEndingLights();
    }
  }; 
  
  const NewEndingLights = async () => {
    for await (const _ of Array.from({ length: 3 })) {
      setIsFlashing(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsFlashing(false);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    try {
      await AsyncStorage.setItem('gameCount', (gamesPlayed + 1).toString());
      setGamesPlayed(score);
    } catch (error) {
    }
    navigation.navigate("HomeScreen");
  };
  

  const goToHomeScreen = async () => {
    updateHighScore()
    loadHighScore()
    try {
      await AsyncStorage.setItem('gameCount', (gamesPlayed + 1).toString());
      setGamesPlayed(score);
    } catch (error) {
    }
    navigation.navigate("HomeScreen");
    setScore(0)
  };

  const [flashingColor, setFlashingColor] = useState(redC);
  const EndingLights = async () => {
    for await (const _ of Array.from({ length: 3 })) {
      setIsFlashing(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsFlashing(false);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    goToHomeScreen()
  };


  
  const [isFlashing, setIsFlashing] = useState(false);

  const renderSquares = () => {
    return [...Array(game)].map((_, index) => {
      const isHighlighted = index + 1 === selectedSquare;
      const squareColor = isFlashing ? flashingColor : isHighlighted ? greenC : blackC;
      return (
        <TouchableOpacity
        disabled={start}
          key={index}
          style={[
            styles.smallSquare,
            { width: smallSquareSize, height: smallSquareSize, backgroundColor: squareColor, margin: `${gameThree}%` },
          ]}
          onPress={() => handleNumberPress(index + 1)}>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.InnerContainer}>
      <ScoreBoard score={score} highScore={game} />
        <View style={{ width: squareSize, height: squareSize }}>
          <View style={styles.gridContainer}>{renderSquares()}</View>
        </View>
        </View>
    </View>
  );
};

export default FirstGameScreen;



