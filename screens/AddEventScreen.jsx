import React from "react";
import { useState } from 'react';
import { View, Text, StyleSheet,Button, TextInput} from "react-native";
import { Picker } from "@react-native-picker/picker";

const AddEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState('Musique');
  const [eventText, setEventText] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventDrinks, setEventDrinks] = useState("");
  const [eventFood, setEventFood] = useState("");
  const [eventAge, setEventAge] = useState("");

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.label}>Nom de l'événement:</Text>
      <TextInput
        onChangeText={(value) => setEventName(value)}
        value={eventName}
      />
      </View>
      <View>
        <Text style={styles.label}>Type d'événement:</Text>
        <Picker
          selectedValue={eventType}
          style={styles.picker}
          onValueChange={(value) => setEventType(value)}
        >
          <Picker.Item label="Musique" value='musique' />
          <Picker.Item label="Foot" value='foot' />
          <Picker.Item label="Jeux" value='jeux' />
          <Picker.Item label="Nouvel an" value='nouvelan' />
        </Picker>
      </View>
      <View>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        onChangeText={(value) => setEventText(value)}
        value={eventText}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddEventScreen;
