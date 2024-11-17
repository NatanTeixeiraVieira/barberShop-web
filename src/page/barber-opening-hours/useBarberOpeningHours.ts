import { daysOfWeek } from '@/constants/days';
import { useToast } from '@/hooks/useToast';
import { createBarberOpeningHours } from '@/services/barberOpeningHours';
import {
  CreateOpeningHoursDto,
  CreateOpeningHoursDtoArray,
} from '@/types/barberOpeningHours';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type TimeSlot = {
  start: string;
  end: string;
};

type Schedule = {
  [key: string]: TimeSlot[];
};

export const useBarberOpeningHours = () => {
  const { barberShopId } = useParams();
  const [schedule, setSchedule] = useState<Schedule>({});
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [startHour, setStartHour] = useState<string>('09');
  const [startMinute, setStartMinute] = useState<string>('00');
  const [endHour, setEndHour] = useState<string>('17');
  const [endMinute, setEndMinute] = useState<string>('00');
  const { toast } = useToast();

  const { mutate: createBarberOpeningHoursMutate } = useMutation({
    mutationFn: async (dto: CreateOpeningHoursDtoArray) => {
      await createBarberOpeningHours(dto);
    },
    onSuccess: () => {},
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao salvar horários. Por favor, tente novamente.',
        variant: 'destructive',
      });
    },
  });

  const addTimeSlot = () => {
    const start = `${startHour}:${startMinute}`;
    const end = `${endHour}:${endMinute}`;

    if (start >= end) {
      toast({
        title: 'Horário inválido',
        description:
          'O horário de término deve ser posterior ao horário de início',
        variant: 'destructive',
      });
      return;
    }

    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), { start, end }],
    }));
    toast({
      title: 'Horário adicionado',
      description: `${selectedDay}: ${start} - ${end}`,
    });
  };

  const removeTimeSlot = (day: string, index: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
    toast({
      title: 'Horário removido',
      description: `Horário removido para ${day}`,
    });
  };

  const handleSubmit = async () => {
    if (!barberShopId) return;

    const weekdays: CreateOpeningHoursDto[] = [];

    Object.entries(schedule).forEach(([day, slots]) => {
      slots.forEach((slot) => {
        weekdays.push({
          weekday: day,
          start: slot.start,
          end: slot.end,
          barberShopId,
        });
      });
    });

    const payload: CreateOpeningHoursDtoArray = { weekdays };

    console.log('🚀 ~ handleSubmit ~ payload:', payload);
    createBarberOpeningHoursMutate(payload);
  };
  return {
    selectedDay,
    startHour,
    startMinute,
    endHour,
    endMinute,
    daysOfWeek,
    schedule,
    setSelectedDay,
    setStartHour,
    setStartMinute,
    setEndHour,
    setEndMinute,
    addTimeSlot,
    removeTimeSlot,
    handleSubmit,
  };
};
