import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import colors  from '../styleConstants/colors'

const LoginUser = ({navigation}) => {
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')


  return (
    <View>
      <View>
        <Text>E-mail de connexion</Text>
        <TextInput placeholder="Email" onChangeText={(value) => setMail(value)} value={mail} style={styles.input} /> 
      </View>

      <View>
        <Text>Mot de passe</Text>
        <TextInput placeholder="Mot de passe" onChangeText={(value) => setPass(value)} value={pass} style={styles.input} /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  width:'100%',
  backgroundColor:'red',
  justifyContent: "center",
  alignItems: "center",
},
btnSecondary:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',

  width:"100%",
  height:40,
  padding: 4,

  backgroundColor: colors.purple,
  borderRadius:15,
}
})

export default LoginUser;
