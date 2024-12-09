import { View, Text } from "react-native";

const RegisterUser = () => {
  return (
    <View>
      <TextInput placeholder="Surnom" onChangeText={(value) => setNickname(value)} value={nickname} style={styles.input} /> 
      <TextInput placeholder="Email" onChangeText={(value) => setMail(value)} value={mail} style={styles.input} /> 
      <TextInput placeholder="Mot de passe" onChangeText={(value) => setPass(value)} value={pass} style={styles.input} /> 
      <TextInput placeholder="Confirmation mot de passe" onChangeText={(value) => setConfirmationPass(value)} value={ConfirmationPass} style={styles.input} />
    </View>
  );
};
export default RegisterUser;
