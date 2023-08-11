import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import TopBar from './Home/TopBar';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC } from './files/Colors';
import LeftPage from './Home/LeftPage';
import CenterPage from './Home/CenterPage';
import RightPage from './Home/RightPage';


import Icon from 'react-native-vector-icons/FontAwesome';
import IconGame from 'react-native-vector-icons/MaterialCommunityIcons';
import IconGameOne from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const pages = [<LeftPage />, <CenterPage />, <RightPage />];
  // const pages = [<LeftPage />, <RightPage />, <CenterPage />];
  const swiperRef = useRef<Swiper>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);


  const handleButtonPress = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - selectedIndex);
      setSelectedIndex(index);
    }
  };
  

  return (
    <View style={styles.container}>
     
      <TopBar />  


      <Swiper
        showsPagination={false}
        ref={swiperRef}
        loop={false}
        index={1}
        onIndexChanged={(index) => setSelectedIndex(index)}
      >
        {pages.map((page, index) => (
          <View key={index} style={{ flex: 1 }}>
            {page}
          </View>
        ))}
      </Swiper>

      <View style={styles.bottomOutside}>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedIndex === 0 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(0)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedIndex === 0 ? styles.selectedButtonText : null,
              ]}
            >
              
              <IconGame name="gamepad" size={25} color="#FFF" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedIndex === 1 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedIndex === 1 ? styles.selectedButtonText : null,
              ]}
            >
              <Icon name="home" size={25} color="#FFF" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedIndex === 2 ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedIndex === 2 ? styles.selectedButtonText : null,
              ]}
            >
              <IconGameOne name="bar-chart" size={25} color="#FFF" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: purpleC,
  },
  bottomOutside: {
    backgroundColor: whiteC,
    width: width,
    height: height * 0.14,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    shadowColor: blackC,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  bottomBar: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - height * 0.06,
    height: height * 0.08,
    alignSelf: 'center',
    borderRadius: 30,
    elevation: 3,
    position: 'absolute',
    bottom: height * 0.03,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  selectedButton: {
    backgroundColor: '#333333',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
});

export default HomeScreen;
