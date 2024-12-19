import { useRef, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import TextApp from "../styleComponents/TextApp";
import TextAppBold from "../styleComponents/TextAppBold";
import TextAppTitle from "../styleComponents/TextAppTitle";
import { getAllEvents } from "../fetchers/events";
import CardEvent from "../components/CardEvent";
import colors from "../styleConstants/colors";
import CardEventProfil from "../components/CardEventProfil";

const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [userEvents, setUserEvents] = useState([]);
  // isLoading pour charger les événements créés par l'utilisateur
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user.value);
  const nickname = user.user.nickname;
  const email = user.user.email;
  const token = user.user.token;
  const id = user.user.id;

  // Simuler un chargement avec un délai de 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer); // Nettoyer le timer
  }, []);

  const fetchEvents = async () => {
    try {
      const events = await getAllEvents();

      if (user) {
        // Vérifie si `user` n'est pas nul
        const myEvents = events.filter(
          (event) => event.user && event.user.token === token
        );
        setUserEvents(myEvents);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleDeleteEvent = (eventId) => {
    fetch(`https://neotavern-backend.vercel.app/events/deleteEvent/${token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
      }),
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        console.log("Tâche supprimée avec succès :", data);
        fetchEvents();
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  const handleDeleteUser = (token) => {
    fetch(`https://neotavern-backend.vercel.app/users/deleteUser/${token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        console.log("Utilisateur supprimé avec succès :", data);
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <SafeAreaView
      style={styles.container}
      padding={Platform.OS === "ios" ? 25 : 0}
    >
      <View></View>
      <Text style={styles.mainTitle}>Profil</Text>
      <View style={styles.events}>
        <TextAppTitle>Mes événements créées</TextAppTitle>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.dark} />
          </View>
        ) : (
          <ScrollView style={styles.scrollWrapper}>
            <View style={styles.blockInfo}>
              <TextAppTitle>Mes informations</TextAppTitle>
              <View style={styles.userInfo}>
                <TextApp>Surnom: {nickname}</TextApp>
                <TextApp>Email: {email}</TextApp>
              </View>
            </View>

            <View style={styles.eventContent}>
              <TextApp>Gérez vos évènements créés ici !</TextApp>
              {userEvents &&
                userEvents
                  // .filter((event) => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <View key={event._id} style={styles.card}>
                      <CardEventProfil
                        key={event._id}
                        event={event}
                        navigation={navigation}
                        handleDeleteEvent={handleDeleteEvent}
                      />
                    </View>
                  ))}
            </View>
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => handleDeleteUser(token)}
        >
          <TextApp>Supprimer mon compte</TextApp>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    color: colors.dark,

    width: width,
  },

  loading: {
    justifyContent: "center",
    alignItems: "center",
  },

  mainTitle: {
    fontSize: 18,
    fontFamily: "Lexend_500Medium",
    paddingTop: 60,
    paddingBottom: 20,
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.dark,
    color: colors.dark,
  },

  blockInfo: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: 28,
    padding: 28,
    borderWidth: 0.3,
    borderRadius: 15,
    marginBottom: 28,
  },

  userInfo: {
    paddingTop: 12,
  },

  scrollWrapper: {
    paddingHorizontal: 28,
    minWidth: "100%",
    marginVertical: 28,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },

  events: {
    paddingTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 30,
    margin: 10,
    borderRadius: 8,
  },

  buttonDelete: {
    marginTop: 10,
    marginLeft: 20,
    padding: 12,
    borderRadius: 15,
    backgroundColor: colors.red,
  },

  buttonReset: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    padding: 12,
    borderRadius: 15,
    backgroundColor: colors.green,
  },

  eventContent: {
    borderRadius: 15,
    width: "100%",

    alignItems: "center",
    borderWidth: 0.3,
    borderColor: colors.dark,

    padding: 12,
  },
});

export default ProfileScreen;
