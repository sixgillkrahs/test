import { ButtonTouchable, InputLalel, TextTouchable } from "@/components";
import { IconTouchable } from "@/components/iconTouchable";
import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { forgotPassword, login, sentOTP } from "@/services/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
});

export default function ForgotPassword() {
  const navigation: any = useNavigation();
  const [sent, isSent] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const handleSentOTP = async (values: any) => {
    const resp = await sentOTP(values);
    setPhone(values.phone);
    console.log(resp);
    if (resp.status) {
      isSent(true);
    }
  };

  const handleGetNewPassword = async (values: any) => {
    const resp = await forgotPassword(values);
    if (resp.status) {
      navigation.navigate("index");
    } else {
      Toast.show({
        type: "error",
        text1: "Wrong otp",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.orText}>Input your phone </Text>
        <Formik
          initialValues={{ phone: "", otp: "" }}
          validationSchema={validationSchema}
          onSubmit={sent ? handleGetNewPassword : handleSentOTP}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <InputLalel
                title="Phone"
                icon={"envelope"}
                onChangeText={handleChange("phone")}
                onBlur={() => handleBlur("phone")}
                value={values.phone}
                disable={sent}
                style={{
                  placeholder: "Enter your phone",
                  placeholderTextColor: "#999",
                }}
              />
              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
              {sent ? (
                <View style={styles.container1}>
                  <InputLalel
                    value={values.otp}
                    icon="key"
                    onChangeText={handleChange("otp")}
                    onBlur={() => handleBlur("otp")}
                    style={{
                      placeholder: "Enter your OTP",
                      placeholderTextColor: "#999",
                    }}
                  />
                  <Button
                    title="Resend"
                    onPress={() => handleSentOTP({ phone })}
                    //   style={styles.button} // Thêm style cho button
                  />
                </View>
              ) : (
                <View></View>
              )}
              {sent ? (
                <ButtonTouchable
                  context="Get new password"
                  style={{
                    onPress: () => {
                      handleSubmit();
                    },
                  }}
                />
              ) : (
                <ButtonTouchable
                  context="Send OTP"
                  style={{
                    onPress: () => {
                      handleSubmit();
                    },
                  }}
                />
              )}
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  loginContainer: {
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 100,
  },
  error: {
    top: -15,
    fontSize: 12,
    color: "red",
  },
  orText: {
    textAlign: "center",
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    marginRight: 5,
  },
  container1: {
    // width: "100%",
    // flexDirection: "row", // Sắp xếp thành hàng ngang
    // alignItems: "center", // Căn giữa theo chiều dọc
  },
});
