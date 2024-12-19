import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import WelcomeScreen from "./screens/WelcomeScreen";
import EventScreen from "./screens/EventScreen";
import BookmarkedScreen from "./screens/BookmarkedScreen";
import MapScreen from "./screens/MapScreen";
import AddEventScreen from "./screens/AddEventScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PlaceScreen from "./screens/PlaceScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

import {
  useFonts,
  Lexend_900Black,
  Lexend_800ExtraBold,
  Lexend_700Bold,
  Lexend_600SemiBold,
  Lexend_500Medium,
  Lexend_400Regular,
  Lexend_300Light,
  Lexend_200ExtraLight,
  Lexend_100Thin,
} from "@expo-google-fonts/lexend";

// Configuration du store Redux
const store = configureStore({
  reducer: { user },
});

// Configuration de la navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Configuration des onglets de navigation
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Bookmarked") {
            iconName = "heart-o";
          } else if (route.name === "MapScreen") {
            iconName = "map-o";
          } else if (route.name === "AddEvent") {
            iconName = "plus-square-o";
          } else if (route.name === "Profile") {
            iconName = "user-o";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#EDA0FF",
        tabBarInactiveTintColor: "#9B9B9B",
        tabBarStyle: {
          backgroundColor: "#F5F5F5",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Bookmarked" component={BookmarkedScreen} />
      <Tab.Screen name="MapScreen" component={MapScreen} />
      <Tab.Screen name="AddEvent" component={AddEventScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  // Chargement des polices
  let [fontsLoaded] = useFonts({
    Lexend_900Black,
    Lexend_800ExtraBold,
    Lexend_700Bold,
    Lexend_600SemiBold,
    Lexend_500Medium,
    Lexend_400Regular,
    Lexend_300Light,
    Lexend_200ExtraLight,
    Lexend_100Thin,
  });

  // Si les polices ne sont pas chargées, on ne rend rien
  if (!fontsLoaded) {
    return null;
  }

  return (
    // On enveloppe notre application dans le Provider Redux
    <Provider store={store}>
      {/* 
        On utilise la NavigationContainer de React Navigation pour gérer la navigation
        On utilise un Stack Navigator pour gérer la navigation entre les différentes pages
        On utilise des écrans pour chaque page de l'application
        On utilise un Tab Navigator pour gérer la navigation entre les onglets de l'application
       */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="Place" component={PlaceScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
