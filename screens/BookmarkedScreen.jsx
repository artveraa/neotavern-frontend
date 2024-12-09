import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BookmarkedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BookmarkedScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookmarkedScreen;
