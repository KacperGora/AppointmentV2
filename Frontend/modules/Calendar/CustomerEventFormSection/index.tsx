import React, { useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Button, SearchWithList } from '@components';
import { api, apiRoutes, getFullName } from '@helpers';
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

const CustomerEventFormSection: React.FC<FormSectionProps<CustomerType>> = ({
  onFormChangeHandler,
  listData = [],
}) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const filteredClients = listData.filter((client) =>
    getFullName(client.name, client.lastName)
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  const showElement = (item: CustomerType) => {
    const { lastName, name, phoneNumber } = item;
    return `${getFullName(name, lastName)} - ${phoneNumber}`;
  };

  const handleCustomerSelect = (client: CustomerType) => {
    onFormChangeHandler('clientId')(client.id);
    setSearchValue(getFullName(client.name, client.lastName));
  };

  return (
    <View>
      <View style={styles.sectionLabel}>
        <Icon
          name="account-outline"
          size={24}
          color={beautyTheme.colors.onSurfaceVariant}
        />
        <Text style={styles.timeLabel}>{t('form.customerData')}</Text>
      </View>
      <SearchWithList
        label={t('form.selectClient')}
        placeholder={t('form.typeToSearch')}
        list={filteredClients}
        searchValue={searchValue}
        showOnList={showElement}
        handleInputChange={setSearchValue}
        onSelect={handleCustomerSelect}
      />
    </View>
  );
};

export default CustomerEventFormSection;

const styles = StyleSheet.create({
  sectionLabel: {
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
});
