import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "expo-router";

export default function Profile() {
  const navigation: any = useNavigation();
  const handlePress = (action: string) => {
    switch (action) {
      case "logout": {
        handleLogout();
        return;
      }
      case "wallet": {
        console.log("helo");
        return;
      }
      default:
        return;
    }
  };

  const handleLogout = () => {
    navigation.navigate("(tabs)", { screen: "index" });
  };

  return (
    <SafeAreaView className="flex bg-white h-screen">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <View className="h-40 items-center justify-center">
          <Image
            source={{ uri: "http://192.168.1.41:9900/test1/avatar.png" }}
            crossOrigin="anonymous"
            className="h-32 w-32"
          />
        </View>
        <View className="p-5 items-center">
          <Text>descr</Text>
        </View>
        <View className="flex-row h-28 justify-center gap-2">
          <TouchableOpacity className="w-1/2 h-full">
            <View className="bg-blue-500 w-full h-full rounded-3xl justify-center items-center">
              <MaterialIcons
                name={"book"}
                size={24}
                color="#fff"
                className="rounded-xl p-3 "
              />
              <Text className="color-white font-semibold text-base">
                Courses bought
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-full">
            <View className="bg-blue-500 w-full h-full rounded-3xl justify-center items-center">
              <MaterialIcons
                name={"star"}
                size={24}
                color="#fff"
                className="rounded-xl p-3"
              />
              <Text className="color-white font-semibold text-base">4.9</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {[
            { icon: "settings", label: "Profile Details", action: "settings" },
            { icon: "wallet", label: "Payment Details", action: "wallet" },
            {
              icon: "architecture",
              label: "Achievement",
              action: "Achievement",
            },
            {
              icon: "heart",
              label: "Wishlist",
              iconLibrary: "MaterialCommunityIcons",
              action: "wishlist",
            },
            { icon: "alarm", label: "Reminder", action: "alarm" },
            { icon: "logout", label: "Logout", action: "logout" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(item.action)}
            >
              <View className="flex-row gap-5 py-3 items-center">
                {item.iconLibrary === "MaterialCommunityIcons" ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color="#fff"
                    className="rounded-xl p-3 bg-blue-500"
                  />
                ) : (
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color="#fff"
                    className="rounded-xl p-3 bg-blue-500"
                  />
                )}
                <Text className="text-xl font-semibold">{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
