import { Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import WebPressable from '../../src/components/WebPressable';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PhotoKit AI 证件照</Text>

      <WebPressable
        style={styles.btn}
        onPress={() => router.push('/idphoto')}
      >
        <Text style={styles.btnText}>开始制作证件照</Text>
      </WebPressable>

      <WebPressable
        style={styles.vipBtn}
        onPress={() => router.push('/vip')}
      >
        <Text style={styles.btnText}>会员中心</Text>
      </WebPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  btn: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  vipBtn: {
    width: '100%',
    backgroundColor: '#FF6600',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});