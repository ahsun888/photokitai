import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export interface IDPhotoSize {
  name: string;
  widthMm: number;
  heightMm: number;
  width: number;
  height: number;
  label: string;
  labelEn: string;
  usage: string;
  usageEn: string;
}

export const ID_PHOTO_SIZES: IDPhotoSize[] = [
  {
    name: '1寸',
    widthMm: 25,
    heightMm: 35,
    width: 295,
    height: 413,
    label: '一寸',
    labelEn: '1 inch',
    usage: '身份证、社保、驾照、简历、考试',
    usageEn: 'ID, Resume, Exam'
  },
  {
    name: '大一寸',
    widthMm: 33,
    heightMm: 48,
    width: 390,
    height: 567,
    label: '大一寸',
    labelEn: 'Large 1 inch',
    usage: '护照、港澳通行证、签证',
    usageEn: 'Passport, Visa'
  },
  {
    name: '二寸',
    widthMm: 35,
    heightMm: 53,
    width: 413,
    height: 626,
    label: '二寸',
    labelEn: '2 inch',
    usage: '毕业证、学位证',
    usageEn: 'Graduation, Degree'
  },
  {
    name: '身份证',
    widthMm: 26,
    heightMm: 32,
    width: 307,
    height: 378,
    label: '身份证',
    labelEn: 'ID Card',
    usage: '二代身份证办理',
    usageEn: 'ID Card Application'
  },
  {
    name: '美国签证',
    widthMm: 50,
    heightMm: 50,
    width: 591,
    height: 591,
    label: '美国签证',
    labelEn: 'US Visa',
    usage: '美国签证、美国绿卡',
    usageEn: 'US Visa, Green Card'
  },
  {
    name: '申根签证',
    widthMm: 35,
    heightMm: 45,
    width: 413,
    height: 531,
    label: '申根/日韩',
    labelEn: 'Schengen/JP/KR',
    usage: '申根国、日本、韩国签证',
    usageEn: 'Schengen, Japan, Korea'
  },
];

export const BG_COLORS = {
  white: { hex: '#FFFFFF', rgb: 'rgb(255,255,255)', name: '白底', nameEn: 'White' },
  blue: { hex: '#0070C0', rgb: 'rgb(0,112,192)', name: '蓝底', nameEn: 'Blue' },
  red: { hex: '#FF0000', rgb: 'rgb(255,0,0)', name: '红底', nameEn: 'Red' },
  lightBlue: { hex: '#77D1F2', rgb: 'rgb(119,209,242)', name: '浅蓝底', nameEn: 'Light Blue' },
  lightGray: { hex: '#F0F0F0', rgb: 'rgb(240,240,240)', name: '浅灰底', nameEn: 'Light Gray' },
};

type BgColorType = keyof typeof BG_COLORS;

function getFacePosition(targetWidth: number, targetHeight: number): { faceX: number; faceY: number; faceWidth: number; faceHeight: number } {
  const faceTopRatio = 0.08;
  const faceBottomRatio = 0.7;
  const faceWidth = targetWidth * 0.6;
  const faceHeight = targetHeight * (faceBottomRatio - faceTopRatio);
  const faceX = (targetWidth - faceWidth) / 2;
  const faceY = targetHeight * faceTopRatio;

  return {
    faceX,
    faceY,
    faceWidth,
    faceHeight
  };
}

export async function processIdPhoto(
  imageUri: string,
  color: BgColorType,
  targetSize: IDPhotoSize
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Canvas not available'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('无法创建Canvas上下文'));
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const { width: targetWidth, height: targetHeight } = targetSize;
      const imgAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;

      let srcX = 0;
      let srcY = 0;
      let srcWidth = img.width;
      let srcHeight = img.height;

      const facePos = getFacePosition(targetWidth, targetHeight);
      const faceCenterY = facePos.faceY + facePos.faceHeight / 2;
      const imgCenterY = img.height / 2;
      const yOffset = (faceCenterY - imgCenterY) * 0.3;

      if (imgAspect > targetAspect) {
        srcWidth = img.height * targetAspect;
        srcHeight = img.height;
        srcX = (img.width - srcWidth) / 2;
        srcY = Math.max(0, Math.min(img.height - srcHeight, -yOffset));
      } else {
        srcWidth = img.width;
        srcHeight = img.width / targetAspect;
        srcX = 0;
        srcY = Math.max(0, Math.min(img.height - srcHeight, -yOffset));
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.fillStyle = BG_COLORS[color].hex;
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      ctx.drawImage(
        img,
        srcX, srcY, srcWidth, srcHeight,
        0, 0, targetWidth, targetHeight
      );

      try {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

        if (Platform.OS === 'web') {
          resolve(dataUrl);
        } else {
          const base64 = dataUrl.split(',')[1];
          const filename = `idphoto_${targetSize.name}_${color}_${Date.now()}.jpg`;
          const filepath = `${FileSystem.documentDirectory}${filename}`;

          FileSystem.writeAsStringAsync(filepath, base64, {
            encoding: FileSystem.EncodingType.Base64,
          }).then(() => {
            resolve(`file://${filepath}`);
          }).catch(reject);
        }
      } catch (e) {
        reject(e);
      }
    };

    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };

    img.src = imageUri;
  });
}

export async function applyBackgroundAndCrop(
  cutoutUri: string,
  color: BgColorType,
  targetSize: IDPhotoSize
): Promise<string> {
  return processIdPhoto(cutoutUri, color, targetSize);
}

export type { BgColorType };