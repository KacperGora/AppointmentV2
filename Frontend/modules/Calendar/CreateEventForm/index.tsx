import React, { useEffect, useState } from 'react';

import { TouchableOpacity, View } from 'react-native';

import { Button, CustomBottomSheet, DatePicker, Input, SearchWithList } from '@components';
import { api, apiRoutes, fromIntervalToMinutes, getFullName, useAuth } from '@helpers';
// import { CompanyServicesForm, CustomerForm } from '@modules';
import { useQuery } from '@tanstack/react-query';
import { beautyTheme } from '@theme';
import { CustomerType, EventForm, EventFormOptionType, ServiceType } from '@types';
import dayjs from 'dayjs';
import { CompanyServicesForm } from 'modules/Company';
import { CustomerForm } from 'modules/Customers';
import { useTranslation } from 'react-i18next';
import { Text, Title } from 'react-native-paper';

import CustomerEventFormSection from '../CustomerEventFormSection';
import DateSection from '../EventFormDateSection';
import ServiceEventFormSection from '../EventFormServiceSection';
import { styles } from './style';
import { CreateEventFormProps } from './type';
import {
  formatCurrency,
  handlePriceChange,
  initialFormState,
  isEventDurationLongerThanADay,
  validateEvent,
} from './utils';

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  initialState,
  initialDateState,
  onEventCreateRequest,
  toggleFormVisibility,
}) => {
  const { t } = useTranslation();
  const { userId } = useAuth();

  const [isFormValid, setIsFormValid] = useState(false);
  const [eventForm, setEventForm] = useState<EventForm>(() => ({
    start: initialDateState.start,
    end: initialDateState.end,
    clientId: initialState?.clientId ?? initialFormState.clientId,
    notes: initialState?.notes ?? initialFormState.notes,
    service: initialState?.service ?? initialFormState.service,
  }));

  const [filteredOptions, setFilteredOptions] = useState<{
    clients: CustomerType[];
    services: ServiceType[];
  }>({
    clients: [],
    services: [],
  });

  const [isOptionFormVisible, setIsOptionFormVisible] = useState<{
    client: boolean;
    service: boolean;
  }>({
    client: false,
    service: false,
  });

  const toggleCreateOption = (name: 'service' | 'client') => () => {
    setIsOptionFormVisible((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChange = (name: keyof EventForm) => (value: string) => {
    if (name === 'price') {
      setEventForm((prev) => ({ ...prev, price: handlePriceChange(value) }));
      return;
    }
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!isFormValid) return;
      await api.post(apiRoutes.event.create, eventForm);
      await onEventCreateRequest();
    } catch (error) {
      console.error('Error while creating event', error);
    } finally {
      setEventForm(initialFormState);
    }
  };

  useEffect(() => {
    const { end, start } = initialDateState;
    setEventForm((prev) => ({ ...prev, start, end }));
  }, [initialDateState]);

  useEffect(() => {
    setIsFormValid(validateEvent(eventForm).success);
  }, [eventForm]);

  useEffect(() => {
    if (isEventDurationLongerThanADay(eventForm.start, eventForm.end)) {
      setEventForm((prev) => ({ ...prev, end: eventForm.start }));
    }
  }, [eventForm.start, eventForm.end]);

  if (Object.values(isOptionFormVisible).some((value) => value)) {
    return isOptionFormVisible.client ? (
      <CustomerForm onClose={toggleCreateOption('client')} />
    ) : (
      <CompanyServicesForm onClose={toggleCreateOption('service')} />
    );
  }

  return (
    <CustomBottomSheet isVisible onClose={() => toggleFormVisibility?.({ start: '', end: '' })}>
      <Title style={styles.formTitle}>{t('calendar.addNewVisit')}</Title>
      <View style={styles.formContainer}>
        <CustomerEventFormSection form={eventForm} onFormChangeHandler={handleChange} />
        <ServiceEventFormSection form={eventForm} onFormChangeHandler={handleChange} />
        <DateSection form={eventForm} onFormChangeHandler={handleChange} />
        <Button
          label={t('form.save')}
          onPress={handleSubmit}
          labelStyle={styles.submitBtnLabel}
          isDisabled={!isFormValid}
        />
      </View>
    </CustomBottomSheet>
  );
};

export default CreateEventForm;
