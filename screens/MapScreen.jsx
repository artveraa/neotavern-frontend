import React, { useRef, useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { ActivityIndicator } from "react-native";

import CardEvent from "../components/CardEvent";
import HeaderSearch from "../components/SearchHeader";
import TextApp from "../styleComponents/TextApp";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";

import { getAllEvents, getLikedEvents, likeAnEvent } from "../fetchers/events"; // Importation des fonctions fetchers
import colors from "../styleConstants/colors"; // Importation des couleurs

const MapScreen = ({ navigation }) => {
  const [likedEvents, setLikedEvents] = useState([]);
  const [region, setRegion] = useState(null);
  const [allEvents, setAllEvents] = useState(null);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [loading, setLoading] = useState(false);

  const bottomSheetRef = useRef(null);

  const user = useSelector((state) => state.user.value);
  const token = user.user.token;

  // Liste des types d'événements
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

  const snapPoints = ["20%", "68%"]; // Tailles du drawer

  // Ouvrir et fermer le panneau des résultats

  const openPanel = () => {
    bottomSheetRef.current?.expand();
  };

  const closePanel = () => {
    bottomSheetRef.current?.collapse();
  };

  // Gestion du double clic sur un marker

  const handleMarkerPress = (event) => {
    if (selectedMarkerId === event._id) {
      // Si le même marker est cliqué à nouveau, redirige vers la page de détails
      navigation.navigate("Event", { event });
      setSelectedMarkerId(null); // Réinitialise l'état après la redirection
    } else {
      // Sinon, enregistre l'ID du marker sélectionné pour le premier clic
      setSelectedMarkerId(event._id);
    }
  };

  // Récupérer la position de l'utilisateur et demander la permission d'accès à la localisation
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

  // Récupérer tous les événements

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const events = await getAllEvents();
      setAllEvents(events);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les événements likés par l'utilisateur

  const fetchLikedEvents = async () => {
    try {
      const response = await getLikedEvents(token);
      setLikedEvents(response.likedEvents.map((event) => event._id));
    } catch (error) {
      console.error(error);
    }
  };

  // Liker un événement

  const handleLike = async (eventId) => {
    try {
      await likeAnEvent(token, eventId);
      fetchEvents();
      fetchLikedEvents();
    } catch (error) {
      console.error(error);
    }
  };

  // Date filter

  const handleEventDate = async (dateFilter) => {
    try {
      if (!dateFilter) {
        // Si le filtre est désactivé, réafficher tous les événements
        await fetchEvents();
        return;
      }

      // Récupérer tous les événements pour appliquer le filtre
      const events = await getAllEvents();

      const now = new Date();
      let filteredEvents = [];

      if (dateFilter === "today") {
        filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === now.toDateString();
        });
      } else if (dateFilter === "week") {
        const weekEndDate = new Date();
        weekEndDate.setDate(now.getDate() + (7 - now.getDay()));

        filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= now && eventDate <= weekEndDate;
        });
      } else if (dateFilter === "weekend") {
        const weekendStart = new Date();
        const weekendEnd = new Date();
        weekendStart.setDate(now.getDate() + (6 - now.getDay()));
        weekendEnd.setDate(now.getDate() + (7 - now.getDay()));

        filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.toDateString() === weekendStart.toDateString() ||
            eventDate.toDateString() === weekendEnd.toDateString()
          );
        });
      }

      setAllEvents(filteredEvents);
      openPanel(); // Ouvre le panneau des résultats après le filtrage
    } catch (error) {
      console.error("Erreur lors du filtrage des événements :", error);
    }
  };

  // Filtrer par type d'événement

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

  // Reset des filtres

  const handleReset = () => {
    setSelectedType([]);
    fetchEvents();
    openPanel();
  };

  // Nettoyer les filtres

  const handleClean = () => {
    setSelectedType([]);
    fetchEvents();
  };

  // Selection de l'établissement dans la barre de recherche (récuperation de l'ID)

  const handleSelectPlace = (placeId) => {
    const filteredEvents = [...allEvents].filter(
      (event) => event.place._id === placeId
    );
    setAllEvents(filteredEvents);
  };

  // Selection de l'evenement dans la barre de recherche (récuperation de l'ID)

  const handleSelectEvent = (eventId) => {
    const filteredEvents = [...allEvents].filter(
      (event) => event._id === eventId
    );
    setAllEvents(filteredEvents);
  };

  // useEffect pour réinitialiser la liste d'événements si aucun type n'est sélectionné

  useEffect(() => {
    if (selectedType.length === 0) {
      fetchEvents();
    }
  }, [selectedType]); // le useEffect s'exécute à chaque changement de selectedType

  // useFocusEffect pour charger les événements lors de la navigation sur l'écran

  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // Récupérer tous les événements
      fetchLikedEvents(); // Récupérer les événements likés par l'utilisateur
      openPanel(); // Ouvrir le panneau des résultats
    }, [])
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* 
        Affichage de la carte avec les marqueurs des événements
        Si aucun événement n'est chargé, afficher un message de chargement
       */}
      {region ? (
        <MapView
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {allEvents &&
            allEvents.map((event) => (
              <Marker
                key={event._id}
                coordinate={{
                  latitude: event.place.latitude,
                  longitude: event.place.longitude,
                }}
                image={require("../assets/placeholder.png")}
                title={event.name}
                description={event.place.name}
                color={colors.darkGreen}
                onPress={() => handleMarkerPress(event)}
              />
            ))}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <TextApp>Chargement de la carte...</TextApp>
        </View>
      )}

      {/* Module de recherche */}

      <SafeAreaView style={styles.searchbar}>
        <HeaderSearch
          onSelectPlace={handleSelectPlace}
          onSelectEvent={handleSelectEvent}
          onReset={handleClean}
          handleEventDate={handleEventDate}
          onClose={closePanel}
          allEvents={allEvents}
          onFilterDate={handleEventDate}
        />
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
      {/*
        Affichage des événements dans un drawer
        Si aucun événement n'est chargé, afficher un message d'erreur
        */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.drawer}
        enableDynamicSizing={false}
        handleIndicatorStyle={{ backgroundColor: colors.dark }}
        handleStyle={{ backgroundColor: colors.light }}
      >
        <BottomSheetScrollView style={styles.scrollContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.dark} />
            </View>
          ) : allEvents && allEvents.length > 0 ? (
            allEvents
              .filter((event) => new Date(event.date) >= new Date().getDate()) // Filtre les événements passés
              .sort((a, b) => new Date(a.date) - new Date(b.date)) // Trie les événements par date
              .map((event) => (
                <CardEvent
                  key={event._id}
                  event={event}
                  navigation={navigation}
                  handleLike={handleLike}
                  isLiked={likedEvents.includes(event._id)}
                />
              ))
          ) : (
            <View style={styles.noEvents}>
              <TextApp>Aucun événement trouvé</TextApp>
            </View>
          )}
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

  drawer: {},

  scrollContainer: {
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: colors.light,
  },

  searchbar: {
    position: "relative",
    top: "6%",
    width: "100%",
    padding: 10,
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

  noEvents: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
