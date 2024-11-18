import { weekdaysMap } from '@/constants/days';
import { barberOpeningHoursCache } from '@/constants/requestCacheNames';
import { useToast } from '@/hooks/useToast';
import { createAppointment } from '@/services/appointment';
import { getBarberOpeningHours } from '@/services/barberOpeningHours';
import { CreateAppointmentDto } from '@/types/appointment';
import { BarberOpeningHours, WeekdayOutput } from '@/types/barberOpeningHours';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const useSchedule = (serviceId: string) => {
  dayjs.locale('pt-br');

  const { barberShopId } = useParams();

  const {
    mutate: createAppointmentMutate,
    isPending: isCreateAppointmentPending,
  } = useMutation({
    mutationFn: async (dto: CreateAppointmentDto) => {
      await createAppointment(dto);
      return dto;
    },

    onSuccess: () => {
      handleCloseModal();
      toast({
        title: 'Agendamento realizado com sucesso',
        className: 'h-20',
        variant: 'success',
      });
    },

    onError: () => {
      handleCloseModal();
      toast({
        title: 'Falha ao realizar agendamento',
        className: 'h-20',
        variant: 'error',
      });
    },
  });

  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // August 25, 2020
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    new Date(2024, 10, 13),
  ); // August 23, 2020 (Sunday)

  const { data: barberOpeningHours } = useQuery<BarberOpeningHours>({
    queryKey: [barberOpeningHoursCache],
    queryFn: async () => (await getBarberOpeningHours(barberShopId!)).data,
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log('🚀 ~ useSchedule ~ barberOpeningHours:', barberOpeningHours);
  useEffect(() => {
    if (selectedDate) {
      const sunday = new Date(selectedDate);
      sunday.setDate(selectedDate.getDate() - selectedDate.getDay());
      setCurrentWeekStart(sunday);
    }
  }, [selectedDate]);

  const handleDateChange = (increment: number) => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7 * increment);
    setCurrentWeekStart(newWeekStart);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(new Date(date));
  };

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
  };

  const today = dayjs();

  const [currentWeek, setCurrentWeek] = useState(today.startOf('week'));
  const [selectedDay, setSelectedDay] = useState<WeekdayOutput | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

  const clearSelected = () => {
    setSelectedDay(null);
    setSelectedHour(null);
    setSelectedMinute(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'));
    clearSelected();
  };

  const handlePreviousWeek = () => {
    if (currentWeek.isAfter(today.startOf('week'))) {
      setCurrentWeek(currentWeek.subtract(1, 'week'));
      clearSelected();
    }
  };

  const getDaysOfWeek = (): Dayjs[] => {
    const today = dayjs();
    return Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));
  };

  const handleCloseModal = () => {
    clearSelected();
    setCurrentWeek(today.startOf('week'));
    setIsOpen(false);
  };

  const handleFinishScheduling = () => {
    if (
      selectedDate !== null &&
      selectedHour !== null &&
      selectedMinute !== null
    ) {
      if (barberShopId) {
        selectedDate.setHours(selectedHour, selectedMinute);
        createAppointmentMutate({
          date: selectedDate,
          barberServiceId: serviceId,
          barberShopId: barberShopId,
        });
      }
    }
  };

  const daysOfWeek = useMemo(() => getDaysOfWeek(), []);

  const isCurrentWeek = useMemo(
    () => currentWeek.isSame(today.startOf('week'), 'week'),
    [currentWeek, today],
  );

  const todayDayOfWeek = today.day();

  const availableDays = useMemo(
    () =>
      barberOpeningHours?.weekdays
        // Mostra apenas os dias a partir de hoje
        .filter(
          (weekday) =>
            !isCurrentWeek || weekdaysMap[weekday.name] >= todayDayOfWeek,
        )
        .map((weekday) => {
          const matchedDate = currentWeek.day(weekdaysMap[weekday.name]);
          return { ...weekday, date: matchedDate };
        }),
    [barberOpeningHours?.weekdays, currentWeek, isCurrentWeek, todayDayOfWeek],
  );

  return {
    isOpen,
    currentWeekStart,
    selectedDate,
    selectedTime,
    barberOpeningHours,
    selectedDay,
    selectedHour,
    selectedMinute,
    daysOfWeek,
    availableDays,
    weekdaysMap,
    today,
    todayDayOfWeek,
    isCurrentWeek,
    currentWeek,
    isCreateAppointmentPending,
    handleCloseModal,
    setSelectedDay,
    setSelectedHour,
    setSelectedMinute,
    handleNextWeek,
    handlePreviousWeek,
    setIsOpen,
    handleDateChange,
    handleDateSelect,
    handleTimeSelect,
    handleFinishScheduling,
  };
};
