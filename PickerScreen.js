import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const logo = require('./assets/DataRhythmLogo.jpg');

export default function PickerScreen({ navigation, route }) {
  const { question, nextScreen, defaultHour, defaultMinute } = route.params;
  const [selectedHour, setSelectedHour] = useState(defaultHour);
  const [selectedMinute, setSelectedMinute] = useState(defaultMinute);

  const handleNext = () => {
    const selectedTime = `${selectedHour}:${selectedMinute}`;
    // Proceed to the next question
    navigation.navigate(nextScreen);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode='contain' />
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedHour(itemValue)}
          dropdownIconColor="white"
        >
          {[...Array(24).keys()].map((hour) => (
            <Picker.Item key={hour} label={`${hour}`.padStart(2, '0')} value={`${hour}`.padStart(2, '0')} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMinute(itemValue)}
          dropdownIconColor="white"
        >
          {[...Array(60).keys()].map((minute) => (
            <Picker.Item key={minute} label={`${minute}`.padStart(2, '0')} value={`${minute}`.padStart(2, '0')} />
          ))}
        </Picker>
      </View>
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 20, 
  },
  logo: {
    width: 350,
    marginBottom: 10, 
  },
  questionText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20, 
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, 
  },
  picker: {
    width: 100,
    height: 150, 
    color: 'white',
    backgroundColor: '#00B5B9',
    borderRadius: 10, 
    marginHorizontal: 5,
  },
});
