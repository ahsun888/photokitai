import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const addBackgroundColor = async (
  imageUri: string,
  color: 'white' | 'red' | 'blue'
) => {
  const colorHex =
    color === 'white' ? '#ffffff' :
    color === 'red' ? '#ff0000' :
    '#0000ff';

  const result = await manipulateAsync(
    imageUri,
    [],
    {
      format: SaveFormat.PNG,
      base64: true,
      backgroundColor: colorHex,
    }
  );

  return result;
};

export const removeBackgroundApi = async (
  imageBase64: string,
  apiKey: string
) => {
  const res = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({
      image_file_b64: imageBase64,
      size: 'preview',
    }),
  });

  const blob = await res.blob();
  const uri = URL.createObjectURL(blob);
  return uri;
};
