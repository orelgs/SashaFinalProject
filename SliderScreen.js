import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Slider from '@react-native-community/slider';

const logo = require('./assets/DataRhythmLogo.jpg')

export default function SliderScreen({ navigation, route }) {
  const { question, nextScreen } = route.params;
  const [Rating, setRating] = useState(3); // Initial value set to middle of the range

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode='contain' />
      <Text style={styles.questionText}>{question}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={Rating}
        onValueChange={setRating}
      />
      <View style={styles.scaleContainer}>
        <View style={styles.labelContainer}>
          <Text style={[styles.scaleLabel, styles.numberLabel]}>1</Text>
          <Text style={styles.scaleLabel}>Bad</Text>
        </View>
        {[2, 3, 4].map((value) => (
          <Text key={value} style={[styles.scaleLabel, styles.numberLabel]}>{value}</Text>
        ))}
        <View style={styles.labelContainer}>
          <Text style={[styles.scaleLabel, styles.numberLabel]}>5</Text>
          <Text style={styles.scaleLabel}>Great</Text>
        </View>
      </View>
      <View style={[styles.buttonContainer, { marginBottom: 50 }]}>
        <Button
          title="Next"
          onPress={() => navigation.navigate(nextScreen)}
        />
      </View>
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
  slider: {
    width: 300,
    height: 40,
    marginBottom: 10,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '80%',
    marginBottom: 20,
  },
  scaleLabel: {
    fontSize: 16,
    color: 'white',
  },
  labelContainer: {
    alignItems: 'center',
  },
  numberLabel: {
    marginBottom: 5,
  },
  buttonContainer: {
    width: '80%',
  },
});
