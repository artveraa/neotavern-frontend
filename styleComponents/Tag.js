import React from "react";
import { View, Text,  StyleSheet, } from "react-native";
import colors from "../styleConstants/colors";

const Tag= ({children}) => {
    return (
        <View>
          <Text style={styles.tagBorder}>{children}</Text>
        </View>
    );
  };
  const styles = StyleSheet.create({
    tagBorder:{
        paddingLeft:24,
        paddingRight:24,
        width:'100%',
    
        backgroundColor:colors.light,
        borderColor:colors.dark,
        borderWidth:1,
        borderRadius:15,
      },
  })

export default Tag

