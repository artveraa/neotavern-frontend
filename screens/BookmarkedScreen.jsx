import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import CardEvent from "../components/CardEvent";

import { getLikedEvents, likeAnEvent } from "../fetchers/events";

import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import TextAppS from "../styleComponents/TextAppS";
import TagL from "../styleComponents/TagL";
import TextAppTitle from "../styleComponents/TextAppTitle";
import TextAppBold from "../styleComponents/TextAppBold";
import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";

const BookmarkedScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const name = user.user.nickname;
  const id = user.user.id;
  const token = user.user.token;
  // const likedEvents = user.user.likedEvents

  const [likedEvents, setLikedEvents] = useState();

  //useFOCUS -> je get mes evenements likés, je les set dans un tableau
  useFocusEffect(
    useCallback(() => {
      fetchLikedEvents();
    }, [])
  );

  const fetchLikedEvents = async () => {
    try {
      const response = await getLikedEvents(token);
      setLikedEvents(response.likedEvents.map((event) => event));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (eventId) => {
    try {
      await likeAnEvent(token, eventId);
      fetchLikedEvents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.heroContainer}>
        <View style={[styles.heroWrap, styles.borderStyle]}>
          <Text style={styles.heroContent}>Bienvenue, {name}&nbsp;!</Text>
        </View>
      </View>

      <View style={styles.container}>
        <TextAppTitle>Mes évènements</TextAppTitle>
        <ScrollView style={styles.likedContainer}>
          {likedEvents &&
            likedEvents
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event) => (
                <CardEvent
                  key={event._id}
                  event={event}
                  navigation={navigation}
                  handleLike={handleLike}
                  isLiked={true}
                />
              ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  //image hero
  heroContainer: {
    flex: 1,
    padding: 28,
  },
  heroWrap: {
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: "100%",
  },
  heroContent: {
    padding: 28,
    fontFamily: "Lexend_300Light",
    color: colors.dark,
    fontSize: 24,
  },
  borderStyle: {
    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
  },
  //main
  container: {
    flex: 4,
    alignItems: "center",
    backgroundColor: colors.ligth,

    width: "100%",

    paddingRight: 12,
    paddingLeft: 12,
  },
  // card
  likedContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "100%",
    height: "100%",

    marginTop: 24,
    padding: 12,
  },
});

export default BookmarkedScreen;
