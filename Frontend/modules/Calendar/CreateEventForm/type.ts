import { EventForm } from '@types';

export type CreateEventFormProps = {
  onEventCreateRequest: () => Promise<void>;
  initialState?: EventForm;
  initialDateState: { start: string; end: string };
  currentBottomSheetIndex?: number;
  toggleFormVisibility?: (dates: { start?: string; end?: string }) => void;
};

export type FormSectionProps = {
  form: EventForm;
  onFormChangeHandler: (key: keyof EventForm) => (value: string) => void;
};
