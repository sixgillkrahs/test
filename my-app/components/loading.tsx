import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native"; // Thêm thư viện Lottie nếu bạn sử dụng animation JSON

import loading from "../assets/images/Ripple@1x-1.0s-200px-200px.json"; // Đảm bảo đường dẫn chính xác

export function PreLoader() {
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 })
    ),
    4 // Chạy animation 4 lần
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle, styles.animatedContainer]}>
        <LottieView source={loading} autoPlay loop />{" "}
        {/* Sử dụng Lottie để hiển thị animation */}
      </Animated.View>
      <ThemedText style={styles.text}>Loading...</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedContainer: {
    width: 200, // Kích thước tùy chỉnh
    height: 200, // Kích thước tùy chỉnh
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: 16, // Đã điều chỉnh khoảng cách
  },
});
