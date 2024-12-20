import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";

import { useSelector } from "react-redux";
import CardEvent from "../components/CardEvent";

import { getLikedEvents, likeAnEvent } from "../fetchers/events";

import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";

const BookmarkedScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const token = user.user.token;

  const [likedEvents, setLikedEvents] = useState();
  const [loading, setLoading] = useState(false);

  //useFOCUS -> je get mes evenements likés, je les set dans un tableau
  useFocusEffect(
    useCallback(() => {
      fetchLikedEvents();
    }, [])
  );

  const fetchLikedEvents = async () => {
    setLoading(true);
    try {
      const response = await getLikedEvents(token);
      setLikedEvents(response.likedEvents.map((event) => event));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            {loading ? (
              <View>
                <ActivityIndicator size="large" color={colors.dark} />
              </View>
            ) : (
              likedEvents &&
              likedEvents
                .filter((event) => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return eventDate >= today;
                })
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event) => (
                  <CardEvent
                    key={event._id}
                    event={event}
                    navigation={navigation}
                    handleLike={handleLike}
                    isLiked={true}
                  />
                ))
            )}
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
