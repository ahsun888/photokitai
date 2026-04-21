import { useState, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { usePurchase } from '../src/hooks/usePurchase';
import { i18n } from '../src/i18n';

export default function VipScreen() {
  const { restore } = usePurchase();
  const [, forceUpdate] = useState({});

  const handleRestore = async () => {
    const success = await restore();
    if (success) {
      alert(i18n.t('success'));
    } else {
      alert(i18n.t('error'));
    }
  };

  const handleWeekly = () => {
    alert('Weekly: $3.99 - ' + i18n.t('short_term'));
  };

  const handleMonthly = () => {
    alert('Monthly: $7.99 - ' + i18n.t('most_popular'));
  };

  const handleYearly = () => {
    alert('Yearly: $39.99 - ' + i18n.t('best_value'));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⭐ {i18n.t('unlock_vip')}</Text>
        <Text style={styles.subtitle}>
          {i18n.t('vip_benefits')}
        </Text>
      </View>

      <Card style={[styles.card, styles.clickable]} onPress={handleWeekly}>
        <Card.Content>
          <Text style={styles.planTitle}>{i18n.t('weekly')}</Text>
          <Text style={styles.price}>$3.99 / {i18n.t('weekly')}</Text>
          <Text style={styles.desc}>{i18n.t('short_term')}</Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.clickable]} onPress={handleMonthly}>
        <Card.Content>
          <Text style={styles.planTitle}>{i18n.t('monthly')}</Text>
          <Text style={styles.price}>$7.99 / {i18n.t('monthly')}</Text>
          <Text style={styles.desc}>{i18n.t('most_popular')}</Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.bestCard, styles.clickable]} onPress={handleYearly}>
        <Card.Content>
          <Text style={styles.planTitle}>{i18n.t('yearly')}</Text>
          <Text style={styles.price}>$39.99 / {i18n.t('yearly')}</Text>
          <Text style={styles.desc}>{i18n.t('best_value')}</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttons}>
        <Button mode="contained" style={styles.btn} onPress={handleRestore}>
          {i18n.t('restore')}
        </Button>
      </View>

      <View style={styles.foot}>
        <Text style={styles.footText}>
          {i18n.t('payment_notice')}
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
  clickable: {
    cursor: 'pointer',
  },
});