import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BannerAdComponent = () => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId='ca-app-pub-4802034809768753/8887064445' // Replace with your Ad Unit ID
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true, // Set this to true for GDPR compliance
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default BannerAdComponent;
