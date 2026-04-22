import { useState, useEffect } from 'react';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

type BGColor = 'white' | 'red' | 'blue';

export type IDPhotoSize = {
  name: string;
  width: number;
  height: number;
  label: string;
};

export const ID_PHOTO_SIZES: IDPhotoSize[] = [
  { name: '1inch', width: 295, height: 413, label: '1寸' },
  { name: '2inch', width: 413, height: 579, label: '2寸' },
  { name: 'passport', width: 600, height: 600, label: '护照' },
  { name: 'visa', width: 567, height: 390, label: '签证' },
  { name: 'id_card', width: 358, height: 441, label: '身份证' },
];

export const useBgColor = (cutoutUri: string | null) => {
  const [bgColor, setBgColor] = useState<BGColor>('white');
  const [resultUri, setResultUri] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<IDPhotoSize>(ID_PHOTO_SIZES[0]);

  const applyBg = async (color: BGColor) => {
    if (!cutoutUri) return;
    const colorMap = { white: '#fff', red: '#ff0000', blue: '#0000ff' };
    try {
      const res = await manipulateAsync(cutoutUri, [], {
        format: SaveFormat.PNG,
        backgroundColor: colorMap[color]
      });
      setResultUri(res.uri);
      setBgColor(color);
    } catch (error) {
      console.error('应用背景失败:', error);
    }
  };

  // 当cutoutUri变化时，自动应用当前背景颜色
  useEffect(() => {
    if (cutoutUri) {
      applyBg(bgColor);
    } else {
      setResultUri(null);
    }
  }, [cutoutUri, bgColor]);

  const changeSize = (size: IDPhotoSize) => {
    setSelectedSize(size);
  };

  return { 
    bgColor, 
    resultUri, 
    applyBg, 
    setResultUri,
    selectedSize,
    changeSize,
    sizes: ID_PHOTO_SIZES
  };
};