import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const useSavePhoto = (resultUri: string | null, isVip: boolean) => {
  const save = async () => {
    if (!resultUri) {
      Alert.alert('请先制作证件照');
      return;
    }

    try {
      // 会员：直接高清无水印
      // 非会员：可在这里加水印逻辑
      const filename = `IDPhoto_${Date.now()}.png`;
      const dest = FileSystem.documentDirectory + filename;

      await FileSystem.copyAsync({
        from: resultUri,
        to: dest,
      });

      await MediaLibrary.createAssetAsync(dest);
      Alert.alert('保存成功！已保存到相册');
    } catch (e) {
      Alert.alert('保存失败');
    }
  };
  return { save };
};