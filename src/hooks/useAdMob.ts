import { useState } from 'react';
import { Platform } from 'react-native';
import { AdMobRewarded } from 'expo-ads-admob';
import { useUserStore } from '../../store/userStore';

const UNIT_ID = Platform.OS === 'ios'
  ? 'ca-app-pub-3940256241526580/1712485313'
  : 'ca-app-pub-3940256241526580/5224354917';

export function useAd() {
  const [loading, setLoading] = useState(false);
  const addAdCount = useUserStore((s) => s.addAdCount);

  const showAd = async () => {
    setLoading(true);
    await AdMobRewarded.requestAdAsync({
      unitId: UNIT_ID,
    });
    await AdMobRewarded.showAdAsync();

    AdMobRewarded.addEventListener('rewarded', () => {
      addAdCount(3);
    });
    setLoading(false);
  };

  return { showAd, loading };
}