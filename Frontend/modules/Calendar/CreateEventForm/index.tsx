import React, { useEffect, useState } from 'react';

import { View } from 'react-native';

import { Button, CustomBottomSheet } from '@components';
import { api, apiRoutes } from '@helpers';
import { EventForm } from '@types';
import { useTranslation } from 'react-i18next';
import { Title } from 'react-native-paper';

import CustomerEventFormSection from '../CustomerEventFormSection';
import DateSection from '../EventFormDateSection';
import ServiceEventFormSection from '../ServiceEventFromSection';
import { useGetEventOptions } from './hook';
import { styles } from './style';
import { CreateEventFormProps } from './type';
import {
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

  const { data, isLoading } = useGetEventOptions();

  const [isFormValid, setIsFormValid] = useState(false);
  const [eventForm, setEventForm] = useState<EventForm>({
    start: initialDateState.start,
    end: initialDateState.end,
    clientId: initialState?.clientId ?? initialFormState.clientId,
    notes: initialState?.notes ?? initialFormState.notes,
    service: initialState?.service ?? initialFormState.service,
  });
  const [isAdditionalFormVisible, setIsAdditionalFormVisible] = useState({
    clientForm: false,
    serviceForm: false,
  });

  const [isOptionFormVisible, setIsOptionFormVisible] = useState<{
    client: boolean;
    service: boolean;
  }>({
    client: false,
    service: false,
  });

  const handleChange =
    (name: keyof EventForm) => (value: EventForm[keyof EventForm]) => {
      if (name === 'price') {
        setEventForm((prev) => ({ ...prev, price: handlePriceChange(value) }));
      } else {
        setEventForm((prev) => ({ ...prev, [name]: value }));
      }
    };

  const handleSubmit = async () => {
    try {
      if (!isFormValid) return;
      await api.post(apiRoutes.event.create, eventForm);
      await onEventCreateRequest();
    } catch (error) {
      // Handle the error if needed
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

  return (
    <CustomBottomSheet
      isVisible
      onClose={() => toggleFormVisibility?.({ start: '', end: '' })}
    >
      <Title style={styles.formTitle}>{t('calendar.addNewVisit')}</Title>
      <View style={styles.formContainer}>
        <CustomerEventFormSection
          listData={data.clients}
          form={eventForm}
          onFormChangeHandler={handleChange}
        />
        <ServiceEventFormSection
          listData={data.services}
          form={eventForm}
          onFormChangeHandler={handleChange}
        />
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
