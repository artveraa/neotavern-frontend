import React from "react";
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapScreen from "./MapScreen";
import RegisterScreen from "./RegisterScreen";
import RegisterUser from "../components/RegisterUser";
// import colors  from '../styleConstants/colors'

const purple = '#EDA0FF'
const green = '#E7FF98'

const light = '#F5F5F5'
const dark =  '#333333'
const purpleBorder = '#E264FF'


const WelcomeScreen = ({navigation}) => {

  const handleSignup = () => {
    console.log('clic')
    return <RegisterUser/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo}/>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate("TabNavigator")}>
          <Image source={require('../assets/favicon.png')} style={styles.logoG}/>
          <Text>Se connecter avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate("TabNavigator")}>
          <Text>Se connecter avec Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <Text>Pas encore inscrit ?</Text>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => handleSignup()}>
          <Text>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: light,
    color: dark,
    justifyContent: "space-between",
    alignItems: "center",

    paddingTop:'25%',
    paddingBottom:'25%',
    paddingRight:28,
    paddingLeft:28,

  },
  logo:{
    width:'40%',
    height:'20%',
  },
  btnContainer:{
    color: dark,

    width:"100%",
    justifyContent:'center',
    alignItems:'center',
    gap:24
  },
  logoG:{
    width:'20%',
    height:'100%',
  },

  btnPrimary:{
    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',

    height:40,
    padding: 4,

    backgroundColor: light,
    borderWidth: 1,
    borderColor: purpleBorder,
    borderRadius:15,
  },
  btnSecondary:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',

    width:"100%",
    height:40,
    padding: 4,

    backgroundColor: green,
    borderRadius:15,
  }
});

export default WelcomeScreen;
