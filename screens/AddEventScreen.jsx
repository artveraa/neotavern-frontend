import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../styleConstants/colors";

const AddEventScreen = () => {
  const [placeSearch, setPlaceSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventDrinks, setEventDrinks] = useState("");
  const [eventFood, setEventFood] = useState("");
  const [eventAge, setEventAge] = useState("");
  const [isDateVisible, setDateVisibility] = useState(false);
  const [isTimeVisible, setTimeVisibility] = useState(false);

  const items = [
    { label: "Resto1", value: "resto1" },
    { label: "Bar1", value: "bar1" },
    { label: "Resto2", value: "resto2" },
    { label: "Bar2", value: "bar2" },
    { label: "Restaurant", value: "restaurant" },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(placeSearch.toLowerCase())
  );

  const types = [
    { label: "Musique", value: "musique" },
    { label: "Football", value: "foot" },
    { label: "Danse", value: "danse" },
    { label: "Jeux", value: "jeux" },
    { label: "Nouvel An", value: "nouvelan" },
  ]

  const filteredTypes = types.filter((type) =>
    type.label.toLowerCase().includes(eventType.toLowerCase())
  );

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

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.picker}>
        <Text style={styles.label}>Recherchez un établissement:</Text>
        <View style={styles.dateInput}>
          {selectedPlace ? (
            <Text
              style={styles.inputPlace}
              onPress={() => {
                setSelectedPlace("");
              }}
            >
              {selectedPlace}
            </Text>
          ) : (
            <TextInput
              style={styles.inputPlace}
              placeholder="Rechercher..."
              onChangeText={setPlaceSearch}
              value={placeSearch}
            />
          )}
          <TouchableOpacity style={styles.btn2} onPress={showModal}>
            <Text style={styles.label}>Rechercher</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalView}>
            {filteredItems.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setSelectedPlace(item.label);
                  setModalVisible(false); 
                }}
              >
                <Text style={styles.modalText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.btn}
              title="Fermer"
              onPress={hideModal}
            >
              <Text>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <Text style={styles.label}>Nom de l'événement:</Text>
        <TextInput
          placeholder="Soirée du nouvel an"
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
              {filteredTypes.map((type, i) => (
                <Picker.Item
                  key={i}
                  label={type.label}
                  value={type.value}
                  onPress={() => {
                    setEventType("");
                  }}
                />
              ))}
        </Picker>
      </View>
      <View>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          placeholder="Décrire l'événement"
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
      <View>
        <Text style={styles.label}>UPLOAD UNE IMAGE</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchPlace: {},
  input: {
    width: 300,
    borderBottomWidth: 1,
    color: "#333333",
    marginBottom: 20,
  },
  inputPlace: {
    width: 200,
    color: "#333333",
  },
  label: {
    fontFamily: 'Lexend_700Bold',
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
    width: 70,
    borderWidth: 1,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: colors.green,
  },
  btn2: {
    width: 80,
    borderWidth: 1,
    fontSize: 12,
    marginBottom: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    width: 350,
    margin: 10,
    textAlign: "center",
    backgroundColor: colors.green,
    borderRadius: 15,
    padding: 15,
  },
});

export default AddEventScreen;
