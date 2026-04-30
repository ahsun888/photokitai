import { useState, useEffect, useCallback } from 'react';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { applyBackgroundAndCrop, ID_PHOTO_SIZES, IDPhotoSize, BG_COLORS } from '../utils/imageProcessor';

type BGColor = keyof typeof BG_COLORS;

export const useBgColor = (cutoutUri: string | null) => {
  const [bgColor, setBgColor] = useState<BGColor>('white');
  const [resultUri, setResultUri] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<IDPhotoSize>(ID_PHOTO_SIZES[0]);
  const [processing, setProcessing] = useState(false);

  const applyBg = useCallback(async (color: BGColor, size: IDPhotoSize) => {
    if (!cutoutUri) return;
    setProcessing(true);
    try {
      let newUri: string;
      try {
        newUri = await applyBackgroundAndCrop(cutoutUri, color, size);
      } catch (canvasError) {
        console.log('Canvas方式失败，使用expo-image-manipulator:', canvasError);
        const res = await manipulateAsync(cutoutUri, [], {
          format: SaveFormat.JPEG,
          backgroundColor: BG_COLORS[color].hex
        });
        newUri = res.uri;
      }
      setResultUri(newUri);
      setBgColor(color);
    } catch (error) {
      console.error('应用背景失败:', error);
    } finally {
      setProcessing(false);
    }
  }, [cutoutUri]);

  const handleApplyBg = useCallback((color: BGColor) => {
    applyBg(color, selectedSize);
  }, [applyBg, selectedSize]);

  const handleChangeSize = useCallback((size: IDPhotoSize) => {
    setSelectedSize(size);
    if (cutoutUri) {
      applyBg(bgColor, size);
    }
  }, [applyBg, cutoutUri, bgColor]);

  useEffect(() => {
    if (cutoutUri) {
      applyBg(bgColor, selectedSize);
    } else {
      setResultUri(null);
      setBgColor('white');
      setSelectedSize(ID_PHOTO_SIZES[0]);
    }
  }, [cutoutUri]);

  return {
    bgColor,
    resultUri,
    applyBg: handleApplyBg,
    changeSize: handleChangeSize,
    setResultUri,
    selectedSize,
    changeSize: handleChangeSize,
    sizes: ID_PHOTO_SIZES,
    processing
  };
};