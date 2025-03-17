import React from 'react';

import { StyleSheet, View } from 'react-native';

import { DatePicker } from '@components';
import { beautyTheme } from '@theme';
import { EventForm } from '@types';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FormSectionProps } from '../CreateEventForm/type';

const DateSection: React.FC<FormSectionProps> = ({ form, onFormChangeHandler }) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.timeLabelContainer}>
        <Icon name="calendar-clock" size={24} color={beautyTheme.colors.onSurfaceVariant} />
        <Text style={styles.timeLabel}>{t('form.appointmentDate')}</Text>
      </View>
      <DatePicker
        label={t('calendar.startDate')}
        value={form.start}
        onChange={onFormChangeHandler('start')}
        minDate={dayjs()?.toISOString()}
      />
      <DatePicker
        label={t('calendar.endDate')}
        value={form.end}
        onChange={onFormChangeHandler('end')}
        minDate={form.start}
      />
    </View>
  );
};

export default DateSection;

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
});
