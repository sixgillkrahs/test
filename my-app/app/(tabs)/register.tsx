import { ButtonTouchable, InputLalel } from "@/components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Text, View, StyleSheet, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { register } from "@/services/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), "Passwords must match"],
      "Passwords must match"
    )
    .required("Confirm Password is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
});

export default function RegisterScreen() {
  const navigation: any = useNavigation();
  const handleRegister = async (values: any) => {
    const resp = await register(values);
    if (resp.status) {
      const jsonValue = JSON.stringify(resp.data);
      await AsyncStorage.setItem("user", jsonValue);
      navigation.navigate("vetifyOtp");
    } else {
      Toast.show({
        type: "error",
        text1: resp.message,
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sub}>
        <Text style={styles.text}>Enter your details below & free sign up</Text>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
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
                <Text style={styles.error}>{errors.username}</Text>
              )}
              <InputLalel
                title="Email"
                icon={"envelope"}
                onChangeText={handleChange("email")}
                onBlur={() => handleBlur("email")}
                value={values.email}
                style={{
                  placeholder: "Enter your email",
                  placeholderTextColor: "#999",
                }}
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <InputLalel
                title="Phone"
                icon={"envelope"}
                onChangeText={handleChange("phone")}
                onBlur={() => handleBlur("phone")}
                value={values.phone}
                style={{
                  placeholder: "Enter your phone",
                  placeholderTextColor: "#999",
                }}
              />
              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
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
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <InputLalel
                title="Comfirm Password"
                icon={"lock"}
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
                value={values.confirmPassword}
                style={{
                  placeholder: "Comfirm your password",
                  placeholderTextColor: "#999",
                  secureTextEntry: true,
                }}
              />
              {errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              <Text style={styles.terms}>
                By creating an account you are agreeing with our terms and
                conditions.
              </Text>
              <ButtonTouchable
                context="Register"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  sub: {
    justifyContent: "center",
    width: "80%",
    flex: 1,
    gap: 80,
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  terms: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
    fontSize: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
    top: -14,
  },
});
