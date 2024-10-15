import { barberOpeningHoursCache } from '@/constants/requestCacheNames';
import { getBarberOpeningHours } from '@/services/barberOpeningHours';
import { BarberOpeningHours } from '@/types/barberOpeningHours';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export const useSchedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // August 25, 2020
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    new Date(2024, 10, 6),
  ); // August 23, 2020 (Sunday)

  const { data: barberOpeningHours } = useQuery<BarberOpeningHours>({
    queryKey: [barberOpeningHoursCache],
    queryFn: async () =>
      (await getBarberOpeningHours('45a0f749-9f59-475f-80c9-91121b8073fb'))
        .data,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // const daysInWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  // const timeSlots = ['13:00', '14:00', '15:00', '16:00'];

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

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleFinishScheduling = () => {
    console.log(
      `Agendamento finalizado para ${selectedDate?.toLocaleDateString()} às ${selectedTime}`,
    );
    setIsOpen(false);
  };

  return {
    isOpen,
    // daysInWeek,
    // timeSlots,
    currentWeekStart,
    selectedDate,
    selectedTime,
    barberOpeningHours,
    setIsOpen,
    handleDateChange,
    handleDateSelect,
    handleTimeSelect,
    handleFinishScheduling,
  };
};
