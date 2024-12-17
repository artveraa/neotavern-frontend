import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import colors from "../styleConstants/colors";

const TagL = ({ children }) => {
  return (
    <View style={styles.tagWrap}>
      <Text style={styles.tagBorder}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagBorder: {
    paddingVertical: 12,
    paddingHorizontal: 24,

    width: "100%",

    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
  },
});

export default TagL;
