import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Platform } from "react-native";
import { Header } from "../components";
import { TextInput, Surface, Button, Text } from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CURRENT_USER = gql`
  {
    currentUser {
      id
      email
    }
  }
`;

export default function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) return <Text>loading</Text>

  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" />
      <Text>{error ? error.message : data.email}</Text>
      <Surface style={styles.loginForm}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
        />
        <View style={styles.formButtons}>
          <Button>Login</Button>
          <Button>Sign Up</Button>
        </View>
      </Surface>
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
    flex: 1,
    elevation: 4,
    margin: 10,
    padding: 20,
    maxWidth: 400
  },
  textInput: {
    marginBottom: 10
  },
  formButtons: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    paddingTop: 10
  }
});
