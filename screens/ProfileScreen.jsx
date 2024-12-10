import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
 
  return (
    <View style={styles.container}>
      <Text style={{
    fontFamily: 'Lexend_900Black', fontSize: 14,
  }}>ProfileScreen</Text>
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

export default ProfileScreen;
