import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function HomeScreen() {
  const goToIDPhoto = () => {
    router.push('/idphoto');
  };

  const goToOldPhoto = () => {
    alert('老照片修复功能即将上线');
  };

  const goToCartoon = () => {
    alert('动漫头像功能即将上线');
  };

  const goToVip = () => {
    router.push('/vip');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        🎨 PhotoKit AI
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        一键制作证件照、修复老照片、生成动漫头像
      </Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* 证件照卡片 */}
        <TouchableOpacity onPress={goToIDPhoto}>
          <Card style={styles.card} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">📸 AI 证件照</Text>
              <Text variant="bodyMedium">
                一键制作标准证件照，支持红/蓝/白底色
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* 老照片修复卡片 */}
        <TouchableOpacity onPress={goToOldPhoto}>
          <Card style={styles.card} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">🌟 老照片修复</Text>
              <Text variant="bodyMedium">
                AI 智能修复，让老照片焕发新生
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* 动漫头像卡片 */}
        <TouchableOpacity onPress={goToCartoon}>
          <Card style={styles.card} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">🎭 动漫头像</Text>
              <Text variant="bodyMedium">
                将照片转换成动漫风格
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* 会员订阅卡片 */}
        <TouchableOpacity onPress={goToVip}>
          <Card style={[styles.card, styles.vipCard]} mode="outlined">
            <Card.Content>
              <Text variant="titleLarge">⭐ 高级会员</Text>
              <Text variant="bodyMedium">
                无限次制作 • 无水印 • 无广告
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    marginBottom: 16,
  },
  vipCard: {
    borderColor: '#FF6B00',
    borderWidth: 1,
  },
});
