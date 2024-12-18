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

const HeaderSearch = ({ handleEventDate, onSelectPlace, onSelectEvent, onReset, onClose, allEvents }) => {
  // const [search, setSearch] = useState("");
  const [dateActive, setDateActive] = useState(false);
  const [filterDate, setFilterDate] = useState("Date");

  const [placesList, setPlacesList] = useState([]);
  const [placesResult, setPlacesResult] = useState([]);
  const [eventsResult, setEventsResult] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");

  const [filterDay, setFilterDay] = useState([]);

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
  handleFilterDate = (date) => {
    handleEventDate(date);
    setDateActive(!dateActive);
    setFilterDate(date);
    if (filterDate === date) {
      setFilterDate("Date");
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

        <View>
          <TextApp>
            {filterDate != `Date` && (
              <FontAwesome name="refresh" size={18} color="#D9D9D9" />
            )}
          </TextApp>
        </View>

        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.btnDate} onPress={() => handleDate()}>
          <TextApp>{filterDate}</TextApp>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollSearch}>
        {placesResult.length > 0 && (
          <View style={styles.resultsList}>
            <TextAppBold>Etablissements:</TextAppBold>
            {placesResult.map((place) => (
              <View style={styles.etablissement} key={place._id}>
                <TouchableOpacity onPress={() => chooseResult(place.place.name, place.place._id)}  >  
                <TextApp
                  style={styles.resultItem}
                >
                  
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
                <TouchableOpacity onPress={() => chooseEvent(event.name, event._id)}>
                <TextApp
                  style={styles.resultItem}
                >
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
            style={styles.tagBorder}
            onPress={() => handleFilterDate(`Aujourd'hui`)}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />
            <TextAppS>Aujourd'hui</TextAppS>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tagBorder}
            onPress={() => handleFilterDate("Semaine")}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />
            <TextAppS>Semaine</TextAppS>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tagBorder}
            onPress={() => handleFilterDate(`Week-end`)}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />

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
    maxHeight: 300,
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
    alignItems: "center",
    gap: 4,

    paddingVertical: 16,
    paddingHorizontal: 12,

    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
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
    paddingBottom: 8
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
