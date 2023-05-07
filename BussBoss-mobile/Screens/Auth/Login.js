import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Background from "../../components/Background/Background";
import CenteredLogo from "../../components/CenteredLogo/CenteredLogo";
import { useNavigation } from "@react-navigation/native";
import UseHttp from "../../hooks/request";
import { useDispatch } from "react-redux";
import { login, setUserData } from "../../redux/slices/authSlice";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("Ali@gmail.com");
  const [password, setPassword] = useState("code123");
  const formData = new FormData();
  const navigation = useNavigation();
  const register = () => {
    navigation.navigate("Preregister Screen");
  };

  const dispatch = useDispatch();

  const handleLogin = async () => {
    formData.append("email", email);
    formData.append("password", password);
    const result = await UseHttp("login", "POST", formData);

    try {
      await AsyncStorage.setItem("token", result.authorisation.token);
      await AsyncStorage.setItem("user_type", result.user.user_type);
    } catch (error) {
      console.log("Error storing token:", error);
    }

    if (result.status === "success") {
      dispatch(login());
    } else {
      alert("wrong credentials");
    }

    // dispatch(setUserdata(register));
  };

  return (
    <View style={{ backgroundColor: "#F6F1F1", flex: 1 }}>
      <Background />
      <CenteredLogo />
      <Text style={styles.welcome_title}>Welcome Back.</Text>
      <View style={{ gap: 20 }}>
        <TextInput
          style={styles.TextInput}
          placeholder="  Your Email"
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="  Password"
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
      </View>
      <TouchableOpacity style={styles.Login_btn} onPress={handleLogin}>
        <Text style={{ fontSize: 24, color: "#FFF", top: 8, left: 125 }}>
          Login
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 17, color: "#000", top: 150, left: 100 }}>
        Don't have an account?{" "}
        <Text style={{ fontWeight: "bold" }} onPress={register}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome_title: {
    fontSize: 32,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    left: 110,
  },
  TextInput: {
    backgroundColor: "#FFF",
    padding: 10,
    width: 300,
    borderRadius: 15,
    top: 70,
    left: 50,
    elevation: 10,
  },
  Login_btn: {
    backgroundColor: "#146C94",
    width: 300,
    height: 50,
    top: 130,
    left: 50,
    borderRadius: 15,
    elevation: 5,
  },
});
