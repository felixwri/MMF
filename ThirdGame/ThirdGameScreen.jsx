import React, { useEffect, useState } from 'react';
import {Image,View,Dimensions,StyleSheet,TouchableOpacity,Text,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScoreBoard from '../files/ScoreBoard';
import { useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const ThirdGameScreen = () => {

  const [isText, setTextType] = useState(30);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    if (game > 20) {
      setTextType(20);
    }
  }, []);

  const route = useRoute();
  const { game, gameTwo, gameThree } = route.params;

  const navigation = useNavigation();

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };

  const [numbers, setNumbers] = useState([]);
  const [play, setPlay] = useState(false);

  const startGame = () => {
    setPlay(true)
  }

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const generateRandomNumbers = () => {
    const numbersPerBar = game / 5;
    const randomizedNumbers = Array.from({ length: game }, (_, index) => index + 1)
      .sort(() => Math.random() - 0.5);
    setNumbers(randomizedNumbers);
  };
  

  const handleButtonPress = (index) => {
    if (!play) {
      return;
    }
    const numbersPerBar = game / 5;
    const startNumber = index * numbersPerBar;
    const selectedNumbers = numbers.slice(startNumber, startNumber + numbersPerBar);
    checkNumbers(selectedNumbers, index + 1);
  };
  
  
  const [score, setScore] = useState(1);
  const checkNumbers = (selectedNumbers, currentIndex) => {
      if(!(selectedNumbers.includes(score))){
        updateHighScore()
        goHomeLost()
      }else{
        setScore(score + 1);
        if(score == game){
          winHighScore()
          goHomeYouWon()
      }
    }
  };

  const goHomeYouWon = async () => {
    setBlocker(true)
    await new Promise(resolve => setTimeout(resolve, 800));
    for await (const _ of Array.from({ length: 3 })) {
      setIsFlashing(true);
      setFlashingColor(greenC)
      await new Promise(resolve => setTimeout(resolve, 200));
      setFlashingColor(blackC)
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    try {
      await AsyncStorage.setItem('gameCount', (gamesPlayed + 1).toString());
      setGamesPlayed(score);
    } catch (error) {
    }
    goToHomeScreen()
  }

  const [blocker, setBlocker] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashingColor, setFlashingColor] = useState(redC);
  const goHomeLost = async () => {
    setBlocker(true)
    await new Promise(resolve => setTimeout(resolve, 800));
    for await (const _ of Array.from({ length: 3 })) {
      setIsFlashing(true);
      setFlashingColor(redC)
      await new Promise(resolve => setTimeout(resolve, 200));
      setFlashingColor(blackC)
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    try {
      await AsyncStorage.setItem('gameCount', (gamesPlayed + 1).toString());
      setGamesPlayed(score);
    } catch (error) {
    }
    goToHomeScreen()
  }


  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem(gameTwo);
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




  const [highScore, setHighScore] = useState(0);
  const updateHighScore = async () => {
    if ((score - 1) > highScore) {
      try {
        await AsyncStorage.setItem(gameTwo, (score - 1).toString());
        setHighScore(score);
      } catch (error) {
        // console.log('Error updating high score:', error);
      }
    }
  };

  const winHighScore = async () => {
      try {
        await AsyncStorage.setItem(gameTwo, game.toString());
        setHighScore(score);
      } catch (error) {
        // console.log('Error updating high score:', error);
      }
  };

  const renderButton = (index) => {
    const numbersPerBar = game / 5;
    const startNumber = index * numbersPerBar;
  
    return (
      <TouchableOpacity
      key={index}
        style={[
          styles.button,
          { backgroundColor: isFlashing ? flashingColor : blackC },
        ]}
        onPress={() => handleButtonPress(index)}
      >
        <View style={styles.row}>
          {[...Array(numbersPerBar)].map((_, rowIndex) => {
            const number = numbers[startNumber + rowIndex];
            return (
              <View key={startNumber + rowIndex} style={styles.numberedView}>
                <Text
  style={[
    styles.viewText,
    { color: grayC, opacity: play ? 0 : 1, fontSize: isText },
  ]}
>
                  {number}
                </Text>
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  };

  

  
  return (
    <View style={styles.container}>
      <View style={styles.InnerContainer}>
{blocker && (
  <View style={{ position: 'absolute', zIndex: 9999, flex: 1,
   top: 0, bottom: 0, left: 0, right: 0 }} />
)}
{play ? (
        <ScoreBoard score={score - 1} highScore={game} />
      ) : (
        <TouchableOpacity style={styles.AContainer} onPress={startGame}>
          <Text style={styles.TextStart}>Start !</Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttonsContainer}>
        {[0, 1, 2, 3, 4].map((index) => renderButton(index))}
      </View>
    </View>
    </View>
  );
};

export default ThirdGameScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteC, 
  },
  buttonsContainer: {
    width: width * 0.9,
    height: height * 0.6,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  row: {
    flexDirection: 'row',
  },
  numberedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    fontWeight: 'bold',
  },
  goHomeButton: {
    backgroundColor: greenC, 
    padding: 10,
    borderRadius: 10,
  },
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
  InnerContainer: {
    width: width * 0.95,
    height: height * 0.85,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: grayC,
    borderRadius: 16,
  },
  TextStart: {
color: whiteC,
fontSize: 32,
fontFamily: font,
fontWeight: 'bold',
color: whiteC,
}
});