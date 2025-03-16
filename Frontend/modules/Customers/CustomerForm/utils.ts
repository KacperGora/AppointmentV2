import i18next from 'i18next';
import { z } from 'zod';

import { Client } from './type';

const phoneNumberRegex = /^\d{9}$/;
const MAX_PHONE_NUMBER_LENGTH = 9;

export const initialCustomerFormValues = { name: '', lastName: '', phoneNumber: '', notes: '' };

export const customerFieldsConfig: Array<{
  placeholder: string;
  value: string;
  key: string;
  keyboardType?: 'phone-pad' | 'default';
  maxLength?: number;
}> = [
  {
    placeholder: 'form.name',
    value: 'name',
    key: 'name',
  },
  {
    placeholder: 'form.lastName',
    value: 'lastName',
    key: 'lastName',
  },
  {
    placeholder: 'form.phone',
    value: 'phoneNumber',
    key: 'phoneNumber',
    keyboardType: 'phone-pad',
    maxLength: MAX_PHONE_NUMBER_LENGTH,
  },
];

export const customerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: i18next.t('validation.nameIsRequired') }),
  lastName: z
    .string()
    .trim()
    .nonempty({ message: i18next.t('validation.lastNameIsRequied') }),
  phoneNumber: z
    .string()
    .optional()
    .refine((value) => !value || phoneNumberRegex.test(value), {
      message: i18next.t('validation.phoneNumberMustBeExact'),
    }),
  notes: z.string().optional(),
});

export const validateCustomerFormSchema = (form: Client) => {
  return customerFormSchema.safeParse(form);
};
