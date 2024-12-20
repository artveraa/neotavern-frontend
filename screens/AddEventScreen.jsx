import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { useSelector } from "react-redux";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import colors from "../styleConstants/colors";
import TextApp from "../styleComponents/TextApp";
import TextAppBold from "../styleComponents/TextAppBold";
const { width } = Dimensions.get("window");

const AddEventScreen = ({ navigation }) => {
  // States pour les champs de l'événement
  const [eventName, setEventName] = useState("");
  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");

  // States relatifs à la date et l'heure
  const [isDateVisible, setDateVisibility] = useState(false);
  const [isTimeVisible, setTimeVisibility] = useState(false);

  // States pour l'image
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // States pour le lieu

  const [placesList, setPlacesList] = useState([]);
  const [placesResult, setPlacesResult] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");
  const [placeId, setPlaceId] = useState("");

  // States pour les types d'événement

  const [selectedType, setSelectedType] = useState([]);

  // States pour le tarif de l'événement

  const [free, setFree] = useState(true);
  const [paid, setPaid] = useState(false);

  // Récupération de l'utilisateur connecté via Redux
  const user = useSelector((state) => state.user.value);


  // ---------- 1. Méthodes liées à la recherche de lieu ----------

  // Récupération de la liste des lieux
  useEffect(() => {
    fetch("https://neotavern-backend.vercel.app/places/allPlaces")
      .then((response) => response.json())
      .then((data) => {
        setPlacesList(data.data);
      });
  }, []);

  // Méthode pour filtrer les lieux en fonction de la recherche
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

  // Méthode pour choisir un lieu dans la liste des résultats
  const chooseResult = (placeName, placeId) => {
    setPlaceSearch(placeName);
    setPlaceId(placeId);
    setPlacesResult([]);
  };

  // ---------- 2. Méthodes liées à l'image ----------

  // Méthode pour récupérer une image depuis la galerie
  const pickImage = async () => {
    setIsUploading(true); // Annonce le début de l'upload via le state isUploading

    // Récupération de l'image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    // Vérification si l'upload a été annulé
    if (!result.canceled) {
      setIsUploading(false);
      setPhoto(result.assets[0]);
    }
  };

  // Méthode pour uploader l'image sur Cloudinary
  const uploadImage = async () => {
    // Initialisation d'un objet FormData
    const formData = new FormData();

    // Chaque info à envoyer sera “ajoutée” au formData
    formData.append("photoFromFront", {
      // nom de la propriété qui va représenter le fichier côté backend
      uri: photo.uri, // chemin physique vers le fichier
      name: "photo.webp", // nom générique
      type: "image/jpeg", // mimetype du fichier
    });

    setIsUploading(true);

    // Try/catch pour gérer les erreurs
    try {
      // Appel à l'API pour uploader l'image
      const response = await fetch(
        "https://neotavern-backend.vercel.app/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data && data.url) {
        // Si l'upload est un succès, on met à jour le state photoUrl
        setPhotoUrl(data.url);
        setIsUploading(false);
      } else {
        console.error("Upload échoué :", data);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  // Utilisation de useFocusEffect pour lancer l'upload de l'image à chaque fois que la photo est modifiée et que le screen est affiché
  useFocusEffect(
    useCallback(() => {
      // useCallback pour éviter de relancer l'upload à chaque fois que le screen est affiché
      uploadImage();
    }, [photo])
  );

  // ---------- 3. Méthodes liées au choix des types d'événement ----------

  // Types d'événement
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

  // Méthode pour gérer la sélection des types d'événement
  const handleType = (type) => {
    if (selectedType.includes(type)) {
      setSelectedType(selectedType.filter((item) => item !== type));
      return;
    } else {
      setSelectedType([...selectedType, type]);
    }
  };

  // ---------- 4. Méthodes liées au choix de la date et de l'heure de l'événement ----------

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

    setEventHour(formattedHour);
    hideTimePicker();
  };

  // ---------- 5. Méthodes liées à la gestion du prix de l'événement ----------

  // Séléctionner le tarif de l'événement

  const handlePayment = (toggle) => {
    if (toggle === "paid") {
      setFree(false);
      setPaid(true);
    } else {
      setPaid(false);
      setFree(true);
    }
  };

  // ---------- 6. Méthodes liées au choix des types de boissons ----------

  const drinks = [
    { label: "Softs" },
    { label: "Bière" },
    { label: "Vin" },
    { label: "Cocktails" },
    { label: "Alcool fort" },
    { label: "Mocktails" },
  ];

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

  // ---------- 7. Méthodes liées au choix des critères alimentaires ----------

  const food = [
    { label: "Végétarien" },
    { label: "Végétalien" },
    { label: "Sans gluten" },
    { label: "Halal" },
    { label: "Casher" },
    { label: "Vegan" },
  ];

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

  // ---------- 8. Méthode liée à la validation des champs ----------

  const validateFields = () => {
    if (!eventName) {
      alert("Veuillez renseigner le nom de l'événement.");
      return false;
    }

    if (!eventText) {
      alert("Veuillez renseigner la description de l'événement.");
      return false;
    }

    if (!eventDate) {
      alert("Veuillez renseigner la date de l'événement.");
      return false;
    }

    if (!eventHour) {
      alert("Veuillez renseigner l'horaire de l'événement.");
      return false;
    }

    if (!photoUrl) {
      alert("Veuillez télécharger une photo.");
      return false;
    }
    if (!selectedFood) {
      alert("Veuillez sélectionner un type de nourriture.");
      return false;
    }
    if (!selectedDrink) {
      alert("Veuillez sélectionner un type de boisson.");
      return false;
    }
    if (!placeId) {
      alert("Veuillez sélectionner un lieu.");
      return false;
    }
    if (!user.user?.id) {
      alert("Utilisateur non identifié.");
      return false;
    }
    return true;
  };

  // ---------- 9. Méthode liée à la création de l'événement ----------

  // Création de l'événement si tous les champs sont valides
  const handleCreate = () => {
    if (!validateFields()) {
      return;
    }
    // Utilisation de la route createEvent pour créer un nouvel événement
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
        user: user.user?.id,
      }),
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        console.log("Tâche ajoutée avec succès :", data);
        navigation.navigate("MapScreen");
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Ajouter un évènement</Text>
      <ScrollView style={styles.scrollWrapper}>
        {/* Recherche de lieu */}

        <View style={styles.searchSection}>
          <TextAppBold style={styles.label}>Lieu de l'événement</TextAppBold>
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
          <TextAppBold style={styles.label}>Nom de l'événement:</TextAppBold>
          <TextInput
            placeholder="Soirée du nouvel an"
            style={styles.input}
            onChangeText={(value) => setEventName(value)}
            value={eventName}
          />
        </View>
        {/* Image */}

        <View style={styles.select}>
          {photo ? (
            isUploading ? (
              <Text style={styles.loading}>CHARGEMENT DE L'IMAGE...</Text>
            ) : (
              <Image source={{ uri: photo.uri }} style={styles.image} />
            )
          ) : (
            <View style={styles.placeholder}>
              <TextAppBold style={styles.label}>
                Séléctionnez une image de présentation de l'événement
              </TextAppBold>
            </View>
          )}

          <TouchableOpacity style={styles.btn4} onPress={pickImage}>
            <TextApp style={styles.txtBtn}>Upload ta photo</TextApp>
          </TouchableOpacity>
        </View>

        {/* Types d'événement */}

        <View style={styles.picker}>
          <TextAppBold style={styles.label}>Type d'événement:</TextAppBold>
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
                <TextApp>{type.label}</TextApp>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description de l'événement */}

        <View>
          <TextAppBold style={styles.label}>Description:</TextAppBold>

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
          <TextAppBold style={styles.label}>Date de l'événement:</TextAppBold>
          <View style={styles.dateInput}>
            <TextApp style={styles.label}>
              {new Date(eventDate).toLocaleDateString()}
            </TextApp>
            <TouchableOpacity style={styles.btn} onPress={showDatePicker}>
              <TextApp style={styles.txtBtn}>Choisir une date</TextApp>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDateVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            locale="fr_FR"
          />
        </View>

        {/* Horaire de l'événement */}

        <View style={styles.picker}>
          <TextAppBold style={styles.label}>
            Horaire de l'événement:
          </TextAppBold>
          <View style={styles.dateInput}>
            <TextApp style={styles.label}>{eventHour}</TextApp>
            <TouchableOpacity style={styles.btn} onPress={showTimePicker}>
              <TextApp style={styles.txtBtn}>Choisir une heure</TextApp>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimeVisible}
              mode="time"
              onConfirm={handleValid}
              onCancel={hideTimePicker}
              locale="fr_FR"
            />
          </View>
        </View>

        {/* Tarif de l'événement */}

        <View style={styles.picker}>
          <TextAppBold style={styles.label}>Tarif de l'événement:</TextAppBold>
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
              <TextApp style={styles.label}>Gratuit</TextApp>
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
              <TextApp style={styles.label}>Payant</TextApp>
            </TouchableOpacity>
          </View>
        </View>

        {/* Boissons */}

        <View style={styles.picker}>
          <TextAppBold style={styles.label}>Boissons:</TextAppBold>
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
                <TextApp>{drink.label}</TextApp>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nourriture */}
        <View style={styles.picker}>
          <TextAppBold style={styles.label}>Nourriture:</TextAppBold>
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
                <TextApp>{food.label}</TextApp>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.containerCreateEvent}>
          <TouchableOpacity style={styles.btn3} onPress={() => handleCreate()}>
            <TextAppBold style={styles.txtBtn}>Créer l'événement !</TextAppBold>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    color: colors.dark,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingRight: 28,
    paddingLeft: 28,
  },
  containerCreateEvent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  },
  txtBtn: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
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
    alignItems: "center",
  },
  btn: {
    marginLeft: 20,
    marginBottom: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: colors.green,
  },
  btn2: {
    width: 90,
    marginBottom: 10,
    borderRadius: 15,
    padding: 12,
    backgroundColor: colors.green,
  },
  btn3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: 60,
    padding: 4,
    marginTop: 12,
    marginBottom: 40,

    fontSize: 16,
    backgroundColor: colors.green,
    borderRadius: 15,
  },
  btn4: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    backgroundColor: colors.green,
  },

  checkbox: {
    flexDirection: "row",
  },
  scrollWrapper: {
    padding: 20,
    width: "100%",
  },

  mainTitle: {
    fontSize: 18,
    fontFamily: "Lexend_500Medium",
    paddingTop: 60,
    paddingBottom: 20,
    width: width,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.dark,
    color: colors.dark,
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
    padding: 12,
    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderWidth: 0.3,
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
  placeholder: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AddEventScreen;
