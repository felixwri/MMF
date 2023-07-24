import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import ScoreBoard from '../files/ScoreBoard';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC } from '../files/Colors';

const {height, width} = Dimensions.get('window')

const FourthGameScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  
  const squareSize = Math.min(width, height);
  const smallSquareSize = squareSize / 4;

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
      const storedScore = await AsyncStorage.getItem('mainScore');
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
    }
  };

  const updateHighScore = async () => {
    if (score > highScore) {
      try {
        await AsyncStorage.setItem('mainScore', score.toString());
        setHighScore(score);
      } catch (error) {
      }
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
        handleStopButtonPress();
        return;
      }
    }
    if (code.length === myArray.length) {
      setScore(score + 1);
      handleStartButtonPress();
    }
  };

  const displayArray = async (array) => {
    setStart(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    for (let i = 0; i < array.length; i++) {
      setSelectedSquare(array[i]);
      if (i < array.length - 1 && array[i] === array[i + 1]) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setSelectedSquare(null);
        await new Promise((resolve) => setTimeout(resolve, 200));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
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
      let randomNumber = Math.floor(Math.random() * 9) + 1;
      const updatedArray = [...myArray, randomNumber];
      setMyArray(updatedArray);
      displayArray(updatedArray);
      setTypeArray([]);
  };
  
  

  const goToHomeScreen = async () => {
    updateHighScore()
    loadHighScore()
    navigation.navigate("HomeScreen");
    setScore(0)
  };

  const EndingLights = async () => {
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
    goToHomeScreen()
  };

  
  const [isFlashing, setIsFlashing] = useState(false);

  const renderSquares = () => {
    return [...Array(9)].map((_, index) => {
      const isHighlighted = index + 1 === selectedSquare;
      const squareColor = isFlashing ? redC : isHighlighted ? greenC : blackC;
      return (
        <TouchableOpacity
        disabled={start}
          key={index}
          style={[
            styles.smallSquare,
            { width: smallSquareSize, height: smallSquareSize, backgroundColor: squareColor, margin: `${3}%` },
          ]}
          onPress={() => handleNumberPress(index + 1)}>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.InnerContainer}>
       <ScoreBoard score={score} highScore={0} />
        <View style={{ width: squareSize, height: squareSize, }}>
          <View style={styles.gridContainer}>{renderSquares()}</View>
        </View>
            
        </View>
    </View>
  );
};

export default FourthGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  smallSquare: {
    borderRadius: 10,
  },
  InnerContainer: {
    width: width * 0.94,
    height: height * 0.85,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: grayC,
    borderRadius: 16,
  }
});