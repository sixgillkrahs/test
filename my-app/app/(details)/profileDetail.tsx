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
import { Formik } from "formik";
import { ButtonTouchable, InputLalel } from "@/components";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetail } from "@/services/user";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface user {
  username: string;
  password: string;
}

export default function Courses() {
  const [initialValues, setInitialValues] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const getUser = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue) {
      const userData = JSON.parse(jsonValue);
      if (userData && userData.id) {
        const resp = await getUserDetail({ id: userData.id });
        if (resp && resp.status) {
          setInitialValues({
            username: resp.data.username || "",
            password: resp.data.password || "",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Unable to fetch user details.",
            position: "bottom",
            visibilityTime: 2000,
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "User ID is missing.",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No user data found.",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  console.log(initialValues);

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = () => {
    console.log("heloo");
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues as user}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <InputLalel
              title="Username"
              onChangeText={handleChange("username")}
              onBlur={() => handleBlur("username")}
              value={values.username}
              icon={"user"}
              style={{
                placeholderTextColor: "#999",
                placeholder: "Enter your username",
              }}
            />
            {errors.username && (
              <Text className="text-red-800 text-xs bottom-4">
                {errors.username}
              </Text>
            )}
            <InputLalel
              title="Password"
              icon={"lock"}
              onChangeText={handleChange("password")}
              onBlur={() => handleBlur("password")}
              value={values.password}
              style={{
                placeholder: "Enter your password",
                placeholderTextColor: "#999",
                secureTextEntry: true,
              }}
            />
            {errors.password && (
              <Text className="text-red-800 text-xs bottom-4">
                {errors.password}
              </Text>
            )}
            <ButtonTouchable
              context="Submit"
              style={{
                onPress: () => {
                  handleSubmit();
                },
              }}
            />
          </View>
        )}
      </Formik>
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
