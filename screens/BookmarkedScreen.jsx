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
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainTitle}>Mes évènements</Text>
        <ScrollView style={styles.scrollWrapper}>
          <View style={styles.likedContainer}>
            <TextApp>Vos évènements préférés à venir :</TextApp>
            {likedEvents &&
              likedEvents
                // .filter((event) => new Date(event.date) > new Date())
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    color: colors.dark,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  //main
  mainTitle: {
    fontSize: 18,
    fontFamily: "Lexend_500Medium",
    paddingTop: 60,
    paddingBottom: 20,
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.dark,
    color: colors.dark,
  },

  scrollWrapper: {
    marginVertical: 24,
    width: "100%",
    paddingRight: 28,
    paddingLeft: 28,
  },

  // card
  likedContainer: {
    borderRadius: 15,
    width: "100%",

    alignItems: "center",
    borderWidth: 0.3,
    borderColor: colors.dark,

    padding: 12,
  },
});

export default BookmarkedScreen;
