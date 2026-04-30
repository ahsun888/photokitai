import { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, {
  PurchasesPackage,
} from 'react-native-purchases';
import { useUserStore } from '../../store/userStore';

const REVENUECAT_KEY = Platform.OS === 'ios'
  ? 'apple_api_key_here'
  : Platform.OS === 'android'
  ? 'google_api_key_here'
  : '';

export function usePurchase() {
  const setVip = useUserStore((s) => s.setVip);

  useEffect(() => {
    async function init() {
      if (Platform.OS === 'web') {
        return;
      }

      if (!REVENUECAT_KEY) {
        console.log('RevenueCat API key not configured');
        return;
      }

      try {
        await Purchases.configure({ apiKey: REVENUECAT_KEY });
        const info = await Purchases.getCustomerInfo();
        const isPro = info.entitlements.active['pro'] !== undefined;
        setVip(isPro);
      } catch (e) {
        console.log('RevenueCat initialization error:', e);
      }
    }
    init();
  }, []);

  const purchasePackage = async (pkg: PurchasesPackage) => {
    if (Platform.OS === 'web') {
      return false;
    }

    try {
      const res = await Purchases.purchasePackage(pkg);
      const isPro = res.entitlements.active['pro'] !== undefined;
      setVip(isPro);
      return true;
    } catch (e) {
      return false;
    }
  };

  const restore = async () => {
    if (Platform.OS === 'web') {
      return false;
    }

    try {
      const res = await Purchases.restorePurchases();
      const isPro = res.entitlements.active['pro'] !== undefined;
      setVip(isPro);
      return isPro;
    } catch (e) {
      return false;
    }
  };

  return { purchasePackage, restore };
}