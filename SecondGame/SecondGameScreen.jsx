import React, { useEffect, useState, useRef } from 'react';
import { Image, View, Dimensions, StyleSheet, TouchableOpacity, Text, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

const SecondGameScreen = ({ route }) => {
  const { array, colorArray, level } = route.params;
  
  const navigation = useNavigation();
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const storedGameCount = await AsyncStorage.getItem('gameCount');
      const parsedGameCount = parseInt(storedGameCount);
      if (!isNaN(parsedGameCount)) {
        setGamesPlayed(parsedGameCount);
      }
    } catch (error) {
    }
  };


  const goToHomeScreen = async () => {
    try {
      await AsyncStorage.setItem('gameCount', (gamesPlayed + 1).toString());
      setGamesPlayed(score);
    } catch (error) {
    }
    navigation.navigate('HomeScreen');
  };

  const [flipStates, setFlipStates] = useState([...Array(36)].map(() => true));
  const flipAnimations = useRef([...Array(36)].map(() => new Animated.Value(0))).current;

  const [game, setGame] = useState(false);
  const flipAllCards = () => {
    setGame(true)
    const newFlipStates = flipStates.map((state) => !state);
    setFlipStates(newFlipStates);
    newFlipStates.forEach((state, index) => {
      const flipAnimation = flipAnimations[index];
      const toValue = state ? 180 : 0;
      Animated.spring(flipAnimation, {
        toValue,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    });
  };



  const [numberArray, setNumbersArray] = useState([]);
  const flipCard = (index) => {
    if (flipStates[index]) {
      return;
    }
    const newFlipStates = [...flipStates];
    newFlipStates[index] = true;
    setFlipStates(newFlipStates);
    const flipAnimation = flipAnimations[index];
    Animated.spring(flipAnimation, {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    // setNumbersArray((prevArray) => [...prevArray, ArrayOne[index]]);
    setNumbersArray((prevArray) => [...prevArray, array[index]]);
  };
  

  useEffect(() => {
    // console.log(numberArray.toString());

    if (numberArray.length >= 2) {
      let validPattern = true;

      for (let i = 1; i < numberArray.length; i += 2) {
        if (numberArray[i] !== numberArray[i - 1]) {
          validPattern = false;
          break;
        }
      }
      if (!validPattern) {
        EndingLights()
      } else if (numberArray.length === 36) {
        WinningLights()
      }
    }
  }, [numberArray]);

  const [blocker, setBlocker] = useState(false);

  const [isFlashing, setIsFlashing] = useState(false);
  const [flashingColor, setFlashingColor] = useState(redC);

  const WinningLights = async () => {
    setBlocker(true)
    await new Promise(resolve => setTimeout(resolve, 800));
    for await (const _ of Array.from({ length: 3 })) {
      setIsFlashing(true);
      setFlashingColor(greenC)
      await new Promise(resolve => setTimeout(resolve, 200));
      setFlashingColor(blackC)
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    updateHighScore()
  };


  const updateHighScore = async () => {
      try {
        await AsyncStorage.setItem(level, 'true');
      } catch (error) {
        // console.log('Error updating high score:', error);
      }
    goToHomeScreen()
  };

  const EndingLights = async () => {
    setBlocker(true)
    await new Promise(resolve => setTimeout(resolve, 800));
    for await (const _ of Array.from({ length: 3 })) {
      setIsFlashing(true);
      setFlashingColor(redC)
      await new Promise(resolve => setTimeout(resolve, 200));
      setFlashingColor(blackC)
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    goToHomeScreen()
  };

  const interpolateCard = (index) => {
    return flipAnimations[index].interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
  };

  return (
    <View style={styles.container}>

      {blocker && (
  <View style={{ position: 'absolute', zIndex: 9999, flex: 1,
   top: 0, bottom: 0, left: 0, right: 0 }} />
)}

      <View style={styles.InnerContainer}>
      <TouchableOpacity style={styles.button} onPress={game ? goToHomeScreen : flipAllCards}>
        <Text style={styles.buttonText}>{game ? 'Go Home' : 'Start !'}</Text>
      </TouchableOpacity>
      <View style={styles.GameContainer}>
        {array.map((number, index) => (
          <TouchableOpacity onPress={() => flipCard(index)} key={index + 1}>
            <Animated.View
              style={{
                ...styles.gridItem,
                transform: [{ rotateY: interpolateCard(index) }],
                backgroundColor: isFlashing ? flashingColor : colorArray[number - 1],
                opacity: flipStates[index] ? 1 : 0,
              }}
            >
            </Animated.View>
            <Animated.View
              style={{
                ...styles.gridItem,
                ...styles.squareBack,
                transform: [{ rotateY: interpolateCard(index) }],
                backgroundColor: isFlashing ? flashingColor : blackC,
                opacity: flipStates[index] ? 0 : 1,
              }}
            ></Animated.View>
          </TouchableOpacity>
        ))}
      </View>
      </View>
    </View>
  );
};

export default SecondGameScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: height * 0.08,
    width: width * 0.6,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: orangeC,
  },
  buttonText: {
    fontFamily: font,
    color: whiteC,
    fontSize: 32,
    fontWeight: 'bold',
    color: whiteC,
  },
  square: {
    width: 200,
    height: 200,
    backgroundColor: whiteC,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareBack: {
    position: 'absolute',
  },
  squareContent: {
    width: width / 6,
    height: width / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redSquare: {
    width: width / 6,
    height: width / 6,
    backgroundColor: 'red',
  },
  blueSquare: {
    width: width / 6,
    height: width / 6,
  },
  GameContainer: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  gridItem: {
    width: width / 6.5,
    height: width / 6.5,
    borderColor: blackC,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width / 75,
  },
  gridItemText: {
    fontSize: 16,
  },
  InnerContainer: {
    width: width,
    height: height * 0.85,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: grayC,
    borderRadius: 16,
  }
});