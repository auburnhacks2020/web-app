import React from 'react';
import { View, ScrollView, Linking, Image, Text, StyleSheet, Platform } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Header } from "../components";
import { stylesheet } from '../constants';
import { Constants, WebBrowser } from "expo";

export default function AboutScreen() {
	return (
    <ScrollView style={stylesheet.container}>
      <Header title="About" />
      <View style={stylesheet.row}>
        <Card>
          <Card.Content>
            <Card.Cover source={require("../assets/images/aboutCard.jpg")} />
            <Text style={stylesheet.par}>
              We are Auburn University’s programming event organized by
              students, for students. With this hackathon, Auburn University's
              Computer Science & Software Engineering strives to promote
              technical innovation and highlight students’ skills and abilities.
              Partnering with Major League Hacking (MLH) for the first time, we
              aim to bring out the best and brightest students, not just from
              Auburn University but from other universities all over the United
              States.
            </Text>
          </Card.Content>
          <Card.Actions style={{ flexDirection: "row-reverse" }}>
            <Button
              mode="contained"
              style={stylesheet.btn}
              onPress={() => WebBrowser.openBrowserAsync('https://expo.io')}
              onClick={() => Linking.openURL("https://eng.auburn.edu/news/2019/02/auburnhacks.html")}
            >
              Read More
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

AboutScreen.navigationOptions = {
};