import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Button, Input, SearchWithList } from '@components';
import { beautyTheme } from '@theme';
import { ServiceType } from '@types';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FormSectionProps } from '../CreateEventForm/type';

const ServiceEventFormSection: React.FC<FormSectionProps<ServiceType>> = ({
  form,
  onFormChangeHandler,
  listData = [],
  toggleAdditionalForm,
}) => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState('');

  const handlePriceInputBlur = (value: any) => {
    if (value) {
      const numericPrice = parseFloat(value);
      if (!isNaN(numericPrice)) {
        // setForm((prev) => ({ ...prev, price: formatCurrency(numericPrice, 'PLN') }));
      }
    }
  };

  const handleServiceSelect = (service: ServiceType) => {
    onFormChangeHandler('service')(service.id);
    setSearchValue(service.name);
  };

  return (
    <>
      <View>
        <View style={styles.sectionLabel}>
          <Icon
            name="brush"
            size={24}
            color={beautyTheme.colors.onSurfaceVariant}
          />
          <Text style={styles.timeLabel}>{t('form.serviceData')}</Text>
        </View>
        <SearchWithList
          label={t('form.selectService')}
          placeholder={t('form.typeToSearch')}
          list={listData}
          searchValue={searchValue}
          showOnList={(v) => v.name}
          handleInputChange={setSearchValue}
          onSelect={handleServiceSelect}
        />
        {/* {!listData.length && searchValue.length && (
          <Button
            mode="text"
            label={t('form.addService')}
            onPress={toggleAdditionalForm?.('service')}
            labelStyle={styles.btnLabel}
          />
        )} */}
      </View>
      <Input
        keyboardType="numeric"
        placeholder={t('form.price')}
        onChangeText={onFormChangeHandler('price')}
        onBlur={handlePriceInputBlur}
        value={form.price}
        label={t('form.price')}
      />
    </>
  );
};

export default ServiceEventFormSection;

const styles = StyleSheet.create({
  servicesSearch: {},
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
  btnLabel: {
    color: beautyTheme.colors.onBackground,
    fontWeight: beautyTheme.fontWeight.medium,
    textAlign: 'left',
    width: '100%',
  },
  suggestion: {},
  element: {},
});
