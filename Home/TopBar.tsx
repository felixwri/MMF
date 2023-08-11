import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TopBar: React.FC = () => {
  const imageHeight = width * 0.12;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/Title.png')}
        style={{ height: imageHeight,  marginBottom: 2, marginTop: 80}}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor: 'black',
  },
  blackBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: 'black',
  },
});

export default TopBar;


