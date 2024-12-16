import TextAppS from "../styleComponents/TextAppS";
import TagL from "../styleComponents/TagL";
import TextAppTitle from "../styleComponents/TextAppTitle";
import TextAppBold from "../styleComponents/TextAppBold";
import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";

import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const PlaceScreen = ({ route, navigation }) => {
  const { place } = route.params;

  console.log(place);

  const handleBackMap = () => {
    navigation.navigate("TabNavigator", { screen: "MapScreen" });
  };

  const formatDate = (dateString) => {
    const days = {
      Mo: "Lundi",
      Tu: "Mardi",
      We: "Mercredi",
      Th: "Jeudi",
      Fr: "Vendredi",
      Sa: "Samedi",
      Su: "Dimanche",
    };

    return dateString
      .split(";")
      .map((item) =>
        item.replace(/Mo|Tu|We|Th|Fr|Sa|Su/g, (matched) => days[matched])
      )
      .join("\n");
  };

  return (
    <>
      {/* HERO */}
      <View style={styles.heroContainer}>
        <Image source={require("../assets/default.jpg")} style={styles.image} />

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
          <TextAppS>{place?.likes}</TextAppS>
        </View>
      </View>

      {/*MAIN infos */}
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={[styles.txtWrap, styles.borderStyle]}>
            <TextAppTitle>{place?.name}</TextAppTitle>
          </View>
          <View style={[styles.dateWrap, styles.borderStyle]}>
            <FontAwesome
              name="external-link"
              size={24}
              color={colors.dark}
              onPress={() => {
                place?.website && Linking.openURL(place?.website);
              }}
            />
            {/* <TextAppBold>{formatDate(place?.date)}</TextAppBold> */}
          </View>
        </View>

        <View style={styles.placeContainer}>
          <TouchableOpacity onPress={() => handlePlace(place?.place)}>
            <TextAppTitle>{place?.place?.name}</TextAppTitle>
          </TouchableOpacity>

          <View>
            <TextAppBold>{place?.hour}</TextAppBold>
            <TextApp></TextApp>
          </View>

          <View style={styles.tagWrap}>
            <TagL>
              <Image
                source={require("../assets/clock.png")}
                style={styles.tagIcon}
              />
              <Text>{formatDate(place?.date)}</Text>
            </TagL>
            {place?.categories?.map((category, index) => (
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
              latitude: place?.latitude,
              longitude: place?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: place?.latitude,
                longitude: place?.longitude,
              }}
              title={place?.name}
              description={place?.address}
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

export default PlaceScreen;
