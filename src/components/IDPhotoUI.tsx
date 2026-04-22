import { View, Image, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Chip } from 'react-native-paper';
import WebPressable from './WebPressable';
import { i18n } from '../i18n';
import { IDPhotoSize } from '../hooks/useBgColor';

type Props = {
  originalUri: string | null;
  cutoutUri: string | null;
  resultUri: string | null;
  loading: boolean;
  saving: boolean;
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
  originalUri, cutoutUri, resultUri, loading, saving,
  bgColor, freeCount, adCount, isVip,
  selectedSize, sizes,
  onPick, onRemoveBg, onApplyBg, onChangeSize, onSave, onWatchAd
}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.count}>
        {isVip ? '⭐ ' + i18n.t('vip_unlimited') : `${i18n.t('free_count')}：${freeCount} | ${i18n.t('ad_count')}：${adCount}`}
      </Text>

      <View style={styles.preview}>
        {resultUri ? <Image source={{uri: resultUri}} style={styles.img} /> :
         cutoutUri ? <Image source={{uri: cutoutUri}} style={styles.img} /> :
         originalUri ? <Image source={{uri: originalUri}} style={styles.img} /> :
         <Text style={styles.empty}>{i18n.t('please_select')}</Text>}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>{i18n.t('processing')}</Text>
          </View>
        )}
      </View>

      {cutoutUri && (
        <>
          <Text style={styles.sectionTitle}>{i18n.t('background_color')}</Text>
          <View style={styles.chipRow}>
            <Chip selected={bgColor==='white'} onPress={()=>onApplyBg('white')}>{i18n.t('white_bg')}</Chip>
            <Chip selected={bgColor==='blue'} onPress={()=>onApplyBg('blue')}>{i18n.t('blue_bg')}</Chip>
            <Chip selected={bgColor==='red'} onPress={()=>onApplyBg('red')}>{i18n.t('red_bg')}</Chip>
          </View>

          <Text style={styles.sectionTitle}>{i18n.t('photo_size')}</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.sizeScroll}
          >
            <View style={styles.sizeRow}>
              {sizes.map((size) => (
                <Chip 
                  key={size.name}
                  selected={selectedSize.name === size.name} 
                  onPress={()=>onChangeSize(size)}
                  style={styles.sizeChip}
                >
                  {size.label}
                </Chip>
              ))}
            </View>
          </ScrollView>
        </>
      )}

      <View style={styles.buttons}>
        <WebPressable
          style={[styles.button, styles.primaryButton]}
          onPress={onPick}
        >
          <Text style={styles.buttonText}>📷 {i18n.t('gallery')}</Text>
        </WebPressable>
        
        {originalUri && (
          <WebPressable
            style={[styles.button, styles.primaryButton]}
            onPress={onRemoveBg}
          >
            {loading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={[styles.buttonText, styles.loadingButtonText]}>{i18n.t('processing')}</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>✨ {i18n.t('ai_cutout')}</Text>
            )}
          </WebPressable>
        )}
        
        {resultUri && (
          <WebPressable
            style={[styles.button, styles.primaryButton]}
            onPress={onSave}
          >
            {saving ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={[styles.buttonText, styles.loadingButtonText]}>{i18n.t('saving')}</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>💾 {i18n.t('save')}</Text>
            )}
          </WebPressable>
        )}
        
        {!isVip && (
          <WebPressable
            style={[styles.button, styles.secondaryButton]}
            onPress={onWatchAd}
          >
            <Text style={styles.buttonText}>🎬 {i18n.t('watch_ad')}</Text>
          </WebPressable>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', padding:16 },
  count: { textAlign:'center', marginBottom:10, color:'#666' },
  preview: { 
    width:'100%', 
    height:420, 
    backgroundColor:'#f6f6f6', 
    borderRadius:12, 
    justifyContent:'center', 
    alignItems:'center',
    position: 'relative',
  },
  img: { width:'100%', height:'100%', resizeMode:'contain' },
  empty: { color:'#999' },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  chipRow: { flexDirection:'row', gap:8, marginVertical:16, justifyContent:'center' },
  sizeScroll: {
    marginBottom: 16,
  },
  sizeRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 8,
  },
  sizeChip: {
    marginHorizontal: 4,
  },
  buttons: { gap:12 },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingButtonText: {
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#FF6600',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IDPhotoUI;