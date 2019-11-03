import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Linking
} from "react-native";
import { Header } from "../components";
import { layout, stylesheet } from "../constants";
import { Paragraph } from "react-native-paper";


export default function SponsorsScreen() {
	return (
    <ScrollView style={stylesheet.container}>
      <Header title="Sponsors" />
      <View style={stylesheet.row}>
        <Paragraph>
          This event would not be possible without the support shown to us by
          Auburn University's Computer Science & Software Engineering Department
          and all of our future sponsors. {"\n\n"}
          If you would like to sponsor our event, reach out to us at{" "}
          <Text
            style={stylesheet.links}
            onPress={() => Linking.openURL("mailto:staff@auburnhacks.com")}
          >
            staff@auburnhacks.com!
          </Text>
          {"\n\n"}
          <Text
            style={stylesheet.links}
            onPress={() =>
              Linking.openURL(
                "http://www.auburnhacks.com/assets/documents/prospectus.pdf"
              )
            }
          >
            Click here to download the 2020 Prospectus.
          </Text>
        </Paragraph>
      </View>
    </ScrollView>
  );
}

SponsorsScreen.navigationOptions = {};
