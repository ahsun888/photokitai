import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IDPhotoUI from '../src/components/IDPhotoUI';
import { usePhotoLogic } from '../src/hooks/usePhotoLogic';
import { useBgColor, IDPhotoSize } from '../src/hooks/useBgColor';
import { useSavePhoto } from '../src/hooks/useSavePhoto';

export default function IDPhotoScreen() {
  const {
    originalUri, cutoutUri, loading,
    freeCount, adCount, isVip,
    pickImage, doRemoveBg, watchAd,
  } = usePhotoLogic();

  const {
    bgColor, resultUri, applyBg, 
    selectedSize, changeSize, sizes
  } = useBgColor(cutoutUri);

  const { save } = useSavePhoto(resultUri, isVip);

  const handleApplyBg = (color: string) => {
    applyBg(color as any);
  };

  const handleChangeSize = (size: IDPhotoSize) => {
    changeSize(size);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>AI 证件照</Text>
      </View>
      
      <IDPhotoUI
        originalUri={originalUri}
        cutoutUri={cutoutUri}
        resultUri={resultUri}
        loading={loading}
        bgColor={bgColor}
        freeCount={freeCount}
        adCount={adCount}
        isVip={isVip}
        selectedSize={selectedSize}
        sizes={sizes}
        onPick={pickImage}
        onRemoveBg={doRemoveBg}
        onApplyBg={handleApplyBg}
        onChangeSize={handleChangeSize}
        onSave={save}
        onWatchAd={watchAd}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});