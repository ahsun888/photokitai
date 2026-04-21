import { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { LanguageSelector } from '../../src/components/LanguageSelector';
import { i18n } from '../../src/i18n';

export default function HomeScreen() {
  const [, forceUpdate] = useState({});

  const onLanguageChange = useCallback(() => {
    forceUpdate({});
  }, []);

  const goToIDPhoto = () => {
    router.push('/idphoto');
  };

  const goToOldPhoto = () => {
    alert(i18n.t('old_photo') + ' ' + i18n.t('success') + '...');
  };

  const goToCartoon = () => {
    alert(i18n.t('cartoon') + ' ' + i18n.t('success') + '...');
  };

  const goToVip = () => {
    router.push('/vip');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text variant="headlineMedium" style={styles.title}>
            🎨 PhotoKit AI
          </Text>
          <LanguageSelector onLanguageChange={onLanguageChange} />
        </View>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {i18n.t('app_subtitle')}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={goToIDPhoto} style={styles.button}>
          <Card style={styles.card} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">📸 {i18n.t('id_photo')}</Text>
              <Text variant="bodyMedium">
                {i18n.t('id_photo_desc')}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToOldPhoto} style={styles.button}>
          <Card style={styles.card} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">🌟 {i18n.t('old_photo')}</Text>
              <Text variant="bodyMedium">
                {i18n.t('old_photo_desc')}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToCartoon} style={styles.button}>
          <Card style={styles.card} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">🎭 {i18n.t('cartoon')}</Text>
              <Text variant="bodyMedium">
                {i18n.t('cartoon_desc')}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToVip} style={styles.button}>
          <Card style={[styles.card, styles.vipCard]} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">⭐ {i18n.t('vip')}</Text>
              <Text variant="bodyMedium">
                {i18n.t('vip_desc')}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    marginBottom: 16,
  },
  vipCard: {
    borderColor: '#FF6B00',
    borderWidth: 1,
  },
  button: {
    cursor: 'pointer',
  },
});