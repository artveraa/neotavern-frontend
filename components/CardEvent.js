import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardEvent = ({ event }) => {
  return (
    <View style={styles.container}>
      <Text>{event?.place?.name}</Text>
      <Text>{event?.name}</Text>
      <Text>{event?.description}</Text>
      <Text>{event?.date}</Text>
      <Text>{event?.likes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardEvent;
