import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View>
      <Text>About Us</Text>
    </View>
  );
}

AboutScreen.navigationOptions = {
  title: 'About Us',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});