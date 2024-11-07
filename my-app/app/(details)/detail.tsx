import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDetailCourse } from "@/services/courses";
import { useRoute } from "@react-navigation/native";

export default function Detail({}: any) {
  const [course, setCourse] = useState<any>([]);
  const route = useRoute();
  const { id }: any = route.params;
  console.log(id);
  const getCourseById = async () => {
    const resp = await getDetailCourse(id);
    if (resp.status) {
      setCourse(resp.data);
    } else {
      ToastAndroid.show(resp.message || "error", 2000);
    }
  };

  useEffect(() => {
    getCourseById();
  }, [id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={{ uri: course.image }} // Hình ảnh khóa học
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.price}>Price: ${course.price}</Text>
        {course.promoPrice > 0 && (
          <Text style={styles.promoPrice}>
            Promo Price: ${course.promoPrice}
          </Text>
        )}
        <Text style={styles.duration}>
          Duration: {Math.floor(course.duration / 60)}h {course.duration % 60}m
        </Text>
        <Text style={styles.description}>{course.description}</Text>

        {course.videoUrl && (
          <TouchableOpacity
            style={styles.videoButton}
            onPress={() => Linking.openURL(course.videoUrl)} // Mở video
          >
            <Text style={styles.videoButtonText}>Watch Video</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.status}>
          Status: {course.isActive ? "Active" : "Inactive"}
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()} // Điều hướng quay lại
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 5,
  },
  promoPrice: {
    fontSize: 18,
    color: "#FF5722",
    marginBottom: 5,
    textDecorationLine: "line-through", // Gạch ngang cho giá gốc
  },
  duration: {
    fontSize: 18,
    color: "#FF5722",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  videoButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  videoButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
