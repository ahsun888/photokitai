import { View, Image, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import WebPressable from './WebPressable';
import { useTranslation } from '../hooks/useTranslation';

type Props = {
  originalUri: string | null;
  cartoonUri: string | null;
  loading: boolean;
  saving: boolean;
  freeCount: number;
  adCount: number;
  isVip: boolean;
  onPick: () => void;
  onCartoon: () => void;
  onSave: () => void;
  onWatchAd: () => void;
};

export const CartoonUI = ({
  originalUri, cartoonUri, loading, saving,
  freeCount, adCount, isVip,
  onPick, onCartoon, onSave, onWatchAd
}: Props) => {
  const { t } = useTranslation();
  const showLoadingOverlay = loading || saving;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.count}>
          {isVip ? '⭐ VIP' : `${t('free_count')} ${freeCount}  |  ${t('ad_count')} ${adCount}`}
        </Text>

        <View style={styles.previewContainer}>
          <View style={styles.preview}>
            {cartoonUri ? <Image source={{ uri: cartoonUri }} style={styles.img} /> :
             originalUri ? <Image source={{ uri: originalUri }} style={styles.img} /> :
             <View style={styles.emptyContainer}>
               <Text style={styles.emptyIcon}>🌿</Text>
               <Text style={styles.emptyText}>{t('please_select')}</Text>
             </View>}
            {showLoadingOverlay && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>
                  {saving ? t('saving') : t('processing')}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.buttonSection}>
          {!originalUri && (
            <WebPressable
              style={[styles.mainButton, styles.primaryBtn]}
              onPress={onPick}
            >
              <Text style={styles.mainBtnIcon}>📷</Text>
              <Text style={styles.mainBtnText}>{t('select_photo')}</Text>
            </WebPressable>
          )}

          {originalUri && !cartoonUri && (
            <WebPressable
              style={[styles.mainButton, styles.primaryBtn]}
              onPress={onCartoon}
              disabled={loading}
            >
              <Text style={styles.mainBtnIcon}>✨</Text>
              <Text style={styles.mainBtnText}>{t('cartoon_effect')}</Text>
            </WebPressable>
          )}

          {cartoonUri && (
            <>
              <WebPressable
                style={[styles.mainButton, styles.saveBtn]}
                onPress={onSave}
                disabled={saving}
              >
                <Text style={styles.mainBtnIcon}>💾</Text>
                <Text style={styles.mainBtnText}>
                  {saving ? t('saving') : t('save_photo')}
                </Text>
              </WebPressable>

              {!isVip && (
                <WebPressable
                  style={[styles.mainButton, styles.adBtn]}
                  onPress={onWatchAd}
                >
                  <Text style={styles.mainBtnIcon}>🎬</Text>
                  <Text style={styles.mainBtnText}>{t('watch_ad')}</Text>
                </WebPressable>
              )}

              <WebPressable
                style={styles.secondaryButton}
                onPress={onPick}
              >
                <Text style={styles.secondaryBtnText}>{t('another_photo')}</Text>
              </WebPressable>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  count: {
    textAlign: 'center',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  previewContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  preview: {
    width: 280,
    height: 280,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 8,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 15,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
  },
  buttonSection: {
    gap: 12,
    marginTop: 8,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  primaryBtn: {
    backgroundColor: '#007AFF',
  },
  saveBtn: {
    backgroundColor: '#34C759',
  },
  adBtn: {
    backgroundColor: '#FF9500',
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  mainBtnIcon: {
    fontSize: 18,
  },
  mainBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryBtnText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CartoonUI;