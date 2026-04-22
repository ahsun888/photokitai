import { Alert, Platform } from 'react-native';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const useSavePhoto = (resultUri: string | null, isVip: boolean) => {
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!resultUri) {
      Alert.alert('请先制作证件照');
      return;
    }

    try {
      setSaving(true);
      
      // 会员：直接高清无水印
      // 非会员：可在这里加水印逻辑
      const filename = `IDPhoto_${Date.now()}.png`;
      
      if (Platform.OS === 'web') {
        // Web端处理：创建下载链接
        const link = document.createElement('a');
        link.href = resultUri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Alert.alert('保存成功！照片已下载');
      } else {
        // 移动端处理
        const dest = FileSystem.documentDirectory + filename;

        await FileSystem.copyAsync({
          from: resultUri,
          to: dest,
        });

        // 请求媒体库权限
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('保存失败', '请开启相册权限');
          return;
        }

        await MediaLibrary.createAssetAsync(dest);
        Alert.alert('保存成功！已保存到相册');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '未知错误';
      Alert.alert('保存失败', `请稍后重试: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };
  return { save, saving };
};