import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  style?: TextInputProps;
  title: string;
  icon?: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  value: string;
}

export function InputLalel({
  title,
  icon,
  onChangeText,
  onBlur,
  value,
  style,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        {icon && (
          <Icon name={icon} size={20} color="#999" style={styles.inputIcon} />
        )}
        <TextInput
          style={[styles.input]}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          {...style}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  label: {
    color: "gray",
    fontSize: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
});
