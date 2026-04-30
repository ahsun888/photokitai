import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import LanguageSelector from '../../src/components/LanguageSelector';
import { useTranslation } from '../../src/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();

  const goToIDPhoto = () => {
    router.push('/idphoto');
  };

  const goToOldPhoto = () => {
    alert(t('old_photo') + ' - ' + t('coming_soon'));
  };

  const goToCartoon = () => {
    router.push('/cartoon');
  };

  const goToVip = () => {
    router.push('/vip');
  };

  const goToGhibli = () => {
    router.push('/ghibli-style');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>📸</Text>
          <Text style={styles.title}>{t('app_name')}</Text>
          <Text style={styles.subtitle}>{t('app_subtitle')}</Text>
          <View style={styles.langSelectorWrapper}>
            <LanguageSelector />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={goToIDPhoto}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🪪</Text>
              <View style={styles.cardBadge}>
                <Text style={styles.cardBadgeText}>HOT</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{t('id_photo')}</Text>
            <Text style={styles.cardDesc}>{t('id_photo_desc')}</Text>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={goToOldPhoto}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>✨</Text>
              <View style={[styles.cardBadge, styles.comingBadge]}>
                <Text style={[styles.cardBadgeText, styles.comingBadgeText]}>Soon</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{t('old_photo')}</Text>
            <Text style={styles.cardDesc}>{t('old_photo_desc')}</Text>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={goToCartoon}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🌿</Text>
            </View>
            <Text style={styles.cardTitle}>{t('cartoon')}</Text>
            <Text style={styles.cardDesc}>{t('cartoon_desc')}</Text>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={goToGhibli}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🏯</Text>
            </View>
            <Text style={styles.cardTitle}>宫崎骏风格</Text>
            <Text style={styles.cardDesc}>一键生成吉卜力工作室手绘质感</Text>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.vipCard]}
            onPress={goToVip}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>⭐</Text>
              <View style={[styles.cardBadge, styles.vipBadge]}>
                <Text style={styles.vipBadgeText}>PRO</Text>
              </View>
            </View>
            <Text style={[styles.cardTitle, styles.vipCardTitle]}>{t('vip')}</Text>
            <Text style={styles.cardDesc}>{t('vip_desc')}</Text>
            <View style={styles.cardArrow}>
              <Text style={[styles.arrowText, styles.vipArrowText]}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  langSelectorWrapper: {
    marginTop: 8,
  },
  cardContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  vipCard: {
    backgroundColor: '#1C1C1E',
    borderWidth: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  cardBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  comingBadge: {
    backgroundColor: '#8E8E93',
  },
  comingBadgeText: {
    color: '#FFFFFF',
  },
  vipBadge: {
    backgroundColor: '#FFD60A',
  },
  vipBadgeText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  vipCardTitle: {
    color: '#FFFFFF',
  },
  cardDesc: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  cardArrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  arrowText: {
    fontSize: 28,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  vipArrowText: {
    color: '#48484A',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#C7C7CC',
  },
});