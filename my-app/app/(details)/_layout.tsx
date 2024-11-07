import { Stack, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DetailLayout() {
  return (
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
    </Stack>
  );
}
