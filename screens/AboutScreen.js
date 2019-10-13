import React from 'react';
import { View, ScrollView, Linking, Image, Text, StyleSheet, Platform } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Header } from "../components";
import { layout, stylesheet } from '../constants';
import * as WebBrowser from "expo-web-browser";

export default function AboutScreen() {
	return (
    <ScrollView style={stylesheet.container}>
      <Header title="About" />
      <View style={stylesheet.row}>
        <Card
          style={
            layout.isBrowser
              ? { width: "30%" }
              : { width: "100%", marginBottom: 20 }
          }
        >
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
          <Card.Actions style={stylesheet.cardbtn}>
            <Button
              mode="contained"
              style={stylesheet.btn}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://eng.auburn.edu/news/2019/02/auburnhacks.html"
                )
              }
              onClick={() =>
                Linking.openURL(
                  "https://eng.auburn.edu/news/2019/02/auburnhacks.html"
                )
              }
            >
              Read More
            </Button>
          </Card.Actions>
        </Card>
        <Card
          style={
            layout.isBrowser
              ? { width: "30%" }
              : { width: "100%", marginBottom: 20 }
          }
        >
          <Card.Content>
            <Card.Cover source={require("../assets/images/map.png")} />
            <Text style={stylesheet.par}>
              The Hackathon this year will be held at Auburns brand new
              Brown-Kopel Engineering Student Achievment Center. Come check out
              the new building while you bring your creative ideas to life at
              AuburnHacks.
            </Text>
          </Card.Content>
          <Card.Actions style={stylesheet.cardbtn}>
            <Button
              mode="contained"
              style={stylesheet.btn}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://goo.gl/maps/78Cz5ZjryrVKVYvD8"
                )
              }
              onClick={() =>
                Linking.openURL("https://goo.gl/maps/78Cz5ZjryrVKVYvD8")
              }
            >
              Directions
            </Button>
          </Card.Actions>
        </Card>
        <Card
          style={
            layout.isBrowser
              ? { width: "30%" }
              : { width: "100%", marginBottom: 20 }
          }
        >
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
          <Card.Actions style={stylesheet.cardbtn}>
            <Button
              mode="contained"
              style={stylesheet.btn}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://eng.auburn.edu/news/2019/02/auburnhacks.html"
                )
              }
              onClick={() =>
                Linking.openURL(
                  "https://eng.auburn.edu/news/2019/02/auburnhacks.html"
                )
              }
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