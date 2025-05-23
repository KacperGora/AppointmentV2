import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { api, DATE_FORMAT_FULL_MONTH_WITH_YEAR } from '@helpers';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  CalendarKitHandle,
  EventItem,
  OnCreateEventResponse,
  OnEventResponse,
} from '@howljs/calendar-kit';
import { CreateEventForm } from '@modules';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { beautyTheme } from '@theme';
import { EventForm } from '@types';
import dayjs from 'dayjs';
import 'intl-pluralrules';

import {
  CALENDAR_ENUM,
  calendarContainerConfig,
  eventEmptyState,
} from './utils';

const { withoutWeekends } = CALENDAR_ENUM;

export type CalendarRouteProp = {
  params: {
    mode: number;
    onMonthChange: (date: string) => void;
  };
  currentBottomSheetIndex?: number;
};

const fetchList = async () => {
  const { data } = await api.get('event/getEvents');
  const parseEvents = data.map((event: any) => {
    return {
      ...event,
      id: Math.random().toString(),
      title: event.clientId,
      start: { dateTime: event.startTime },
      end: { dateTime: event.endTime },
      color: beautyTheme.colors.inverseOnSurface,
    };
  });
  console.log(parseEvents);

  return parseEvents;
};

const Calendar = forwardRef<CalendarKitHandle, CalendarRouteProp>(
  ({ params, currentBottomSheetIndex }, ref) => {
    const { mode } = useMemo(() => params, [params]);
    const navigation = useNavigation();

    const { data, isLoading, refetch, dataUpdatedAt } = useQuery<EventItem[]>({
      queryKey: ['events'],
      queryFn: fetchList,
      enabled: true,
    });
    console.log(data);
    const [isEventFormVisible, setEventFormVisible] = useState(false);
    const [initialDate, setInitialDate] = useState({ start: '', end: '' });

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [eventForm, setEventForm] = useState<EventForm>(eventEmptyState);

    const toggleEventForm = ({
      start,
      end,
    }: {
      start: string;
      end: string;
    }) => {
      setEventFormVisible((prev) => !prev);
      setInitialDate({ start, end });
    };

    const handleEventChange = (event: OnCreateEventResponse) => {
      const {
        start: { dateTime: start },
        end: { dateTime: end },
      } = event;
      setEventForm((prev) => ({
        ...prev,
        start,
        end,
      }));
      toggleEventForm({ start, end });
      bottomSheetRef.current?.expand();
    };

    const onDragEventEnd = (event: OnEventResponse) => {
      const { start, end, id } = event;
      const eventToUpdate = data?.find(
        ({ id: eventId }) => eventId === id,
      ) as EventItem;

      if (!eventToUpdate) return;
      setEventForm((prev) => ({
        ...prev,
        ...eventToUpdate,
        clientId: eventToUpdate.clientId,
        service: eventToUpdate.service,
        start: start.dateTime || '',
        end: end.dateTime || '',
        notes: eventToUpdate.notes,
      }));

      toggleEventForm({ start: start.dateTime || '', end: end.dateTime || '' });
    };

    const handleDateChange = (date: string) => {
      const { onMonthChange } = params;
      onMonthChange(
        dayjs(date).locale('pl').format(DATE_FORMAT_FULL_MONTH_WITH_YEAR),
      );
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener('state', () => {
        refetch();
        // onFormToggle({});
        bottomSheetRef.current?.close();
      });

      return unsubscribe;
    }, [dataUpdatedAt, refetch, navigation]);

    return (
      <>
        <CalendarContainer
          ref={ref}
          events={data}
          hideWeekDays={mode === withoutWeekends ? [5, 6] : []}
          numberOfDays={mode}
          onDateChanged={handleDateChange}
          onDragEventEnd={onDragEventEnd}
          onDragCreateEventEnd={handleEventChange}
          onRefresh={fetchList}
          allowDragToCreate={!Boolean(currentBottomSheetIndex)}
          {...calendarContainerConfig}
        >
          <CalendarHeader />
          <CalendarBody showNowIndicator />
        </CalendarContainer>
        {isEventFormVisible && (
          <CreateEventForm
            initialDateState={initialDate}
            toggleFormVisibility={() => toggleEventForm({ end: '', start: '' })}
            onEventCreateRequest={async () => {}}
          />
        )}
      </>
    );
  },
);

export default Calendar;
