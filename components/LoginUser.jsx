import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';

import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import colors  from '../styleConstants/colors'
import TextApp from "../styleComponents/TextApp";


const LoginUser = ({navigation}) => {
  // redux
  const dispatch = useDispatch()
  // input valeur
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  // message erreur
  const [error, setError] = useState(false)
  
  const handleLoginUser = () => {
    
    fetch('http://neotavern-backend.vercel.app/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass, email:mail}),
    })
    .then(response => response.json())
    .then(userData => {
      if (userData.result){
        dispatch(login({user: userData}))
        navigation.navigate("TabNavigator", { screen: 'MapScreen' })
      }else{
        setError(!error)
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextApp style={styles.label}>E-mail de connexion</TextApp>
        <TextInput placeholder="Email" onChangeText={(value) => setMail(value)} value={mail} style={styles.input} /> 
        <TextApp style={styles.label}>Mot de passe</TextApp>

        <TextInput 
          secureTextEntry={true}
          placeholder="Mot de passe"
          onChangeText={(value) => setPass(value)}
          value={pass}
          style={styles.input}
        />
      </View>

      {error && <TextApp style={[styles.label, styles.error]}>Mauvais mail ou mdp ! </TextApp>}

      <TouchableOpacity style={styles.btnPrimary} onPress={() => handleLoginUser()}>
          <TextApp>Valider</TextApp>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  width:'100%',
  justifyContent: "center",
  alignItems: "center",

  marginTop:28,
  marginBottom:28,
},
inputContainer:{
  width:'100%',
},
label:{
  fontSize:12,
},
input:{
  fontSize:14,

  borderBottomColor:colors.dark,
  borderBottomWidth: 1,
  paddingTop: 4,
  paddingBottom: 4,
  marginBottom:24,
},
error:{
  paddingBottom: 12,
  color:colors.purpleBorder,
},
btnPrimary:{
  width:"100%",
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',

  height:40,
  padding: 4,

  backgroundColor: colors.purple,
  borderWidth: 1,
  borderColor: colors.purple,
  borderRadius:15,
},

})

export default LoginUser;
