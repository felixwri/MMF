import { StyleSheet, Dimensions } from 'react-native';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    width: width * 0.96,
    height: height * 0.85,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: grayC,
    borderRadius: 16,
  }
});
