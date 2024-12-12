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

import TagL from "../styleComponents/TagL";
import TextAppTitle from "../styleComponents/TextAppTitle";
import TextAppBold from "../styleComponents/TextAppBold";
import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";

const EventScreen = ({route}) => {
  // navigation -> get param
  const { event } = route.params;
  console.log('param',event)

  const user = useSelector((state) => state.user.value);
  //map localisation user pour le moment
  const [region, setRegion] = useState(null);

  //map
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/default.jpg")} style={styles.image}/>

        <Image source={require("../assets/badge.png")} style={styles.badgeIcon}/>
        <View style={styles.likeWrap}>

        </View>
        <Image source={require("../assets/badge.png")} style={styles.badgeIcon}/>
      </View>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={[styles.txtWrap, styles.borderStyle]}>
            <TextAppTitle>{event?.name}</TextAppTitle>
          </View>
          <View style={[styles.dateWrap, styles.borderStyle]}>
            <Image source={require("../assets/date.png")} style={{width:24,height:24}}/>
            <TextAppBold>Date</TextAppBold>
          </View>
        </View>
        
        <View style={styles.eventContainer}>
          <TouchableOpacity>
            <TextAppTitle>Event-Place</TextAppTitle>
          </TouchableOpacity>

          <View >
            <TextApp>Heure -Event</TextApp>
            <TextApp>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi. Maxime mollitia, molestiae.</TextApp>
          </View>

          <View style={styles.tagWrap}>
            <TagL>
              <Image source={require("../assets/date.png")} style={styles.tagIcon}/>
                Free
            </TagL>
            <TagL>
              <Image source={require("../assets/date.png")} style={styles.tagIcon}/>
                Style event
            </TagL>
          </View>
        </View>

        <View style={styles.mapWrap}>
            <MapView
            style={StyleSheet.absoluteFillObject}
            setUserLocationEnabled={true}
            showsUserLocation={true}
            region={region}
            >
            <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title={"Marker Title"}
              description={"Marker Description"}
            />
      </MapView>
        </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  //image hero
imageContainer:{
  flex: 1,
},
image:{
  width:'100%',
  height:'100%',
},
badgeIcon:{
  position:'absolute',

  top:28,
  right:28,
  zIndex:12,
  width:62,
  height:62,
},
likeWrap:{
  position:'absolute',
  backgroundColor:colors.light,
  top:48,
  left:28,
  zIndex:12,
  width:62,
  height:24,
},
  //main
container: {
  flex: 2,
  backgroundColor: colors.light,

  width: "100%",
  paddingLeft:28,
  paddingRight:28,
},
  //->title et date
  titleContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  borderStyle:{
    paddingLeft:24,
    paddingRight:24,

    backgroundColor:colors.light,
    borderColor:colors.dark,
    borderWidth:1,
    borderRadius:15,
  },
  txtWrap:{
    top:-26,
    paddingTop:14,
    paddingBottom:14,
  },
  dateWrap:{
    alignItems:'center',
    top:-26,
    paddingTop:2,
    paddingBottom:4,
  },
  //tag wrap
  tagWrap:{
    flexDirection:'row',
    gap:12,

    paddingTop:24,
    paddingBottom:24,
  },
  tagIcon:{
    width:14,
    height:14,
  },
  //
  mapWrap:{
    height:200,
    widht:'100%',

    borderRadius:15,
    overflow:'hidden',
  }
});

export default EventScreen;
