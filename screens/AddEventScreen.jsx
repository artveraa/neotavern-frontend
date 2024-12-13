import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../styleConstants/colors";
import * as ImagePicker from "expo-image-picker";

const AddEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [isDateVisible, setDateVisibility] = useState(false);
  const [isTimeVisible, setTimeVisibility] = useState(false);
  const [photo, setPhoto] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const user = useSelector((state) => state.user.value);
  console.log("VOICI LE LOG DE PHOTO:", photo);

  // SELECTION DE L'IMAGE VIA UPLOAD
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setIsUploading(true); // Commencer l'upload
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log("USER/", user);

    console.log("resultat de l image upload: ", result);

    if (!result.canceled) {
      setIsUploading(false); // Terminer l'upload
      setPhoto(result.assets[0]);
    }
  };

  // STOCKAGE DE L'IMAGE SUR LE CLOUDINARY
  const uploadImage = async () => {
    // type d'encodage de donnée (fichier + chaîne de caracteres)
    const formData = new FormData();
    // Chaque info à envoyer sera “ajoutée” au formData
    formData.append("photoFromFront", {
      // nom de la propriété qui va représenter le fichier côté backend
      uri: photo.uri, // chemin physique vers le fichier
      name: "photo.webp", // nom générique
      type: "image/jpeg", // mimetype du fichier
    });
    setIsUploading(true);
    try {
      const response = await fetch(
        "https://neotavern-backend.vercel.app/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      console.log("CLOUDINARY:", data);
      if (data && data.url) {
        console.log(data.url);

        setPhotoUrl(data.url);
        setIsUploading(false);
      } else {
        console.error("Upload échoué :", data);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  // tableau brut de type d'événement
  const types = [
    { label: "Concert" },
    { label: "Soirée" },
    { label: "Exposition" },
    { label: "Conférence" },
    { label: "Atelier" },
    { label: "Festival" },
    { label: "Spectacle" },
    { label: "Cinéma" },
    { label: "Théâtre" },
    { label: "Sport" },
    { label: "Jeux" },
    { label: "Autre" },
  ];

  const drinks = [
    { label: "Softs" },
    { label: "Bière" },
    { label: "Vin" },
    { label: "Cocktails" },
    { label: "Alcool fort" },
    { label: "Mocktails" },
  ];

  const food = [
    { label: "Végétarien" },
    { label: "Végétalien" },
    { label: "Sans gluten" },
    { label: "Halal" },
    { label: "Casher" },
    { label: "Vegan" },
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

  const handleConfirmDate = (e) => {
    console.log(e);

    setEventDate(e);
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
  const handleValid = (e) => {
    // formatter l'heure en français
    const formattedHour = e.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(formattedHour);

    setEventHour(formattedHour);
    hideTimePicker();
  };

  // CHARGEMENT UPLOAD IMAGE ET CREATION D'EVENEMENT
  const handleCreate = () => {
    uploadImage(); //upload cloudinary de l'image téléchargé

    fetch("https://neotavern-backend.vercel.app/events/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventName,
        description: eventText,
        date: eventDate,
        hour: eventHour,
        likes: 0,
        categories: selectedType,
        photo: photoUrl,
        infosTags: {
          food: selectedFood,
          drinks: selectedDrink,
          price: paid ? "Payant" : "Gratuit",
        },
        place: placeId,
        user: user.user?.data._id,
      }),
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        console.log("Tâche ajoutée avec succès :", data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  // Recherche de lieu

  const [placesList, setPlacesList] = useState([]);
  const [placesResult, setPlacesResult] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");
  const [placeId, setPlaceId] = useState("");

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
    setPlaceId(placeId);
    setPlacesResult([]);
  };

  // Séléctionner des types d'événements

  const [selectedType, setSelectedType] = useState([]);

  const handleType = (type) => {
    if (selectedType.includes(type)) {
      setSelectedType(selectedType.filter((item) => item !== type));
      return;
    } else {
      setSelectedType([...selectedType, type]);
    }
  };

  // Séléctionner le tarif de l'événement

  const [free, setFree] = useState(true);
  const [paid, setPaid] = useState(false);

  const handlePayment = (toggle) => {
    if (toggle === "paid") {
      setFree(false);
      setPaid(true);
    } else {
      setPaid(false);
      setFree(true);
    }
  };

  // Séléctionner les types de boissons

  const [selectedDrink, setSelectedDrink] = useState([]);

  const handleDrink = (drink) => {
    if (selectedDrink.includes(drink)) {
      setSelectedDrink(selectedDrink.filter((item) => item !== drink));
      return;
    } else {
      setSelectedDrink([...selectedDrink, drink]);
    }
  };

  // Séléctionner les types de Nourriture

  const [selectedFood, setSelectedFood] = useState([]);

  const handleFood = (food) => {
    if (selectedFood.includes(food)) {
      setSelectedFood(selectedFood.filter((item) => item !== food));
      return;
    } else {
      setSelectedFood([...selectedFood, food]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Ajouter un évènement</Text>
      <ScrollView style={styles.scrollWrapper}>
        {/* Recherche de lieu */}

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

        {/* Nom de l'événement */}

        <View>
          <Text style={styles.label}>Nom de l'événement:</Text>
          <TextInput
            placeholder="Soirée du nouvel an"
            style={styles.input}
            onChangeText={(value) => setEventName(value)}
            value={eventName}
          />
        </View>

        {/* Types d'événement */}

        <View style={styles.picker}>
          <Text style={styles.label}>Type d'événement:</Text>
          <View style={styles.tags}>
            {types.map((type, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleType(type.label)}
                style={
                  selectedType.includes(type.label)
                    ? [styles.tagItem, styles.selectedTag]
                    : styles.tagItem
                }
              >
                <Text>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description de l'événement */}

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

        {/* Date de l'évènement */}

        <View style={styles.picker}>
          <Text style={styles.label}>Date de l'événement:</Text>
          <View style={styles.dateInput}>
            <Text style={styles.label}>
              {new Date(eventDate).toLocaleDateString()}
            </Text>
            <TouchableOpacity style={styles.btn} onPress={showDatePicker}>
              <Text style={styles.txtBtn}>Choisir une date</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDateVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
        </View>

        {/* Horaire de l'événement */}

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

        {/* Tarif de l'événement */}

        <View style={styles.picker}>
          <Text style={styles.label}>Tarif de l'événement:</Text>
          <View style={styles.togglePrice}>
            <TouchableOpacity
              onPress={() => handlePayment("free")}
              style={[
                styles.tagItem,
                free
                  ? { backgroundColor: colors.purple }
                  : { backgroundColor: "#F5F5F5" },
              ]}
            >
              <Text style={styles.label}>Gratuit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePayment("paid")}
              style={[
                styles.tagItem,
                paid
                  ? { backgroundColor: colors.purple }
                  : { backgroundColor: "#F5F5F5" },
              ]}
            >
              <Text style={styles.label}>Payant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Boissons */}

        <View style={styles.picker}>
          <Text style={styles.label}>Boissons:</Text>
          <View style={styles.tags}>
            {drinks.map((drink, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleDrink(drink.label)}
                style={
                  selectedDrink.includes(drink.label)
                    ? [styles.tagItem, styles.selectedTag]
                    : styles.tagItem
                }
              >
                <Text>{drink.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nourriture */}
        <View style={styles.picker}>
          <Text style={styles.label}>Nourriture:</Text>
          <View style={styles.tags}>
            {food.map((food, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleFood(food.label)}
                style={
                  selectedFood.includes(food.label)
                    ? [styles.tagItem, styles.selectedTag]
                    : styles.tagItem
                }
              >
                <Text>{food.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Image */}

        <View style={styles.select}>
          {isUploading ? (
            <Text style={styles.loading}>LOADING...</Text>
          ) : (
            photo && <Image source={{ uri: photo.uri }} style={styles.image} />
          )}
          <TouchableOpacity style={styles.btn4} onPress={pickImage}>
            <Text style={styles.txtBtn}>Télécharge ta photo</Text>
          </TouchableOpacity>
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
  select: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 20,
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
    backgroundColor: colors.green,
  },
  btn2: {
    width: 90,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    padding: 5,
    backgroundColor: colors.green,
  },
  btn3: {
    borderWidth: 1,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    borderRadius: 8,
    backgroundColor: colors.green,
  },
  btn4: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    backgroundColor: colors.yellow,
  },

  checkbox: {
    flexDirection: "row",
  },
  scrollWrapper: {
    padding: 20,
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

  // Search section

  resultsList: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333",
  },

  resultItem: {
    padding: 10,
  },

  // Tags

  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },

  tagItem: {
    borderWidth: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
  },

  selectedTag: {
    backgroundColor: colors.purple,
  },

  // Price
  togglePrice: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
    margin: 10,
    borderRadius: 8,
  },
  loading: {
    fontSize: 20,
  },
});

export default AddEventScreen;
