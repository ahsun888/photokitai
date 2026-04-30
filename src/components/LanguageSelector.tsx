import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { languages, i18n } from '../i18n';
import { useLanguageStore } from '../../store/languageStore';

type LanguageSelectorProps = {
  onLanguageChange?: (code: string) => void;
};

export const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const forceUpdate = useLanguageStore((state) => state.forceUpdate);
  const currentLang = languages.find((l) => l.code === currentLanguage) || languages[0];

  const handleSelectLanguage = (code: string) => {
    setLanguage(code);
    i18n.locale = code;
    forceUpdate();
    setModalVisible(false);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>🌐</Text>
        <Text style={styles.langName}>{currentLang.nativeName}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🌐 选择语言</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.langList}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.langItem,
                    currentLanguage === lang.code && styles.selectedLang,
                  ]}
                  onPress={() => handleSelectLanguage(lang.code)}
                >
                  <Text style={styles.langFlag}>{lang.flag}</Text>
                  <View style={styles.langInfo}>
                    <Text style={styles.nativeName}>{lang.nativeName}</Text>
                    <Text style={styles.englishName}>{lang.name}</Text>
                  </View>
                  {currentLanguage === lang.code && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    alignItems: 'center',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  flag: {
    fontSize: 18,
  },
  langName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 10,
    color: '#999',
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
    padding: 4,
  },
  langList: {
    padding: 8,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedLang: {
    backgroundColor: '#e8f0ff',
  },
  langFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  langInfo: {
    flex: 1,
  },
  nativeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  englishName: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LanguageSelector;