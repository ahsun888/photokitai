import { useState } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const useSaveCartoon = (resultUri: string | null, isVip: boolean) => {
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!resultUri) {
      Alert.alert('请先生成动漫头像');
      return;
    }

    try {
      setSaving(true);

      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = resultUri;
        link.download = `cartoon_${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Alert.alert('保存成功', '图片已下载');
      } else {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('请开启相册权限');
          return;
        }

        let uri = resultUri;
        if (uri.startsWith('data:')) {
          const base64 = uri.split(',')[1];
          const path = FileSystem.documentDirectory + `cartoon_${Date.now()}.jpg`;
          await FileSystem.writeAsStringAsync(path, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          uri = path;
        }

        const asset = await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert('保存成功', '图片已保存到相册');
      }
    } catch (e) {
      Alert.alert('保存失败', '请重试');
    } finally {
      setSaving(false);
    }
  };

  return { save, saving };
};