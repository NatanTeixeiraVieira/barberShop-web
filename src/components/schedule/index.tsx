import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'dayjs/locale/pt-br';
import { capitalize } from '@/utils/formatter';
import { Toaster } from '../ui/toaster';
import Spinner from '../spinner';
import { useSchedule } from './useSchedule';

type ScheduleProps = {
  barberShopName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
};

export default function Schedule({
  barberShopName,
  serviceName,
  servicePrice,
  serviceId,
}: ScheduleProps) {
  const schedule = useSchedule(serviceId);

  return (
    <Dialog open={schedule.isOpen} onOpenChange={schedule.setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agendar Serviço</Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 bg-paper rounded-lg overflow-hidden"
        onClose={schedule.handleCloseModal}
      >
        <div className="bg-white p-4 rounded-t-lg">
          <h1 className="text-primary text-lg font-semibold mb-2">
            {barberShopName}
          </h1>
          <div className="flex justify-between text-gray-600">
            <span>{serviceName}</span>
            <span>R$ {servicePrice.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 text-primary">
            <ChevronLeft
              className="h-5 w-5 cursor-pointer"
              onClick={schedule.handlePreviousWeek}
            />
            <span className="font-medium">
              {capitalize(schedule.currentWeek.format('MMMM [de] YYYY'))}
            </span>
            <ChevronRight
              className="h-5 w-5 cursor-pointer"
              onClick={schedule.handleNextWeek}
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-2 justify-center mb-2">
              {schedule.availableDays?.map((weekday) => (
                <div
                  key={weekday.name}
                  className="text-center text-xs font-medium text-primary w-12"
                >
                  {weekday.name}
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              {schedule.availableDays?.map((day) => {
                const isSelected =
                  day.date?.toDate().toDateString() ===
                  schedule.selectedDate?.toDateString();
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
                      schedule.handleDateSelect(day.date?.toDate());
                      schedule.setSelectedDay(day);
                      schedule.setSelectedHour(null); // Reseta a seleção de horas ao mudar de dia
                      schedule.setSelectedMinute(null);
                    }}
                  >
                    {day.date?.format('DD')}
                  </Button>
                );
              })}
            </div>
          </div>
          {schedule.selectedDay && (
            <div className="w-fit mx-auto">
              <h2 className="mb-2 text-primary">Horas</h2>
              <div className="flex gap-2 mb-4">
                {schedule.selectedDay.openingHours.map((hour) => {
                  const startHour = parseInt(hour.start.split(':')[0]);
                  const endHour = parseInt(hour.end.split(':')[0]);
                  const isCurrentDay = schedule.selectedDay?.name
                    ? schedule.weekdaysMap[schedule.selectedDay?.name] ===
                      schedule.todayDayOfWeek
                    : false;
                  const currentHour = schedule.today.hour();

                  return Array.from(
                    { length: endHour - startHour },
                    (_, index) => (
                      <>
                        {(!(isCurrentDay && index + startHour < currentHour) ||
                          !schedule.isCurrentWeek) && (
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
                              schedule.setSelectedHour(index + startHour);
                              schedule.setSelectedMinute(null);
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

          {schedule.selectedHour && schedule.selectedDay && (
            <div className="w-[21rem] mx-auto mb-8">
              <h2 className="mb-2 text-primary">Minutos</h2>
              <div className="flex flex-wrap gap-2">
                {schedule.selectedDay.openingHours
                  .filter(
                    (hour) =>
                      schedule.selectedHour &&
                      schedule.selectedHour >=
                        parseInt(hour.start.split(':')[0]) &&
                      schedule.selectedHour <= parseInt(hour.end.split(':')[0]),
                  )
                  .flatMap((hour) => {
                    const startHour = parseInt(hour.start.split(':')[0]);
                    const startMinute = parseInt(hour.start.split(':')[1]);
                    const endHour = parseInt(hour.end.split(':')[0]);
                    const endMinute = parseInt(hour.end.split(':')[1]);

                    // Define os minutos disponíveis com base no horário
                    const minutes =
                      schedule.selectedHour === startHour
                        ? Array.from(
                            { length: Math.ceil((60 - startMinute) / 5) },
                            (_, i) => startMinute + i * 5,
                          )
                        : Array.from({ length: 12 }, (_, i) => i * 5);

                    // Limitar os minutos se o horário for o último da faixa de horas (endHour)
                    return minutes
                      .filter((minute) =>
                        schedule.selectedHour === endHour
                          ? minute <= endMinute
                          : true,
                      )
                      .map((minute) => (
                        <Button
                          key={minute}
                          variant={
                            schedule.selectedMinute === minute
                              ? 'default'
                              : 'outline'
                          }
                          className={`h-8 w-12 p-0 text-sm ${
                            schedule.selectedMinute === minute
                              ? 'bg-primary text-white hover:bg-primary'
                              : 'bg-white text-primary hover:bg-gray-100'
                          }`}
                          onClick={() => schedule.setSelectedMinute(minute)}
                        >
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      ));
                  })}
              </div>
            </div>
          )}
          <Button
            className="w-full bg-primary text-white hover:bg-secondary font-medium text-sm py-1"
            onClick={schedule.handleFinishScheduling}
            disabled={
              schedule.selectedTime === null ||
              schedule.selectedDate === null ||
              schedule.selectedMinute === null ||
              schedule.isCreateAppointmentPending
            }
          >
            {schedule.isCreateAppointmentPending && <Spinner size="sm" />}
            {!schedule.isCreateAppointmentPending && 'Finalizar Agendamento'}
          </Button>
        </div>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
