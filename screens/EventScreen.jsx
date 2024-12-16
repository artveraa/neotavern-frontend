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

const EventScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.value);
  const [region, setRegion] = useState(null);

  // navigation -> get params event
  const { handleLike, event } = route.params;

  // navigation -> back map screen
  const handleBackMap = () => {
    navigation.navigate("TabNavigator", { screen: "MapScreen" });
  };

  //date formatage
  const formatDate = (date) => {
    if (new Date(date).toDateString() === new Date().toDateString()) {
      return "Aujourd'hui";
    }
    const options = {
      // weekday: "long",
      month: "numeric",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const handlePlace = (place) => {
    navigation.navigate("Place", { place });
  };

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
      {/* HERO */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: event?.photo }} style={styles.image} />

        <TouchableOpacity
          style={[styles.backWrap, styles.borderStyle]}
          onPress={() => handleBackMap()}
        >
          <View>
            <Text style={styles.arrow}>&#x2190;</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.likeWrap, styles.borderStyle]}>
          <TouchableOpacity style={styles.likeBtn} onPress={() => handleLike()}>
            <FontAwesome
              name="heart"
              size={18}
              color="#EDA0FF"
              paddingRight={6}
            />
          </TouchableOpacity>
          <TextAppS>{event?.likes}</TextAppS>
        </View>
      </View>

      {/*MAIN infos */}
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={[styles.txtWrap, styles.borderStyle]}>
            <TextAppTitle>{event?.name}</TextAppTitle>
          </View>
          <View style={[styles.dateWrap, styles.borderStyle]}>
            <Image
              source={require("../assets/date.png")}
              style={{ width: 24, height: 24 }}
            />
            <TextAppBold>{formatDate(event?.date)}</TextAppBold>
          </View>
        </View>

        <View style={styles.eventContainer}>
          <TouchableOpacity onPress={() => handlePlace(event?.place)}>
            <TextAppTitle>{event?.place?.name}</TextAppTitle>
          </TouchableOpacity>

          <View>
            <TextAppBold>{event?.hour}</TextAppBold>
            <TextApp></TextApp>
          </View>

          <View style={styles.tagWrap}>
            <TagL>
              <Image
                source={require("../assets/date.png")}
                style={styles.tagIcon}
              />
              {event?.infosTags?.price}
            </TagL>
            {event?.categories?.map((category, index) => (
              <TagL key={index}>
                <Image
                  source={require("../assets/date.png")}
                  style={styles.tagIcon}
                />
                {category}
              </TagL>
            ))}
          </View>
        </View>

        <View style={styles.mapWrap}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            setUserLocationEnabled={true}
            showsUserLocation={true}
            region={{
              latitude: event?.place?.latitude,
              longitude: event?.place?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: event?.place?.latitude,
                longitude: event?.place?.longitude,
              }}
              title={event?.place?.name}
              description={event?.place?.address}
            />
          </MapView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  //image hero
  heroContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backWrap: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",

    top: 48,
    left: 28,
    zIndex: 1,
    width: "12%",
    height: 30,
  },
  arrow: {
    fontFamily: "Lexend_600SemiBold",
    lineHeight: 20,
    fontSize: 20,
  },
  likeWrap: {
    position: "absolute",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.light,

    top: 48,
    right: 28,
    zIndex: 1,
    width: "18.2%",
    height: 30,

    borderRadius: 8,
  },
  //main
  container: {
    flex: 2,
    backgroundColor: colors.light,

    width: "100%",
    paddingLeft: 28,
    paddingRight: 28,
  },
  //->title et date
  titleContainer: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "stretch",
    gap: 12,
    maxWidth: "100%",

    top: "-6%",
  },
  borderStyle: {
    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
  },
  txtWrap: {
    justifyContent: "center",

    padding: 24,
    width: "72%",
    maxWidth: "72%",
  },
  dateWrap: {
    justifyContent: "center",
    alignItems: "center",

    width: "22%",
    padding: 12,
  },
  //tag wrap
  tagWrap: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    paddingTop: 24,
    paddingBottom: 24,
  },
  tagIcon: {
    width: 14,
    height: 14,
  },
  //
  mapWrap: {
    height: 200,
    widht: "100%",

    borderRadius: 15,
    overflow: "hidden",
  },
});

export default EventScreen;
