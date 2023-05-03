import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Background from "../../components/Background/Background";
import CenteredLogo from "../../components/CenteredLogo/CenteredLogo";

function click() {
  alert("register");
}
export default function PreRegister() {
  return (
    <View style={{ backgroundColor: "#F6F1F1", flex: 1 }}>
      <Background />
      <CenteredLogo />
      <Text style={styles.welcome_title}>What are You?</Text>
      <TouchableOpacity style={styles.Passenger} onPress={click}>
        <Text style={{ fontSize: 24, color: "#FFF", top: 12, left: 70 }}>
          Passenger ?
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: 500,
          height: 1,
          backgroundColor: "black",
          top: 180,
        }}></View>
      <View style={{ top: 100 }}>
        <TouchableOpacity style={styles.driver} onPress={click}>
          <Text style={{ fontSize: 24, color: "#FFF", top: 13, left: 95 }}>
            Driver ?
          </Text>
        </TouchableOpacity>
      </View>
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
  Passenger: {
    backgroundColor: "#19A7CE",
    width: 250,
    height: 60,
    top: 130,
    left: 80,
    borderRadius: 15,
    elevation: 5,
  },
  driver: {
    backgroundColor: "#146C94",
    width: 250,
    height: 60,
    top: 130,
    left: 80,
    borderRadius: 15,
    elevation: 5,
  },
});