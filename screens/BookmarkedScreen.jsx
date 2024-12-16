import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import CardEvent from "../components/CardEvent";

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

const BookmarkedScreen = ({navigation, handleLike}) => {
  const user = useSelector((state) => state.user.value); 
  const name = user.user.nickname
  const likedEvents = user.user.likedEvents

  const [likedEvent, setLikedEvent] = useState ([])
  console.log('liked==============>',likedEvents)
  console.log('liked====usestate==>',likedEvent)



  //useFOCUS
  useFocusEffect(
    useCallback(() => {
      
      setLikedEvent(likedEvents)
    }, [])
  );


  

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
        {likedEvent &&
          likedEvent.map((event) => (
            <CardEvent
            key={event._id}
            event={event}
            handleLike={handleLike}
            navigation={navigation}
            />
          ))}
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
  fontSize:24,
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

  width:'100%',
  
  paddingRight:12,
  paddingLeft:12,
    
},
// card
  likedContainer:{
    backgroundColor:'white',
    borderRadius: 15,
    width:'100%',

    overflow:'hidden',

    marginTop:24,
    padding:12,
}
});

export default BookmarkedScreen;
