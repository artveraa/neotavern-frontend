import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";

import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";

const WelcomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  //formulaire -> visible ou non
  const [resgisterForm, setResgisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

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
                  <TextApp style={[styles.s, styles.dark, styles.labelBtn]}>
                    &lt; retour
                  </TextApp>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => handleLoginForm()}
              >
                <TextApp style={[styles.l, styles.dark, styles.labelBtn]}>
                  Se connecter avec son compte
                </TextApp>
              </TouchableOpacity>
            )}
          </View>
        )}
        {!loginForm && (
          <View style={styles.btnContainer}>
            <View style={styles.straight}></View>
            <TextApp
              style={[styles.s, styles.center, styles.dark, styles.labelBtn]}
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
                  <TextApp style={[styles.s, styles.dark, styles.labelBtn]}>
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TabNavigator", {
                  screen: "MapScreen",
                })
              }
            >
              <Text>Accéder à la map</Text>
            </TouchableOpacity>
          </View>
        )}
        
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    color: colors.dark,
    justifyContent: "center",
    gap: '8%',
    alignItems: "center",
    width: "100%",
    paddingRight: 28,
    paddingLeft: 28,
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

    fontSize: 16,
    backgroundColor: colors.green,
    borderRadius: 15,
  },

  back: {
    width: "100%",
  },
});

export default WelcomeScreen;
