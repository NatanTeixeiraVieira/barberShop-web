import { barberOpeningHoursCache } from '@/constants/requestCacheNames';
import { useToast } from '@/hooks/useToast';
import { createAppointment } from '@/services/appointment';
import { getBarberOpeningHours } from '@/services/barberOpeningHours';
import { CreateAppointmentDto } from '@/types/appointment';
import { BarberOpeningHours, WeekdayOutput } from '@/types/barberOpeningHours';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';

export const useSchedule = () => {
  dayjs.locale('pt-br');

  const {
    mutate: createAppointmentMutatate,
    isPending: isCreateAppointmentPending,
  } = useMutation({
    mutationFn: async (dto: CreateAppointmentDto) => {
      await createAppointment(dto);
      return dto;
    },

    onSuccess: () => {
      setIsOpen(false);
      toast({
        title: 'Agendamento realizado com sucesso',
        className: 'h-20',
        variant: 'success',
      });
    },

    onError: () => {
      setIsOpen(false);
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
    queryFn: async () =>
      (await getBarberOpeningHours('45a0f749-9f59-475f-80c9-91121b8073fb'))
        .data,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const daysInWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const timeSlots = ['13:00', '14:00', '15:00', '16:00'];

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
    console.log('🚀 ~ handleDateSelect ~ date:', date);
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

  const clearSelecteds = () => {
    setSelectedDay(null);
    setSelectedHour(null);
    setSelectedMinute(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'));
    clearSelecteds();
  };

  const handlePreviousWeek = () => {
    if (currentWeek.isAfter(today.startOf('week'))) {
      setCurrentWeek(currentWeek.subtract(1, 'week'));
      clearSelecteds();
    }
  };

  const getDaysOfWeek = (): Dayjs[] => {
    const today = dayjs();
    return Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));
  };

  const handleCloseModal = () => {
    clearSelecteds();
    setCurrentWeek(today.startOf('week'));
  };

  const handleFinishScheduling = () => {
    if (
      selectedDate !== null &&
      selectedHour !== null &&
      selectedMinute !== null
    ) {
      selectedDate.setHours(selectedHour, selectedMinute);
      createAppointmentMutatate({
        date: selectedDate,
        barberServiceId: '002ff1ff-6353-4e89-b90f-23ec5ecf9696',
        barberShopId: '45a0f749-9f59-475f-80c9-91121b8073fb',
      });
    }
  };

  const daysOfWeek = getDaysOfWeek();

  const weekdaysMap: Record<string, number> = {
    seg: 1,
    ter: 2,
    qua: 3,
    qui: 4,
    sex: 5,
    sáb: 6,
    dom: 0,
  };

  const isCurrentWeek = currentWeek.isSame(today.startOf('week'), 'week');
  const todayDayOfWeek = today.day();

  const availableDays = barberOpeningHours?.weekdays
    .filter(
      (weekday) =>
        !isCurrentWeek || weekdaysMap[weekday.name] >= todayDayOfWeek,
    ) // Mostra apenas os dias a partir de hoje
    .map((weekday) => {
      const matchedDate = currentWeek.day(weekdaysMap[weekday.name]);
      return { ...weekday, date: matchedDate };
    });

  // const availableDays = schedule.barberOpeningHours?.weekdays
  //   .map((weekday) => {
  //     const matchedDay = daysOfWeek.find(
  //       (day) => day.format('ddd').toLowerCase() === weekday.name,
  //     );
  //     return { ...weekday, date: matchedDay };
  //   })
  //   .filter((day) => day.date && day.date.isAfter(today, 'day'));
  return {
    isOpen,
    daysInWeek,
    timeSlots,
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
