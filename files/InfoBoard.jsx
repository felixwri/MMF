import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from './Colors';

const { height, width } = Dimensions.get('window');

const InfoBoard = ({ title, info, infoTwo }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <View style={styles.container}>

      <View style={styles.containerTop}>
      <View style={styles.TextView}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={toggleInfo}>
        <Text style={styles.buttonText}>Info ?</Text>
      </TouchableOpacity>
      </View>

      {showInfo && ( 
      <View style={styles.TextViewInside}>
        
        <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 30, alignSelf: 'flex-start', marginRight: 10 }}>{'\u2022'}</Text>
    <Text style={{ flex: 1, marginTop: 10 }}>{info}</Text>
  </View>

 <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 30, alignSelf: 'flex-start', marginRight: 10 }}>{'\u2022'}</Text>
    <Text style={{ flex: 1, marginTop: 10 }}>{infoTwo}</Text>
  </View>

        
        </View> 
        )}
    </View>
  );
};

export default InfoBoard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.94,
    backgroundColor: whiteC,
    borderWidth: height * 0.005,
    borderRadius: 15,
    paddingVertical: height * 0.01,
  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: height * 0.032,
    fontFamily: font,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  TextView: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  button: {
    backgroundColor: orangeC,
    padding: height * 0.01,
    marginLeft: height * 0.01,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  buttonText: {
    color: whiteC,
    fontSize: width * 0.03,
    fontFamily: font,
    fontWeight: 'bold',
  },
  TextViewInside: {
   margin: height * 0.01,
  },
});