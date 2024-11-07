import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllCourses } from "@/services/courses";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const getAllCoursesData = async () => {
    const resp = await getAllCourses();
    if (resp.status) {
      console.log(resp.data);
      setCourses(resp.data);
    } else {
      ToastAndroid.show(resp.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getAllCoursesData();
  }, []);

  const RenderItem = ({ item }) => (
    <TouchableOpacity className="bg-fuchsia-300 rounded-2xl p-4 m-2 flex-1 items-center overflow-hidden">
      <Image
        source={{ uri: item.image }}
        className="w-full h-24 rounded-lg" // Chiều cao cố định cho hình ảnh
        resizeMode="cover" // Đảm bảo hình ảnh phủ toàn bộ
      />
      <Text className="text-lg mt-2 text-center">{item.name}</Text>
      <Text className="text-green-600 text-base mt-1">
        Price: ${item.price}
      </Text>
      <Text className="text-orange-600 text-base mt-1">
        Duration: {Math.floor(item.duration / (60 * 2))} hours
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Courses</Text>
      <FlatList
        data={courses}
        numColumns={2}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item: any) => item?.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    margin: 5,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
  },
  flatListContent: {
    justifyContent: "space-between",
  },
});
