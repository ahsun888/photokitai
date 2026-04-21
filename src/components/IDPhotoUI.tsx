import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Chip } from 'react-native-paper';

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
        {isVip ? '⭐ 会员无限次' : `免费：${freeCount} | 广告：${adCount}`}
      </Text>

      <View style={styles.preview}>
        {resultUri ? <Image source={{uri: resultUri}} style={styles.img} /> : 
         cutoutUri ? <Image source={{uri: cutoutUri}} style={styles.img} /> : 
         originalUri ? <Image source={{uri: originalUri}} style={styles.img} /> : 
         <Text style={styles.empty}>选择照片开始制作</Text>}
      </View>

      {cutoutUri && (
        <View style={styles.chipRow}>
          <Chip selected={bgColor==='white'} onPress={()=>onApplyBg('white')}>白底</Chip>
          <Chip selected={bgColor==='blue'} onPress={()=>onApplyBg('blue')}>蓝底</Chip>
          <Chip selected={bgColor==='red'} onPress={()=>onApplyBg('red')}>红底</Chip>
        </View>
      )}

      <View style={styles.buttons}>
        <Button mode="contained" onPress={onPick}>📷 相册选择</Button>
        {originalUri && <Button mode="contained" loading={loading} onPress={onRemoveBg}>✨ AI抠图</Button>}
        {resultUri && <Button mode="contained" onPress={onSave}>💾 保存</Button>}
        {!isVip && <Button mode="contained" onPress={onWatchAd}>🎬 看广告+3次</Button>}
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