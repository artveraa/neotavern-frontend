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

import TextApp from "../styleComponents/TextApp";
import colors from "../styleConstants/colors";

const RegisterUser = ({ navigation }) => {
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  //input valeur
  const [nickname, setNickname] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");
  //message erreur
  const [emptyErr, setEmptyErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
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
          setEmptyErr({ emptyErr: true });
        } else if (userData.error === `Ce mail est déjà existant`) {
          setNameErr(!nameErr);
        } else if (!mailPattern.test(mail)) {
          setMailErr(mailErr);
        } else if (pass != confirmationPass) {
          setPassErr(passErr);
        } else {
          dispatch(
            login({
              token: userData?.token,
              nickname: userData?.nickname,
              email: userData?.nickname,
              role: userData?.role,
              id: userData?.id,
              badges: userData?.badges,
            })
          )
          navigation.navigate("TabNavigator", { screen: "MapScreen" })
        }    
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextApp style={styles.label}>
          Surnom
          {nameErr && (
            <TextApp style={styles.error}> - nom déjà existant !</TextApp>
          )}
        </TextApp>
        <TextInput
          placeholder="Surnom"
          onChangeText={(value) => setNickname(value)}
          value={nickname}
          style={styles.input}
        />

        <TextApp style={styles.label}>
          E-mail de connexion
          {mailErr && <TextApp style={styles.error}> - mail erreur</TextApp>}
        </TextApp>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => setMail(value)}
          value={mail}
          style={styles.input}
        />

        <TextApp style={styles.label}>Mot de passe</TextApp>
        <TextInput
          secureTextEntry={true}
          placeholder="Mot de passe"
          onChangeText={(value) => setPass(value)}
          value={pass}
          style={styles.input}
        />

        <TextApp style={styles.label}>Confirmer le mot de passe</TextApp>
        <TextInput
          secureTextEntry={true}
          placeholder="Confirmation mot de passe"
          onChangeText={(value) => setConfirmationPass(value)}
          value={confirmationPass}
          style={styles.input}
        />
      </View>

      {emptyErr && (
        <TextApp style={[styles.label, styles.error]}>
          {" "}
          Des champs sont vides !{" "}
        </TextApp>
      )}

      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={() => handleRegisterUser()}
      >
        <TextApp>Valider</TextApp>
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
    width: "100%",
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
