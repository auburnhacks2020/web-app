import React, {useState} from "react";
import { ScrollView, View, StyleSheet, Platform } from "react-native";
import { Header } from "../components";
import { TextInput } from "react-native-paper";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" />
      <View style={styles.loginForm}>
        <TextInput
          label="Username"
          value={username}
          onChange={value => setUsername(value)}
        />
        <TextInput
          label="Password"
          value={password}
          onChange={value => setPassword(value)}
        />
      </View>
    </ScrollView>
  );
}

ProfileScreen.navigationOptions = {
  title: "Profile"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 15 : 0,
    backgroundColor: "#f7f7f7"
  },
  loginForm: {
    display: 'flex',

  }
});
