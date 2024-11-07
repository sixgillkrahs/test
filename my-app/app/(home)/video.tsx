import { Text, StyleSheet, SafeAreaView, View, TextInput } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { IconTouchable } from "@/components";

export default function Video() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="#aaa"
            style={styles.icon}
          />
          <TextInput style={styles.textInput} placeholder="Search..." />
        </View>
        <View style={styles.filterContainer}>
          <IconTouchable icon={"filter"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    height: "10%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  textInput: {
    padding: 5,
  },
  filterContainer: {
    padding: 5,
    backgroundColor: "#25292e",
    borderRadius: 10,
  },
});
