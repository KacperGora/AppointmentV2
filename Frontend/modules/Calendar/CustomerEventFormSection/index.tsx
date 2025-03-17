import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, SearchWithList } from '@components';
import { api, apiRoutes, fromIntervalToMinutes } from '@helpers';
import { useQuery } from '@tanstack/react-query';
import { beautyTheme } from '@theme';
import { CustomerType, ServiceType } from '@types';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FormSectionProps } from '../CreateEventForm/type';

const {
  event: {
    fetchEventOptions: { path: eventOptions, queryKey },
  },
} = apiRoutes;

const CustomerEventFormSection: React.FC<FormSectionProps> = ({ form, onFormChangeHandler }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading = false } = useQuery<{
    services: ServiceType[];
    clients: CustomerType[];
  }>({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data } = await api.get(eventOptions);
      if (!data) {
        throw new Error('No data');
      }
      return data || [];
    },
  });
  const handleClientSelect = (client: CustomerType) => {
    const { id: clientId, name, lastName } = client;
    // setEventForm((prev) => ({ ...prev, clientId }));
    // setSearch((prev) => ({ ...prev, clientsSearch: getFullName(name, lastName) }));
    // setFilteredOptions((prev) => ({ ...prev, clients: [] }));
  };
  const handleSearchChange = (v: string) => {
    setSearchValue(() => v);
  };

  const toggleForm = (option: 'clientF') => () => {};

  return (
    <View>
      <View style={styles.timeLabelContainer}>
        <Icon name="account-outline" size={24} color={beautyTheme.colors.onSurfaceVariant} />
        <Text style={styles.timeLabel}>{t('form.customerData')}</Text>
      </View>
      {/* <SearchWithList
        label={t('form.selectClient')}
        placeholder={t('form.typeToSearch')}
        list={data?.clients ?? []}
        // Item={null}
        // renderItem={renderItem('customer')}
        searchValue={searchValue}
        handleInputChange={handleSearchChange}
      /> */}
      {/* {isAddClientOptionVisible && (
        <Button
          label={t('form.addClient')}
          onPress={toggleForm('client')}
          labelStyle={styles.btnLabel}
          style={{ alignSelf: 'flex-start' }}
          mode="text"
        />
      )} */}
    </View>
  );
};

export default CustomerEventFormSection;

const styles = StyleSheet.create({
  timeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: beautyTheme.spacing.s,
    marginBottom: beautyTheme.spacing.xl,
    backgroundColor: beautyTheme.colors.surfaceDisabled,
    borderRadius: beautyTheme.shape.borderRadius,
    padding: beautyTheme.spacing.m,
  },
  timeLabel: {
    color: beautyTheme.colors.onBackground,
    fontWeight: 'bold',
    fontSize: beautyTheme.fontSizes.medium,
  },
  btnLabel: {
    color: beautyTheme.colors.onBackground,
    fontWeight: beautyTheme.fontWeight.medium,
    textAlign: 'left',
    width: '100%',
  },
});
