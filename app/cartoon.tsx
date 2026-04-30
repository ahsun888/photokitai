import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguageStore } from '../store/languageStore';
import { useTranslation } from '../src/hooks/useTranslation';
import { useCartoon } from '../src/hooks/useCartoon';
import { useSaveCartoon } from '../src/hooks/useSaveCartoon';
import CartoonUI from '../src/components/CartoonUI';

export default function CartoonScreen() {
  const languageKey = useLanguageStore((state) => state.languageKey);
  const { t } = useTranslation();

  const {
    originalUri, cartoonUri, loading,
    freeCount, adCount, isVip,
    pickImage, applyCartoon, watchAd,
  } = useCartoon();

  const { save, saving } = useSaveCartoon(cartoonUri, isVip);

  return (
    <SafeAreaView style={styles.container} edges={['top']} key={languageKey}>
      <View style={styles.header}>
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.title}>🏯 {t('cartoon')}</Text>
      </View>

      <CartoonUI
        originalUri={originalUri}
        cartoonUri={cartoonUri}
        loading={loading}
        saving={saving}
        freeCount={freeCount}
        adCount={adCount}
        isVip={isVip}
        onPick={pickImage}
        onCartoon={applyCartoon}
        onSave={save}
        onWatchAd={watchAd}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  backArrow: {
    fontSize: 32,
    color: '#007AFF',
    fontWeight: '300',
    marginRight: 8,
    marginTop: -2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
});