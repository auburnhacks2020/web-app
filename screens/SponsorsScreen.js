import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SponsorsScreen() {
  return (
    <View>
      <Text>Sponsors</Text>
    </View>
  );
}

SponsorsScreen.navigationOptions = {
  title: 'Sponsors',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
