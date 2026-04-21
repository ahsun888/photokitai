import { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, {
  PurchasesPackage,
} from 'react-native-purchases';
import { useUserStore } from '../../store/userStore';

const REVENUECAT_KEY = Platform.OS === 'ios'
  ? '苹果APPLE_KEY'
  : '谷歌GOOGLE_KEY';

export function usePurchase() {
  const setVip = useUserStore((s) => s.setVip);

  useEffect(() => {
    async function init() {
      await Purchases.configure({ apiKey: REVENUECAT_KEY });
      const info = await Purchases.getCustomerInfo();
      const isPro = info.entitlements.active['pro'] !== undefined;
      setVip(isPro);
    }
    init();
  }, []);

  const purchasePackage = async (pkg: PurchasesPackage) => {
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
    const res = await Purchases.restorePurchases();
    const isPro = res.entitlements.active['pro'] !== undefined;
    setVip(isPro);
    return isPro;
  };

  return { purchasePackage, restore };
}