import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC } from '../files/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('window');

const MainGameIntro = () => {

  const [deviceType, setDeviceType] = useState(1);

  useEffect(() => {
    const { height, width } = Dimensions.get('window');
    const aspectRatio = height / width;
    const isTablet = aspectRatio <= 1.6;
    setDeviceType(isTablet ? 1 : 0.8);
  }, []);

    const [highScore, setHighScore] = useState('0');
  const navigation = useNavigation();


  useFocusEffect(() => {
    loadHighScore();
  });


  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem('mainScore');
      const parsedScore = parseInt(storedScore);
      if (!isNaN(parsedScore)) {
        setHighScore(parsedScore);
      }
    } catch (error) {
    }
  };


  const blackViews = Array(9).fill().map((_, index) => {
    const isNoMargin = (index + 1) % 3 === 0;
    return (
      <View
        key={index}
        style={{
          ...styles.blackBox,
          height: height * (0.1 * deviceType),
          width: height * (0.1 * deviceType),
          marginBottom: height * (0.024 * deviceType),
          marginRight: isNoMargin ? 0 : height * (0.024 * deviceType),
        }}
      />
    );
  });



  


  return (
      <View style={styles.mainBox}>


        <View style={styles.highScoreContainer}>
        <Text style={[styles.highScoreLabelText, { fontSize: (42 * deviceType) }]}>
          High Score : {highScore}</Text>
      </View>

      <View style={[styles.mainBoxSmall, { width: height * (0.35  * deviceType), height: height * (0.35 * deviceType) }]}>
          {blackViews}
          </View>

        <TouchableOpacity
          style={styles.gameButton}
          onPress={() => navigation.navigate('MainGameScreen')}
        >
         <Text style={[styles.buttonText, { fontSize: (30 * deviceType) }]}>
          Start !</Text>
        </TouchableOpacity> 


<View style={styles.instructionsTextOutside}>
        <Text style={[styles.instructionsText, { fontSize: (14 * deviceType) }]}>
        Copy the flashing pattern on the squares by clicking in the right order. 
        Beat your high score as difficulty rises. 
        Aim higher than the average monkey's score of 18.
        </Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  gameButton: {
    backgroundColor: orangeC,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: whiteC,
    fontWeight: 'bold',
  },
  highScoreText: {
    alignSelf: 'center',
    color: grayC,
    fontSize: 34,
    fontWeight: 'bold',
  },
  mainBoxSmall: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  instructionsText: {
    textAlign: 'center',
    color: blackC,
  },
  instructionsTextOutside: {
    marginLeft: height * 0.03,
    marginRight: height * 0.03,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: whiteC,
    borderRadius: 8,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,
  },
  IntroText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
  },
  blackBox: {
    backgroundColor: blackC,
    borderRadius: 10,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  highScoreContainer: {
    alignItems: 'center',
  },
  highScoreLabelText: {
    color: blackC,
    fontWeight: 'bold',
  },
});

export default MainGameIntro;





