import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";
const SIZE = 80;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    position: "absolute",
    zIndex: 3,
    elevation: 3,
    top: -SIZE / 2,
    shadowColor: "white",
    shadowRadius: 10,
    borderRadius: SIZE / 2,
    backgroundColor: "#48A2F8",
    width: SIZE,
    height: SIZE
  }
});

const ProfileButton = ({ onPress }) => {
  const [focused, setFocused] = useState(false);

  const onClick = () => {
    onPress();
    setFocused(!focused);
  };
  return (
    <View style={styles.container}>
      <Button style={styles.button} onPress={onPress}>
        <Ionicons name="md-person" size={SIZE / 1.5} color={Colors.tintColor} />
      </Button>
    </View>
  );
};
export default ProfileButton;
