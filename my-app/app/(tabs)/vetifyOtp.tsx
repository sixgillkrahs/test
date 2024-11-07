import { ButtonTouchable, InputLalel, TextTouchable } from "@/components";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { vefityOtp } from "@/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

export default function VerifyOTP() {
  const navigation: any = useNavigation();
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [timer, setTimer] = useState(30);

  const handleOTPSubmit = async (values: any) => {
    const jsonValue: any = await AsyncStorage.getItem("user");
    const data = { phone: JSON.parse(jsonValue).phone, otp: values.otp };
    const resp = await vefityOtp(data);
    if (resp.status) {
      if (resp.data) {
        navigation.navigate("(home)");
      } else {
        ToastAndroid.show(resp.message || "Sai OTP", 3000);
      }
    } else {
      console.error("OTP verification failed");
    }
  };

  const handleResendOTP = async () => {
    console.log("object");
    if (isResendEnabled) {
      console.log("OTP sent");

      setIsResendEnabled(false);
      setTimer(30);

      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsResendEnabled(true);
            return 30; // Đặt lại timer về 30 giây
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Enter the OTP</Text>
        <Text style={styles.orText}>
          We sent an OTP to your registered phone.
        </Text>
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handleOTPSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <InputLalel
                icon={"lock"}
                title="OTP"
                onChangeText={handleChange("otp")}
                onBlur={() => handleBlur("otp")}
                value={values.otp}
                style={{
                  placeholder: "Enter your OTP",
                  keyboardType: "numeric",
                }}
              />
              {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
              <ButtonTouchable
                context="Verify OTP"
                style={{
                  onPress: () => {
                    handleSubmit();
                  },
                }}
              />

              <TextTouchable
                context={
                  isResendEnabled ? "Resend OTP" : `Resend OTP in ${timer}s`
                }
                style={{
                  onPress: () => {
                    handleResendOTP();
                  },
                  disabled: !isResendEnabled,
                }}
              />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  orText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#555",
  },
  error: {
    top: -15,
    fontSize: 12,
    color: "red",
  },
});
