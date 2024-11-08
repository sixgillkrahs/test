import { Stack, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

export default function DetailLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="courses"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profileDetail"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Toast />
    </>
  );
}
