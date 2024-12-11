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
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro'
import Checkbox from 'expo-checkbox'

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


  // tableau brut de resto / bars pour test => à remplacer par la BDD
  const items = [
    { label: "Resto1", value: "resto1" },
    { label: "Bar1", value: "bar1" },
    { label: "Resto2", value: "resto2" },
    { label: "Bar2", value: "bar2" },
    { label: "Restaurant", value: "restaurant" },
  ];

  // tri des établissements en minuscule, pour éviter la casse et recherche dans le tableau avec l'état (input)
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(placeSearch.toLowerCase())
  );

  // tableau brut de type d'événement
  const types = [
    { label: "Musique", value: "musique" },
    { label: "Football", value: "foot" },
    { label: "Danse", value: "danse" },
    { label: "Jeux", value: "jeux" },
    { label: "Nouvel An", value: "nouvelan" },
  ]

  const drinks = [
    { label: "Vin", value: "vin" },
    { label: "Bières", value: "biere" },
    { label: "Spiritueux", value: "spiritueux" },
    { label: "Softs", value: "softs" },
    { label: "Eau", value: "eau" },
  ]

  const drinksTab = [];

  // affichage du calendrier
  const showDatePicker = () => {
    setDateVisibility(true);
  };

  // fermeture du calendrier 
  const hideDatePicker = () => {
    setDateVisibility(false);
  };

  // clique sur la date souhaitée et fermeture du calendrier
  const handleConfirm = (selectedDate) => {
    setEventDate(selectedDate.toDateString());
    hideDatePicker();
  };

  // affichage de l'horloge pour horaire de l'événement
  const showTimePicker = () => {
    setTimeVisibility(true);
  };

  // fermeture de l'horloge pour horaire de l'événement
  const hideTimePicker = () => {
    setTimeVisibility(false);
  };

  // clique sur l'horaire souhaité pour l'événement en 2 digits pour l'heure et les minutes, puis fermeture de l'horloge
  const handleValid = (time) => {
    setEventHour(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimePicker();
  };

  // affichage de la modal de recherche d'établissement
  const showModal = () => {
    setModalVisible(true);
  };

  // fermeture de la modal de recherche d'établissement
  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDrink = () => {
    drinksTab.push(drink.label)
  }

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
            <Text style={styles.txtBtn}>Rechercher</Text>
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
              <Text style={styles.txtBtn}>Fermer</Text>
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
              {types.map((type, i) => (
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
            <Text style={styles.txtBtn}>Choisir une date</Text>
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
            <Text style={styles.txtBtn}>Choisir une heure</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimeVisible}
            mode="time"
            onConfirm={handleValid}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
      <View style={styles.picker}>
        <Text style={styles.label}>Tarif de l'événement:</Text>
        <Picker
          selectedValue={eventPrice}
          onValueChange={(value) => setEventPrice(value)}
        >
          <Picker.Item
            label='Gratuit'
            value='gratuit'
            onPress={() => {
              setEventPrice("");
            }}
          />
          <Picker.Item
            label='Payant'
            value='payant'
            onPress={() => {
              setEventPrice("");
            }}
          />
        </Picker>
      </View>
      <View style={styles.picker}>
        <Text style={styles.label}>Boissons:</Text>
        <Picker
          selectedValue={eventDrinks}
          onValueChange={(value) => setEventDrinks(value)}
        >
          {drinks.map((drink, i) => (
                <Picker.Item
                  key={i}
                  label={drink.label}
                  value={drink.value}
                  onPress={() => {
                    setEventDrinks("")
                  }}
                />
              ))}
        </Picker>
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
  txtBtn: {
    fontWeight: 'bold',
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
    width: 80,
    borderWidth: 1,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
    backgroundColor: colors.yellow,
  },
  btn2: {
    width: 90,
    borderWidth: 1,
    fontSize: 12,
    marginBottom: 10,
    borderRadius: 8,
    padding: 5,
    backgroundColor: colors.yellow,
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
    backgroundColor: colors.darkGreen,
    borderRadius: 15,
    padding: 15,
  },
});

export default AddEventScreen;
