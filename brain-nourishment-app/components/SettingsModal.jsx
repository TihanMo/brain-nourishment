import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsModal({ visible, onClose, settings, onToggle }) {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              {/* Zurück-Pfeil */}
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#000" />
                <Text style={styles.backText}>Zurück</Text>
              </TouchableOpacity>

              {/* Titel */}
              <Text style={styles.title}>Einstellungen</Text>

              {/* Settings-Einträge */}
              <View style={styles.settingRow}>
                <Switch
                  value={settings.sound}
                  onValueChange={() => onToggle('sound')}
                />
                <Text style={styles.label}>Sound aktivieren</Text>
              </View>

              <View style={styles.settingRow}>
                <Switch
                  value={settings.darkMode}
                  onValueChange={() => onToggle('darkMode')}
                />
                <Text style={styles.label}>Dark Mode aktivieren</Text>
              </View>

              <View style={styles.settingRow}>
                <Switch
                  value={settings.vibration}
                  onValueChange={() => onToggle('vibration')}
                />
                <Text style={styles.label}>Vibration aktivieren</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginLeft: 12,
  },
});
