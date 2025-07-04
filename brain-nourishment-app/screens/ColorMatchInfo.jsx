import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Add your own brain diagram at ../assets/brain-placeholder.png so
// users can highlight their perceived activity.

export default function ColorMatchInfo() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Zurück</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Color Match</Text>
      <Image
        source={require('../assets/brain-placeholder.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>
        Beim Zuordnen von Farbe und Wort arbeiten dein Okzipitallappen und die Sprachregion
        eng zusammen. Dein präfrontaler Cortex sorgt dafür, dass du blitzschnell entscheidest,
        ob die beiden wirklich zusammenpassen. Nutze das Bild oben, um deine gefühlte
        Aktivität einzuzeichnen.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' },
  backButton: { position: 'absolute', top: 40, left: 20, flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  text: { fontSize: 16, lineHeight: 22 },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
});
