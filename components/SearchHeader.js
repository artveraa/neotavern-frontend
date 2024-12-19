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
  ScrollView,
} from "react-native";
import colors from "../styleConstants/colors";
import TextApp from "../styleComponents/TextApp";
import TagL from "../styleComponents/TagL";
import TextAppS from "../styleComponents/TextAppS";
import TextAppBold from "../styleComponents/TextAppBold";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const HeaderSearch = ({
  handleEventDate,
  onSelectPlace,
  onSelectEvent,
  onReset,
  onClose,
  allEvents,
  onFilterDate,
}) => {
  // const [search, setSearch] = useState("");
  const [dateActive, setDateActive] = useState(false);
  const [placesList, setPlacesList] = useState([]);
  const [placesResult, setPlacesResult] = useState([]);
  const [eventsResult, setEventsResult] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setPlacesList(allEvents);
  }, [allEvents]);

  const handleSearch = (text) => {
    setPlaceSearch(text);

    if (text === "") {
      setPlacesResult([]);
      setEventsResult([]);
      onReset();
      return;
    }

    const filteredPlaces = allEvents.filter((place) => {
      return place.place.name.toLowerCase().includes(text.toLowerCase());
    });

    setPlacesResult(filteredPlaces);

    const filteredEvents = allEvents.filter((event) => {
      return event.name.toLowerCase().includes(text.toLowerCase());
    });

    setEventsResult(filteredEvents);
  };

  const chooseResult = (placeName, placeId) => {
    setPlaceSearch(placeName);
    setPlacesResult([]);
    setEventsResult([]);
    onSelectPlace(placeId);
  };

  const chooseEvent = (eventName, eventId) => {
    setPlaceSearch(eventName);
    setEventsResult([]);
    setPlacesResult([]);
    onSelectEvent(eventId);
  };

  const handleDate = () => {
    setDateActive(!dateActive);
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

  const searchPlace = () => {
    onClose();
  };

  return (
    <View style={styles.borderStyle}>
      <View style={styles.contentSearch}>
        <View style={styles.searchSection}>
          <FontAwesome name="search" size={24} color="#EDA0FF" />
          <TextInput
            placeholder="Quoi de neuf aujourd'hui ?"
            style={styles.input}
            value={placeSearch}
            onChangeText={handleSearch}
            onPress={() => searchPlace()}
          />
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

      <ScrollView style={styles.scrollSearch}>
        {placesResult.length > 0 && (
          <View style={styles.resultsList}>
            <TextAppBold>Etablissements:</TextAppBold>
            {placesResult.map((place) => (
              <View style={styles.etablissement} key={place._id}>
                <TouchableOpacity
                  onPress={() =>
                    chooseResult(place.place.name, place.place._id)
                  }
                >
                  <TextApp style={styles.resultItem}>
                    <FontAwesome
                      name="map-marker"
                      size={20}
                      color={colors.purple}
                      onPress={() => handleDelete()}
                    />
                    {"  "}
                    {place.place.name}
                  </TextApp>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {eventsResult.length > 0 && (
          <View style={styles.resultsList}>
            <TextAppBold>Evenements:</TextAppBold>
            {eventsResult.map((event) => (
              <View style={styles.etablissement} key={event._id}>
                <TouchableOpacity
                  onPress={() => chooseEvent(event.name, event._id)}
                >
                  <TextApp style={styles.resultItem}>
                    <FontAwesome
                      name="ticket"
                      size={20}
                      color={colors.blue}
                      onPress={() => handleDelete()}
                    />
                    {"  "}
                    {event.name}
                  </TextApp>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

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
    borderWidth: 1,
    borderRadius: 15,
    maxHeight: 300,
    marginHorizontal: 10,
  },
  contentSearch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    width: "100%",
    // marginHorizontal: 12,
    // backgroundColor: "red",
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
  resultsList: {
    width: "100%",
    padding: 10,
    borderColor: "#333",
    backgroundColor: colors.light,
    borderRadius: 15,
  },
  resultItem: {
    padding: 10,
  },
  scrollSearch: {
    borderRadius: 15,
  },
  etablissement: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
  },
  input: {
    width: "100%",
  },
});

export default HeaderSearch;
