import { Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

export default function Chat() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>chat</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
