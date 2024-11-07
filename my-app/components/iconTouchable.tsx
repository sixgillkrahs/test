import React from "react";
import { StyleSheet, Text, TextProps, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  style?: TextProps;
  icon: any;
}

export function IconTouchable({ style, icon }: Props) {
  return (
    <TouchableOpacity>
      <Icon name={icon} size={30} color="#999" style={styles.inputIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputIcon: {
    marginRight: 10,
    padding: 5,
  },
});
