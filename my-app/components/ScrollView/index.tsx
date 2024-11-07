import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  style?: object;
  data: any;
  typeData: any;
  setType: any;
}

export function ScrollViewComponent({ data, style, typeData, setType }: Props) {
  const navagation: any = useNavigation();
  const onPressHandler = (item: any) => {
    setType(item.id);
  };

  const handleOnDetail = (id: string) => {
    navagation.navigate("(details)", { id: id, screen: "detail" });
  };

  const handleOnPress = () => {
    navagation.navigate("(details)", { screen: "courses" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Course</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText} onPress={handleOnPress}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.optionsScroll}
      >
        {Array.isArray(typeData) && typeData.length > 0 ? (
          typeData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.courseOption}
              onPress={() => onPressHandler(item)}
            >
              <Text style={styles.courseOptionText}>{item.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No options available</Text>
        )}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.coursesScroll}
      >
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.course}
              onPress={() => handleOnDetail(item.id)}
            >
              <Image
                source={{ uri: "http://192.168.1.29:9900/test1/video.png" }}
                style={styles.courseImage}
                resizeMode="cover"
              />
              <Text style={styles.courseTitle}>{item.name}</Text>
              <View style={styles.courseDetails}>
                <View style={styles.courseDetailItem}>
                  <Image
                    source={require("../../assets/images/hero/hero1.png")}
                    style={styles.courseDetailIcon}
                  />
                  <Text style={styles.courseDetailText}>
                    {item.lessons} Lessons
                  </Text>
                </View>
                <View style={styles.courseDetailItem}>
                  <Image
                    source={require("../../assets/images/hero/hero1.png")}
                    style={styles.courseDetailIcon}
                  />
                  <Text style={styles.courseDetailText}>
                    {Math.floor(item.duration / (60 * 2))} hrs
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No courses available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    // flex: 0.6,
    // backgroundColor: "#f8f9fa",
    // paddingHorizontal: 20,
    // paddingVertical: 30,
  },
  header: {
    // flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343a40",
  },
  viewAllButton: {},
  viewAllText: {
    color: "#007bff",
    fontSize: 16,
  },
  optionsScroll: {
    marginBottom: 20,
  },
  courseOption: {
    paddingVertical: 4, // Giảm chiều cao bằng cách giảm padding dọc
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#e9ecef",
    marginHorizontal: 8,
    elevation: 1,
  },
  courseOptionText: {
    color: "#495057",
    fontSize: 14,
    textAlign: "center",
  },
  coursesScroll: {
    // flex: 1,
    // rowGap: 20,
  },
  course: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    width: 300,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  courseImage: {
    width: "100%",
    height: 200,
    // maxWidth: 00,
    resizeMode: "cover",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 12,
    color: "#343a40",
  },
  courseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  courseDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseDetailIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  courseDetailText: {
    fontSize: 14,
    color: "#6c757d",
  },
});
