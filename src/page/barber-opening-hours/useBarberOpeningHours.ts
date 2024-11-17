import { daysOfWeek } from '@/constants/days';
import { barberOpeningHoursCache } from '@/constants/requestCacheNames';
import { useToast } from '@/hooks/useToast';
import {
  createBarberOpeningHours,
  getBarberOpeningHours,
} from '@/services/barberOpeningHours';
import {
  BarberOpeningHours,
  CreateOpeningHoursDtoArray,
  DeletedOpeningHours,
} from '@/types/barberOpeningHours';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

type OpeningHourDto = {
  id?: string;
  start: string;
  end: string;
};

type WeekdayDto = {
  name: string;
  openingHours: OpeningHourDto[];
};

type CreateOpeningHoursDto = {
  weekday: string;
  start: string;
  end: string;
  barberShopId: string;
};

interface ReturnGetBarberOpeningHoursDto {
  weekdays: WeekdayDto[];
}

export const useBarberOpeningHours = () => {
  const { barberShopId } = useParams();

  const {
    mutate: createBarberOpeningHoursMutate,
    isPending: isCreateOpeningHoursPending,
  } = useMutation({
    mutationFn: async (dto: CreateOpeningHoursDtoArray) => {
      await createBarberOpeningHours(dto);
    },
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        description: 'Horários salvos com sucesso.',
        variant: 'success',
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao salvar horários. Por favor, tente novamente.',
        variant: 'error',
      });
    },
  });

  const { data: barberOpeningHours } = useQuery<BarberOpeningHours>({
    queryKey: [barberOpeningHoursCache],
    queryFn: async () => (await getBarberOpeningHours(barberShopId!)).data,

    retry: false,
    refetchOnWindowFocus: false,
  });

  const [schedule, setSchedule] = useState<ReturnGetBarberOpeningHoursDto>({
    weekdays: [],
  });
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [startHour, setStartHour] = useState<string>('09');
  const [startMinute, setStartMinute] = useState<string>('00');
  const [endHour, setEndHour] = useState<string>('17');
  const [endMinute, setEndMinute] = useState<string>('00');

  const createdHours = useRef<CreateOpeningHoursDto[]>([]);
  const deletedHours = useRef<DeletedOpeningHours[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    if (!barberOpeningHours) return;

    setSchedule(barberOpeningHours);
  }, [barberOpeningHours]);

  const isSomeHourRepeated = (start: string, end: string) => {
    return schedule.weekdays.some(
      (weekday) =>
        weekday.name === selectedDay &&
        weekday.openingHours.some(
          (hour) =>
            [start, end].includes(hour.start) ||
            [start, end].includes(hour.end),
        ),
    );
  };

  const isHourRepeated = (start: string, end: string) => {
    return schedule.weekdays.some(
      (weekday) =>
        weekday.name === selectedDay &&
        weekday.openingHours.some(
          (hour) => hour.start === start && hour.end === end,
        ),
    );
  };

  const hasOverlap = (start: string, end: string) => {
    const [startHour, startMinute] = start.split(':');
    const newStart = dayjs().hour(+startHour).minute(+startMinute);

    const [endHour, endMinute] = end.split(':');
    const newEnd = dayjs().hour(+endHour).minute(+endMinute);

    const currentWeekday = schedule.weekdays.find(
      (weekday) => weekday.name === selectedDay,
    );

    return currentWeekday?.openingHours.some((hour) => {
      const [existingStartHour, existingStartMinute] = hour.start.split(':');
      const existingStart = dayjs()
        .hour(+existingStartHour)
        .minute(+existingStartMinute);

      const [existingEndHour, existingEndMinute] = hour.end.split(':');
      const existingEnd = dayjs()
        .hour(+existingEndHour)
        .minute(+existingEndMinute);

      const noOverlap =
        newEnd.isBefore(existingStart) || newStart.isAfter(existingEnd);

      return !noOverlap;
    });
  };

  const validateSelectedHours = (start: string, end: string) => {
    if (isHourRepeated(start, end)) {
      toast({
        title: 'Horário já existente',
        description: 'O horário selecionado já existe',
        variant: 'alert',
      });

      return false;
    }

    if (hasOverlap(start, end) || isSomeHourRepeated(start, end)) {
      toast({
        title: 'Horário inválido',
        description:
          'O horário selecionado está no intervalo de um já existente',
        variant: 'alert',
      });

      return false;
    }

    if (start >= end) {
      toast({
        title: 'Horário inválido',
        description:
          'O horário de término deve ser posterior ao horário de início',
        variant: 'alert',
      });

      return false;
    }

    return true;
  };

  const addTimeSlot = () => {
    const start = `${startHour}:${startMinute}`;
    const end = `${endHour}:${endMinute}`;

    if (!validateSelectedHours(start, end)) return;

    setSchedule((prev) => {
      const updatedWeekdays = prev.weekdays.map((weekday) => {
        if (weekday.name === selectedDay) {
          return {
            ...weekday,
            openingHours: [...weekday.openingHours, { start, end }],
          };
        }
        return weekday;
      });

      if (!updatedWeekdays.some((weekday) => weekday.name === selectedDay)) {
        updatedWeekdays.push({
          name: selectedDay,
          openingHours: [{ start, end }],
        });
      }

      return { weekdays: updatedWeekdays };
    });

    createdHours.current.push({
      barberShopId: barberShopId!,
      end,
      start,
      weekday: selectedDay,
    });
  };

  const removeTimeSlot = (slot: OpeningHourDto, day: string, index: number) => {
    console.log('🚀 ~ removeTimeSlot ~ slot:', slot);
    setSchedule((prev) => ({
      weekdays: prev.weekdays.map((weekday) => {
        if (weekday.name === day) {
          return {
            ...weekday,
            openingHours: weekday.openingHours.filter((_, i) => i !== index),
          };
        }
        return weekday;
      }),
    }));

    if (slot.id) {
      deletedHours.current.push({ id: slot.id });
    }

    if (!slot.id) {
      createdHours.current = createdHours.current.filter(
        (hour) =>
          !(
            hour.end === slot.end &&
            hour.start === slot.start &&
            hour.weekday === selectedDay
          ),
      );
    }
  };

  const handleSubmit = async () => {
    if (!barberShopId) return;

    const payload: CreateOpeningHoursDtoArray = {
      created: createdHours.current,
      deleted: deletedHours.current,
    };

    if (payload.created.length > 0 || payload.deleted.length > 0) {
      createBarberOpeningHoursMutate(payload);
    }
  };

  return {
    selectedDay,
    startHour,
    schedule,
    startMinute,
    isCreateOpeningHoursPending,
    endHour,
    endMinute,
    setSelectedDay,
    setStartHour,
    addTimeSlot,
    handleSubmit,
    removeTimeSlot,
    setStartMinute,
    setEndHour,
    setEndMinute,
  };
};
