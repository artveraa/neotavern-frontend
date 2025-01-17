import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";

import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";

import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";

const WelcomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const token = user.user.token;

  const [resgisterForm, setResgisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  //si je ferme l'application sans me lougout, je rouvre l'application en étant déjà connecté => le token est enregistré dans le persistore => je ne passe pas par la page de log mais j'arrive de suite sur mapScreen
  useEffect(() => {
    if (token) {
      navigation.navigate("TabNavigator", { screen: "MapScreen" })
    }
  },[]
  )

  //formulaires -> visible ou non
  const handleSignupForm = () => {
    setResgisterForm(!resgisterForm);
  };
  const handleLoginForm = () => {
    setLoginForm(!loginForm);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* intégration du formulaire signin et suppression du btn singup */}
      {!resgisterForm && (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate("TabNavigator")}
          >
            <Image
              source={require("../assets/GoogleLogo.png")}
              style={styles.logoG}
            />
            <TextApp style={[styles.l, styles.dark, styles.labelBtn]}>
              Se connecter avec Google
            </TextApp>
          </TouchableOpacity>

          {loginForm ? (
            <>
              <LoginUser navigation={navigation} />
              <TouchableOpacity
                style={styles.back}
                onPress={() => handleLoginForm()}
              >
                <TextApp style={styles.labelBtn}>
                  &lt; retour
                </TextApp>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => handleLoginForm()}
            >
              <TextApp style={styles.labelBtn}>
                Se connecter avec son compte
              </TextApp>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* intégration du formulaire signup et suppression du btn singin */}
      {!loginForm && (
        <View style={styles.btnContainer}>
          <View style={styles.straight}></View>
          <TextApp
            style={[styles.center, styles.labelBtn]}
          >
            Pas encore inscrit ?
          </TextApp>
          {resgisterForm ? (
            <>
              <RegisterUser navigation={navigation} />
              <TouchableOpacity
                style={styles.back}
                onPress={() => handleSignupForm()}
              >
                <TextApp style={styles.labelBtn}>
                  &lt; retour
                </TextApp>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => handleSignupForm()}
            >
              <TextApp style={[styles.l, styles.dark, styles.labelBtn]}>
                Créer un compte
              </TextApp>
            </TouchableOpacity>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: "8%",
    alignItems: "center",
    width: "100%",
    paddingRight: 28,
    paddingLeft: 28,
    backgroundColor: colors.light,
  },

  logo: {
    width: 300,
    height: "10%",
    marginBottom: 40,
  },

  btnContainer: {
    width: "100%",
    alignItems: "center",
  },

  logoG: {
    width: 20,
    height: 20,
  },

  straight: {
    alignSelf: "center",

    width: 200,
    height: 1,

    marginBottom: 24,
    backgroundColor: colors.purple,
  },

  btnPrimary: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 43,
    padding: 4,
    marginTop: 12,
    marginBottom: 12,
    fontSize: 16,
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
    height: 42,
    padding: 4,
    marginTop: 12,
    marginBottom: 12,

    backgroundColor: colors.darkGreen,
    borderRadius: 15,
  },

  back: {
    width: "100%",
  },
});

export default WelcomeScreen;
