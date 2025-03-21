import { EventForm } from '@types';

export type CreateEventFormProps = {
  onEventCreateRequest: () => Promise<void>;
  initialState?: EventForm;
  initialDateState: { start: string; end: string };
  currentBottomSheetIndex?: number;
  toggleFormVisibility?: (dates: { start?: string; end?: string }) => void;
};

export type FormSectionProps<T> = {
  form: EventForm;
  onFormChangeHandler: (
    key: keyof EventForm,
  ) => (value: EventForm[keyof EventForm]) => void;
  listData?: T[];
  toggleAdditionalForm?: (key: string) => () => void;
};
