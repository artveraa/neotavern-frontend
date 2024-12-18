import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import colors from "../styleConstants/colors";
import TextApp from "../styleComponents/TextApp";
import TagL from "../styleComponents/TagL";
import TextAppS from "../styleComponents/TextAppS";
import TextAppBold from "../styleComponents/TextAppBold";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const HeaderSearch = ({ onSelectPlace, onReset, onFilterDate }) => {
  // const [search, setSearch] = useState("");
  const [dateActive, setDateActive] = useState(false);
  const [placesList, setPlacesList] = useState([]);
  const [placesResult, setPlacesResult] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch("https://neotavern-backend.vercel.app/places/allPlaces")
      .then((response) => response.json())
      .then((data) => {
        setPlacesList(data.data);
      });
  }, []);

  const handleSearch = (text) => {
    setPlaceSearch(text);

    if (text === "") {
      setPlacesResult([]);
      return;
    }

    const filteredPlaces = placesList.filter((place) => {
      return place.name.toLowerCase().includes(text.toLowerCase());
    });

    setPlacesResult(filteredPlaces);
  };

  const chooseResult = (placeName, placeId) => {
    setPlaceSearch(placeName);
    setPlacesResult([]);
    onSelectPlace(placeId);
  };

  // reset la recherche d'établissement sur mapscreen
  const handleDelete = () => {
    onReset();
    setPlaceSearch("");
  };

  //
  const handleFilterDate = (date) => {
    if (selectedDate === date) {
      setSelectedDate(null);
      onFilterDate(null);
    } else {
      setSelectedDate(date);
      onFilterDate(date);
    }
  };

  return (
    <View style={styles.borderStyle}>
      <View style={styles.contentSearch}>
        {/* <View style={styles.wrap}>
          <FontAwesome name="search" size={24} color="#EDA0FF" />
          <TextInput
            placeholder="Quoi de prévu par ici ?"
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
        </View> */}

        <View style={styles.wrap}>
          <FontAwesome name="search" size={24} color="#EDA0FF" />
          <TextInput
            placeholder="Rechercher un établissement"
            value={placeSearch}
            onChangeText={handleSearch}
          />
          {placesResult.length > 0 && (
            <View style={styles.resultsList}>
              {placesResult.map((place) => (
                <Text
                  style={styles.resultItem}
                  onPress={() => chooseResult(place.name, place._id)}
                  key={place._id}
                >
                  {place.name}
                </Text>
              ))}
            </View>
          )}
          <View style={styles.searchResult}></View>
        </View>
        {!placeSearch ? (
          <></>
        ) : (
          <FontAwesome
            name="close"
            size={20}
            color="#EDA0FF"
            onPress={() => handleDelete()}
          />
        )}

        <View style={styles.separator}></View>

        <TouchableOpacity
          style={styles.btnDate}
          onPress={() => setDateActive(!dateActive)}
        >
          <TextApp>Date</TextApp>
        </TouchableOpacity>
      </View>

      {dateActive && (
        <View style={styles.tagWrap}>
          <TouchableOpacity
            style={[
              styles.tagBorder,
              selectedDate === "today" && styles.activeDateFilter,
            ]}
            onPress={() => handleFilterDate("today")}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />
            {selectedDate === "today" && (
              <View style={styles.checkIconWrapper}>
                <FontAwesome
                  name="check"
                  style={styles.checkIcon}
                  size={15}
                  color="#F5F5F5"
                />
              </View>
            )}
            <TextAppS>Aujourd'hui</TextAppS>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tagBorder,
              selectedDate === "week" && styles.activeDateFilter,
            ]}
            onPress={() => handleFilterDate("week")}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />
            {selectedDate === "week" && (
              <View style={styles.checkIconWrapper}>
                <FontAwesome
                  name="check"
                  style={styles.checkIcon}
                  size={15}
                  color="#F5F5F5"
                />
              </View>
            )}
            <TextAppS>Semaine</TextAppS>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tagBorder,
              selectedDate === "weekend" && styles.activeDateFilter,
            ]}
            onPress={() => handleFilterDate("weekend")}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />
            {selectedDate === "weekend" && (
              <View style={styles.checkIconWrapper}>
                <FontAwesome
                  name="check"
                  style={styles.checkIcon}
                  size={15}
                  color="#F5F5F5"
                />
              </View>
            )}
            <TextAppS>Week-end</TextAppS>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyle: {
    backgroundColor: colors.light,
    borderColor: colors.dark,

    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
  },
  contentSearch: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,

    paddingHorizontal: 12,
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
  },
  separator: {
    height: 28,
    width: 1,

    paddingVertical: 12,
    backgroundColor: colors.dark,
  },
  tagWrap: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    gap: 12,
    paddingTop: 0,
    paddingBottom: 20,
  },
  tagBorder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    aspectRatio: 1,

    paddingVertical: 16,
    paddingHorizontal: 12,

    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
  },

  activeDateFilter: {
    borderColor: "#EDA0FF",
  },

  checkIconWrapper: {
    backgroundColor: "#EDA0FF",
    borderRadius: "100%",
    width: 20,
    height: 20,
    position: "absolute",
    right: -5,
    top: -5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderSearch;
