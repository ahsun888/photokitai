import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';
import { useUserStore } from '../../store/userStore';

export const useCartoon = () => {
  const [originalUri, setOriginalUri] = useState<string | null>(null);
  const [cartoonUri, setCartoonUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isVip = useUserStore((s) => s.isVip);
  const freeCount = useUserStore((s) => s.freeCount);
  const adCount = useUserStore((s) => s.adCount);
  const useFreeCount = useUserStore((s) => s.useFreeCount);
  const useAdCount = useUserStore((s) => s.useAdCount);
  const addAdCount = useUserStore((s) => s.addAdCount);

  // 相册选择
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('提示', '请开启相册权限');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!res.canceled) {
      setOriginalUri(res.assets[0].uri);
      setCartoonUri(null);
    }
  };

  // 应用动漫效果（模拟）
  const applyCartoon = async () => {
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

      // 模拟处理时间
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (Platform.OS === 'web') {
        try {
          const canvas = document.createElement('canvas');
          const img = new Image();
          img.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = originalUri;
          });

          const scale = Math.min(800 / img.width, 800 / img.height, 1);
          const width = img.width * scale;
          const height = img.height * scale;

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            // 宫崎骏风格滤镜
            for (let i = 0; i < data.length; i += 4) {
              let r = data[i];
              let g = data[i + 1];
              let b = data[i + 2];

              // 1. 提高饱和度，让色彩更鲜艳
              const max = Math.max(r, g, b);
              const min = Math.min(r, g, b);
              let saturation = max > 0 ? ((max - min) / max) * 1.5 : 0;
              saturation = Math.min(saturation, 1);

              const gray = (r + g + b) / 3;
              r = gray + (r - gray) * (1 + saturation * 0.5);
              g = gray + (g - gray) * (1 + saturation * 0.5);
              b = gray + (b - gray) * (1 + saturation * 0.5);

              // 2. 提升绿色调（宫崎骏作品特点）
              g = g * 1.15;

              // 3. 亮度微升
              r = r * 1.05 + 10;
              g = g * 1.05 + 10;
              b = b * 1.05 + 10;

              // 4. 色彩量化，创造水彩感（减少色彩层次）
              const levels = 12;
              r = Math.round(r / 255 * levels) / levels * 255;
              g = Math.round(g / 255 * levels) / levels * 255;
              b = Math.round(b / 255 * levels) / levels * 255;

              // 5. 轻微柔光效果
              r = Math.min(r * 1.1, 255);
              g = Math.min(g * 1.1, 255);
              b = Math.min(b * 1.1, 255);

              // 6. 限制在0-255范围内
              data[i] = Math.max(0, Math.min(255, r));
              data[i + 1] = Math.max(0, Math.min(255, g));
              data[i + 2] = Math.max(0, Math.min(255, b));
            }

            ctx.putImageData(imageData, 0, 0);

            // 应用轻微的模糊创造柔焦效果
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
              tempCtx.filter = 'blur(0.5px)';
              tempCtx.drawImage(canvas, 0, 0);
              tempCtx.filter = 'none';
              tempCtx.globalAlpha = 0.3;
              tempCtx.drawImage(canvas, 0, 0);
              tempCtx.globalAlpha = 1;
              const resultUri = tempCanvas.toDataURL('image/jpeg', 0.92);
              setCartoonUri(resultUri);
            } else {
              const resultUri = canvas.toDataURL('image/jpeg', 0.92);
              setCartoonUri(resultUri);
            }
          } else {
            setCartoonUri(originalUri);
          }
        } catch (e) {
          setCartoonUri(originalUri);
        }
      } else {
        setCartoonUri(originalUri);
      }

      if (!isVip) {
        adCount > 0 ? useAdCount() : useFreeCount();
      }
    } catch (e) {
      Alert.alert('动漫化失败', '请检查网络或稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const watchAd = () => {
    Alert.alert('广告播放完成', '已获得3次免费次数');
    addAdCount(3);
  };

  return {
    originalUri,
    cartoonUri,
    loading,
    freeCount,
    adCount,
    isVip,
    pickImage,
    applyCartoon,
    watchAd,
  };
};