import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('')}>
        <Text>Go to Map</Text>
      </TouchableOpacity>
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

export default HomeScreen;
