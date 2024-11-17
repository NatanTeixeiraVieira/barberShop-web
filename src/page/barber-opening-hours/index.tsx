import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { daysOfWeek } from '@/constants/days';
import { useBarberOpeningHours } from './useBarberOpeningHours';
import Spinner from '@/components/Spinner';
import { Toaster } from '@/components/ui/toaster';

export default function BarberOpeningHours() {
  const barberOpeningHours = useBarberOpeningHours();

  return (
    <div className="min-h-screen bg-primary">
      <main className="container py-6 mx-auto">
        <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
          <CardHeader className="bg-paper">
            <CardTitle>Horário de Funcionamento</CardTitle>
            <CardDescription>
              Defina os horários de funcionamento para cada dia da semana
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Select
                  value={barberOpeningHours.selectedDay}
                  onValueChange={barberOpeningHours.setSelectedDay}
                >
                  <SelectTrigger className="focus:ring-primary w-[180px]">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent className="bg-paper w-[180px]">
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Select
                    value={barberOpeningHours.startHour}
                    onValueChange={barberOpeningHours.setStartHour}
                  >
                    <SelectTrigger className="w-20 focus:ring-primary">
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent className="bg-paper w-20">
                      {Array.from({ length: 24 }, (_, i) =>
                        i.toString().padStart(2, '0'),
                      ).map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select
                    value={barberOpeningHours.startMinute}
                    onValueChange={barberOpeningHours.setStartMinute}
                  >
                    <SelectTrigger className="w-20 focus:ring-primary">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent className="bg-paper w-20">
                      {Array.from({ length: 12 }, (_, i) =>
                        (i * 5).toString().padStart(2, '0'),
                      ).map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={barberOpeningHours.endHour}
                    onValueChange={barberOpeningHours.setEndHour}
                  >
                    <SelectTrigger className="w-20 focus:ring-primary">
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent className="bg-paper w-20">
                      {Array.from({ length: 24 }, (_, i) =>
                        i.toString().padStart(2, '0'),
                      ).map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select
                    value={barberOpeningHours.endMinute}
                    onValueChange={barberOpeningHours.setEndMinute}
                  >
                    <SelectTrigger className="w-20 focus:ring-primary">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent className="bg-paper w-20">
                      {Array.from({ length: 12 }, (_, i) =>
                        (i * 5).toString().padStart(2, '0'),
                      ).map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={barberOpeningHours.addTimeSlot}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Adicionar Horário
                </Button>
              </div>

              <div className="space-y-2">
                {daysOfWeek.map((day) => {
                  const weekdaySchedule =
                    barberOpeningHours.schedule.weekdays.find(
                      (w) => w.name === day,
                    );
                  return (
                    <div key={day} className="border p-4 rounded-md">
                      <h3 className="font-semibold mb-2">{day}</h3>
                      {weekdaySchedule?.openingHours.map((slot, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between mb-2 bg-primary/10 p-2 rounded"
                        >
                          <span className="text-primary">
                            {slot.start} - {slot.end}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              barberOpeningHours.removeTimeSlot(
                                slot,
                                day,
                                index,
                              )
                            }
                            className="text-primary hover:text-white hover:bg-primary"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remover horário</span>
                          </Button>
                        </div>
                      ))}
                      {(!weekdaySchedule ||
                        weekdaySchedule.openingHours.length === 0) && (
                        <p className="text-sm text-muted-foreground">
                          Nenhum horário adicionado
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={barberOpeningHours.isCreateOpeningHoursPending}
                  onClick={barberOpeningHours.handleSubmit}
                  className="bg-primary text-white hover:bg-primary/90 w-32"
                >
                  {barberOpeningHours.isCreateOpeningHoursPending && (
                    <Spinner size="sm" />
                  )}
                  {!barberOpeningHours.isCreateOpeningHoursPending &&
                    'Salvar Horários'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Toaster />
      </main>
    </div>
  );
}
