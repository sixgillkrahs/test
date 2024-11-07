import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface ImageTouchableProps {
  source: any; // Đường dẫn hoặc URI của hình ảnh
  onPress: () => void; // Hàm khi chạm vào hình ảnh
  style?: object; // Style cho component
}

const ImageTouchable: React.FC<ImageTouchableProps> = ({
  source,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={source} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden", // Để bo góc đẹp hơn
  },
  image: {
    width: "50%", // Chiều rộng 100% của container
    height: 100, // Chiều cao cố định (có thể thay đổi theo nhu cầu)
    resizeMode: "cover", // Đảm bảo hình ảnh không bị méo
  },
});

export default ImageTouchable;
