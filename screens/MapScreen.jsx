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
import colors from "../styleConstants/colors";

const MapScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const token = user.user.token;

  console.log('IIIIIIIIIIIIIIIIIIIIuser',user)

  //LIKE
  const [postLiked, setPostLiked] = useState(null);

  const bottomSheetRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [allEvents, setAllEvents] = useState(null);
  const [selectedType, setSelectedType] = useState([]);

  // tableau brut de type d'événement
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
    { label: "Autre" },
  ];

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
          
          setPostLiked(data)
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
      <View style={styles.categories}>
          <View style={styles.tags}>
            {types.map((type, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleType(type.label)}
                style={
                  selectedType.includes(type.label)
                    ? [styles.tagItem, styles.selectedTag]
                    : styles.tagItem
                }
              >
                <Text>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
      </View>
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
  categories: {
    width: "100%",
    borderBottomWidth: 1,
    marginBottom: 20,
    color: colors.purple,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
});

export default MapScreen;
