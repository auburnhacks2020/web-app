import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialScreen() {
  return (
    <View>
      <Text>Social Media</Text>
    </View>
  );
}

SocialScreen.navigationOptions = {
  title: 'Social',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});