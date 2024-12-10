import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../styleConstants/colors";

const AddEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventText, setEventText] = useState("Décrire l'événement");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventDrinks, setEventDrinks] = useState("");
  const [eventFood, setEventFood] = useState("");
  const [eventAge, setEventAge] = useState("");
  const [isDateVisible, setDateVisibility] = useState(false);
  const [isTimeVisible, setTimeVisibility] = useState(false);

  const showDatePicker = () => {
    setDateVisibility(true);
  };
  const hideDatePicker = () => {
    setDateVisibility(false);
  };
  const handleConfirm = (selectedDate) => {
    setEventDate(selectedDate.toDateString());
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimeVisibility(true);
  };
  const hideTimePicker = () => {
    setTimeVisibility(false);
  };
  const handleValid = (time) => {
    setEventHour(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Nom de l'événement:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setEventName(value)}
          value={eventName}
        />
      </View>
      <View style={styles.picker}>
        <Text style={styles.label}>Type d'événement:</Text>
        <Picker
          selectedValue={eventType}
          onValueChange={(value) => setEventType(value)}
        >
          <Picker.Item label="Musique" value="musique" />
          <Picker.Item label="Foot" value="foot" />
          <Picker.Item label="Jeux" value="jeux" />
          <Picker.Item label="Nouvel an" value="nouvelan" />
        </Picker>
      </View>
      <View>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setEventText(value)}
          value={eventText}
        />
      </View>
      <View style={styles.picker}>
        <Text style={styles.label}>Date de l'événement:</Text>
        <View style={styles.dateInput}>
          <Text style={styles.label}>{eventDate}</Text>
          <TouchableOpacity style={styles.btn} onPress={showDatePicker}>
            <Text style={styles.label}>Choisir une date</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDateVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
      </View>
      <View style={styles.picker}>
      <Text style={styles.label}>Horaire de l'événement:</Text>
        <View style={styles.dateInput}>
          <Text style={styles.label}>{eventHour}</Text>
          <TouchableOpacity style={styles.btn} onPress={showTimePicker}>
          <Text style={styles.label}>Choisir une heure</Text>
          </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimeVisible}
          mode="time"
          onConfirm={handleValid}
          onCancel={hideTimePicker}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    borderBottomWidth: 1,
    color: "#333333",
    marginBottom: 20,
  },
  label: {
    color: "#333333",
    justifyContent: "center",
  },
  picker: {
    width: 300,
    borderBottomWidth: 1,
    marginBottom: 20,
    color: colors.purple,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: 60,
    borderWidth: 1,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default AddEventScreen;
