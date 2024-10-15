import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs'; // Biblioteca para manipulação de datas
import 'dayjs/locale/pt-br';
import { barberOpeningHoursCache } from '@/constants/requestCacheNames';
import { getBarberOpeningHours } from '@/services/barberOpeningHours';
import { BarberOpeningHours } from '@/types/barberOpeningHours';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';

interface OpeningHour {
  start: string;
  end: string;
  id: string;
}

interface Weekday {
  name: string;
  openingHours: OpeningHour[];
}

interface ScheduleData {
  weekdays: Weekday[];
}

export default function Schedule() {
  const { data } = useQuery<BarberOpeningHours>({
    queryKey: [barberOpeningHoursCache],
    queryFn: async () =>
      (await getBarberOpeningHours('45a0f749-9f59-475f-80c9-91121b8073fb'))
        .data,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [selectedDay, setSelectedDay] = useState<Weekday | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

  const getDaysOfWeek = (): Dayjs[] => {
    const today = dayjs();
    return Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));
  };

  const daysOfWeek = getDaysOfWeek();
  const availableDays = data?.weekdays.map((weekday) => {
    const matchedDay = daysOfWeek.find(
      (day) => day.format('ddd').toLowerCase() === weekday.name,
    );
    return { ...weekday, date: matchedDay };
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Selecione um dia da semana</h2>
      <div className="flex gap-4 my-4">
        {availableDays?.map((day) => (
          <Button
            key={day.name}
            variant={selectedDay?.name === day.name ? 'default' : 'secondary'}
            onClick={() => {
              setSelectedDay(day);
              setSelectedHour(null); // Reseta a seleção de horas ao mudar de dia
              setSelectedMinute(null); // Reseta a seleção de minutos
            }}
          >
            {day.date?.format('ddd DD/MM')}
          </Button>
        ))}
      </div>

      {selectedDay && (
        <div>
          <h3 className="text-lg font-bold">Horários disponíveis</h3>
          <div className="grid grid-cols-4 gap-4">
            {selectedDay.openingHours.map((hour) => {
              const startHour = parseInt(hour.start.split(':')[0]);
              const startMinute = parseInt(hour.start.split(':')[1]);
              const endHour = parseInt(hour.end.split(':')[0]);
              const endMinute = parseInt(hour.end.split(':')[1]);

              return Array.from({ length: endHour - startHour + 1 }, (_, i) => {
                const currentHour = startHour + i;
                return (
                  <Button
                    key={currentHour}
                    variant={
                      selectedHour === currentHour ? 'default' : 'secondary'
                    }
                    onClick={() => {
                      setSelectedHour(currentHour);
                      setSelectedMinute(null); // Reseta a seleção de minutos ao mudar de hora
                    }}
                  >
                    {currentHour}:00
                  </Button>
                );
              });
            })}
          </div>
        </div>
      )}

      {selectedHour !== null && selectedDay && (
        <div>
          <h3 className="text-lg font-bold">Minutos disponíveis</h3>
          <div className="grid grid-cols-5 gap-4">
            {selectedDay.openingHours
              .filter(
                (hour) =>
                  selectedHour >= parseInt(hour.start.split(':')[0]) &&
                  selectedHour <= parseInt(hour.end.split(':')[0]),
              )
              .flatMap((hour) => {
                const startHour = parseInt(hour.start.split(':')[0]);
                const startMinute = parseInt(hour.start.split(':')[1]);
                const endHour = parseInt(hour.end.split(':')[0]);
                const endMinute = parseInt(hour.end.split(':')[1]);

                // Define os minutos disponíveis com base no horário
                const minutes =
                  selectedHour === startHour
                    ? Array.from(
                        { length: Math.ceil((60 - startMinute) / 5) },
                        (_, i) => startMinute + i * 5,
                      )
                    : Array.from({ length: 12 }, (_, i) => i * 5);

                // Limitar os minutos se o horário for o último da faixa de horas (endHour)
                return minutes
                  .filter((minute) =>
                    selectedHour === endHour ? minute <= endMinute : true,
                  )
                  .map((minute) => (
                    <Button
                      key={minute}
                      variant={
                        selectedMinute === minute ? 'default' : 'secondary'
                      }
                      onClick={() => setSelectedMinute(minute)}
                    >
                      {selectedHour}:{minute.toString().padStart(2, '0')}
                    </Button>
                  ));
              })}
          </div>
        </div>
      )}
    </div>
  );
}
