import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import TextAppS from "../styleComponents/TextAppS";
import TagL from "../styleComponents/TagL";
import TextAppTitle from "../styleComponents/TextAppTitle";
import TextAppBold from "../styleComponents/TextAppBold";
import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";
import CardEvent from "../components/CardEvent";

const BookmarkedScreen = () => {
  const user = useSelector((state) => state.user.value); 
  const name = user.user.nickname
  const likedEvents = user.user.likedEvents

  console.log('------------------>USER',user.user.likedEvents)
  
  

  return (
    <>
    <View style={styles.heroContainer}>
      <View style={[styles.heroWrap, styles.borderStyle]}>
        <Text style={styles.heroContent}>Bienvenue, {name}&nbsp;!</Text>
      </View>
    </View>
    
    <View style={styles.container}>
      <TextAppTitle>Mes évènements</TextAppTitle>

      <View style={styles.likedContainer}>
      {likedEvents &&
      likedEvents.map((event)=>{
        <CardEvent
        key={event._id}
        event={event}
        handleLike={handleLike}
        navigation={navigation}
      />
      })
      }
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  //image hero
heroContainer:{
  flex: 1,
  padding:28,
},
heroWrap:{
  alignItems:'center',
  justifyContent:'center',

  width:'100%',
  height:'100%',
},
heroContent:{
  padding:28,
  fontFamily:'Lexend_300Light',
  color:colors.dark,
  fontSize:30,
},
borderStyle:{
  backgroundColor:colors.light,
  borderColor:colors.dark,
  borderWidth:1,
  borderRadius:15,
},
  //main
container: {
  flex: 4,
  alignItems:'center',
  backgroundColor: colors.ligth,
  
  width: "100%",
  height:'100%',
  
  paddingLeft:28,
  paddingRight:28,
},
// card
  likedContainer:{
}
});

export default BookmarkedScreen;
