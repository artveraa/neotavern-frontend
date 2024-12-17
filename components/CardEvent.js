import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import TextApp from "../styleComponents/TextApp";

const CardEvent = ({
  event,
  navigation,
  handleLike,
  isLiked,
  inBookmarkedScreen,
}) => {
  const user = useSelector((state) => state.user.value);

  // navigation -> avec route de paramêtres à pousser
  const handleEvent = (event) => {
    navigation.push("Event", {
      event,
    });
  };

  // LIKED
  const handleClick = async () => {
    handleLike(event._id);
  };

  // DATE FORMATAGE
  const formatDate = (date) => {
    if (new Date(date).toDateString() === new Date().toDateString()) {
      return "Aujourd'hui";
    }
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleEvent(event)}>
        <View style={styles.card}>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={{ uri: event?.photo }} />
            <TouchableOpacity
              style={styles.likeBtn}
              onPress={() => handleClick()}
            >
              <FontAwesome
                name="heart"
                size={15}
                color={isLiked || inBookmarkedScreen ? "red" : "#EDA0FF"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <TextApp>{event?.place?.name}</TextApp>
            {event?.place?.name && <Text style={styles.separator}></Text>}
            <TextApp>{event?.name}</TextApp>
            <View style={styles.cardFooter}>
              <View style={styles.likes}>
                <FontAwesome name="heart" size={14} />
                <Text>{event?.likes}</Text>
              </View>
              <Text>{formatDate(event?.date)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 20,
  },

  separator: {
    width: 46,
    height: 1,
    backgroundColor: "#F2D2E4",
  },

  imgContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "relative",
    width: 160,
    height: 107,
    borderRadius: 15,
    overflow: "hidden",
  },

  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  textContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 5,
    width: 180,
  },

  likes: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  likeBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    width: 40,
    aspectRatio: 2 / 1,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },

  cardFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default CardEvent;
