import React, {useState} from "react";
import { ScrollView, View, StyleSheet, Platform } from "react-native";
import { Header } from "../components";
import { TextInput } from "react-native-paper";

export default function ProfileScreen() {
  const [form, setField] = useState({
    username: '',
    password: ''
  });

  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" />
      <View style={styles.loginForm}>
        <TextInput
          label="Username"
          value={form.username}
          onChange={value => setUsername(value)}
        />
        <TextInput
          label="Password"
          value={form.password}
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
    backgroundColor: "#03244d"
  },
  loginForm: {
    display: 'flex',
    margin: 10
  }
});
