import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CardEvent from "../components/CardEvent";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import getAllEvents from "../fetchers/events";

const MapScreen = () => {
  const bottomSheetRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [allEvents, setAllEvents] = useState(null);

  const snapPoints = ["20%", "40%", "80%"];

  const openPanel = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();
      setAllEvents(events);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    openPanel();
    fetchEvents();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        setUserLocationEnabled={true}
        showsUserLocation={true}
        region={region}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={"Marker Title"}
          description={"Marker Description"}
        />
      </MapView>
      <BottomSheet ref={bottomSheetRef} index={3} snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>
          {allEvents &&
            allEvents.map((event) => (
              <CardEvent key={event._id} event={event} />
            ))}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default MapScreen;
