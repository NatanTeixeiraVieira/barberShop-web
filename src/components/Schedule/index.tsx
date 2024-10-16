// Option 1

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// export default function Component() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);

//   const daysInWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
//   const [currentMonth, setCurrentMonth] = useState(new Date(2020, 7, 1)); // August 1, 2020

//   const timeSlots = ['13:00', '14:00', '15:00', '16:00'];

//   const getDaysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const days = new Date(year, month + 1, 0).getDate();
//     return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
//   };

//   const days = getDaysInMonth(currentMonth);

//   const changeMonth = (increment: number) => {
//     setCurrentMonth(
//       new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth() + increment,
//         1,
//       ),
//     );
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Agendar Serviço</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] bg-[#e6f3f7]">
//         <DialogHeader>
//           <DialogTitle className="text-center text-primary">
//             Bonieky Lacerda
//           </DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-2 items-center gap-4 text-primary">
//             <div className="font-medium">Corte masculino</div>
//             <div className="text-right">R$ 29,90</div>
//           </div>
//           <div className="space-y-2">
//             <div className="flex justify-between items-center text-primary">
//               <ChevronLeft
//                 className="h-5 w-5 cursor-pointer"
//                 onClick={() => changeMonth(-1)}
//               />
//               <span className="font-medium">
//                 {currentMonth.toLocaleString('default', {
//                   month: 'long',
//                   year: 'numeric',
//                 })}
//               </span>
//               <ChevronRight
//                 className="h-5 w-5 cursor-pointer"
//                 onClick={() => changeMonth(1)}
//               />
//             </div>
//             <div className="grid grid-cols-7 gap-1 text-center">
//               {daysInWeek.map((day, index) => (
//                 <div key={index} className="text-sm font-medium text-primary">
//                   {day}
//                 </div>
//               ))}
//               {days.map((day, index) => (
//                 <Button
//                   key={index}
//                   variant={
//                     selectedDate?.getTime() === day.getTime()
//                       ? 'default'
//                       : 'outline'
//                   }
//                   className={`h-10 w-10 ${
//                     selectedDate?.getTime() === day.getTime()
//                       ? 'bg-primary text-white'
//                       : 'bg-white text-primary'
//                   }`}
//                   onClick={() => setSelectedDate(day)}
//                 >
//                   {day.getDate()}
//                 </Button>
//               ))}
//             </div>
//           </div>
//           <div className="grid grid-cols-4 gap-2">
//             {timeSlots.map((time, index) => (
//               <Button
//                 key={index}
//                 variant={selectedTime === time ? 'default' : 'outline'}
//                 className={`${
//                   selectedTime === time
//                     ? 'bg-primary text-white'
//                     : 'bg-white text-primary'
//                 }`}
//                 onClick={() => setSelectedTime(time)}
//               >
//                 {time}
//               </Button>
//             ))}
//           </div>
//         </div>
//         <Button
//           className="w-full bg-primary text-white hover:bg-[#3d8299]"
//           onClick={() => setIsOpen(false)}
//           disabled={!selectedDate || !selectedTime}
//         >
//           Finalizar Agendamento
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

// Option 2

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSchedule } from './useSchedule';
import { useState } from 'react';
import { WeekdayOutput } from '@/types/barberOpeningHours';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

export default function Schedule() {
  dayjs.locale('pt-br');
  const schedule = useSchedule();

  const [selectedDay, setSelectedDay] = useState<WeekdayOutput | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

  const getDaysOfWeek = (): Dayjs[] => {
    const today = dayjs();
    return Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));
  };

  const today = dayjs();

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

  const todayDayOfWeek = today.day();

  const availableDays = schedule.barberOpeningHours?.weekdays
    .filter((weekday) => weekdaysMap[weekday.name] >= todayDayOfWeek) // Mostra apenas os dias a partir de hoje
    .map((weekday) => {
      const matchedDate = today.day(weekdaysMap[weekday.name]);
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

  return (
    <Dialog open={schedule.isOpen} onOpenChange={schedule.setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agendar Serviço</Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-[#e6f3f7] rounded-lg overflow-hidden">
        <div className="bg-white p-4 rounded-t-lg">
          <div className="text-primary text-lg font-semibold mb-2">
            Natãn Vieira
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Corte masculino</span>
            <span>R$ 29,90</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 text-primary">
            <ChevronLeft
              className="h-5 w-5 cursor-pointer"
              onClick={() => schedule.handleDateChange(-1)}
            />
            <span className="font-medium">
              {schedule.currentWeekStart.toLocaleString('pt-BR', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <ChevronRight
              className="h-5 w-5 cursor-pointer"
              onClick={() => schedule.handleDateChange(1)}
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-2 justify-center mb-2">
              {availableDays?.map((weekday) => (
                <div
                  key={weekday.name}
                  className="text-center text-xs font-medium text-primary w-12"
                >
                  {weekday.name}
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              {availableDays?.map((day, i) => {
                const date = new Date(schedule.currentWeekStart);
                date.setDate(schedule.currentWeekStart.getDate() + i + 1); // +1 because we start from Monday
                const isSelected =
                  date.toDateString() === schedule.selectedDate?.toDateString();
                return (
                  <Button
                    key={day.name}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`h-8 w-12 text-center p-0 text-sm ${
                      isSelected
                        ? 'bg-primary text-white hover:bg-primary'
                        : 'bg-white text-primary hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      schedule.handleDateSelect(date);
                      setSelectedDay(day);
                      setSelectedHour(null); // Reseta a seleção de horas ao mudar de dia
                      setSelectedMinute(null);
                    }}
                  >
                    {day.date?.format('DD')}
                    {/* {date.getDate()} */}
                  </Button>
                );
              })}
            </div>
          </div>
          {selectedDay && (
            <div className="w-fit mx-auto">
              <h2 className="mb-2 text-primary">Horas</h2>
              <div className="flex gap-2 mb-4">
                {selectedDay.openingHours.map((hour) => {
                  const startHour = parseInt(hour.start.split(':')[0]);
                  const endHour = parseInt(hour.end.split(':')[0]);
                  const isCurrentDay =
                    weekdaysMap[selectedDay.name] === todayDayOfWeek;
                  const currentHour = today.hour();

                  return Array.from(
                    { length: endHour - startHour },
                    (_, index) => (
                      <>
                        {!(isCurrentDay && index + startHour < currentHour) && (
                          <Button
                            key={index}
                            variant={
                              schedule.selectedTime === index + startHour
                                ? 'default'
                                : 'outline'
                            }
                            className={`h-8 w-12 p-0 text-sm ${
                              schedule.selectedTime === index + startHour
                                ? 'bg-primary text-white hover:bg-primary'
                                : 'bg-white text-primary hover:bg-gray-100'
                            }`}
                            onClick={() => {
                              schedule.handleTimeSelect(index + startHour);
                              setSelectedHour(index + startHour);
                              setSelectedMinute(null);
                            }}
                          >
                            {index + startHour}
                          </Button>
                        )}
                      </>
                    ),
                  );
                })}
              </div>
            </div>
          )}

          {selectedHour && selectedDay && (
            <div className="w-[21rem] mx-auto mb-8">
              <h2 className="mb-2 text-primary">Minutos</h2>
              <div className="flex flex-wrap gap-2">
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
                            selectedMinute === minute ? 'default' : 'outline'
                          }
                          className={`h-8 w-12 p-0 text-sm ${
                            selectedMinute === minute
                              ? 'bg-primary text-white hover:bg-primary'
                              : 'bg-white text-primary hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedMinute(minute)}
                        >
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      ));
                  })}
              </div>
            </div>
          )}
          {/* <div className="grid grid-cols-4 gap-2 mb-8">
            {schedule..map((time, index) => (
              <Button
                key={index}
                variant={schedule.selectedTime === time ? 'default' : 'outline'}
                className={`h-8 p-0 text-sm ${
                  schedule.selectedTime === time
                    ? 'bg-primary text-white hover:bg-primary'
                    : 'bg-white text-primary hover:bg-gray-100'
                }`}
                onClick={() => schedule.handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div> */}
          <Button
            className="w-full bg-primary text-white hover:bg-secondary font-medium text-sm py-1"
            onClick={schedule.handleFinishScheduling}
            disabled={!schedule.selectedTime || !schedule.selectedDate}
          >
            Finalizar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
