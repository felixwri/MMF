import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import {
  purpleC,
  grayC,
  blackC,
  whiteC,
  greenC,
  orangeC,
  redC,
} from '../files/Colors';
// import AdBanner from './AdBanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarChart from './BarChart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import BannerAdComponent from './BannerAdComponent';


const { width, height } = Dimensions.get('window');

const CenterPage = () => {
  const [deviceType, setDeviceType] = useState(0.6);
  const [deviceTypeThree, setDeviceTypeThree] = useState(1);

  const [sumG1, setSumG1] = useState(0);
  const [sumG2, setSumG2] = useState(0);
  const [sumG3, setSumG3] = useState(0);

  const [NumberOfGames, setnumberOfGames] = useState(0);


  const loadNumberOfGames = async () => {
    try {
      const storedGames = await AsyncStorage.getItem('gameCount');
      const parsedScore = parseInt(storedGames  || '0');
      if (!isNaN(parsedScore)) {
        setnumberOfGames(parsedScore);
      }
    } catch (error) {}
  };


  const [highScore, setHighScore] = useState(0);

  const loadHighScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem('mainScore');
      const parsedScore = parseInt(storedScore  || '0');
      if (!isNaN(parsedScore)) {
        setHighScore(parsedScore);
      }
    } catch (error) {}
  };

  const fetchHighScores = async () => {
    try {
      const score9 = await AsyncStorage.getItem('highScore9');
      const score16 = await AsyncStorage.getItem('highScore16');
      const score25 = await AsyncStorage.getItem('highScore25');
      const score36 = await AsyncStorage.getItem('highScore36');
      const sumG1 =
        parseInt(score9 || '0') +
      parseInt(score16 || '0') +
      parseInt(score25 || '0') +
      parseInt(score36 || '0');
      setSumG1(sumG1);
    } catch (error) {}
    try {
      const score10G3 = await AsyncStorage.getItem('G3highScore10');
      const score15G3 = await AsyncStorage.getItem('G3highScore15');
      const score20G3 = await AsyncStorage.getItem('G3highScore20');
      const score25G3 = await AsyncStorage.getItem('G3highScore25');
      const score30G3 = await AsyncStorage.getItem('G3highScore30');
      const sumG3 =
        parseInt(score10G3 || '0') +
      parseInt(score15G3 || '0') +
      parseInt(score20G3 || '0') +
      parseInt(score25G3 || '0') +
      parseInt(score30G3 || '0');
      setSumG3(sumG3);
    } catch (error) {}
    fetchValue();
  };

  const fetchValue = async () => {
    const getValue = async (key: string) => {
      const value = await AsyncStorage.getItem(key);
      return value === 'true';
    };

    const [easyValue, mediumValue, hardValue] = await Promise.all([
      getValue('SGEasy'),
      getValue('SGMedium'),
      getValue('SGHard'),
    ]);

    const sumG2 = (easyValue ? 25 : 0) + (mediumValue ? 25 : 0) + (hardValue ? 25 : 0);

    setSumG2(sumG2);
  };

  useEffect(() => {
    fetchHighScores();
    loadHighScore();
    loadNumberOfGames();
  }, []);

  useFocusEffect(() => {
    fetchHighScores();
    loadHighScore();
    loadNumberOfGames();
  });

  useEffect(() => {
    const { height, width } = Dimensions.get('window');
    const aspectRatio = height / width;
    const isTablet = aspectRatio <= 1.6;
    setDeviceType(isTablet ? 1 : 0.8);
    setDeviceTypeThree(isTablet ? 2 : 1);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white'  }}>
      <View style={styles.mainInside}>
        <View style={{ ...styles.TitleOutside, marginTop: height * 0.02 }}> 
          <Text
            style={[
              styles.text,
              { fontSize: height * 0.04 * deviceType, fontWeight: 'bold' },
            ]}
          >
            Are you smarter than a monkey?
          </Text>
        </View>

        
        <View style={{ ...styles.progressBarOuter, marginTop: height * 0.02 }}> 
          <Icon name="arrow-down" style={styles.markerArrow} />
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((sumG1 + sumG2 + sumG3) / 258) * 100}%`,
                  backgroundColor:
                    (sumG1 + sumG2 + sumG3) / 258 === 1
                      ? greenC
                      : (sumG1 + sumG2 + sumG3) / 258 < 0.25
                      ? redC
                      : orangeC,
                },
              ]}
            />
            <View style={styles.marker} />
          </View>
          <Icon name="arrow-up" style={styles.markerArrow} />
          <View style={styles.infoText}>
            <Text
              style={{ marginRight: 5, fontWeight: 'bold', fontSize: height * 0.015 }}
            >
              {'\u2022'}
            </Text>
            <Text
              style={[
                styles.textSmall,
                { fontSize: height * 0.015 },
              ]}
            >
              Welcome to Monkey Memory! Explore three games by swiping left and enjoy an additional game to the right, 
              which doesn't affect your main score bar. Keep a close watch on the score board as it 
              tallies your points and displays your overall performance as a percentage. 
              Achieve 80% to prove that your memory skills surpass those of a monkey.
            </Text>
          </View>
        </View>

        


        <View style={{ ...styles.smallBarOutside, marginTop: height * 0.02 }}> 
          <BarChart gameOne={sumG1} gameTwo={sumG2} gameThree={sumG3} />

          <View style={styles.smallBarOutsideRight}>
            <Text
              style={{
                fontSize: 13 * deviceTypeThree,
                color: blackC,
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}
            >
              Main Game
            </Text>
            <Text
              style={{
                fontSize: 32 * deviceTypeThree,
                color: blackC,
                marginTop: 8,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {highScore}
            </Text>
          </View>
        </View>
      


        <View style={{ width: width * 0.9, flexDirection: 'row', marginTop: height * 0.02 }}>
          <Image
            style={[styles.image, { height: width * 0.4 }]}
            source={require('../assets/monkeyLeft.png')}
          />
          <View style={{ ...styles.containerInfoText, marginLeft: width * 0.05 }} >

            <View
              style={{
                width: width * 0.46,
                marginLeft: width * 0.02,
                justifyContent: 'center',
                height: width * 0.38,
              }}
            >
              <Text
                style={[
                  styles.textSmall,
                  {
                    fontSize: Math.min(
                      (width * 0.44) / 16.5,
                      (width * 0.3) / 8
                    ),
                    textAlign: 'center',
                  },
                ]}
              >
                Monkeys display impressive memory skills, especially in spatial memory and social 
                relationship tasks, showcasing their ability to retain and recall information in 
                their ecological context. This app allows you to test your memory against monkeys,
                 to compare cognitive abilities.
              </Text>
            </View>
          </View>
        </View>    



<View style={{ width: width * 0.9, flexDirection: 'row', marginTop: height * 0.02 }}>
          
          <View style={{ ...styles.containerInfoText, marginLeft: width * 0.05 }} >

            <View
              style={{
                width: width * 0.46,
                marginLeft: width * 0.02,
                justifyContent: 'center',
                height: width * 0.38,
              }}
            >
              <Text
                style={[
                  styles.textSmall,
                  {
                    fontSize: Math.min(
                      (width * 0.44) / 16.5,
                      (width * 0.3) / 8
                    ),
                    textAlign: 'center',
                  },
                ]}
              >
               Monkeys' extraordinary memory is evident in experiments, 
               swiftly mastering and accurately recalling symbol or number sequences. Their adeptness
                at grasping intricate patterns showcases advanced cognitive understanding, proving invaluable 
                for memory research and enhancing our knowledge of primate cognition.
              </Text>
            </View>
          </View>
          <Image
            style={[styles.image, { height: width * 0.4 }]}
            source={require('../assets/monkeyRight.png')}
          />
        </View>



        {/* <BannerAdComponent />    */}
        
        <View style={{ ...styles.TitleOutside, marginTop: height * 0.02, marginBottom: height * 0.16}}> 
          <Text
            style={[
              styles.text,
              { fontSize: height * 0.03 * deviceType },
            ]}
          >
            Number of games played : {NumberOfGames}
          </Text>
        </View>


        </View>

      </ScrollView>
  
    
  );
};

export default CenterPage;

const styles = StyleSheet.create({
  main: {
    width: width,
    flex: 1,
    backgroundColor: whiteC,
  },
  mainInside: {
    width: width,
    flex: 1,
    alignItems: 'center',
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
    fontSize: width * 0.09,
    marginLeft: width * 0.648,
  },
  textSmall: {
    fontSize: 20,
  },
  text: {
    alignSelf: 'center',
  },
  progressBarOuter: {
    backgroundColor: purpleC,
    width: width * 0.9,
    paddingTop: height * 0.016,
    paddingBottom: height * 0.018,
    borderRadius: 10,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    
  },
  TitleOutside: {
    backgroundColor: purpleC,
    width: width * 0.9,
    paddingTop: height * 0.008,
    paddingBottom: height * 0.008,
    borderRadius: 10,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  infoText: {
    width: width * 0.8,
    flexDirection: 'row',
    marginLeft: width * 0.05,
    paddingTop: height * 0.012,
  },
  smallBarOutside: {
    width: width * 0.9,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  smallBarOutsideLeft: {
    backgroundColor: purpleC,
    width: width * 0.67,
    borderRadius: width * 0.02,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  smallBarOutsideRight: {
    backgroundColor: purpleC,
    width: width * 0.2,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  smallBarRow: {
    width: width * 0.6,
    height: height * 0.025,
    marginTop: width * 0.03,
    flexDirection: 'row',
  },
  smallBarRowRight: {
    width: width * 0.46,
    height: height * 0.025,
    backgroundColor: grayC,
    borderRadius: width * 0.1,
    overflow: 'hidden',
  },
  smallBarRowLeft: {
    width: width * 0.18,
    height: height * 0.025,
    justifyContent: 'center',
  },
  image: {
    width: width * 0.3,
    marginLeft: width * 0.05,
    objectFit: 'contain',
  },
  containerInfoText: {
    width: width * 0.5,
    height: width * 0.4,
    backgroundColor: purpleC,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
