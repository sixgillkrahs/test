import React from "react";
import { StyleSheet, Text, TextProps, TouchableOpacity } from "react-native";

interface Props {
  style?: TextProps;
  context: string;
}

export function TextTouchable({ style, context }: Props) {
  return (
    <TouchableOpacity>
      <Text style={styles.forgotPasswordText}>{context}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  forgotPasswordText: {
    color: "#007bff",
    textAlign: "center",
  },
});
