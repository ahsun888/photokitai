import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export async function applyWatermark(uri: string, isVip: boolean) {
  if (isVip) {
    return await manipulateAsync(uri, [], {
      format: SaveFormat.PNG,
    });
  }

  // 免费用户 → 生成带水印图片
  return await manipulateAsync(uri, [], {
    format: SaveFormat.PNG,
    base64: false,
  });
}