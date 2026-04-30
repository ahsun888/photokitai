import { View, Image, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import WebPressable from './WebPressable';
import { i18n } from '../i18n';
import { IDPhotoSize } from '../utils/imageProcessor';

type Props = {
  originalUri: string | null;
  cutoutUri: string | null;
  resultUri: string | null;
  loading: boolean;
  saving: boolean;
  processing: boolean;
  bgColor: string;
  freeCount: number;
  adCount: number;
  isVip: boolean;
  selectedSize: IDPhotoSize;
  sizes: IDPhotoSize[];
  onPick: () => void;
  onRemoveBg: () => void;
  onApplyBg: (color: any) => void;
  onChangeSize: (size: IDPhotoSize) => void;
  onSave: () => void;
  onWatchAd: () => void;
};

export const IDPhotoUI = ({
  originalUri, cutoutUri, resultUri, loading, saving, processing,
  bgColor, freeCount, adCount, isVip,
  selectedSize, sizes,
  onPick, onRemoveBg, onApplyBg, onChangeSize, onSave, onWatchAd
}: Props) => {
  const showLoadingOverlay = loading || saving || processing;

  const getCurrentLanguage = () => {
    return i18n.locale.startsWith('zh') ? 'zh' : 'en';
  };
  const lang = getCurrentLanguage();

  const getBgColorStyle = () => {
    switch(bgColor) {
      case 'blue': return { bg: '#0070C0', label: lang === 'zh' ? '蓝底' : 'Blue' };
      case 'red': return { bg: '#FF3B30', label: lang === 'zh' ? '红底' : 'Red' };
      default: return { bg: '#FFFFFF', label: lang === 'zh' ? '白底' : 'White' };
    }
  };

  const colorStyle = getBgColorStyle();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.count}>
          {isVip ? '⭐ VIP' : `${i18n.t('free_count')} ${freeCount}  |  ${i18n.t('ad_count')} ${adCount}`}
        </Text>

        <View style={styles.previewContainer}>
          <View style={styles.preview}>
            {resultUri ? <Image source={{uri: resultUri}} style={styles.img} /> :
             cutoutUri ? <Image source={{uri: cutoutUri}} style={styles.img} /> :
             originalUri ? <Image source={{uri: originalUri}} style={styles.img} /> :
             <View style={styles.emptyContainer}>
               <Text style={styles.emptyIcon}>📷</Text>
               <Text style={styles.emptyText}>{i18n.t('please_select')}</Text>
             </View>}
            {showLoadingOverlay && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>
                  {saving ? i18n.t('saving') : i18n.t('processing')}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('background_color')}</Text>
          <View style={styles.colorRow}>
            <TouchableOpacity
              style={[styles.colorBtn, bgColor === 'white' && styles.colorBtnActive]}
              onPress={() => onApplyBg('white')}
              disabled={processing}
              activeOpacity={0.7}
            >
              <View style={[styles.colorCircle, { backgroundColor: '#FFFFFF' }]}>
                {bgColor === 'white' && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
              </View>
              <Text style={[styles.colorLabel, bgColor === 'white' && styles.colorLabelActive]}>{i18n.t('white_bg')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.colorBtn, bgColor === 'blue' && styles.colorBtnActive]}
              onPress={() => onApplyBg('blue')}
              disabled={processing}
              activeOpacity={0.7}
            >
              <View style={[styles.colorCircle, { backgroundColor: '#0070C0' }]}>
                {bgColor === 'blue' && <View style={styles.checkMark}><Text style={styles.checkTextWhite}>✓</Text></View>}
              </View>
              <Text style={[styles.colorLabel, bgColor === 'blue' && styles.colorLabelActive]}>{i18n.t('blue_bg')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.colorBtn, bgColor === 'red' && styles.colorBtnActive]}
              onPress={() => onApplyBg('red')}
              disabled={processing}
              activeOpacity={0.7}
            >
              <View style={[styles.colorCircle, { backgroundColor: '#FF3B30' }]}>
                {bgColor === 'red' && <View style={styles.checkMark}><Text style={styles.checkTextWhite}>✓</Text></View>}
              </View>
              <Text style={[styles.colorLabel, bgColor === 'red' && styles.colorLabelActive]}>{i18n.t('red_bg')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {cutoutUri && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n.t('photo_size')}</Text>
            <View style={styles.sizeGrid}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.name}
                  style={[
                    styles.sizeChip,
                    selectedSize.name === size.name && styles.sizeChipActive,
                    processing && styles.chipDisabled
                  ]}
                  onPress={() => !processing && onChangeSize(size)}
                  disabled={processing}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.sizeChipText,
                    selectedSize.name === size.name && styles.sizeChipTextActive
                  ]}>
                    {lang === 'zh' ? size.label : size.labelEn}
                  </Text>
                  <Text style={[
                    styles.sizeChipSpec,
                    selectedSize.name === size.name && styles.sizeChipSpecActive
                  ]}>
                    {size.widthMm}×{size.heightMm}mm
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.sizeInfoCard}>
              <Text style={styles.sizeSpec}>
                {selectedSize.width}×{selectedSize.height}px
              </Text>
              <Text style={styles.sizeUsage}>
                {lang === 'zh' ? selectedSize.usage : selectedSize.usageEn}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.buttonSection}>
          {!originalUri && (
            <TouchableOpacity
              style={[styles.mainButton, styles.primaryBtn]}
              onPress={onPick}
              activeOpacity={0.8}
            >
              <Text style={styles.mainBtnIcon}>📷</Text>
              <Text style={styles.mainBtnText}>{i18n.t('gallery')}</Text>
            </TouchableOpacity>
          )}

          {originalUri && !cutoutUri && (
            <TouchableOpacity
              style={[styles.mainButton, styles.primaryBtn]}
              onPress={onRemoveBg}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <View style={styles.btnLoading}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.mainBtnText}>  {i18n.t('processing')}</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.mainBtnIcon}>✨</Text>
                  <Text style={styles.mainBtnText}>{i18n.t('ai_cutout')}</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {resultUri && (
            <>
              <TouchableOpacity
                style={[styles.mainButton, styles.saveBtn]}
                onPress={onSave}
                disabled={saving}
                activeOpacity={0.8}
              >
                {saving ? (
                  <View style={styles.btnLoading}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.mainBtnText}>  {i18n.t('saving')}</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.mainBtnIcon}>💾</Text>
                    <Text style={styles.mainBtnText}>{i18n.t('save')}</Text>
                  </>
                )}
              </TouchableOpacity>
              {!isVip && (
                <TouchableOpacity
                  style={[styles.mainButton, styles.adBtn]}
                  onPress={onWatchAd}
                  activeOpacity={0.8}
                >
                  <Text style={styles.mainBtnIcon}>🎬</Text>
                  <Text style={styles.mainBtnText}>{i18n.t('watch_ad')}</Text>
                </TouchableOpacity>
              )}
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
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  count: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  previewContainer: {
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    aspectRatio: 3/4,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    borderRadius: 16,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#8E8E93',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  colorBtn: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  colorBtnActive: {
    backgroundColor: '#F2F2F7',
  },
  colorCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkTextWhite: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  colorLabel: {
    fontSize: 12,
    color: '#3C3C43',
    fontWeight: '500',
  },
  colorLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  sizeChip: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  sizeChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sizeChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  sizeChipTextActive: {
    color: '#FFFFFF',
  },
  sizeChipSpec: {
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
  },
  sizeChipSpecActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  chipDisabled: {
    opacity: 0.5,
  },
  sizeInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sizeSpec: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  sizeUsage: {
    fontSize: 12,
    color: '#8E8E93',
  },
  buttonSection: {
    gap: 12,
    marginTop: 8,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    minHeight: 50,
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
  mainBtnIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  mainBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  btnLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IDPhotoUI;