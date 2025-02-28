import { UserCircle2 } from 'lucide-react';
import { useClientAppointments } from './useClientAppointments';
import dayjs from 'dayjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ClientAppointments() {
  const { clientAppointments } = useClientAppointments();

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:w-[40rem] mx-auto">
      <div className="w-full space-y-4">
        {clientAppointments?.data.map((appointment, index) => (
          <div key={index} className="bg-paper rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4 ">
              <Avatar className="size-16">
                <AvatarImage src={appointment.barber.photoUrl} />
                <AvatarFallback>
                  <UserCircle2 className="size-12" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">
                  {appointment.barber.name}
                </h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{appointment.service.name}</span>
                  <span>R$ {appointment.service.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-bold">
                    {dayjs(appointment.date).format('DD/MM/YYYY')}
                  </span>
                  <span className="font-bold">
                    {dayjs(appointment.date).format('HH:mm')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TODO Adicionar paginação */}
    </div>
  );
}
