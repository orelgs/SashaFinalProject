import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { storeAnswers } from '../Util/Http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThankYouScreen({ navigation, route }) {
  const { answers } = route.params;

  useEffect(() => {
    console.log('Answers:', answers); // Log the answers to the console
    storeAnswers(answers);
    async function saveCompletionStatus() {
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      await AsyncStorage.setItem('questionnaireCompleted', currentDate);
    }
    saveCompletionStatus();
  }, [answers]);

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank you, you completed the questionnaire for today!</Text>
      <Button
        title="Home Page"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  thankYouText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});
