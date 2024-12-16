import React, {useState} from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  const [dateActive, setDateActive] = useState(false);

  const handleDate = () => {
    setDateActive(!dateActive);
  };

  const formatDate = (date) => {
    if (new Date(date).toDateString() === new Date().toDateString()) {
      return "Aujourd'hui";
    }
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  return (
      <View style={styles.borderStyle}>

        <View  style={styles.contentSearch}>
        <View style={styles.wrap}>
          <FontAwesome name="search" size={24} color="#EDA0FF" />
          <TextInput
            placeholder="Quoi de prévu par ici ?"
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
        </View>

        <View style={styles.separator}></View>
        
        <TouchableOpacity style={styles.btnDate} onPress={() => handleDate()}>
          <TextApp>Date</TextApp>
        </TouchableOpacity>
        </View>

        {dateActive &&
        <View style={styles.dateFilter}>
          
        <TouchableOpacity style={[styles.btnFilter, styles.borderStyle]} onPress={() => handleDate()}>
        <FontAwesome name="search" size={24} color="#EDA0FF" />

        <TextApp>Aujourd'hui</TextApp>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnFilter, styles.borderStyle]} onPress={() => handleDate()}>
        <FontAwesome name="search" size={24} color="#EDA0FF" />

        <TextApp>Semaine</TextApp>
        </TouchableOpacity>        
        
        <TouchableOpacity style={[styles.btnFilter, styles.borderStyle]} onPress={() => handleDate()}>
        <FontAwesome name="search" size={24} color="#EDA0FF" />

        <TextApp>Week-end</TextApp>
        </TouchableOpacity>
        </View>
        }
      </View>
  );
};

const styles = StyleSheet.create({
  borderStyle: {
    backgroundColor: colors.light,
    borderColor: colors.dark,
    width:'100%',
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
    width: "70%",
  },
  separator: {
    height: 28,
    width: 1,
    backgroundColor: colors.dark,
  },
  dateFilter:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-around",
    width:'30%',

    paddingVertical:28,
  },
  btnFilter:{
    width:'10%',
  }
});

export default HeaderSearch;
