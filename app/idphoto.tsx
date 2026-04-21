import { useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { usePhotoLogic } from '../src/hooks/usePhotoLogic';
import { useBgColor } from '../src/hooks/useBgColor';
import { useSavePhoto } from '../src/hooks/useSavePhoto';
import { IDPhotoUI } from '../src/components/IDPhotoUI';

export default function IDPhotoScreen() {
  const {
    originalUri, cutoutUri, loading,
    freeCount, adCount, isVip,
    pickImage, doRemoveBg, watchAd
  } = usePhotoLogic();

  const { bgColor, resultUri, applyBg } = useBgColor(cutoutUri);
  const { save } = useSavePhoto(resultUri, isVip);

  useEffect(() => { MediaLibrary.requestPermissionsAsync(); }, []);

  return (
    <IDPhotoUI
      originalUri={originalUri}
      cutoutUri={cutoutUri}
      resultUri={resultUri}
      loading={loading}
      bgColor={bgColor}
      freeCount={freeCount}
      adCount={adCount}
      isVip={isVip}
      onPick={pickImage}
      onRemoveBg={doRemoveBg}
      onApplyBg={applyBg}
      onSave={save}
      onWatchAd={watchAd}
    />
  );
}