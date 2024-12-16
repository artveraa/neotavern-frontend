import React, { useRef, useState, useEffect, useCallback, use } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import CardEvent from "../components/CardEvent";
import HeaderSearch from "../components/SearchHeader";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetSectionList,
} from "@gorhom/bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import getAllEvents from "../fetchers/events";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../styleConstants/colors";

const MapScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const token = user.user.token;

  const types = [
    { label: "Concert" },
    { label: "Soirée" },
    { label: "Exposition" },
    { label: "Conférence" },
    { label: "Atelier" },
    { label: "Festival" },
    { label: "Spectacle" },
    { label: "Cinéma" },
    { label: "Théâtre" },
    { label: "Sport" },
    { label: "Jeux" },
  ];

  //LIKE
  const [postLiked, setPostLiked] = useState(null);
  const bottomSheetRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [allEvents, setAllEvents] = useState(null);
  const [selectedType, setSelectedType] = useState([]);

  const snapPoints = ["20%", "65%"];

  const openPanel = () => {
    bottomSheetRef.current?.expand();
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
      console.log('EVENTSSS:', events)
      setAllEvents(events);
    } catch (error) {
      console.error(error);
    }
  };

  // Select types
  const handleEventType = (type) => {
    if (selectedType.includes(type)) {
      setSelectedType(
        selectedType.filter((item) => item.toLowerCase() !== type.toLowerCase())
      );
      const filteredEvents = [...allEvents].filter((event) =>
        event.categories.find((category) => category === type)
      );
      openPanel();
      setAllEvents(filteredEvents);
    } else {
      setSelectedType([...selectedType, type]);
      const filteredEvents = [...allEvents].filter((event) =>
        event.categories.find((category) => category === type)
      );
      openPanel();
      setAllEvents(filteredEvents);
    }
  };

  // Reset types
  const handleReset = () => {
    setSelectedType([]);
    fetchEvents();
    openPanel();
  };

  // Like
  const handleLike = async (eventId) => {
    console.log(token);

    try {
      const response = await fetch(
        `https://neotavern-backend.vercel.app/events/like/${token}/${eventId}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedType.length === 0) {
      fetchEvents();
    }
  }, [selectedType]);

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
        initialRegion={region}
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

      <SafeAreaView style={styles.searchbar}>
        <HeaderSearch/>
      </SafeAreaView>

      <SafeAreaView style={styles.filters}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={
              selectedType.length === 0
                ? { ...styles.filterTag, backgroundColor: colors.darkGreen }
                : styles.filterTag
            }
            onPress={() => handleReset()}
          >
            <Text style={styles.filterText}>Tous</Text>
          </TouchableOpacity>
          {types.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectedType.includes(type.label)
                  ? { ...styles.filterTag, backgroundColor: colors.darkGreen }
                  : styles.filterTag
              }
            >
              <Text
                style={styles.filterText}
                onPress={() => handleEventType(type.label)}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.drawer}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView style={styles.scrollContainer}>
          {allEvents &&
            allEvents
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event) => (
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
    justifyContent: "flex-start",
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

  searchbar: {
    paddingHorizontal:24,
    top: "6%",
    width: "100%",
  },

  filters: {
    top: "8%",
    width: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },

  filterTag: {
    borderWidth: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
    marginStart: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default MapScreen;
