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
  ScrollView
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
  onReset,
  onClose
}) => {
  // const [search, setSearch] = useState("");
  const [dateActive, setDateActive] = useState(false);
  const [filterDate, setFilterDate] = useState("Date");

  const [placesList, setPlacesList] = useState([]);
  const [placesResult, setPlacesResult] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");

  const [filterDay, setFilterDay] = useState([]);
  const [searchArea, setSearchArea] = useState(false)


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

  const handleDate = () => {
    setDateActive(!dateActive);
  };

  // reset la recherche d'établissement sur mapscreen
  const handleDelete = () => {
    onReset();
    setPlaceSearch("");
  };

  //
  handleFilterDate = (date) =>{
    handleEventDate(date)
    setDateActive(!dateActive);
    setFilterDate(date);
    if(filterDate === date){
    
      setFilterDate('Date');
    }
  }

  const searchPlace = () => {
    onClose()
  }
  
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
          <View style={styles.searchSection}>
            <FontAwesome name="search" size={24} color="#EDA0FF" />
            <TextInput
              placeholder="Rechercher un établissement"
              style={styles.input}
              value={placeSearch}
              onChangeText={handleSearch}
              onPress={ () => searchPlace()}
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
          {placesResult.map((place) => (
           <View style={styles.etablissement}>
            <Text
            style={styles.resultItem}
            onPress={() => chooseResult(place.name, place._id)}
            key={place._id}
            >
           <FontAwesome
            name="map-marker"
            size={20}
            color="#EDA0FF"
            onPress={() => handleDelete()}
            />
              {'  '}{place.name}
            </Text>
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
            onPress={() => handleFilterDate('Semaine')}
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
    borderRadius: 15
  },
  etablissement: {
  },
  searchSection: {
    flexDirection: "row",
    alignItems: 'center',
    width: "65%",
  },
  input: {
    width: "100%",
  },
});

export default HeaderSearch;
