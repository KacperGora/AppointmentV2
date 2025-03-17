import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button, Input, SearchWithList } from '@components';
import { fromIntervalToMinutes } from '@helpers';
import { beautyTheme } from '@theme';
import { EventForm, ServiceType } from '@types';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type EventFormServiceSectionType = {
  form: EventForm;
  onFormChangeHandler: (key: keyof EventForm) => (value: string) => void;
};

const ServiceEventFormSection: React.FC<EventFormServiceSectionType> = ({
  form,
  onFormChangeHandler,
}) => {
  const { t } = useTranslation();
  const search = {
    servicesSearch: '',
  };

  const [isServiceFormVisible, setIsServiceFormVisible] = useState(false);

  const handlePriceInputBlur = (value: any) => {
    if (value) {
      const numericPrice = parseFloat(value);
      if (!isNaN(numericPrice)) {
        // setForm((prev) => ({ ...prev, price: formatCurrency(numericPrice, 'PLN') }));
      }
    }
  };
  const handleServiceSelect = (service: ServiceType) => {
    const durationMinutes = fromIntervalToMinutes(service.duration);
    const startDate = dayjs(form.start);
    if (startDate.isValid()) {
      const end = startDate.add(durationMinutes, 'minutes').toISOString();
      //   setEventForm((prev) => ({ ...prev, service: service.name, end }));
    } else {
      throw new Error('Invalid date');
    }
    // setEventForm((prev) => ({ ...prev, price: service.price }));
    // setSearch((prev) => ({ ...prev, servicesSearch: service.name }));
    // setFilteredOptions((prev) => ({ ...prev, services: [] }));
  };
  const toggleCreateOption = () => {
    setIsServiceFormVisible((prev) => !prev);
  };

  const renderListOption = ({ item }: { item: ServiceType }) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => null} style={styles.suggestion}>
        <Text style={styles.element}>{'nameValue'}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View>
        <View style={styles.timeLabelContainer}>
          <Icon name="brush" size={24} color={beautyTheme.colors.onSurfaceVariant} />
          <Text style={styles.timeLabel}>{t('form.serviceData')}</Text>
        </View>
        {/* <SearchWithList
          label={t('form.selectService')}
          placeholder={t('form.typeToSearch')}
          list={[]}
          // renderItem={renderListOption}
          searchValue={search.servicesSearch}
          // handleInputChange={handleOptionSearch('services')}
        /> */}
        {/* {isAddServiceFormVisible && (
          <Button
            mode="text"
            label={t('form.addService')}
            onPress={toggleCreateOption}
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
  suggestion: {},
  element: {},
});
