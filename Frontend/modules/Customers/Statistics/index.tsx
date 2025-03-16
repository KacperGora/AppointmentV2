import React from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@components';
import { api, apiRoutes } from '@helpers';
import { useQuery } from '@tanstack/react-query';
import { beautyTheme } from '@theme';
import { CustomerType } from '@types';
import { useTranslation } from 'react-i18next';

const { path, queryKey } = apiRoutes.client.getStatistics;

interface StatisticsData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  mostValuableUser: CustomerType;
  newUsersThisMonth: number;
  newUsersThisWeek: number;
  newestUser: CustomerType;
}

const Statistics: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<StatisticsData>({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await api.get(path);
      return data;
    },
  });

  if (isLoading || !data) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statSection}>
        <Text style={styles.statTitle}>{t('client.newCustomers')}</Text>
        <View style={styles.statValueContainer}>
          <Text style={styles.statValue}>
            {t('client.thisMonth', { count: data.newUsersThisMonth })}
          </Text>
          <Text style={styles.statValue}>
            {t('client.thisWeek', { count: data.newUsersThisWeek })}
          </Text>
        </View>
      </View>

      <View style={styles.statSection}>
        <Text style={styles.statTitle}>{t('client.newCustomersThisWeek')}</Text>
        <Text style={styles.statValue}>{data.newUsersThisWeek}</Text>
      </View>

      <View style={styles.statSection}>
        <Text style={styles.statTitle}>{t('client.mostValuableCustomer')}</Text>
        <Text style={styles.statValue}>
          {data.mostValuableUser.name} {data.mostValuableUser.lastName}
        </Text>
      </View>

      <View style={styles.statSection}>
        <Text style={styles.statTitle}>{t('client.newestCustomer')}</Text>
        <Text style={styles.statValue}>
          {data.newestUser.name} {data.newestUser.lastName}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: beautyTheme.colors.background,
    padding: 16,
  },
  statSection: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: beautyTheme.colors.secondaryContainer,
    shadowColor: beautyTheme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  statTitle: {
    fontSize: beautyTheme.fontSizes.medium,
    fontWeight: '600',
    color: beautyTheme.colors.onSecondaryContainer,
    marginBottom: 8,
  },
  statValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statValue: {
    fontSize: beautyTheme.fontSizes.large,
    color: beautyTheme.colors.primary,
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 18,
    color: beautyTheme.colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
});
