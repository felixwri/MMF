import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC } from '../files/Colors';
// import { FontAwesome, Ionicons, MaterialCommunityIcons, Entypo } from 'react-native-vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';



const { width, height } = Dimensions.get('window');

interface BarChartProps {
  gameOne: number;
  gameTwo: number;
  gameThree: number;
}

const BarChart: React.FC<BarChartProps> = ({ gameOne, gameTwo, gameThree }) => {

  const [deviceTypeTwo, setDeviceTypeTwo] = useState<number>(1);

  useEffect(() => {
    const { height, width } = Dimensions.get('window');
    const aspectRatio = height / width;
    const isTablet = aspectRatio <= 1.6;
    setDeviceTypeTwo(isTablet ? 1.6 : 1);
  }, []);


  return (

    <View style={styles.smallBarOutsideLeft}>

      <View style={styles.smallBarRow}>
        <View style={styles.smallBarRowLeft}>
          <Text style={{ fontSize: (9.5 * deviceTypeTwo), color: blackC, fontWeight: 'bold', textAlign: 'center' }}>Pattern Recall</Text>
          <Text style={{ fontSize: (9 * deviceTypeTwo), color: blackC, textAlign: 'center' }}>{gameOne} / 83</Text>
        </View>
        <View style={styles.smallBarRowRight}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(gameOne / 83) * 100}%`,
                backgroundColor: gameOne / 83 === 1 ? greenC : gameOne / 83 < 0.25 ? redC : orangeC,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.smallBarRow}>
        <View style={styles.smallBarRowLeft}>
          <Text style={{ fontSize: (9.5 * deviceTypeTwo), color: blackC, fontWeight: 'bold', textAlign: 'center' }}>Flip 'n match</Text>
          <Text style={{ fontSize: (9 * deviceTypeTwo), color: blackC, textAlign: 'center' }}>{gameTwo} / 75</Text>
        </View>
        <View style={styles.smallBarRowRight}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(gameTwo / 75) * 100}%`,
                backgroundColor: gameTwo / 75 === 1 ? greenC : gameTwo / 75 < 0.25 ? redC : orangeC,
              },
            ]}
          />
        </View>
      </View>

      <View style={[styles.smallBarRow, { marginBottom: width * 0.02 }]}>
        <View style={styles.smallBarRowLeft}>
          <Text style={{ fontSize: (9.5 * deviceTypeTwo), color: blackC, fontWeight: 'bold', textAlign: 'center' }}>Numeric Bars</Text>
          <Text style={{ fontSize: (9 * deviceTypeTwo), color: blackC, textAlign: 'center' }}>{gameThree} / 100</Text>
        </View>
        <View style={styles.smallBarRowRight}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(gameThree / 100) * 100}%`,
                backgroundColor: gameThree / 100 === 1 ? greenC : gameThree / 100 < 0.25 ? redC : orangeC,
              },
            ]}
          />
        </View>
      </View>

    </View>


  );
};

export default BarChart;

const styles = StyleSheet.create({
  main: {
    width: width,
    flex: 1,
    backgroundColor: whiteC,
  },
  mainInside: {
    width: width,
    flex: 1,
    marginBottom: height * 0.13,
    backgroundColor: whiteC,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  progressBar: {
    width: width * 0.8,
    height: height * 0.05,
    backgroundColor: whiteC,
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
    fontSize: width * 0.07,
    marginLeft: width * 0.658,
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
    paddingTop: height * 0.008,
    paddingBottom: height * 0.018,
    borderRadius: 10,
    shadowColor: 'black',
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
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: 'black',
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
  },
  smallBarOutside: {
    width: width * 0.9,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  smallBarOutsideLeft: {
    backgroundColor: purpleC,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    width: width * 0.67,
    borderRadius: width * 0.02,
    shadowColor: 'black',
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
    shadowColor: 'black',
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
    backgroundColor: whiteC,
    borderRadius: width * 0.1,
    overflow: 'hidden',
  },
  smallBarRowLeft: {
    width: width * 0.18,
    height: height * 0.025,
    justifyContent: 'center',
  }
});
