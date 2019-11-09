import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { Header } from "../components";
import { layout, stylesheet } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export default function SocialScreen() {
  return (
    <ScrollView style={stylesheet.container}>
      <Header title="Social Media" />
      <View style={stylesheet.row}>
        <Ionicons
          name="logo-instagram"
          size={70}
          style={stylesheet.links}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.instagram.com/auburnhacks/"
            )
          }
        />
        <Ionicons
          name="logo-facebook"
          size={70}
          style={stylesheet.links}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.facebook.com/AuburnHacks/"
            )
          }
        />
        <Ionicons
          name="logo-twitter"
          size={70}
          style={stylesheet.links}
          onPress={() =>
            WebBrowser.openBrowserAsync("https://twitter.com/AuburnHacks")
          }
        />
        <Ionicons
          name="logo-linkedin"
          size={70}
          style={stylesheet.links}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.linkedin.com/company/auburnhacks/"
            )
          }
        />
      </View>
    </ScrollView>
  );
}

SocialScreen.navigationOptions = {};