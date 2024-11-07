import React from "react";
import {
  ButtonProps,
  StyleSheet,
  Text,
  TextInputProps,
  TextProps,
  TouchableOpacity,
} from "react-native";

interface Props {
  style?: TextProps;
  context: string;
}

export function ButtonTouchable({ style, context }: Props) {
  return (
    <TouchableOpacity style={styles.loginButton}>
      <Text style={styles.loginButtonText} {...style}>
        {context}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  // ...
});
