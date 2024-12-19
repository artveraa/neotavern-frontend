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
import colors from "../styleConstants/colors";

const CardEventProfil = ({ event, navigation, handleDeleteEvent }) => {
  const user = useSelector((state) => state.user.value);

  // navigation -> avec route de paramêtres à pousser
  const handleEvent = (event) => {
    navigation.push("Event", {
      event,
    });
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
            <TouchableOpacity style={styles.absoluteTrash} onPress={() => handleDeleteEvent(event._id)}>
                    <FontAwesome
                      name="trash-o"
                      size={20}
                      color={colors.dark}
                    />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <TextApp>{event?.place?.name}</TextApp>
            {event?.place?.name && <Text style={styles.separator}></Text>}
            <TextApp>{event?.name}</TextApp>
            <View style={styles.cardFooter}>
              <View style={styles.likes}>
                <FontAwesome name="heart" size={14} color={colors.dark} />
                <TextApp>{event?.likes}</TextApp>
              </View>
              <Text style={styles.separator2}></Text>
              <TextApp>{formatDate(event?.date)}</TextApp>
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
  separator2: {
    width: 6,
    height: 1,
    backgroundColor: "#F2D2E4",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "relative",
    width: "45%",
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
    gap: 4,
    width: "45%",
  },

  likes: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },


  cardFooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    gap:8,
    width: "100%",
  },
  absoluteTrash:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    width: 40,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    paddingVertical:2,
  }
});

export default CardEventProfil;
