import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../styleConstants/colors";
import TextApp from "../styleComponents/TextApp";
import {
  Select,
  SelectProvider,
} from "@mobile-reality/react-native-select-pro";
import Checkbox from "expo-checkbox";
import createEvent from "../fetchers/events";

const AddEventScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventDrinks, setEventDrinks] = useState("");
  const [isChecked, setChecked] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });
  const [eventFood, setEventFood] = useState("");
  const [eventAge, setEventAge] = useState("");
  const [isDateVisible, setDateVisibility] = useState(false);
  const [isTimeVisible, setTimeVisibility] = useState(false);

  const user = useSelector((state) => state.user.value);
  // console.log(user);

  // tri des établissements en minuscule, pour éviter la casse et recherche dans le tableau avec l'état (input)
  // const filteredItems = items.filter((item) =>
  //   item.label.toLowerCase().includes(placeSearch.toLowerCase())
  // );

  // tableau brut de type d'événement
  const types = [
    { label: "Musique", value: "musique" },
    { label: "Football", value: "foot" },
    { label: "Danse", value: "danse" },
    { label: "Jeux", value: "jeux" },
    { label: "Nouvel An", value: "nouvelan" },
  ];

  const drinks = [
    { label: "Vin", value: "vin" },
    { label: "Bières", value: "biere" },
    { label: "Spiritueux", value: "spiritueux" },
    { label: "Softs", value: "softs" },
    { label: "Eau", value: "eau" },
  ];

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

  const handleCreate = () => {
    console.log("CLIQUE CA MARCHE");
    fetch("https://neotavern-backend.vercel.app/events/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventName,
        description: eventText,
        date: eventDate,
        mainCategory: eventType,
        likes: 2,
        categories: [],
        infosTag: [{ food: [] }, { drinks: [] }, { price: [] }, { legal: [] }],
        user: user._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l’ajout de la tâche");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tâche ajoutée avec succès :", data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  const [placesList, setPlacesList] = useState([]);
  const [placesResult, setPlacesResult] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");

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

  const chooseResult = (place) => {
    setPlaceSearch(place);
    setPlacesResult([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Ajouter un évènement</Text>
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.searchSection}>
          <Text style={styles.label}>Lieu de l'événement</Text>
          <TextInput
            placeholder="Rechercher un établissement"
            style={styles.input}
            value={placeSearch}
            onChangeText={handleSearch}
          />
          {placesResult.length > 0 && (
            <View style={styles.resultsList}>
              {placesResult.map((place) => (
                <Text
                  style={styles.resultItem}
                  onPress={() => chooseResult(place.name)}
                  key={place._id}
                >
                  {place.name}
                </Text>
              ))}
            </View>
          )}
          <View style={styles.searchResult}></View>
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
          {types.map((type, i) => (
            <Text key={i}>{type.label}</Text>
          ))}
        </View>
        <View>
          <Text style={styles.label}>Description:</Text>

          <TextInput
            placeholder="Décrire l'événement"
            multiline={true}
            numberOfLines={4}
            onChangeText={(value) => setEventText(value)}
            value={eventText}
            style={styles.input}
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
              label="Gratuit"
              value="gratuit"
              onPress={() => {
                setEventPrice("");
              }}
            />
            <Picker.Item
              label="Payant"
              value="payant"
              onPress={() => {
                setEventPrice("");
              }}
            />
          </Picker>
        </View>
        {/* <View style={styles.picker}>
        <Text style={styles.label}>Boissons:</Text>
        
        {drinks.map((drink, i) => (
          <View style={styles.checkbox} key={i} >
          <Checkbox 
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          />
          <Text>{drink.label}</Text>
          </View>
          ))}
          </View> */}
        <View>
          <Text style={styles.label}>UPLOAD UNE IMAGE</Text>
        </View>
        <TouchableOpacity style={styles.btn3} onPress={() => handleCreate()}>
          <Text style={styles.txtBtn}>Créer l'événement !</Text>
        </TouchableOpacity>
      </ScrollView>
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
    width: "100%",
    borderBottomWidth: 1,
    color: "#333333",
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 14,
  },
  inputPlace: {
    width: "100%",
    color: "#333333",
  },
  label: {
    fontFamily: "Lexend_700Bold",
    color: "#333333",
    justifyContent: "center",
  },
  txtBtn: {
    fontWeight: "bold",
  },
  picker: {
    width: "100%",
    borderBottomWidth: 1,
    marginBottom: 20,
    color: colors.purple,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    borderWidth: 1,
    marginLeft: 20,
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
    backgroundColor: colors.yellow,
  },
  btn2: {
    width: 90,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    padding: 5,
    backgroundColor: colors.yellow,
  },
  btn3: {
    borderWidth: 1,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    borderRadius: 8,
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
  checkbox: {
    flexDirection: "row",
  },
  scrollWrapper: {
    padding: 20,
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
  },

  mainTitle: {
    fontSize: 24,
    paddingVertical: 20,
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  resultsList: {
    width: "100%",
    // backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333",
  },

  resultItem: {
    padding: 10,
  },
});

export default AddEventScreen;
