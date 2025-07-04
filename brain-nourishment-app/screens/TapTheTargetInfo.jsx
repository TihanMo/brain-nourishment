import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../contexts/SettingsContext.jsx';


export default function TapTheTargetInfo() {
  const navigation = useNavigation();
  const { theme } = useContext(SettingsContext);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Zurück</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.text }]}>Tap the Target</Text>
      <Text style={[styles.text, { color: theme.text }]}>
        Tippe nacheinander auf alle Ziele, bevor sie verschwinden. Die
        Reaktionszeit wird immer kürzer.
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
