import { StyleSheet, View, Text } from "react-native";

import UseHttp from "../../hooks/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
function DriverTripsBar() {
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    const token = await retrieveData();
    return token;
  };
  const [total_earned, setTotalEarned] = useState("");
  const [total_trips, setTotalTrips] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const result = await UseHttp("get_driver_total_earned", "GET", "", {
        Authorization: "bearer " + token,
      });
      setTotalEarned(result.total_driver_earned);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const result = await UseHttp("get_driver_total_trips", "GET", "", {
        Authorization: "bearer " + token,
      });
      setTotalTrips(result.total_driver_trips);
    };
    fetchData();
  }, []);
  return (
    <View style={styles.trips_bar}>
      <Text style={styles.trips_title}>TOTAL TRIPS</Text>
      <Text style={styles.trips_count}>{total_trips}</Text>
      <Text style={styles.paid_title}>TOTAL Earned</Text>
      <Text style={styles.paid_number}>{total_earned}$</Text>
    </View>
  );
}
export default DriverTripsBar;

const styles = StyleSheet.create({
  trips_bar: {
    backgroundColor: "#19A7CE",
    top: 240,
    left: 35,
    height: 120,
    width: 335,
    position: "absolute",
    zIndex: 2,
    borderRadius: 15,
  },
  trips_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.5)",
    top: 20,
    left: 30,
  },
  trips_count: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    top: 20,
    left: 65,
  },
  paid_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    color: "rgba(255, 255, 255, 0.5)",
    top: -50,
    left: 215,
  },
  paid_number: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    top: -50,
    left: 250,
  },
});
