import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ThankYouScreen({ navigation }) {
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