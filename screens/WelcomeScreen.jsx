import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapScreen from "./MapScreen";
import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";

import colors from "../styleConstants/colors";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const WelcomeScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  const [resgisterForm, setResgisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const handleSignup = () => {
    setResgisterForm(!resgisterForm);
    if (resgisterForm) {
      navigation.navigate("TabNavigator", { screen: "MapScreen" });
    }
  };

  const handleLogin = () => {
    setLoginForm(!loginForm);
    if (loginForm) {
      navigation.navigate("TabNavigator", { screen: "MapScreen" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.logo} />

      <View style={[styles.btnContainer, styles.btnContainerLogin]}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Image
            source={require("../assets/favicon.png")}
            style={styles.logoG}
          />
          <Text>Se connecter avec Google</Text>
        </TouchableOpacity>

        {loginForm && <LoginUser navigation={navigation} />}
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => handleLogin()}
        >
          <Text>Se connecter avec Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <Text>Pas encore inscrit ?</Text>
        {resgisterForm && <RegisterUser navigation={navigation} />}
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => handleSignup()}
        >
          <Text>Créer un compte</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "25%",
    paddingBottom: "25%",
    paddingRight: 28,
    paddingLeft: 28,
  },
  logo: {
    width: "40%",
    height: "20%",
  },
  btnContainer: {
    color: colors.dark,

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  logoG: {
    width: "20%",
    height: "100%",
  },

  btnPrimary: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    height: 40,
    padding: 4,

    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.purpleBorder,
    borderRadius: 15,
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: 40,
    padding: 4,

    backgroundColor: colors.green,
    borderRadius: 15,
  },
});

export default WelcomeScreen;
