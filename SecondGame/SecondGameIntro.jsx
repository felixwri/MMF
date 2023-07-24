import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';
const { height, width } = Dimensions.get('window');
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SecondGameIntro = () => {

  const navigation = useNavigation();


  const [deviceType, setDeviceType] = useState(1);
  const [deviceTypeTwo, setDeviceTypeTwo] = useState(1);

  useEffect(() => {
    const { height, width } = Dimensions.get('window');
    const aspectRatio = height / width;
    const isTablet = aspectRatio <= 1.6;
    setDeviceType(isTablet ? 1 : 0.9);
    setDeviceTypeTwo(isTablet ? 1 : 0.6);
  }, []);

  const [sgEasyValue, setSGEasyValue] = useState(false);
  const [sgMediumValue, setSGMediumValue] = useState(false);
  const [sgHardValue, setSGHardValue] = useState(false)

  const fetchValue = async () => {
    let easyValue = await AsyncStorage.getItem('SGEasy');
    let mediumValue = await AsyncStorage.getItem('SGMedium');
    let hardValue = await AsyncStorage.getItem('SGHard');
  
    if (easyValue !== null) {
      if (easyValue === 'true') {
        setSGEasyValue(true);
      } else {
        setSGEasyValue(false);
      }
    } else {
      setSGEasyValue(false);
      await AsyncStorage.setItem('SGEasy', 'false');
    }
    if (mediumValue !== null) {
      if (mediumValue === 'true') {
        setSGMediumValue(true);
      } else {
        setSGMediumValue(false);
      }
    } else {
      setSGMediumValue(false);
      await AsyncStorage.setItem('SGMedium', 'false');
    }
    if (hardValue !== null) {
      if (hardValue === 'true') {
        setSGHardValue(true);
      } else {
        setSGHardValue(false);
      }
    } else {
      setSGHardValue(false);
      await AsyncStorage.setItem('SGHard', 'false');
    }
  };
  
  useEffect(() => {
    fetchValue();
  }, []);
  
  useFocusEffect(() => {
    fetchValue();
  });

  const numbersArray = [16, 12, 17, 4, 16, 15, 18, 8, 11, 9, 2, 5,
    10, 7, 6, 14, 13, 17, 3, 6, 14, 8, 7, 1, 4, 5, 12, 1, 15, 2, 9, 11, 18,
     10, 13, 3]

      const colors = [
        "#ff0006","#f2f2f2","#e817bd","#d702fd",
        "#c7383c","#6550af","#0e33f1","#3a98c5",
        "#06f9f9","#0cf37c","#1eee11","#91b847",
        "#e7fa05","#c8ac37","#ff6600","#d85527",
        "#857d7a","#202020",
      ];

  const colorsHard = [
    "#fff0f2",
    "#fefefe",
    "#f9c7df",
    "#fce2ff",
    "#f9c9c8",
    "#d5d1e7",
    "#d6ebff",
    "#e8f6fb",
    "#e6ffff",
    "#ebffed",
    "#f3ffb6",
    "#f2f7d3",
    "#ffffe2",
    "#f3ebd4",
    "#ffd8b3",
    "#f6c7aa",
    "#e3e2e1",
    "#a9a9a9",
  
];

const [arrayTwo, setArrayTwo] = useState([]);

const scrambleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

useFocusEffect(
  useCallback(() => {
    const updatedArrayTwo = scrambleArray(numbersArray.slice());
    setArrayTwo(updatedArrayTwo);
    return () => {
    };
  }, [navigation])
);  
  
  const blackViews = numbersArray.map((number, index) => {
    const isNoMargin = (index + 1) % 6 === 0;
    const backgroundColor = colors[(number - 1) % colors.length];
  
    return (
      <View
        key={index}
        style={{
          ...styles.blackBox,
          height: height * (0.026 * deviceType),
          width: height * (0.026 * deviceType),
          margin: height * (0.0053 * deviceType),
          backgroundColor: backgroundColor,
          // shadowColor: blackC,
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          elevation: 5,
        }}
      >
      </View>
    );
  });

  const CompletedViews = () => {
    return (
      <View
        style={{
          backgroundColor: greenC,
          width: height * (0.1 * deviceType),
          height: height * (0.06 * deviceType),
          marginLeft: height * (0.02 * deviceType),
          marginBottom: height * (0.02 * deviceType),
          justifyContent: 'center',
          borderRadius: (10 * deviceType),
        }}
      >
        <Text style={{ ...styles.Text, fontSize: (19 * deviceTypeTwo) }}>Completed</Text>
      </View>
    );
  };



  const NotCompletedViews = () => {
    return (
      <View
        style={{
          backgroundColor: redC,
          width: height * (0.1 * deviceType),
          height: height * (0.06 * deviceType),
          marginLeft: height * (0.02 * deviceType),
          marginBottom: height * (0.02 * deviceType),
          justifyContent: 'center',
          borderRadius: (10 * deviceType),
        }}
      >
        <Text style={{ ...styles.Text, fontSize: (19 * deviceTypeTwo) }}>Not Completed</Text>
      </View>
    );
  };

  return (
    <View style={{ ...styles.container, marginTop: height * 0.02, marginBottom: height * 0.02 }}>
      <View style={{ ...styles.mainBox, width: height * (0.22 * deviceType), height: height * (0.22 * deviceType) }}>
        {blackViews}</View>
        <View style={{ ...styles.gameBox, width: height * (0.24 * deviceType), height: height * (0.22 * deviceType) }}>

          <TouchableOpacity style={{ ...styles.gameButton, width: height * (0.1 * deviceType), height: height * (0.06 * deviceType) }} onPress={() =>
        navigation.navigate('SecondGameScreen', {array: numbersArray, colorArray: colors, level: 'SGEasy'})}>
        <Text style={{ ...styles.Text, fontSize: 18 * deviceType }}>Easy</Text>
      </TouchableOpacity>

      {sgEasyValue ? <CompletedViews /> : <NotCompletedViews />}

       
      <TouchableOpacity style={{ ...styles.gameButton, width: height * (0.1 * deviceType), height: height * (0.06 * deviceType) }} onPress={() =>
        navigation.navigate('SecondGameScreen', {array: arrayTwo, colorArray: colors, level: 'SGMedium'})}>
        <Text style={{ ...styles.Text, fontSize: 18 * deviceType }}>Medium</Text>
      </TouchableOpacity>
        

        {sgMediumValue? <CompletedViews /> : <NotCompletedViews />}

      
        <TouchableOpacity style={{ ...styles.gameButton, width: height * (0.1 * deviceType), height: height * (0.06 * deviceType) }} onPress={() =>
        navigation.navigate('SecondGameScreen', {array: arrayTwo, colorArray: colorsHard, level: 'SGHard'})}>
        <Text style={{ ...styles.Text, fontSize: 18 * deviceType }}>Hard</Text>
      </TouchableOpacity>

        {sgHardValue ? <CompletedViews /> : <NotCompletedViews />}

      </View>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: purpleC,
  },
  blackBox: {
    backgroundColor: blackC,
    borderRadius: 8,
  },
  mainBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  gameBox: {
    flexDirection: 'row',  
    flexWrap: 'wrap', 
  },
  gameButton: {
    backgroundColor: whiteC,
    justifyContent: 'center',
    borderRadius: 10, 
    // shadowColor: blackC,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  Text: {
    fontFamily: font,
    fontWeight: 'bold',
    color: blackC,
    textAlign: 'center',
    // textShadowColor: `rgba(0, 0, 0, 0.2)`,
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 0.25,
  },
});


export default SecondGameIntro;
