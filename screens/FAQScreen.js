import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FAQScreen() {
  return (
    <View>
      <Text>FAQs</Text>
    </View>
  );
}

FAQScreen.navigationOptions = {
  title: 'FAQs',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});