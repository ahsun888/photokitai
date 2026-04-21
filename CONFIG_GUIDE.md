# PhotoKit AI - 上线配置指南

## 1. remove.bg API Key 配置

**文件**: `src/hooks/usePhotoLogic.ts`

```typescript
const API_KEYS = [
  "你的KEY1",
  "你的KEY2",
  "你的KEY3",
];
```

**获取地址**: https://www.remove.bg/api
- 每个账号每月50次免费
- 注册多个账号实现 N×50 次/月
- 使用 `size=preview` 不扣额度

---

## 2. AdMob 广告 ID 配置

**文件**: `src/hooks/useAdMob.ts`

### 测试 ID（官方提供，永不封号）

```typescript
// 激励视频广告
const ADMOB_TEST_REWARDED = Platform.OS === 'ios'
  ? "ca-app-pub-3940256241526580/1712485313"
  : "ca-app-pub-3940256241526580/5224354917";

// 插屏广告
const ADMOB_TEST_INTERSTITIAL = Platform.OS === 'ios'
  ? "ca-app-pub-3940256241526580/4411775228"
  : "ca-app-pub-3940256241526580/1032688296";
```

### 正式 ID（上线前替换）

```typescript
// 替换为你的正式广告单元 ID
const ADMOB_REWARDED = Platform.OS === 'ios'
  ? "ca-app-pub-你的iOS ID/你的激励视频ID"
  : "ca-app-pub-你的Android ID/你的激励视频ID";
```

---

## 3. RevenueCat 内购配置

**文件**: `src/hooks/usePurchase.ts`

### 测试 Key

```typescript
const REVENUECAT_KEY = "pub_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
```

### 正式 Key（上线前替换）

```typescript
// iOS
const REVENUECAT_KEY = "appl_你的苹果Key";

// Android
const REVENUECAT_KEY = "goog_你的谷歌Key";
```

### 内购商品 ID（必须在后台创建）

```
com.photokitai.vip.weekly    → 周会员 $3.99
com.photokitai.vip.monthly   → 月会员 $7.99
com.photokitai.vip.yearly    → 年会员 $39.99
```

### Entitlement ID

```
pro
```

---

## 4. 内购测试方法

### iOS 测试
1. 使用 Xcode 开发
2. 登录 Sandbox Apple ID
3. 测试购买

### Android 测试
1. 开启内部测试
2. 添加许可证测试账号
3. 使用测试卡号：4242 4242 4242 4242

---

## 5. 隐私政策

**文件**: `PRIVACY.md`

- 已包含完整隐私政策
- 可直接部署到 GitHub Pages
- 提交给 App Store / Google Play 审核

---

## 6. 应用图标与启动屏

**路径**: `assets/`

```
assets/
├── icon.png                 # 应用图标
├── splash-icon.png          # 启动图标
├── favicon.png             # 网页图标
└── images/
    ├── android-icon-background.png
    ├── android-icon-foreground.png
    └── android-icon-monochrome.png
```

---

## 7. 应用配置

**文件**: `app.json`

```json
{
  "expo": {
    "name": "PhotoKit AI",
    "slug": "photokitai",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain"
    }
  }
}
```

---

## 8. 一键启动命令

```bash
# 开发模式
npx expo start

# Web 预览
npx expo start --web

# Android 预览
npx expo start --android

# iOS 预览（仅 Mac）
npx expo start --ios
```

---

## 9. 完整功能清单

- ✅ AI 证件照制作
- ✅ 多 Key 轮询（无限免费额度）
- ✅ 免费次数限制
- ✅ 看广告增加次数
- ✅ 会员订阅系统
- ✅ 内购支付（RevenueCat）
- ✅ AdMob 广告
- ✅ 会员去水印
- ✅ 保存到相册
- ✅ 隐私政策
- ✅ 完整的 UI 界面

---

## 10. 下一步上线准备

### iOS (App Store)
1. 注册 Apple Developer Program
2. 创建 App Store Connect 应用
3. 配置内购（App Store Connect）
4. 配置 RevenueCat（iOS）
5. 提交审核

### Android (Google Play)
1. 注册 Google Play Developer
2. 创建 Play Console 应用
3. 配置内购（Play Console）
4. 配置 RevenueCat（Google Play）
5. 提交审核

---

**配置完成后即可上架商店！** 🚀