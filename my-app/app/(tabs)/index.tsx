import { ButtonTouchable, InputLalel, TextTouchable } from "@/components";
import { IconTouchable } from "@/components/iconTouchable";
import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "@/services/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Index() {
  const navigation: any = useNavigation();
  const handleLogin = async (values: any) => {
    const resp = await login(values);
    console.log(values);
    console.log("resp login: ", resp);
    if (resp.status) {
      const jsonValue = JSON.stringify(resp.data);
      await AsyncStorage.setItem("user", jsonValue);
      if (resp?.data?.isActived) {
        navigation.navigate("(home)");
      } else {
        navigation.navigate("vetifyOtp");
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Wrong username or password",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.buttonContainer}>
          <IconTouchable icon={"google"} />
          <IconTouchable icon={"apple"} />
          <IconTouchable icon={"facebook-square"} />
        </View>
        <Text style={styles.orText}>Or use your email account to login</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <InputLalel
                icon={"envelope"}
                title="Email"
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
                icon={"lock"}
                title="Password"
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
              <ButtonTouchable
                context="Login"
                style={{
                  onPress: () => {
                    handleSubmit();
                  },
                }}
              />
            </View>
          )}
        </Formik>
        <TextTouchable context="Forgot password" />
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <Link href="/(tabs)/register">Register</Link>
        </View>
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
});
