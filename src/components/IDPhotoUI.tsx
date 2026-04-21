import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { i18n } from '../i18n';

type Props = {
  originalUri: string | null;
  cutoutUri: string | null;
  resultUri: string | null;
  loading: boolean;
  bgColor: string;
  freeCount: number;
  adCount: number;
  isVip: boolean;
  onPick: () => void;
  onRemoveBg: () => void;
  onApplyBg: (color: any) => void;
  onSave: () => void;
  onWatchAd: () => void;
};

export const IDPhotoUI = ({
  originalUri, cutoutUri, resultUri, loading,
  bgColor, freeCount, adCount, isVip,
  onPick, onRemoveBg, onApplyBg, onSave, onWatchAd
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
      </View>

      {cutoutUri && (
        <View style={styles.chipRow}>
          <Chip selected={bgColor==='white'} onPress={()=>onApplyBg('white')}>{i18n.t('white_bg')}</Chip>
          <Chip selected={bgColor==='blue'} onPress={()=>onApplyBg('blue')}>{i18n.t('blue_bg')}</Chip>
          <Chip selected={bgColor==='red'} onPress={()=>onApplyBg('red')}>{i18n.t('red_bg')}</Chip>
        </View>
      )}

      <View style={styles.buttons}>
        <Button mode="contained" onPress={onPick}>📷 {i18n.t('gallery')}</Button>
        {originalUri && <Button mode="contained" loading={loading} onPress={onRemoveBg}>✨ {i18n.t('ai_cutout')}</Button>}
        {resultUri && <Button mode="contained" onPress={onSave}>💾 {i18n.t('save')}</Button>}
        {!isVip && <Button mode="contained" onPress={onWatchAd}>🎬 {i18n.t('watch_ad')}</Button>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', padding:16 },
  count: { textAlign:'center', marginBottom:10, color:'#666' },
  preview: { width:'100%', height:420, backgroundColor:'#f6f6f6', borderRadius:12, justifyContent:'center', alignItems:'center' },
  img: { width:'100%', height:'100%', resizeMode:'contain' },
  empty: { color:'#999' },
  chipRow: { flexDirection:'row', gap:8, marginVertical:16, justifyContent:'center' },
  buttons: { gap:12 }
});

export default IDPhotoUI;