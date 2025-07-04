import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Provide an image at ../assets/brain-placeholder.png for users
// to mark which brain regions feel active during this game.

export default function TapTheTargetInfo() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Zurück</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Tap the Target</Text>
      <Image
        source={require('../assets/brain-placeholder.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>
        Die vielen Ziele trainieren dein visuelles Aufmerksamkeitsfeld. Dein Parietallappen
        berechnet, wo die Ziele auftauchen, während das Kleinhirn schnelle, präzise Bewegungen
        steuert. Zeichne im Bild ein, welche Bereiche bei dir arbeiten.
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
