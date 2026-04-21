import { useState } from 'react';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

type BGColor = 'white' | 'red' | 'blue';

export const useBgColor = (cutoutUri: string | null) => {
  const [bgColor, setBgColor] = useState<BGColor>('white');
  const [resultUri, setResultUri] = useState<string | null>(null);

  const applyBg = async (color: BGColor) => {
    if (!cutoutUri) return;
    const colorMap = { white: '#fff', red: '#ff0000', blue: '#0000ff' };
    const res = await manipulateAsync(cutoutUri, [], {
      format: SaveFormat.PNG,
      backgroundColor: colorMap[color]
    });
    setResultUri(res.uri);
    setBgColor(color);
  };

  return { bgColor, resultUri, applyBg, setResultUri };
};