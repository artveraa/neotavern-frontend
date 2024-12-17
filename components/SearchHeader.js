import React, { useState } from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const HeaderSearch = ({ eventDay, eventWeek, eventWeekend }) => {
  const [search, setSearch] = useState("");
  const [dateActive, setDateActive] = useState(false);
  const [filterDate, setFilterDate] = useState("Date");

  const handleDate = () => {
    setDateActive(!dateActive);
  };

  const handleClickDay = () => {
    eventDay();
    setDateActive(!dateActive);
    setFilterDate(`Aujourd'hui`);
  };
  const handleClickWeek = () => {
    eventWeek();
    setDateActive(!dateActive);
    setFilterDate(`Semaine`);
  };
  const handleClickWeekend = () => {
    eventWeekend();
    setDateActive(!dateActive);
    setFilterDate(`Week-end`);
  };

  return (
    <View style={styles.borderStyle}>
      <View style={styles.contentSearch}>
        <View style={styles.wrap}>
          <FontAwesome name="search" size={24} color="#D9D9D9" />
          <TextInput
            placeholder="Quoi de prévu par ici ?"
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
        </View>

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

      {dateActive && (
        <View style={styles.tagWrap}>
          <TouchableOpacity
            style={styles.tagBorder}
            onPress={() => handleClickDay()}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />
            <TextAppS>Aujourd'hui</TextAppS>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tagBorder}
            onPress={() => handleClickWeek()}
          >
            <FontAwesome name="calendar-check-o" size={24} color="#EDA0FF" />
            <TextAppS>Semaine</TextAppS>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tagBorder}
            onPress={() => handleClickWeekend()}
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
});

export default HeaderSearch;
