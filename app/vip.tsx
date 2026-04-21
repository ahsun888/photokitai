import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { usePurchase } from '../src/hooks/usePurchase';

export default function VipScreen() {
  const { restore } = usePurchase();

  const handleRestore = async () => {
    const success = await restore();
    if (success) {
      alert('购买已恢复');
    } else {
      alert('未找到购买记录');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⭐ 解锁高级会员</Text>
        <Text style={styles.subtitle}>
          无限制作证件照 | 无水印 | 无广告 | 高清导出
        </Text>
      </View>

      <Card style={styles.card} onPress={() => {}}>
        <Card.Content>
          <Text style={styles.planTitle}>周会员</Text>
          <Text style={styles.price}>$3.99 / 周</Text>
          <Text style={styles.desc}>短期使用首选</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => {}}>
        <Card.Content>
          <Text style={styles.planTitle}>月会员</Text>
          <Text style={styles.price}>$7.99 / 月</Text>
          <Text style={styles.desc}>最受欢迎</Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.bestCard]} onPress={() => {}}>
        <Card.Content>
          <Text style={styles.planTitle}>年会员</Text>
          <Text style={styles.price}>$39.99 / 年</Text>
          <Text style={styles.desc}>省 60%｜性价比之王</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttons}>
        <Button mode="contained" style={styles.btn} onPress={handleRestore}>
          恢复购买
        </Button>
      </View>

      <View style={styles.foot}>
        <Text style={styles.footText}>
          付款后将自动解锁全部功能 • 支持随时取消
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
    borderRadius: 16,
  },
  bestCard: {
    borderColor: '#FF6B00',
    borderWidth: 2,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    color: '#4A6FFF',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  buttons: {
    marginTop: 20,
  },
  btn: {
    marginBottom: 10,
  },
  foot: {
    marginTop: 30,
    alignItems: 'center',
  },
  footText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});