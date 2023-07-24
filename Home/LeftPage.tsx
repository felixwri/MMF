import React, { FC } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FirstGameIntro from '../FirstGame/FirstGameIntro';
import SecondGameIntro from '../SecondGame/SecondGameIntro';
import InfoBoard from '../files/InfoBoard';
import ThirdGameIntro from '../ThirdGame/ThirdGameIntro';
import { purpleC, grayC, blackC, whiteC, greenC, orangeC, redC, font } from '../files/Colors';
import TopBar from './TopBar';

const { width, height } = Dimensions.get('window');

const LeftPage: FC = () => {
  return (
    <>

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={{
          alignItems: 'center',
          marginTop: height * 0.02,
        }}>
          <InfoBoard
            title="Pattern Recall"
            info='Pattern Recall is an addictive memory game that challenges your ability to recall patterns. 
            Test your memory skills as you observe a grid of squares, with one randomly lighting up at a time. 
            Remember the order in which they illuminate and strive to beat your high score by replicating the sequence correctly.'
            infoTwo='Choose your grid size (3x3 to 6x6) and observe as squares randomly light up. Click on the lit square to acknowledge 
            it and remember its position. Recreate the pattern by clicking on the squares in the same order. Avoid mistakes to achieve your 
            highest score and challenge your memory skills.'
          />
        </View>

        <FirstGameIntro />

        <View style={{
          alignItems: 'center',
        }}>
          <InfoBoard
            title="Flip 'n Match"
            info="Flip 'n Match Challenge presents a captivating memory game within a 6x6 square grid, 
            showcasing 18 different colors hidden behind square tiles. Your objective is to remember 
            the positions of the colors and click on two tiles consecutively to reveal and match the colors."
            infoTwo="easy mode, the colors remain in the same positions, allowing for repeated attempts. In medium mode, the colors shuffle their positions 
            with every play, putting your memory to the test. In the hard mode, the challenge intensifies 
            as shades of blue and red make memorization more difficult. Flip the tiles, match the colors,
            and strive to complete the grid without making mistakes."
          />
        </View>

        <SecondGameIntro />

        <View style={{
          alignItems: 'center',
        }}>
          <InfoBoard
            title="Numeric Bars"
            info='Numeric Bars Challenge is an engaging memory game featuring a series of bars. 
            Test your memory skills across five levels, starting with Game 10 where you must remember the placement of two 
            numbers on each of the five bars. As you progress through the levels, the difficulty increases, culminating in Game 30 with six numbers on each bar.'
            infoTwo='Click on the bars in the correct numerical order based on the hidden numbers and aim for the high score. Can you achieve the highest score
            and prove your mastery of bar-based number recall?'
          />
        </View>

        <ThirdGameIntro />

      </ScrollView>
    </>
  );
};

export default LeftPage;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    borderColor: blackC,
    height: '110%'
  }
});
