import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconTouchable } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { Dimensions } from "react-native";
import { ScrollViewComponent } from "@/components/ScrollView";
import { getAllCourses, getAllCoursesByType } from "@/services/courses";
import { getAllTypeCourses } from "@/services/typeCourse";

const { width: screenWidth } = Dimensions.get("window");

const images = [
  { uri: "http://192.168.100.5:9900/test1/hero/hero1.png" },
  { uri: "http://192.168.100.5:9900/test1/hero/hero2.png" },
  { uri: "http://192.168.100.5:9900/test1/hero/hero3.png" },
];

export default function Home() {
  const [name, setName] = useState<string>("");
  const [courses, setCourses] = useState<any>();
  const [typeCourse, setTypeCourse] = useState<any>();
  const [type, setType] = useState<number>(2);

  const getName = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue) {
      setName(JSON.parse(jsonValue).name);
    }
  };

  const getCourses = async () => {
    const resp = await getAllCoursesByType(type);
    if (resp.status) {
      console.log(resp.data);
      setCourses(resp.data);
    } else {
      ToastAndroid.show("Error", 2000);
    }
  };

  const getTypeCourse = async () => {
    const resp = await getAllTypeCourses();
    if (resp.status) {
      setTypeCourse(resp.data);
    } else {
      ToastAndroid.show("Error", 2000);
    }
  };

  useEffect(() => {
    getName();
    getTypeCourse();
  }, []);

  useEffect(() => {
    getCourses();
  }, [type]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.iconContainer}>
          <IconTouchable icon={"google"} />
          <IconTouchable icon={"google"} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, {name}!</Text>
        </View>
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
        <View style={styles.swiperContainer}>
          <Swiper style={styles.wrapper} showsButtons={false} loop={true}>
            {images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.scrollComponentContainer}>
          <ScrollViewComponent
            data={courses}
            typeData={typeCourse}
            setType={setType}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  iconContainer: {
    height: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  greetingContainer: {
    alignItems: "flex-start",
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
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
  swiperContainer: {
    height: 230, // Chiều cao cố định cho swiper
  },
  wrapper: {
    // paddingVertical: 20,
    // height: "60%",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  scrollComponentContainer: {
    // paddingVertical: 200,
    height: "40%",
    flex: 1,
  },
});
