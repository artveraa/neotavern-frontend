import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CardEvent = ({ event }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../assets/default.jpg")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>{event?.place?.name}</Text>
          <Text style={styles.separator}></Text>
          <Text>{event?.name}</Text>
          <Text>{event?.likes}</Text>
          <Text>{event?.date}</Text>
        </View>
      </View>
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
    marginTop: 10,
    gap: 20,
  },

  separator: {
    width: 46,
    height: 1,
  },

  imgContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
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
  },
});

export default CardEvent;
