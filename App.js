import { Button, StyleSheet, Text, View } from "react-native";

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

const store = configureStore({
  reducer: { user },
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
