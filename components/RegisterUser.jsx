import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

import colors from "../styleConstants/colors";

const RegisterUser = ({ navigation }) => {
  //redux
  const dispatch = useDispatch();
  //input valeur
  const [nickname, setNickname] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");
  //message erreur
  const [emptyErr, setEmptyErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegisterUser = () => {
    fetch("http://neotavern-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname: nickname, password: pass, email: mail }),
    })
      .then((response) => response.json())

      .then((userData) => {
        if (userData.error === `Champs manquants ou vides`) {
          console.log("vide");
          setEmptyErr({ emptyErr: true });
          return;
        }
        if (userData.error === `Ce surnom est déjà existant`) {
          setNameErr(!nameErr);
          console.log("ex");
          return;
        }
        if (!mailPattern.test(mail)) {
          setMailErr(mailErr);
          console.log("mail");
          return;
        }

        dispatch(login({ nickname: userData.nickname, token: userData.token }));
        navigation.navigate("TabNavigator", { screen: "MapScreen" });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Surnom
          {nameErr && <Text style={styles.error}> - nom déjà existant !</Text>}
        </Text>
        <TextInput
          placeholder="Surnom"
          onChangeText={(value) => setNickname(value)}
          value={nickname}
          style={styles.input}
        />

        <Text style={styles.label}>
          E-mail de connexion
          {mailErr && <Text style={styles.error}> - mail erreur</Text>}
        </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => setMail(value)}
          value={mail}
          style={styles.input}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          placeholder="Mot de passe"
          onChangeText={(value) => setPass(value)}
          value={pass}
          style={styles.input}
        />

        <Text style={styles.label}>Confirmer le mot de passe</Text>
        <TextInput
          placeholder="Confirmation mot de passe"
          onChangeText={(value) => setConfirmationPass(value)}
          value={confirmationPass}
          style={styles.input}
        />
      </View>

      {emptyErr && (
        <Text style={[styles.label, styles.error]}>
          {" "}
          Des champs sont vides !{" "}
        </Text>
      )}

      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={() => handleRegisterUser()}
      >
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 28,
    marginBottom: 28,
  },
  inputContainer: {
    // alignItems: "lef",
    width: "100%",
    margin: 0,
    padding: 0,
  },
  label: {
    fontSize: 12,
  },
  input: {
    fontSize: 14,

    borderBottomColor: colors.dark,
    borderBottomWidth: 1,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 24,
  },
  error: {
    paddingBottom: 12,
    color: colors.purpleBorder,
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: 40,
    padding: 4,

    backgroundColor: colors.purple,
    borderRadius: 15,
  },
});

export default RegisterUser;
