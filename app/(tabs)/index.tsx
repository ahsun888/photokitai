import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import WebPressable from '../../src/components/WebPressable';
import { i18n } from '../../src/i18n';
import LanguageSelector from '../../src/components/LanguageSelector';

export default function Home() {
  const goToIDPhoto = () => {
    router.push('/idphoto');
  };

  const goToOldPhoto = () => {
    alert('老照片修复功能开发中');
  };

  const goToCartoon = () => {
    alert('动漫头像功能开发中');
  };

  const goToVip = () => {
    router.push('/vip');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('app_name')}</Text>
        <Text style={styles.subtitle}>{i18n.t('app_subtitle')}</Text>
        <LanguageSelector />
      </View>

      <View style={styles.cardContainer}>
        {/* 证件照卡片 */}
        <WebPressable style={styles.button} onPress={goToIDPhoto}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📸 {i18n.t('id_photo')}</Text>
            <Text style={styles.cardDesc}>{i18n.t('id_photo_desc')}</Text>
          </View>
        </WebPressable>

        {/* 老照片修复卡片 */}
        <WebPressable style={styles.button} onPress={goToOldPhoto}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🌟 {i18n.t('old_photo')}</Text>
            <Text style={styles.cardDesc}>{i18n.t('old_photo_desc')}</Text>
          </View>
        </WebPressable>

        {/* 动漫头像卡片 */}
        <WebPressable style={styles.button} onPress={goToCartoon}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎭 {i18n.t('cartoon')}</Text>
            <Text style={styles.cardDesc}>{i18n.t('cartoon_desc')}</Text>
          </View>
        </WebPressable>

        {/* 会员订阅卡片 */}
        <WebPressable style={styles.button} onPress={goToVip}>
          <View style={[styles.card, styles.vipCard]}>
            <Text style={styles.cardTitle}>⭐ {i18n.t('vip')}</Text>
            <Text style={styles.cardDesc}>{i18n.t('vip_desc')}</Text>
          </View>
        </WebPressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#fff',
  },
  vipCard: {
    borderColor: '#FF6B00',
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    cursor: 'pointer',
  },
});