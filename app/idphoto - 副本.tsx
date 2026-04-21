import { useState } from 'react';
import { View, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { addBackgroundColor } from '../utils/imageProcessor';

type BackgroundColor = 'white' | 'red' | 'blue';

export default function IDPhotoScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [processedUri, setProcessedUri] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('white');
  const [loading, setLoading] = useState(false);

  const openCamera = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPerm.granted) {
      Alert.alert('提示', '请开启相机权限');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setProcessedUri(null);
    }
  };

  const openGallery = async () => {
    const galleryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!galleryPerm.granted) {
      Alert.alert('提示', '请开启相册权限');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setProcessedUri(null);
    }
  };

  const processImage = async () => {
    if (!imageUri) {
      Alert.alert('提示', '请先拍摄或选择一张照片');
      return;
    }

    setLoading(true);
    try {
      const result = await addBackgroundColor(imageUri, backgroundColor);
      setProcessedUri(result.uri);
      Alert.alert('成功', '证件照制作完成！');
    } catch (error) {
      Alert.alert('错误', '处理图片失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const displayUri = processedUri || imageUri;

  return (
    <View style={styles.container}>
      <View style={styles.previewBox}>
        {displayUri ? (
          <Image source={{ uri: displayUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.emptyBox}>
            <Button mode="text" textColor="#999">
              请拍摄正面照/选择相册照片
            </Button>
          </View>
        )}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#4A6FFF" />
          </View>
        )}
      </View>

      <View style={styles.colorPicker}>
        <Button mode="text" style={styles.colorLabel}>选择底色：</Button>
        <SegmentedButtons
          value={backgroundColor}
          onValueChange={(value) => setBackgroundColor(value as BackgroundColor)}
          buttons={[
            { value: 'white', label: '⚪ 白色', style: backgroundColor === 'white' ? { backgroundColor: '#f0f0f0' } : {} },
            { value: 'red', label: '🔴 红色', style: backgroundColor === 'red' ? { backgroundColor: '#ffe0e0' } : {} },
            { value: 'blue', label: '🔵 蓝色', style: backgroundColor === 'blue' ? { backgroundColor: '#e0e0ff' } : {} },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <View style={styles.buttonWrap}>
        <Button
          mode="contained"
          style={styles.btn}
          buttonColor="#4A6FFF"
          onPress={openCamera}
        >
          📸 相机拍照
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          buttonColor="#2CCC80"
          onPress={openGallery}
        >
          🖼️ 从相册选择
        </Button>

        {imageUri && (
          <Button
            mode="contained"
            style={styles.btn}
            buttonColor="#FF6B00"
            onPress={processImage}
            disabled={loading}
          >
            {loading ? '处理中...' : '✅ 一键制作证件照'}
          </Button>
        )}

        {processedUri && (
          <Button
            mode="outlined"
            style={styles.btn}
            textColor="#4A6FFF"
            onPress={() => {
              Alert.alert('提示', '保存功能即将上线');
            }}
          >
            💾 保存证件照
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  previewBox: {
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPicker: {
    marginBottom: 20,
  },
  colorLabel: {
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  buttonWrap: {
    gap: 12,
  },
  btn: {
    paddingVertical: 5,
  },
});
