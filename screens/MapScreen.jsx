import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CardEvent from "../components/CardEvent";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetSectionList,
} from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import getAllEvents from "../fetchers/events";
import { useFocusEffect } from "@react-navigation/native";

const MapScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const token='fRC4Oj9wVGnIVM5p1ASRzVhrg7RVhFVv'
  // const token = user.user.token;

  //LIKE
  const [postLiked, setPostLiked] = useState(false);
  
  const bottomSheetRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [allEvents, setAllEvents] = useState(null);

  const snapPoints = ["20%", "80%"];

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

  // LIKed
  const handleLike = (event_Id) => {

    fetch(
      // `exp://fia1ztk-anonymous-8081.exp.direct:3000/events/like/${token}/${event_Id}`,
      `http://neotavern-backend.vercel.app/events/like/${token}/${event_Id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log("----->",data))
      .then((data)=> {
        if (data){
          setPostLiked(true)
        }
      })  
  };


  //useFOCUS
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
      openPanel();
    }, [])
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        setUserLocationEnabled={true}
        showsUserLocation={true}
        region={region}
      >
        {allEvents &&
          allEvents.map((event) => (
            <Marker
              key={event._id}
              coordinate={{
                latitude: event.place.latitude,
                longitude: event.place.longitude,
              }}
              title={event.name}
              description={event.place.name}
            />
          ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.drawer}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView style={styles.scrollContainer}>
          {allEvents &&
            allEvents.map((event) => (
              <CardEvent
                key={event._id}
                event={event}
                handleLike={handleLike}
                navigation={navigation}
              />
            ))}
        </BottomSheetScrollView>
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
    position: "relative",
  },

  scrollContainer: {
    width: "100%",
  },

  drawer: {
    paddingHorizontal: 20,
  },
});

export default MapScreen;
