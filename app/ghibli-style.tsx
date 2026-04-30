import '@expo/metro-runtime';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import WebPressable from '../src/components/WebPressable';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GhibliStyleScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number>(1);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('提示', '请开启相册权限');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const genGhibli = (type: number) => {
    setSelectedStyle(type);
  };

  const getStyleFilter = () => {
    switch (selectedStyle) {
      case 1:
        return 'saturate(1.3) contrast(0.9) sepia(0.05) hue-rotate(-3deg) brightness(1.1)';
      case 2:
        return 'saturate(1.2) contrast(0.8) sepia(0.15) hue-rotate(15deg) brightness(1.05)';
      case 3:
        return 'saturate(1.4) contrast(0.85) sepia(0.1) hue-rotate(-6deg) brightness(1.08) blur(0.8px)';
      case 4:
        return 'saturate(1.1) contrast(0.95) sepia(0.08) hue-rotate(5deg) brightness(1.1) blur(0.5px)';
      default:
        return 'saturate(1.4) contrast(0.85) sepia(0.1) hue-rotate(-6deg) brightness(1.08)';
    }
  };

  const getStyleName = () => {
    switch (selectedStyle) {
      case 1: return '龙猫清新风';
      case 2: return '千与千寻暖色调';
      case 3: return '天空之城水彩风';
      case 4: return '崖上的波妞柔和风';
      default: return '宫崎骏风格';
    }
  };

  const savePhoto = async () => {
    if (!selectedImage) {
      Alert.alert('请先选择照片');
      return;
    }

    try {
      setSaving(true);

      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = selectedImage;
        link.download = `ghibli_${getStyleName()}_${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Alert.alert('保存成功', '图片已下载到本地');
      } else {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('请开启相册权限');
          return;
        }

        const filename = `ghibli_${getStyleName()}_${Date.now()}.jpg`;
        const filepath = `${FileSystem.documentDirectory}${filename}`;

        await FileSystem.downloadAsync(
          selectedImage,
          filepath
        );

        await MediaLibrary.saveToLibraryAsync(filepath);
        Alert.alert('保存成功', '图片已保存到相册');
      }
    } catch (e) {
      console.error('保存失败:', e);
      Alert.alert('保存失败', '请重试');
    } finally {
      setSaving(false);
    }
  };

  const generateAIGhibli = () => {
    const prompt = `
id photo, studio ghibli style, Hayao Miyazaki,
soft hand-painted watercolor, gentle color, dreamy light,
pastel tone, clean background, nostalgic anime, high detail
    `.trim();

    const negative = `
photorealistic, harsh light, oversaturated, ugly, blurry, distorted
    `.trim();

    Alert.alert("AI生成中：\n" + prompt);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.backArrow} onPress={() => router.back()}>‹</Text>
        <Text style={styles.title}>宫崎骏风格</Text>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <Text style={styles.subtitle}>一键生成吉卜力工作室手绘质感</Text>

        <WebPressable style={styles.uploadBtn} onPress={pickImage}>
          <Text style={styles.uploadText}>📷 选择照片</Text>
        </WebPressable>

        <View style={styles.imgRow}>
          <View style={styles.imgBox}>
            <Text style={styles.label}>原图</Text>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.img} />
            ) : (
              <View style={[styles.img, styles.emptyImg]}>
                <Text style={styles.emptyText}>请选择照片</Text>
              </View>
            )}
          </View>

          <View style={styles.imgBox}>
            <Text style={styles.label}>{getStyleName()}</Text>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={[styles.img, { filter: getStyleFilter() }]}
              />
            ) : (
              <View style={[styles.img, styles.emptyImg]}>
                <Text style={styles.emptyText}>请选择照片</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.stylesWrap}>
          <Text style={styles.sectionTitle}>选择风格</Text>

          <WebPressable style={[styles.item, selectedStyle === 1 && styles.itemActive]} onPress={() => genGhibli(1)}>
            <Text style={[styles.itemText, selectedStyle === 1 && styles.itemTextActive]}>🌿 龙猫清新风</Text>
          </WebPressable>

          <WebPressable style={[styles.item, selectedStyle === 2 && styles.itemActive]} onPress={() => genGhibli(2)}>
            <Text style={[styles.itemText, selectedStyle === 2 && styles.itemTextActive]}>🎨 千与千寻暖色调</Text>
          </WebPressable>

          <WebPressable style={[styles.item, selectedStyle === 3 && styles.itemActive]} onPress={() => genGhibli(3)}>
            <Text style={[styles.itemText, selectedStyle === 3 && styles.itemTextActive]}>☁️ 天空之城水彩风</Text>
          </WebPressable>

          <WebPressable style={[styles.item, selectedStyle === 4 && styles.itemActive]} onPress={() => genGhibli(4)}>
            <Text style={[styles.itemText, selectedStyle === 4 && styles.itemTextActive]}>🌊 崖上的波妞柔和风</Text>
          </WebPressable>
        </View>

        <View style={styles.buttonRow}>
          <WebPressable style={[styles.generateBtn]} onPress={generateAIGhibli}>
            <Text style={styles.generateText}>✨ AI 生成</Text>
          </WebPressable>

          <WebPressable style={[styles.saveBtn, saving && styles.btnDisabled]} onPress={savePhoto} disabled={saving}>
            <Text style={styles.saveText}>{saving ? '保存中...' : '💾 保存照片'}</Text>
          </WebPressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  backArrow: {
    fontSize: 32,
    color: '#007AFF',
    fontWeight: '300',
    marginRight: 8,
    marginTop: -2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadBtn: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imgRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  imgBox: {
    flex: 1,
  },
  label: { fontSize: 13, marginBottom: 6, fontWeight: '500', color: '#333' },
  img: { width: '100%', height: 200, borderRadius: 12, backgroundColor: '#eee', resizeMode: 'contain' },
  emptyImg: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  stylesWrap: { marginBottom: 20 },
  item: {
    padding: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 8,
  },
  itemActive: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#5BA982',
  },
  itemText: { fontSize: 14, color: '#333' },
  itemTextActive: { color: '#2E7D32', fontWeight: '600' },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  generateBtn: {
    flex: 1,
    backgroundColor: '#5BA982',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  generateText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  saveBtn: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnDisabled: {
    opacity: 0.6,
  },
});