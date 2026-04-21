import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { useUserStore } from '../../store/userStore';

// 多API Key轮询
const API_KEYS = [
  "你的KEY1",
  "你的KEY2",
  "你的KEY3",
];
const getApiKey = () => API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

export const usePhotoLogic = () => {
  const [originalUri, setOriginalUri] = useState<string | null>(null);
  const [cutoutUri, setCutoutUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isVip = useUserStore((s) => s.isVip);
  const freeCount = useUserStore((s) => s.freeCount);
  const adCount = useUserStore((s) => s.adCount);
  const useFreeCount = useUserStore((s) => s.useFreeCount);
  const useAdCount = useUserStore((s) => s.useAdCount);
  const addAdCount = useUserStore((s) => s.addAdCount);
  const setVip = useUserStore((s) => s.setVip);

  // 相册选择
  const pickImage = async () => {
    // 请求相册权限
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('提示', '请开启相册权限');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, 
      quality: 0.8
    });
    if (!res.canceled) {
      setOriginalUri(res.assets[0].uri);
      setCutoutUri(null);
    }
  };

  // AI抠图
  const doRemoveBg = async () => {
    if (!originalUri) { 
      Alert.alert('请选图'); 
      return; 
    }
    if (!isVip && freeCount <= 0 && adCount <= 0) {
      Alert.alert('次数已用完\n看广告获得次数或开通会员');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(originalUri);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append('image_file', blob);
      formData.append('size', 'preview');

      const resp = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': getApiKey() },
        body: formData,
      });
      const data = await resp.blob();
      const uri = URL.createObjectURL(data);
      setCutoutUri(uri);

      // 扣次数
      if (!isVip) {
        adCount > 0 ? useAdCount() : useFreeCount();
      }
    } catch (e) {
      Alert.alert('抠图失败', '请检查网络或稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 看广告加次数
  const watchAd = () => {
    Alert.alert('广告播放完成', '已获得3次免费次数');
    addAdCount(3);
  };

  return {
    originalUri, cutoutUri, loading,
    freeCount, adCount, isVip,
    pickImage, doRemoveBg, watchAd,
    setVip
  };
};