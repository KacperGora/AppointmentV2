import React, { useEffect, useState } from 'react';

import { Alert, Dimensions, StyleSheet, View } from 'react-native';

import { Button, CustomBottomSheet, Input } from '@components';
import { api, apiRoutes } from '@helpers';
import { useMutation } from '@tanstack/react-query';
import FormTitle from 'components/FormTitle';
import TextInputWithCounter from 'components/TextInputWithCounter';
import { useTranslation } from 'react-i18next';
import { colors } from 'theme/theme';

import { Client, CustomerComponentProps } from './type';
import {
  customerFieldsConfig,
  initialCustomerFormValues,
  validateCustomerFormSchema,
} from './utils';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const CustomerForm: React.FC<CustomerComponentProps> = ({ onClose = () => {} }) => {
  const { t } = useTranslation();
  const [clientForm, setClientForm] = useState<Client>(initialCustomerFormValues);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (client: Client) => {
      await api.post(apiRoutes.client.addClient.path, client);
    },
    onSuccess: () => {
      onClose();
    },
    onError: (error) => {
      // Alert.alert(error.message, error.message)
    },
  });

  const handleChange = (key: keyof Client) => (value: string) => {
    setClientForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!validateCustomerFormSchema(clientForm).success) return;
    await mutateAsync(clientForm);
  };

  return (
    <CustomBottomSheet isVisible onClose={onClose} snapPoints={[WINDOW_HEIGHT * 0.25]}>
      <FormTitle title={t('client.addCustomer')} onClose={onClose} />
      <View style={styles.formWrapper}>
        {customerFieldsConfig.map(({ placeholder, value, key, keyboardType, maxLength }) => (
          <Input
            key={key}
            style={styles.input}
            placeholder={t(placeholder)}
            value={clientForm[value as keyof Client] || ''}
            onChangeText={handleChange(key as keyof Client)}
            keyboardType={keyboardType || 'default'}
            maxLength={maxLength}
            withCounter={false}
          />
        ))}
        <TextInputWithCounter
          maxLength={500}
          onChangeText={handleChange('notes')}
          placeholder={t('form.notes')}
          value={clientForm.notes || ''}
          multiline
          style={styles.textArea}
        />
        <Button
          label={isPending ? t('form.saving') : t('form.save')}
          onPress={handleSubmit}
          isDisabled={isPending || !validateCustomerFormSchema(clientForm).success}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        />
        <Button label={t('form.goBack')} onPress={onClose} mode="outlined" />
      </View>
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  input: { backgroundColor: '#fff' },
  textArea: { height: 100 },
  button: { width: '100%' },
  buttonLabel: { color: colors.white, textAlign: 'center' },
  formWrapper: { gap: 16 },
});

export default CustomerForm;
